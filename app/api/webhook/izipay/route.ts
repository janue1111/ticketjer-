import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrder } from '@/lib/actions/order.actions';
import { CreateOrderParams } from '@/types';

export async function POST(req: Request) {
  console.log('Webhook de IziPay recibido.');

  try {
    // CAMBIO IMPORTANTE: Leemos el cuerpo de la petición como JSON directamente.
    const body = await req.json();

    // Extraemos el campo "kr-answer" del objeto JSON.
    const krAnswer = body['kr-answer'];

    if (!krAnswer || typeof krAnswer !== 'string') {
      console.error('Error de Webhook: El campo "kr-answer" no se encontró en el cuerpo JSON o no es un string.');
      // Loggear el cuerpo completo para depurar qué está llegando
      console.log('Cuerpo de la petición recibido:', JSON.stringify(body, null, 2));
      return NextResponse.json({ message: 'Payload inválido o campo kr-answer ausente.' }, { status: 400 });
    }

    const izipayData = JSON.parse(krAnswer);
    const receivedSignature = izipayData.signature;

    if (!receivedSignature) {
      console.error('Error de Webhook: Firma no encontrada en el objeto kr-answer.');
      return NextResponse.json({ message: 'Firma no encontrada en payload.' }, { status: 400 });
    }

    const secretKey = process.env.IZIPAY_TEST_SECRET_KEY!;
    if (!secretKey) {
        console.error("ERROR CRÍTICO: IZIPAY_TEST_SECRET_KEY no está definida en el entorno.");
        return NextResponse.json({ message: 'Error de configuración del servidor' }, { status: 500 });
    }
    console.log('Longitud de clave leída:', secretKey.length);


    // --- LÓGICA DE FIRMA (YA DEBERÍA ESTAR CORRECTA) ---

    const vadsKeys = Object.keys(izipayData)
      .filter(key => key.startsWith('vads_'))
      .sort();

    const string_to_sign = vadsKeys
      .map(key => izipayData[key])
      .join('+');

    const data_to_hash = string_to_sign + '+' + secretKey;

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

    // Tu lógica de negocio
    const orderData = izipayData;
    const newOrder: CreateOrderParams = {
      stripeId: orderData.vads_trans_id,
      eventId: orderData.vads_order_id,
      buyerId: orderData.vads_cust_id,
      totalAmount: String(Number(orderData.vads_amount) / 100),
      createdAt: new Date(orderData.vads_presentation_date),
      quantity: 1,
    };

    const createdOrder = await createOrder(newOrder);
    return NextResponse.json({ message: 'OK', order: createdOrder }, { status: 200 });

  } catch (error: any) {
    console.error("ERROR BRUTAL EN EL WEBHOOK:", error);
    if (error instanceof SyntaxError) {
      console.error("El cuerpo de la petición no es un JSON válido.");
    }
    return NextResponse.json({ message: `Error en el webhook: ${error.message}` }, { status: 500 });
  }
}