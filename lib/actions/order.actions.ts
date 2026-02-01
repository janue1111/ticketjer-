"use server"

import crypto from 'crypto';
import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Event from '../database/models/event.model';
import Ticket from '../database/models/ticket.model';
import { ObjectId } from 'mongodb';
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

/* 
DEPRECATED: Esta función usaba la implementación antigua de Izipay con vads_params.
Ahora se usa IzipaySDKForm que implementa el SDK moderno de Izipay.
Si necesitas referencia, mantén este código comentado.

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
    vads_ctx_mode: 'PRODUCTION',
    vads_currency: '604', // PEN
    vads_page_action: 'PAYMENT',
    vads_payment_config: 'SINGLE',
    vads_site_id: process.env.IZIPAY_SITE_ID!,
    vads_trans_date: vads_trans_date,
    vads_trans_id: vads_trans_id,
    vads_version: 'V2',
    vads_order_id: order.eventId,
    vads_cust_email: buyerEmail,
    vads_cust_id: order.buyerId,
    vads_url_success: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
    vads_url_refused: `${process.env.NEXT_PUBLIC_SERVER_URL}/pago-rechazado`,
    vads_url_cancel: `${process.env.NEXT_PUBLIC_SERVER_URL}/pago-cancelado`,
    vads_theme_config: 'SUCCESS_FOOTER_MSG_RETURN=DESCARGA TU TICKET',
  };

  const signature_fields = [
    'vads_action_mode',
    'vads_amount',
    'vads_ctx_mode',
    'vads_currency',
    'vads_cust_email',
    'vads_cust_id',
    'vads_order_id',
    'vads_page_action',
    'vads_payment_config',
    'vads_site_id',
    'vads_theme_config',
    'vads_trans_date',
    'vads_trans_id',
    'vads_url_cancel',
    'vads_url_refused',
    'vads_url_success',
    'vads_version'
  ];

  const string_to_sign = signature_fields
    .map(key => {
      const value = vads_params[key];
      if (value === undefined || value === null) {
        throw new Error(`El campo requerido para la firma '${key}' no fue encontrado en vads_params.`);
      }
      return String(value);
    })
    .join('+');

  const secretKey = process.env.IZIPAY_PROD_SECRET_KEY!;
  const data_to_hash = string_to_sign + '+' + secretKey;

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(data_to_hash)
    .digest('base64');

  vads_params['signature'] = signature;

  return vads_params;
}
*/


export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      transactionId: order.transactionId,
      totalAmount: order.totalAmount,
      event: order.eventId,
      buyer: order.buyerId,
      quantity: order.quantity,
      createdAt: order.createdAt,
      status: order.status || 'pending',
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

