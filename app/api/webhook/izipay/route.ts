
import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/actions/order.actions';
import crypto from 'crypto';

// Interfaz para la notificación de Izipay (ajustada a la documentación)
interface IzipayNotification {
  kr_answer: {
    orderStatus: string;
    shopId: string;
    orderDetails: {
      orderId: string;
      orderTotalAmount: number;
      orderCurrency: string;
    };
    customer: {
      email: string;
    };
    transactions: Array<{
      transactionId: string;
      transactionStatus: string;
      transactionType: string;
      amount: number;
    }>;
  };
  kr_hash: string; // La firma viene aquí
  kr_hash_algorithm: string; // Algoritmo de hash (ej. SHA256_HMAC)
}

// Función para verificar la firma de la notificación de Izipay
function verifyIzipaySignature(payload: IzipayNotification, secret: string): boolean {
  const receivedSignature = payload.kr_hash;
  const algorithm = payload.kr_hash_algorithm === 'SHA256_HMAC' ? 'sha256' : '';

  if (!algorithm) {
    console.error('Algoritmo de hash no soportado:', payload.kr_hash_algorithm);
    return false;
  }

  // Izipay firma el objeto `kr_answer` convertido a string
  const dataToSign = JSON.stringify(payload.kr_answer);

  const calculatedSignature = crypto
    .createHmac(algorithm, secret)
    .update(dataToSign, 'utf8')
    .digest('hex');

  // Comparación segura para evitar ataques de tiempo
  try {
    return crypto.timingSafeEqual(Buffer.from(receivedSignature, 'hex'), Buffer.from(calculatedSignature, 'hex'));
  } catch (error) {
    console.error('Error en la comparación de firmas:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body: IzipayNotification = await request.json();
    console.log('Notificación de Webhook Izipay recibida:', JSON.stringify(body, null, 2));

    const izipaySecret = process.env.IZIPAY_WEBHOOK_SECRET;
    if (!izipaySecret) {
      throw new Error('El secreto del webhook de Izipay no está configurado.');
    }

    // 1. Verificar la firma de la notificación
    const isVerified = verifyIzipaySignature(body, izipaySecret);
    if (!isVerified) {
      console.warn('Firma de webhook de Izipay inválida.');
      return NextResponse.json({ message: 'Notificación no autorizada' }, { status: 403 });
    }

    // 2. Procesar la notificación si la firma es válida
    const { orderStatus, orderDetails, transactions } = body.kr_answer;
    const orderId = orderDetails?.orderId;
    const izipayTransaction = transactions?.[0];

    if (!orderId || !izipayTransaction) {
      return NextResponse.json({ message: 'Datos de la orden incompletos en la notificación.' }, { status: 400 });
    }

    let newStatus: string;
    if (orderStatus === 'PAID') {
      newStatus = 'completed';
    } else if (['REFUSED', 'ERROR'].includes(orderStatus)) {
      newStatus = 'failed';
    } else {
      newStatus = 'pending'; // O cualquier otro estado que manejes
    }

    // 3. Actualizar la orden en la base de datos
    await updateOrderStatus(orderId, newStatus, izipayTransaction.transactionId);
    console.log(`Orden ${orderId} actualizada a estado: ${newStatus}. Transacción Izipay: ${izipayTransaction.transactionId}`);

    return NextResponse.json({ message: 'Webhook procesado correctamente' }, { status: 200 });

  } catch (error) {
    console.error('Error en el webhook de Izipay:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error procesando el webhook';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
