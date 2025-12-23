import { NextRequest, NextResponse } from 'next/server';
import { updateOrderByTransactionId } from '@/lib/actions/order.actions';
import { handleError } from '@/lib/utils';
import querystring from 'querystring';

/**
 * Endpoint de verificación para confirmar que la ruta está activa.
 */
export async function GET() {
  const timestamp = new Date().toISOString();
  console.log(`✅ [IPN] Verificación de estado (GET) exitosa en: ${timestamp}`);
  return NextResponse.json({
    status: 'ok',
    timestamp: timestamp
  });
}

/**
 * Endpoint principal para recibir las Notificaciones de Pago Instantáneo (IPN) de Izipay.
 */
export async function POST(req: NextRequest) {
  // =================================================================================
  // LOG DE DIAGNÓSTICO EXTREMO
  // Este es el primer log. Si no ves esto, la petición POST nunca llegó aquí.
  console.log(`🚨🚨🚨 [IPN] MÉTODO POST INVOCADO - ${new Date().toISOString()} 🚨🚨🚨`);
  // =================================================================================

  const startTime = new Date();
  
  try {
    const contentType = req.headers.get('content-type') || '';
    let data: any;

    // 1. Leer el payload
    if (contentType.includes('application/json')) {
      data = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await req.text();
      data = querystring.parse(text);
    } else {
      console.error(`❌ [IPN] Content-Type no soportado: ${contentType}`);
      return NextResponse.json({ error: 'Content-Type no soportado' }, { status: 200 });
    }

    console.log('📦 [IPN] Payload recibido:', JSON.stringify(data, null, 2));

    // 2. Extraer parámetros clave
    const { transactionId, code, statusMessage } = data;

    // 3. Validar que existe un ID de transacción
    if (!transactionId) {
      console.error('❌ [IPN] El payload no contiene un "transactionId".');
      return NextResponse.json({ error: 'Payload no contiene transactionId' }, { status: 200 });
    }
     console.log(`➡️ [IPN] Procesando transacción: ${transactionId}`);

    // 4. Determinar si el pago fue exitoso
    const isSuccess = code === '00';
    
    console.log(`ℹ️ [IPN] Estado del pago para ${transactionId}: ${isSuccess ? 'Exitoso' : 'No Exitoso'} (Código: ${code}, Mensaje: "${statusMessage}")`);

    // 5. Procesar la orden
    if (isSuccess) {
      console.log(`⏳ [IPN] Actualizando orden para la transacción ${transactionId}...`);
      const result = await updateOrderByTransactionId(transactionId);
      
      if (result.success) {
        console.log(`✅ [IPN] Orden actualizada exitosamente para la transacción ${transactionId}.`);
      } else {
        console.error(`🚨 [IPN] ERROR DE LÓGICA: No se pudo actualizar la orden para la transacción ${transactionId}. Razón: ${result.error}`);
      }
    } else {
      console.log(`ℹ️ [IPN] La transacción ${transactionId} no fue exitosa. No se realizarán cambios.`);
    }

    // 6. Responder 200 OK
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    console.log(`✅ [IPN] Procesamiento finalizado para ${transactionId} en ${duration}ms. Respondiendo HTTP 200.`);
    
    return NextResponse.json({
      success: true,
      processed: isSuccess,
      message: 'Notificación recibida y procesada.'
    }, { status: 200 });

  } catch (error) {
    // 7. Manejo de errores catastróficos
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    console.error(`🔥🔥🔥 [IPN] ERROR CATASTRÓFICO en el webhook. Duración: ${duration}ms.`);
    handleError(error);
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      message: 'Error interno al procesar la notificación.'
    }, { status: 200 });
  }
}