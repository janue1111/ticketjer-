import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrder } from '@/lib/actions/order.actions';
import { CreateOrderParams } from '@/types';

export async function POST(req: Request) {
  console.log('Webhook de IziPay recibido.');

  try {
    const formData = await req.formData();
    const krAnswer = formData.get('kr-answer');

    if (!krAnswer || typeof krAnswer !== 'string') {
      console.error('Error de Webhook: El campo "kr-answer" no se encontró o no es un string.');
      return NextResponse.json({ message: 'Payload inválido.' }, { status: 400 });
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


    // --- LÓGICA DE FIRMA DEFINITIVA Y CORRECTA ---

    // 1. Tomamos las claves DIRECTAMENTE del objeto parseado.
    const vadsKeys = Object.keys(izipayData)
      // 2. Filtramos solo las claves que empiezan con 'vads_'.
      //    (Esto automáticamente excluye 'signature', 'kr-hash', etc.)
      .filter(key => key.startsWith('vads_'))
      // 3. ¡ORDENAMOS ALFABÉTICAMENTE!
      .sort();

    // 4. Mapeamos los valores en el orden correcto.
    //    NO filtramos los valores vacíos, como sugiere el video.
    const string_to_sign = vadsKeys
      .map(key => izipayData[key])
      .join('+');

    // 5. Añadimos la clave secreta al final para crear la cadena final.
    const data_to_hash = string_to_sign + '+' + secretKey;

    // 6. Calculamos nuestra firma.
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

    // Tu lógica de negocio (usando 'izipayData' en lugar de 'params')
    const orderData = izipayData; // Usamos un nombre más claro
    const newOrder: CreateOrderParams = {
      stripeId: orderData.vads_trans_id,
      eventId: orderData.vads_order_id,
      buyerId: orderData.vads_cust_id,
      totalAmount: String(Number(orderData.vads_amount) / 100),
      createdAt: new Date(orderData.vads_presentation_date),
      quantity: 1, // Debes ajustar esto si puede ser más de 1
    };

    const createdOrder = await createOrder(newOrder);
    return NextResponse.json({ message: 'OK', order: createdOrder }, { status: 200 });

  } catch (error: any) {
    console.error("ERROR BRUTAL EN EL WEBHOOK:", error);
    return NextResponse.json({ message: `Error en el webhook: ${error.message}` }, { status: 500 });
  }
}