import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { updateOrderStatus } from '@/lib/actions/order.actions';
import { handleError } from '@/lib/utils';

// La función de validación de firma permanece igual
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

// Nueva función que contiene toda la lógica de procesamiento
async function processWebhook(req: NextRequest) {
  try {
    const izipayResponse = await req.json();

    console.log('--- Notificación IPN de Izipay Recibida ---');
    console.log('Cuerpo de la respuesta:', JSON.stringify(izipayResponse, null, 2));

    const { payloadHttp, signature, code: responseCode } = izipayResponse;

    if (responseCode === '021' || responseCode === 'COMMUNICATION_ERROR') {
      console.log(`Respuesta IPN ignorada debido a código de error: ${responseCode}`);
      return; // Termina la ejecución para este caso
    }

    const secretKey = process.env.IZIPAY_HASH_KEY;
    if (!secretKey) {
      console.error("IZIPAY_HASH_KEY no está configurada en las variables de entorno.");
      return;
    }

    const isSignatureValid = checkSignature(payloadHttp, secretKey, signature);

    if (!isSignatureValid) {
      console.error('Error: ¡La firma de la notificación IPN no es válida!');
      // A diferencia de antes, no devolvemos un 400. Solo lo logueamos y terminamos.
      // Devolver un error haría que Izipay reintente, lo cual no queremos si la firma es mala.
      return; 
    }

    console.log('¡La firma de la notificación IPN es válida!');

    const payload = JSON.parse(payloadHttp);
    const paymentStatus = payload.code;
    const orderDetails = payload.response?.order?.[0];

    if (!orderDetails) {
      console.error("El payload no contiene detalles de la orden.");
      return;
    }

    const orderId = orderDetails.orderNumber;
    const transactionId = payload.transactionId;

    if (paymentStatus === '00') {
      console.log(`Pago exitoso para la orden ${orderId}. Actualizando estado a 'completed'.`);
      await updateOrderStatus(orderId, 'completed', transactionId);
      console.log(`Orden ${orderId} actualizada correctamente.`);
    } else {
      console.log(`El pago para la orden ${orderId} no fue exitoso (código: ${paymentStatus}). Actualizando estado a 'failed'.`);
      await updateOrderStatus(orderId, 'failed', transactionId);
    }
  } catch (error) {
    // En un entorno serverless, es mejor solo loguear el error.
    // La respuesta al cliente ya fue enviada.
    console.error('--- ERROR EN EL PROCESAMIENTO DEL WEBHOOK ---');
    handleError(error);
  }
}

export async function POST(req: NextRequest) {
  // 1. Invocamos el procesamiento en segundo plano SIN 'await'
  processWebhook(req);

  // 2. Respondemos a Izipay INMEDIATAMENTE
  return NextResponse.json({ message: 'Notificación recibida.' }, { status: 200 });
}