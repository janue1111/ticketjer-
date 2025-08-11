import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrder } from '@/lib/actions/order.actions';
import { CreateOrderParams } from '@/types';

export async function POST(req: Request) {
  console.log('Webhook de IziPay recibido!');

  const formData = await req.formData();
  const params: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    if (key === 'kr-answer') {
      const izipayData = JSON.parse(value.toString());
      for (const vads_key in izipayData) {
        params[vads_key] = izipayData[vads_key];
      }
    } else {
        params[key] = value;
    }
  });

  const receivedSignature = params.signature;
  if (!receivedSignature) {
    return NextResponse.json({ message: 'Firma no encontrada en la respuesta.' }, { status: 400 });
  }

  const secretKey = process.env.IZIPAY_TEST_SECRET_KEY!;
  const sorted_keys = Object.keys(params)
    .filter(key => key.startsWith('vads_'))
    .sort();

  const string_to_sign = sorted_keys
    .map(key => params[key])
    .join('+');

  const data_to_hash = string_to_sign + '+' + secretKey;

  const local_signature = crypto
    .createHash('sha256')
    .update(data_to_hash)
    .digest('base64');

  if (receivedSignature !== local_signature) {
    console.error('FIRMA INVÁLIDA. La verificación del webhook ha fallado.');
    return NextResponse.json({ message: 'Firma inválida' }, { status: 400 });
  }

  console.log('Firma verificada exitosamente!');

  // Si la firma es válida, crear la orden en la base de datos
  try {
    const newOrder: CreateOrderParams = {
      stripeId: params.vads_trans_id, // Usando el ID de transacción de IziPay
      eventId: params.vads_order_id, // Enviamos el eventId en este campo
      buyerId: params.vads_cust_id, // Corregido: Tomando el ID del cliente de la respuesta de IziPay
      totalAmount: String(Number(params.vads_amount) / 100),
      createdAt: new Date(),
      quantity: 1, // Placeholder: Este dato no viene en la respuesta de IziPay
    };

    const createdOrder = await createOrder(newOrder);

    return NextResponse.json({ message: 'OK', order: createdOrder }, { status: 200 });

  } catch (error) {
    console.error("Error al crear la orden desde el webhook de IziPay:", error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
