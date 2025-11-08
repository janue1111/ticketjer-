import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import https from 'https';

// Definir tipos para los datos
interface TokenRequest {
  orderNumber: string;
  amount: number;
  currency?: string;
  merchantCode?: string;
  publicKey?: string;
}

interface IzipayTokenResponse {
  Code: string;
  Message: string;
  Response: {
    Token: string;
  };
}

// Función para generar un transactionId único (siguiendo el patrón del ejemplo)
function generateTransactionId(): string {
  // Generar un transactionId similar al del ejemplo
  const currentTimeUnix = Math.floor(Date.now()) * 1000;
  return currentTimeUnix.toString().slice(0, 14);
}

export async function POST(request: Request) {
  try {
    // Obtener datos del cuerpo de la solicitud
    const body: TokenRequest = await request.json();
    
    console.log('Cuerpo de la solicitud recibida:', JSON.stringify(body, null, 2));
    
    // Validar datos requeridos
    if (!body.orderNumber || !body.amount) {
      return NextResponse.json(
        { error: 'orderNumber y amount son requeridos' }, 
        { status: 400 }
      );
    }

    // Validar que orderNumber tenga entre 5 y 15 caracteres
    if (body.orderNumber.length < 5 || body.orderNumber.length > 15) {
      return NextResponse.json(
        { error: 'orderNumber debe tener entre 5 y 15 caracteres' }, 
        { status: 400 }
      );
    }

    // Generar transactionId único (similar al ejemplo)
    const transactionId = generateTransactionId();
    
    // Usar valores de entorno o valores por defecto
    const merchantCode = process.env.IZIPAY_MERCHANT_CODE || '4004353';
    const publicKey = process.env.IZIPAY_PUBLIC_KEY || 'VErethUtraQuxas57wuMuquprADrAHAb';
    const currency = body.currency || process.env.IZIPAY_CURRENCY || 'PEN';
    
    // Verificar que las credenciales estén configuradas
    if (!merchantCode || !publicKey) {
      console.error('Credenciales de Izipay no configuradas correctamente');
      return NextResponse.json(
        { error: 'Credenciales de Izipay no configuradas' }, 
        { status: 500 }
      );
    }
    
    // Usar la URL de sandbox de la documentación
    const apiUrl = 'https://sandbox-api-pw.izipay.pe/security/v1/Token/Generate';

    // Preparar datos para la solicitud a Izipay (usando el formato exacto del ejemplo del repositorio)
    const izipayRequestBody = {
      requestSource: "ECOMMERCE",
      merchantCode: merchantCode,
      orderNumber: body.orderNumber,
      publicKey: publicKey,
      amount: body.amount.toFixed(2) // Asegurar formato con 2 decimales
    };

    console.log('Enviando solicitud a Izipay:', JSON.stringify(izipayRequestBody, null, 2));
    console.log('URL de la API:', apiUrl);
    console.log('Transaction ID:', transactionId);
    console.log('MERCHANT_CODE:', merchantCode);
    console.log('PUBLIC_KEY:', publicKey);
    console.log('CURRENCY:', currency);

    // Helper function to make HTTPS requests
    const makeHttpRequest = (options: https.RequestOptions, postData: string): Promise<any> => {
      return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            console.log('Respuesta de la API de Izipay:', res.statusCode, res.statusMessage);
            console.log('Contenido de la respuesta:', data);
            try {
              const izipayResponse = JSON.parse(data);
              resolve(izipayResponse);
            } catch (parseError) {
              reject({ error: 'Error al parsear la respuesta de Izipay', details: data });
            }
          });
        });

        req.on('error', (error) => {
          reject({ error: 'Error de Izipay API', details: error.message });
        });

        req.write(postData);
        req.end();
      });
    };

    const postData = JSON.stringify(izipayRequestBody);

    const options = {
      hostname: 'sandbox-api-pw.izipay.pe', // Corregido al host de sandbox
      port: 443,
      path: '/security/v1/Token/Generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'transactionId': transactionId,
      },
    };

    const izipayResponse = await makeHttpRequest(options, postData);

    console.log('Respuesta de Izipay:', JSON.stringify(izipayResponse, null, 2));

    // Verificar si la respuesta fue exitosa (usando 'code' en minúsculas)
    if (izipayResponse.code !== '00') {
      return NextResponse.json(
        { error: 'Error al generar token', message: izipayResponse.message },
        { status: 400 }
      );
    }

    // Devolver el token y el transactionId generados
    return NextResponse.json({
      response: {
        token: izipayResponse.response.token,
        transactionId: transactionId
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error en el endpoint de generación de token:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}