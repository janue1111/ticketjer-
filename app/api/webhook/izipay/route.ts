import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/actions/order.actions';
import { headers } from 'next/headers';

// NOTA: La validación real requiere un hash o firma que Izipay debería enviar.
// Por ahora, confiamos en la data, pero esto debería fortalecerse.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const transactionData = body.kr_answer; // Asumiendo que la data principal viene aquí

    if (transactionData && transactionData.orderStatus === 'PAID') {
      const orderId = transactionData.orderDetails.orderId;

      if (orderId) {
        await updateOrderStatus(orderId, 'completed');
        console.log(`Orden ${orderId} actualizada a completada.`);
      }
    }

    return NextResponse.json({ message: 'Webhook procesado' }, { status: 200 });
  } catch (error) {
    console.error('Error en el webhook de Izipay:', error);
    return NextResponse.json({ message: 'Error procesando el webhook' }, { status: 500 });
  }
}
