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

  // Lista explícita y ordenada de los campos requeridos por Izipay para la firma.
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
    'vads_trans_date',
    'vads_trans_id',
    'vads_version'
  ];

  // Se recogen los valores de los parámetros recibidos en el orden estricto de la lista.
  const string_to_sign = signature_fields
    .map(key => {
      const value = params[key];
      if (value === undefined || value === null) {
        throw new Error(`El campo requerido para la firma '${key}' no fue encontrado en los parámetros del webhook.`);
      }
      return String(value);
    })
    .join('+');

  const local_signature = crypto
    .createHmac('sha256', secretKey)
    .update(string_to_sign) // <-- Asegúrate de que aquí se usa 'string_to_sign', NO 'data_to_hash'
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
