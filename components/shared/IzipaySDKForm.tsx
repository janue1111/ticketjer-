'use client';

import { useState, useEffect } from 'react';
import { BillingDetails } from './BillingForm'; // Importar el tipo

interface IzipaySDKFormProps {
  eventId: string;
  eventName: string;
  amount: number;
  buyerId: string;
  quantity: number; // 🔥 NUEVA PROP para cantidad de entradas
  billingDetails: BillingDetails;
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
  quantity, // 🔥 Recibir quantity como prop
  billingDetails,
  onSuccess,
  onError
}: IzipaySDKFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Función para generar un orderNumber válido
  const generateValidOrderNumber = (baseId: string): string => {
    let cleanId = baseId.replace(/[^a-zA-Z0-9]/g, '');
    let orderNumber = "ORD" + cleanId.substring(0, 12);
    if (orderNumber.length < 5) {
      orderNumber = orderNumber.padEnd(5, '0');
    }
    if (orderNumber.length > 15) {
      orderNumber = orderNumber.substring(0, 15);
    }
    return orderNumber;
  };

  // Cargar el script del SDK de Izipay
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.izipay.pe/payments/v1/js/index.js';
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
      console.log('DEBUG: SDK de Izipay cargado correctamente.');
    };
    script.onerror = () => {
      setError('Error al cargar el SDK de Izipay');
      console.error('DEBUG: Error al cargar el SDK de Izipay.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Función para obtener el token de sesión y preparar la orden
  const prepareOrderAndGetToken = async (): Promise<{ sessionToken: string; orderNumber: string; izipayTransactionId: string } | null> => {
    try {
      console.log('DEBUG: Iniciando prepareOrderAndGetToken...');
      const response = await fetch('/api/prepare-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
          buyerId: buyerId,
          quantity: quantity, // 🔥 Usar la prop en lugar de hardcodear 1
          totalAmount: amount.toString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al preparar la orden');
      }

      const data = await response.json();
      console.log('DEBUG: Orden preparada exitosamente.', data);
      return { sessionToken: data.sessionToken, orderNumber: data.orderNumber, izipayTransactionId: data.izipayTransactionId };
    } catch (err) {
      console.error('DEBUG: Error en prepareOrderAndGetToken:', err);
      throw err;
    }
  };

  // Función para inicializar el formulario de Izipay
  const initializeIzipayForm = async () => {
    console.log('DEBUG: 1. Iniciando initializeIzipayForm...');
    if (!isScriptLoaded) {
      setError('SDK de Izipay no cargado');
      console.error('DEBUG: initializeIzipayForm falló porque el SDK no está cargado.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('DEBUG: 2. Obteniendo token de sesión...');
      const sessionData = await prepareOrderAndGetToken();

      if (!sessionData) {
        throw new Error('No se pudo obtener el token de sesión');
      }

      console.log('DEBUG: 3. Token de sesión obtenido:', sessionData);
      const { sessionToken, orderNumber, izipayTransactionId } = sessionData;

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      console.log('DEBUG: URL base configurada:', appUrl, '(Origen: ' + (process.env.NEXT_PUBLIC_APP_URL ? 'ENV' : 'window.location') + ')');

      const iziConfig = {
        publicKey: process.env.NEXT_PUBLIC_IZIPAY_PUBLIC_KEY || 'VErethUtraQuxas57wuMuquprADrAHAb',
        config: {
          transactionId: izipayTransactionId,
          action: 'pay',
          merchantCode: process.env.NEXT_PUBLIC_IZIPAY_MERCHANT_CODE || '4004353',
          order: {
            orderNumber: orderNumber,
            currency: process.env.NEXT_PUBLIC_IZIPAY_CURRENCY || 'PEN',
            amount: amount.toFixed(2),
            payMethod: "CARD,QR,YAPE_CODE,PAGO_PUSH",
            processType: 'AT',
            merchantBuyerId: buyerId || 'buyer_' + Date.now(),
            dateTimeTransaction: (Date.now().toString() + '000'),
          },
          urlIPN: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/api/webhook/izipay`,
          // urlIPN: "https://webhook.site/d8360467-a27d-43fa-b7c8-3d38f399bf0e", // PRUEBA AISLAMIENTO
          card: {
            brand: "",
            pan: "",
          },
          billing: {
            firstName: billingDetails.firstName,
            lastName: billingDetails.lastName,
            email: billingDetails.email.trim(),
            phoneNumber: billingDetails.phoneNumber,
            street: billingDetails.street,
            city: billingDetails.city,
            state: billingDetails.state,
            country: billingDetails.country,
            postalCode: billingDetails.postalCode,
            document: billingDetails.document,
            documentType: billingDetails.documentType,
          },
          render: {
            typeForm: window.Izipay.enums.typeForm.POP_UP,
            container: '#izipay-payment-form',
          },
          appearance: {
            logo: 'https://demo-izipay.azureedge.net/test/img/millasb.svg',
          },
        },
      };

      console.log("DEBUG: 4. Configuración de Izipay preparada:", JSON.stringify(iziConfig, null, 2));
      const izi = new window.Izipay(iziConfig);
      window.izi = izi;

      const callbackResponsePayment = (response: any) => {
        console.log('--- DEBUG: [INICIO] CALLBACK DE IZIPAY INVOCADO ---');
        console.log('--- DEBUG: RESPUESTA COMPLETA DE IZIPAY:', JSON.stringify(response, null, 2));

        const responseCode = response.code;
        const transactionId = response.transactionId;

        if (responseCode === '00' && transactionId) {
          console.log(`--- DEBUG: ¡PAGO EXITOSO! Código: ${responseCode}, TransactionID: ${transactionId}. Redirigiendo...`);
          setTimeout(() => {
            window.location.href = `/success?transactionId=${transactionId}`;
          }, 50);
        } else if (responseCode === '021') {
          // Código 021: Cancelación por el usuario (cerró el modal). No es un error crítico.
          console.warn(`--- INFO: Usuario canceló el pago. Código: ${responseCode}`);
          // No llamamos a onError para evitar redirigir a page de error, solo dejamos que intente de nuevo.
        } else {
          const errorMessage = `Código: ${responseCode}, Mensaje: ${response.message}, TransactionID: ${transactionId}`;
          console.error(`--- DEBUG: Pago fallido, cancelado o respuesta inesperada. ${errorMessage}`);
          if (onError) {
            onError(errorMessage);
          }
          alert(`El pago no pudo ser completado. Razón: ${response.message || 'Error desconocido'}. Por favor, intente de nuevo.`);
        }
        console.log('--- DEBUG: [FIN] CALLBACK DE IZIPAY ---');
      };

      if (izi && typeof izi.LoadForm === 'function') {
        console.log('DEBUG: 5. Llamando a izi.LoadForm()...');
        izi.LoadForm({
          authorization: sessionToken,
          keyRSA: process.env.NEXT_PUBLIC_IZIPAY_RSA_KEY,
          callbackResponse: callbackResponsePayment
        });
      } else {
        throw new Error('No se pudo inicializar el formulario de Izipay (izi.LoadForm no es una función)');
      }

    } catch (err) {
      console.error('DEBUG: Error final en initializeIzipayForm:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al procesar el pago';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('DEBUG: Botón de pago presionado. Llamando a initializeIzipayForm...');

    // Disparar evento de GA4 cuando el usuario hace clic en "Pagar"
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'add_payment_info',
      currency: 'PEN',
      value: amount,
      payment_type: 'Izipay SDK',
      items: [{
        item_id: eventId,
        item_name: eventName,
        price: amount / quantity, // Precio por unidad
        quantity: quantity, // 🔥 Cantidad real
      }],
    });

    await initializeIzipayForm();
  };

  return (
    <div className="izipay-form-container w-full max-w-md mx-auto">
      {/* Card Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header - Fucsia #D5006D */}
        <div className="px-6 py-4" style={{ backgroundColor: '#D5006D' }}>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Finalizar Compra
          </h2>
        </div>

        {/* Order Details */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Resumen del Pedido</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900 text-lg">{eventName}</p>
                <p className="text-sm text-gray-500">{quantity} {quantity === 1 ? 'entrada' : 'entradas'}</p>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total a pagar</span>
                <span className="text-2xl font-bold text-gray-900">S/. {amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Payment Button */}
        <div className="px-6 py-5">
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={isLoading || !isScriptLoaded}
              className="w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none text-lg text-white hover:brightness-110"
              style={{ backgroundColor: '#00BFA5' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : !isScriptLoaded ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Pagar S/. {amount.toFixed(2)}
                </span>
              )}
            </button>
          </form>

          {/* Trust Signals */}
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Pago procesado de forma segura por <strong className="text-gray-700">Izipay</strong></span>
          </div>

          {/* Payment Methods */}
          <div className="mt-4 flex items-center justify-center gap-3 opacity-60">
            <img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mc_symbol_opt_73_1x.png" alt="Mastercard" className="h-6 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-4 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 object-contain" />
          </div>
        </div>
      </div>

      {/* Contenedor para el formulario embebido de Izipay */}
      <div id="izipay-payment-form" className="mt-6"></div>
    </div>
  );
}