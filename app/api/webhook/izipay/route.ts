import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrder } from '@/lib/actions/order.actions';
import { CreateOrderParams } from '@/types';

export async function POST(req: Request) {
  console.log('Webhook de IziPay recibido.');

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
    console.error('Error de Webhook: Firma no encontrada en la respuesta.');
    return NextResponse.json({ message: 'Firma no encontrada.' }, { status: 400 });
  }

  const secretKey = process.env.IZIPAY_TEST_SECRET_KEY!;
  // DEBUG: Verificar la longitud de la clave secreta
  console.log('Longitud de clave leída:', secretKey.length);

  // --- LÓGICA DE FIRMA DEFINITIVA ---

  const vadsKeys = Object.keys(params)
    .filter(key => key.startsWith('vads_') && key !== 'vads_hash' && params[key] !== undefined && params[key] !== null && params[key] !== '')
    .sort();

  const string_to_sign = vadsKeys
    .map(key => params[key])
    .join('+');

  const data_to_hash = string_to_sign + '+' + secretKey;

  // DEBUG: Forzar encoding utf8
  const local_signature = crypto
    .createHmac('sha256', secretKey)
    .update(data_to_hash, 'utf8')
    .digest('base64');

  // --- FIN LÓGICA DE FIRMA ---

  if (receivedSignature !== local_signature) {
    console.error('FIRMA INVÁLIDA. La verificación del webhook ha fallado.');
    console.log("Firma Recibida:", receivedSignature);
    console.log("Firma Calculada:", local_signature);
    console.log("Cadena usada para calcular (sin la clave secreta):", string_to_sign);
    return NextResponse.json({ message: 'Firma inválida' }, { status: 400 });
  }

  console.log('Firma verificada exitosamente!');

  try {
    const newOrder: CreateOrderParams = {
      stripeId: params.vads_trans_id,
      eventId: params.vads_order_id,
      buyerId: params.vads_cust_id,
      totalAmount: String(Number(params.vads_amount) / 100),
      createdAt: new Date(params.vads_presentation_date),
      quantity: 1,
    };

    const createdOrder = await createOrder(newOrder);

    return NextResponse.json({ message: 'OK', order: createdOrder }, { status: 200 });

  } catch (error) {
    console.error("Error al crear la orden desde el webhook de IziPay:", error);
    return NextResponse.json({ message: 'Error interno del servidor al crear la orden' }, { status: 500 });
  }
}
