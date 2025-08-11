"use server"

import crypto from 'crypto';
import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Event from '../database/models/event.model';
import {ObjectId} from 'mongodb';
import User from '../database/models/user.model';

/*export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.eventTitle
            }
          },
          quantity: order.quantity
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
        quantity: order.quantity,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}*/

export const checkoutOrder = async (order: CheckoutOrderParams): Promise<{ [key: string]: string | number }> => {
  await connectToDatabase();

  // 1. Obtener la fecha y hora actual en formato UTC (AAAAMMDDHHMMSS)
  const now = new Date();
  const vads_trans_date = 
    now.getUTCFullYear().toString() +
    (now.getUTCMonth() + 1).toString().padStart(2, '0') +
    now.getUTCDate().toString().padStart(2, '0') +
    now.getUTCHours().toString().padStart(2, '0') +
    now.getUTCMinutes().toString().padStart(2, '0') +
    now.getUTCSeconds().toString().padStart(2, '0');

  // 2. Generar un ID de transacción único de 6 caracteres
  const vads_trans_id = Math.random().toString(36).substring(2, 8).toUpperCase();

  // 3. Convertir el monto a centavos
  const amount = order.isFree ? 0 : Number(order.price) * 100;

  // Obtener el email del comprador
  const buyer = await User.findById(order.buyerId);
  if (!buyer) {
    throw new Error('Usuario comprador no encontrado.');
  }
  const buyerEmail = buyer.email;

  // 4. Crear el objeto de parámetros para IziPay
  const vads_params: { [key: string]: string | number } = {
    vads_action_mode: 'INTERACTIVE',
    vads_amount: amount,
    vads_ctx_mode: 'TEST', // O 'PRODUCTION' en producción
    vads_currency: '604', // PEN
    vads_page_action: 'PAYMENT',
    vads_payment_config: 'SINGLE',
    vads_site_id: process.env.IZIPAY_SITE_ID!,
    vads_trans_date: vads_trans_date,
    vads_trans_id: vads_trans_id,
    vads_version: 'V2',
    vads_order_id: order.eventId, // Usamos eventId como identificador único de la orden
    vads_cust_email: buyerEmail,
    vads_cust_id: order.buyerId, // <- AÑADIDO AQUI
  };

  // --- Creación de la cadena para firmar ---
  const string_params = Object.fromEntries(
    Object.entries(vads_params).map(([key, value]) => [key, String(value)])
  );

  const sorted_keys = Object.keys(string_params)
    .filter(key => key.startsWith('vads_'))
    .sort();

  const string_to_sign = sorted_keys
    .map(key => string_params[key])
    .join('+');

  // --- Cálculo de la firma (Método de Hash simple) ---
  const secretKey = process.env.IZIPAY_TEST_SECRET_KEY!;
  const data_to_hash = string_to_sign + '+' + secretKey;

  const signature = crypto
    .createHash('sha256')
    .update(data_to_hash)
    .digest('base64');

  vads_params['signature'] = signature;

  return vads_params;
}

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    
    const newOrder = await Order.create({
      stripeId: order.stripeId,
      totalAmount: order.totalAmount,
      event: order.eventId,
      buyer: order.buyerId,
      quantity: order.quantity,
      createdAt: order.createdAt,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY EVENT
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    await connectToDatabase()

    if (!eventId) throw new Error('Event ID is required')
    const eventObjectId = new ObjectId(eventId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event',
        },
      },
      {
        $unwind: '$event',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: '$event.title',
          eventId: '$event._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}