import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { updateOrderByTransactionId } from '@/lib/actions/order.actions';
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
    const transactionId = payload.transactionId; // transactionId está en el nivel superior del payload

    if (!transactionId) {
      console.error("El payload no contiene un transactionId.");
      return;
    }

    if (paymentStatus === '00') {
      console.log(`IPN reporta pago exitoso para transactionId ${transactionId}. Actualizando estado a 'completed'.`);
      const result = await updateOrderByTransactionId(transactionId);
      if(result.success) {
        console.log(`Orden con transactionId ${transactionId} actualizada correctamente via IPN.`);
      } else {
        console.error(`IPN: No se pudo actualizar la orden con transactionId ${transactionId}. Razón: ${result.error}`);
      }
    } else {
      console.log(`IPN reporta que el pago para transactionId ${transactionId} no fue exitoso (código: ${paymentStatus}). No se realizarán cambios en la orden.`);
    }
  } catch (error) {
    console.error('--- ERROR EN EL PROCESAMIENTO DEL WEBHOOK ---');
    handleError(error);
    // Lanzamos el error para que la función que llama (POST) se entere del fallo.
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Await para asegurar que el procesamiento se complete antes de responder.
    await processWebhook(req);
    
    // Si llegamos aquí, processWebhook no lanzó errores.
    console.log("LOG DE DIAGNÓSTICO: El procesamiento del webhook finalizó con éxito.");
    return NextResponse.json({ message: 'Notificación procesada exitosamente.' }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido en el webhook.';
    
    // Logueamos el error exacto que fue lanzado desde processWebhook.
    console.error(`LOG DE DIAGNÓSTICO: El procesamiento del webhook falló. Razón: ${errorMessage}`);
    
    // Devolvemos 500 para notificar a Izipay del fallo.
    return NextResponse.json({ message: 'Error al procesar la notificación.', error: errorMessage }, { status: 500 });
  }
}