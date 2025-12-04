'use client';

import { useState, useEffect } from 'react';

interface IzipaySDKFormProps {
  eventId: string;
  eventName: string;
  amount: number;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    Izipay: any;
    izi: any;
  }
}

export default function IzipaySDKForm({
  eventId,
  eventName,
  amount,
  buyerId,
  buyerName,
  buyerEmail,
  onSuccess,
  onError
}: IzipaySDKFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Función para generar un orderNumber válido
  const generateValidOrderNumber = (baseId: string): string => {
    // Asegurarnos de que el orderNumber tenga entre 5 y 15 caracteres
    let cleanId = baseId.replace(/[^a-zA-Z0-9]/g, ''); // Eliminar caracteres no alfanuméricos
    
    // Crear un orderNumber con prefijo "ORD" y solo los primeros caracteres necesarios del ID
    let orderNumber = "ORD" + cleanId.substring(0, 12); // "ORD" + 12 caracteres = 15 caracteres máximo
    
    // Asegurarnos de que tenga al menos 5 caracteres
    if (orderNumber.length < 5) {
      orderNumber = orderNumber.padEnd(5, '0');
    }
    
    // Asegurarnos de que no exceda 15 caracteres
    if (orderNumber.length > 15) {
      orderNumber = orderNumber.substring(0, 15);
    }
    
    return orderNumber;
  };

  // Cargar el script del SDK de Izipay
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sandbox-checkout.izipay.pe/payments/v1/js/index.js'; // Script del ejemplo
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
      console.log('SDK de Izipay cargado correctamente');
    };
    script.onerror = () => {
      setError('Error al cargar el SDK de Izipay');
      console.error('Error al cargar el SDK de Izipay');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Función para obtener el token de sesión y preparar la orden
  const prepareOrderAndGetToken = async (): Promise<{ sessionToken: string; orderNumber: string; izipayTransactionId: string } | null> => {
    try {
      const response = await fetch('/api/prepare-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
          buyerId: buyerId,
          quantity: 1, // Asumimos cantidad 1 por ahora, esto debería ser un prop
          totalAmount: amount.toString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al preparar la orden');
      }

      const data = await response.json();
      return { sessionToken: data.sessionToken, orderNumber: data.orderNumber, izipayTransactionId: data.izipayTransactionId };
    } catch (err) {
      console.error('Error en prepareOrderAndGetToken:', err);
      throw err;
    }
  };

  // Función para inicializar el formulario de Izipay
  const initializeIzipayForm = async () => {
    if (!isScriptLoaded) {
      setError('SDK de Izipay no cargado');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Preparar orden y obtener token de sesión
      const sessionData = await prepareOrderAndGetToken();
      
      if (!sessionData) {
        throw new Error('No se pudo obtener el token de sesión');
      }

      const { sessionToken, orderNumber, izipayTransactionId } = sessionData;

      const nameParts = buyerName.split(' ');
      const firstName = nameParts[0] || 'Cliente';
      const lastName = nameParts.slice(1).join(' ') || 'TicketiHub';

      const iziConfig = {
        publicKey: process.env.NEXT_PUBLIC_IZIPAY_PUBLIC_KEY || 'VErethUtraQuxas57wuMuquprADrAHAb',
        config: {
          transactionId: izipayTransactionId, // USAR EL MISMO ID DE LA API
          action: 'pay',
          merchantCode: process.env.NEXT_PUBLIC_IZIPAY_MERCHANT_CODE || '4004353',
          order: {
            orderNumber: orderNumber,
            currency: process.env.NEXT_PUBLIC_IZIPAY_CURRENCY || 'PEN',
            amount: amount.toFixed(2),
            payMethod: "CARD,QR,YAPE_CODE,PAGO_PUSH" ,
            processType: 'AT',
            merchantBuyerId: buyerId || 'buyer_' + Date.now(),
            dateTimeTransaction: (Date.now().toString() + '000'),
          },

          card: {
            brand: "",
            pan: "",
          },
                billing: {
                  firstName: firstName, // Tu variable
                  lastName: lastName, // Tu variable
                  email: buyerEmail.trim(), // Tu variable
                  phoneNumber: '943541279',
                  street: 'calle de pruebas',
                  city: 'lima',
                  state: 'lima',
                  country: 'PE',
                  postalCode: '00001',
                  document: '70155398',
                  documentType: 'DNI',
                },          render: {
            typeForm: window.Izipay.enums.typeForm.POP_UP,
            container: '#izipay-payment-form',
          },
          urlRedirect: `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
          appearance: {
            logo: 'https://demo-izipay.azureedge.net/test/img/millasb.svg',
          },
        },
      };

      console.log("Izipay Config:", JSON.stringify(iziConfig, null, 2));
      const izi = new window.Izipay(iziConfig);
      window.izi = izi;

      const callbackResponsePayment = (response: any) => {
        console.log('--- CALLBACK INICIADO ---');
        console.log('Respuesta de Izipay:', response);
        const responseCode = response.code;

        if (responseCode === '00') {
          console.log('¡PAGO EXITOSO! Llamando a onSuccess()...');
          if (onSuccess) {
            onSuccess(); // Llama al prop onSuccess
          }
        } else {
          const errorMessage = `Código: ${responseCode}, Mensaje: ${response.message}`;
          console.log(`Pago fallido o cancelado. ${errorMessage}`);
          if (onError) {
            onError(errorMessage); // Llama al prop onError
          }
        }
      };

      if (izi && typeof izi.LoadForm === 'function') {
        izi.LoadForm({
          authorization: sessionToken,
          keyRSA: process.env.NEXT_PUBLIC_IZIPAY_RSA_KEY,
          callbackResponse: callbackResponsePayment
        });
      } else {
        throw new Error('No se pudo inicializar el formulario de Izipay');
      }

    } catch (err) {
      console.error('Error al inicializar Izipay:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al procesar el pago';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await initializeIzipayForm();
  };

  return (
    <div className="izipay-form-container">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          disabled={isLoading || !isScriptLoaded}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
          ) : (
            `Pagar S/. ${amount.toFixed(2)} con Izipay`
          )}
        </button>
      </form>

      {/* Contenedor para el formulario embebido de Izipay */}
      <div id="izipay-payment-form" className="mt-6"></div>

      {!isScriptLoaded && (
        <div className="mt-4 text-center text-gray-500">
          Cargando SDK de Izipay...
        </div>
      )}
    </div>
  );
}