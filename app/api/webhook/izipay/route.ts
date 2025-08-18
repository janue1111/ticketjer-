import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createOrder } from '@/lib/actions/order.actions';
import { CreateOrderParams } from '@/types';

export async function POST(req: Request) {
  console.log('Webhook de IziPay recibido.');

  try {
    // VOLVEMOS A formData(), que es el formato correcto según el error.
    const formData = await req.formData();
    
    // Convertimos el formData a un objeto simple para poder trabajar con él.
    const params: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      params[key] = value;
    });

    console.log("Parámetros recibidos del formulario:", JSON.stringify(params, null, 2));

    // El objeto 'params' ahora contiene directamente todos los campos vads_.
    const receivedSignature = params.signature;

    if (!receivedSignature) {
      console.error('Error de Webhook: El campo "signature" no fue encontrado en los datos del formulario.');
      return NextResponse.json({ message: 'Firma no encontrada.' }, { status: 400 });
    }

    const secretKey = process.env.IZIPAY_TEST_SECRET_KEY!;
    if (!secretKey) {
        console.error("ERROR CRÍTICO: IZIPAY_TEST_SECRET_KEY no está definida en el entorno.");
        return NextResponse.json({ message: 'Error de configuración del servidor' }, { status: 500 });
    }
    console.log('Longitud de clave leída:', secretKey.length);


    // --- LÓGICA DE FIRMA (Aplicada sobre el objeto 'params' directamente) ---

    const vadsKeys = Object.keys(params)
      .filter(key => key.startsWith('vads_'))
      .sort();

    const string_to_sign = vadsKeys
      .map(key => params[key])
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
    const orderData = params; 

    // --- INICIO DEL CAMBIO ---
    // Parsear correctamente la fecha recibida de Izipay
    const dateString = orderData.vads_presentation_date; // Formato: "AAAAMMDDHHMMSS"
    
    // Convertir a un formato que el constructor `new Date()` entienda: "AAAA-MM-DDTHH:MM:SS"
    const formattedDateString = `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}T${dateString.substring(8, 10)}:${dateString.substring(10, 12)}:${dateString.substring(12, 14)}`;
    
    const creationDate = new Date(formattedDateString);
    // --- FIN DEL CAMBIO ---

    const newOrder: CreateOrderParams = {
      stripeId: orderData.vads_trans_id,
      eventId: orderData.vads_order_id,
      buyerId: orderData.vads_cust_id,
      totalAmount: String(Number(orderData.vads_amount) / 100),
      createdAt: creationDate, // Usamos la fecha ya formateada y convertida
      quantity: 1,
    };

    const createdOrder = await createOrder(newOrder);
    return NextResponse.json({ message: 'OK', order: createdOrder }, { status: 200 });

  } catch (error: any) {
    console.error("ERROR BRUTAL EN EL WEBHOOK:", error);
    return NextResponse.json({ message: `Error en el webhook: ${error.message}` }, { status: 500 });
  }
}