export async function updateOrderStatus(orderId: string, newStatus: string, transactionId?: string) {
  try {
    await connectToDatabase();

    const updateData: { status: string, transactionId?: string } = { status: newStatus };
    if (transactionId) {
      updateData.transactionId = transactionId;
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
    if (!updatedOrder) throw new Error('Order not found');
    return JSON.parse(JSON.stringify(updatedOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDER BY ID
export async function getOrderById(orderId: string) {
  try {
    await connectToDatabase()

    const order = await Order.findById(orderId)
      .populate({
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })
      .populate({
        path: 'buyer',
        model: User,
        select: '_id firstName lastName',
      })

    if (!order) throw new Error('Order not found')

    return JSON.parse(JSON.stringify(order))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    // Buscar el usuario por clerkId para obtener su _id de MongoDB
    const user = await User.findOne({ clerkId: userId })
    if (!user) {
      return { data: [], totalPages: 0 }
    }

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: user._id }

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

export async function updateOrderByTransactionId(transactionId: string): Promise<{ success: boolean; order: any | null; error: string | null; }> {
  try {
    await connectToDatabase();

    // Encontrar la orden por el transactionId
    const orderToUpdate = await Order.findOne({ transactionId: transactionId });

    if (!orderToUpdate) {
      console.error(`❌ Error: Orden no encontrada con transactionId: ${transactionId}`);
      return { success: false, order: null, error: 'Orden no encontrada con el ID de transacción proporcionado.' };
    }

    console.log(`📦 Orden encontrada: ${orderToUpdate._id} | Status: ${orderToUpdate.status} | Quantity: ${orderToUpdate.quantity}`);

    // VERIFICAR TICKETS EXISTENTES (importante para evitar duplicados)
    const existingTicketsCount = await Ticket.countDocuments({ order: orderToUpdate._id });
    console.log(`🎫 Tickets existentes: ${existingTicketsCount}`);

    // Si la orden ya está completada
    if (orderToUpdate.status === 'completed') {
      console.log(`ℹ️ La orden ya estaba completada.`);

      // Si faltan tickets, generarlos
      if (existingTicketsCount < orderToUpdate.quantity) {
        const ticketsToGenerate = orderToUpdate.quantity - existingTicketsCount;
        console.log(`⚠️ Faltan ${ticketsToGenerate} tickets. Generando...`);

        const ticketsToCreate = [];
        for (let i = existingTicketsCount + 1; i <= orderToUpdate.quantity; i++) {
          const ticketId = crypto.randomUUID();
          ticketsToCreate.push({
            ticketId: ticketId,
            order: orderToUpdate._id,
            event: orderToUpdate.event,
            buyer: orderToUpdate.buyer,
            ticketNumber: i,
            isUsed: false,
          });
        }

        await Ticket.insertMany(ticketsToCreate);
        console.log(`✅ ${ticketsToCreate.length} tickets generados para orden existente.`);
      } else {
        console.log(`✅ La orden ya tiene todos los tickets necesarios (${existingTicketsCount}/${orderToUpdate.quantity})`);
      }

      // Obtener los datos completos con populate
      const completeOrder = await Order.findById(orderToUpdate._id)
        .populate({
          path: 'event',
          model: Event,
        })
        .populate({
          path: 'buyer',
          model: User,
          select: '_id firstName lastName email username',
        });
      return { success: true, order: JSON.parse(JSON.stringify(completeOrder)), error: null };
    }

    // ORDEN NUEVA: Actualizar status a 'completed'
    console.log(`🔄 Actualizando orden a 'completed'...`);
    const updatedOrder = await Order.findByIdAndUpdate(
      orderToUpdate._id,
      { status: 'completed' },
      { new: true }
    )
      .populate({
        path: 'event',
        model: Event,
      })
      .populate({
        path: 'buyer',
        model: User,
        select: '_id firstName lastName email username',
      });

    if (!updatedOrder) {
      console.error(`❌ Error: La orden ${orderToUpdate._id} no pudo ser actualizada.`);
      return { success: false, order: null, error: 'La orden fue encontrada pero no pudo ser actualizada.' };
    }

    // GENERAR TICKETS solo si NO existen
    if (existingTicketsCount === 0) {
      console.log(`🎫 Generando ${updatedOrder.quantity} tickets nuevos...`);

      const ticketsToCreate = [];
      for (let i = 1; i <= updatedOrder.quantity; i++) {
        const ticketId = crypto.randomUUID();
        ticketsToCreate.push({
          ticketId: ticketId,
          order: updatedOrder._id,
          event: updatedOrder.event._id,
          buyer: updatedOrder.buyer._id,
          ticketNumber: i,
          isUsed: false,
        });
      }

      // Usar insertMany con opción ordered: false para mejor manejo de duplicados
      try {
        await Ticket.insertMany(ticketsToCreate, { ordered: false });
        console.log(`✅ ${ticketsToCreate.length} tickets generados exitosamente.`);
      } catch (insertError: any) {
        // Si hay error de duplicados (E11000), algunos tickets podrían haberse insertado
        if (insertError.code === 11000) {
          console.warn(`⚠️ Algunos tickets ya existían (duplicados detectados). Continuando...`);
          const finalCount = await Ticket.countDocuments({ order: updatedOrder._id });
          console.log(`📊 Total de tickets después de insert: ${finalCount}/${updatedOrder.quantity}`);
        } else {
          throw insertError; // Re-lanzar si es otro tipo de error
        }
      }
    } else if (existingTicketsCount < updatedOrder.quantity) {
      // Si existen algunos pero no todos, generar los faltantes
      const ticketsToGenerate = updatedOrder.quantity - existingTicketsCount;
      console.log(`⚠️ Solo existen ${existingTicketsCount} tickets. Generando ${ticketsToGenerate} faltantes...`);

      const ticketsToCreate = [];
      for (let i = existingTicketsCount + 1; i <= updatedOrder.quantity; i++) {
        const ticketId = crypto.randomUUID();
        ticketsToCreate.push({
          ticketId: ticketId,
          order: updatedOrder._id,
          event: updatedOrder.event._id,
          buyer: updatedOrder.buyer._id,
          ticketNumber: i,
          isUsed: false,
        });
      }

      await Ticket.insertMany(ticketsToCreate);
      console.log(`✅ ${ticketsToCreate.length} tickets faltantes generados.`);
    } else {
      console.log(`✅ La orden ya tiene todos los tickets necesarios (${existingTicketsCount}/${updatedOrder.quantity})`);
    }

    console.log(`✅ Orden ${transactionId} procesada exitosamente.`);
    return { success: true, order: JSON.parse(JSON.stringify(updatedOrder)), error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido en la base de datos.';
    console.error(`❌ Error catastrófico en updateOrderByTransactionId: ${errorMessage}`);
    return { success: false, order: null, error: errorMessage };
  }
}