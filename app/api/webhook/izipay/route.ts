import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { updateOrderStatus } from '@/lib/actions/order.actions';
import { handleError } from '@/lib/utils';

/**
 * Función para validar una firma HMAC-SHA-256.
 * @param {string} payload - El mensaje original que se firmó (payloadHttp).
 * @param {string} keyHash - La clave secreta (tu IZIPAY_HASH_KEY).
 * @param {string} signature - La firma a comparar.
 * @returns {boolean} - Devuelve true si la firma es válida, de lo contrario, false.
 */
function checkSignature(payload: string, keyHash: string, signature: string): boolean {
  if (!keyHash) {
    console.error("Error: La clave secreta (keyHash) no está configurada.");
    return false;
  }
  const hmac = createHmac('sha256', Buffer.from(keyHash, 'utf-8'));
  const messageBytes = Buffer.from(payload, 'utf-8');
  const hash = hmac.update(messageBytes).digest('base64');
  return signature === hash;
}

export async function POST(req: NextRequest) {
  try {
    const izipayResponse = await req.json();

    console.log('--- Notificación IPN de Izipay Recibida ---');
    console.log('Cuerpo de la respuesta:', JSON.stringify(izipayResponse, null, 2));

    const { payloadHttp, signature, code: responseCode } = izipayResponse;

    // Es crucial no validar la firma para errores de comunicación o cuando la respuesta ya indica un error específico
    if (responseCode === '021' || responseCode === 'COMMUNICATION_ERROR') {
      console.log(`Respuesta IPN ignorada debido a código de error: ${responseCode}`);
      // Aún así, respondemos 200 OK para que Izipay no siga reintentando.
      return NextResponse.json({ message: 'Notificación ignorada por código de error.' }, { status: 200 });
    }

    // 1. Validar la firma
    const secretKey = process.env.IZIPAY_HASH_KEY;
    if (!secretKey) {
      throw new Error("IZIPAY_HASH_KEY no está configurada en las variables de entorno.");
    }

    const isSignatureValid = checkSignature(payloadHttp, secretKey, signature);

    if (!isSignatureValid) {
      console.error('Error: ¡La firma de la notificación IPN no es válida!');
      // Respondemos con un error 400 para indicar una petición incorrecta.
      return NextResponse.json({ error: 'Firma inválida.' }, { status: 400 });
    }

    console.log('¡La firma de la notificación IPN es válida!');

    // 2. Procesar el payload si la firma es válida
    const payload = JSON.parse(payloadHttp);
    const paymentStatus = payload.code;
    const orderDetails = payload.response?.order?.[0];

    if (!orderDetails) {
        throw new Error("El payload no contiene detalles de la orden.");
    }
    
    // El ID de la orden que generamos en la API /prepare-order
    const orderId = orderDetails.orderNumber; 
    const transactionId = payload.transactionId;

    if (paymentStatus === '00') {
      console.log(`Pago exitoso para la orden ${orderId}. Actualizando estado a 'completed'.`);
      
      // 3. Actualizar el estado de la orden en la base de datos
      await updateOrderStatus(orderId, 'completed', transactionId);

      console.log(`Orden ${orderId} actualizada correctamente.`);

    } else {
      console.log(`El pago para la orden ${orderId} no fue exitoso (código: ${paymentStatus}). Actualizando estado a 'failed'.`);
      
      // Opcional: Actualizar el estado a 'failed' o 'cancelled' si lo deseas
      await updateOrderStatus(orderId, 'failed', transactionId);
    }

    // 4. Responder a Izipay que hemos recibido y procesado la notificación
    return NextResponse.json({ message: 'Notificación recibida y procesada.' }, { status: 200 });

  } catch (error) {
    // Usamos el handleError que ya tienes en el proyecto
    handleError(error);
    // Devolvemos un error 500 si algo en nuestro servidor falla.
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}