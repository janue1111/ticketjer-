
import { NextResponse } from 'next/server';
import https from 'https';
import { createOrder } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';

interface PrepareOrderRequest {
  eventId: string;
  buyerId: string;
  quantity: number;
  totalAmount: string;
}

export async function POST(request: Request) {
  try {
    const { eventId, buyerId, quantity, totalAmount }: PrepareOrderRequest = await request.json();

    // 1. Generar un ID de transacción único que se usará en ambos sistemas, respetando el límite de 15 caracteres de Izipay.
    const transactionId = `TXN${new (require('mongodb').ObjectId)().toString().slice(0, 12)}`;

    // LOG DE DIAGNÓSTICO PARA CONFIRMACIÓN
    console.log(`\n--- PRUEBA DE DIAGNÓSTICO ---`);
    console.log(`DEBUG: ID generado y guardado en BD (NUESTRO_ID): ${transactionId}`);
    console.log(`-----------------------------\n`);

    // 2. Crear la orden en la base de datos con estado 'pendiente' y el ID de transacción final
    const newOrder: IOrder = await createOrder({
      eventId,
      buyerId,
      quantity,
      totalAmount,
      transactionId: transactionId, // Usamos el ID de transacción consistente
      createdAt: new Date(),
      status: 'pending',
    });

    if (!newOrder) {
      throw new Error('No se pudo crear la orden en la base de datos.');
    }
    
    // 3. Preparar la solicitud para generar el token de sesión de Izipay
    const merchantCode = process.env.IZIPAY_MERCHANT_CODE || '4004353';
    const publicKey = process.env.IZIPAY_PUBLIC_KEY || 'VErethUtraQuxas57wuMuquprADrAHAb';
    const amountAsNumber = parseFloat(totalAmount);

    const izipayRequestBody = {
      requestSource: "ECOMMERCE",
      merchantCode: merchantCode,
      orderNumber: transactionId, // Usamos nuestro ID de transacción como orderNumber para consistencia
      publicKey: publicKey,
      amount: amountAsNumber.toFixed(2),
    };

    // Acción de Diagnóstico: Registrar el cuerpo de la petición
    console.log("--- Izipay API Call Trace ---");
    console.log("Request Body:", JSON.stringify(izipayRequestBody, null, 2));

    // 3. Realizar la llamada a la API de Izipay para obtener el token
    const postData = JSON.stringify(izipayRequestBody);
    const options = {
      hostname: 'sandbox-api-pw.izipay.pe',
      port: 443,
      path: '/security/v1/Token/Generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'transactionId': transactionId,
      },
    };

    const izipayResponse: any = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        // Acción de Diagnóstico: Registrar el código de estado
        console.log("Response Status Code:", res.statusCode);
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            // Acción de Diagnóstico: Registrar el cuerpo de la respuesta
            console.log("Response Body:", data);
            console.log("-----------------------------");
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      });
      req.on('error', reject);
      req.write(postData);
      req.end();
    });

    if (izipayResponse.code !== '00') {
      throw new Error(`Error de Izipay al generar token: ${izipayResponse.message}`);
    }

    // 4. Devolver el token de sesión y el ID de la transacción de Izipay al frontend
    return NextResponse.json({
      sessionToken: izipayResponse.response.token,
      izipayTransactionId: transactionId, // Usar el ID consistente
      orderNumber: transactionId, // Usar el ID consistente
    }, { status: 200 });

  } catch (error) {
    console.error('Error en prepare-order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
