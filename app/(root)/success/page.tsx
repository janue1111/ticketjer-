'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { updateOrderByTransactionId } from '@/lib/actions';
import QRCode from 'react-qr-code';

// Declaración global para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}


const SuccessPage = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  const [status, setStatus] = useState('confirming'); // 'confirming', 'success', 'error'
  const [error, setError] = useState('');

  useEffect(() => {
    const confirmOrder = async () => {
      if (transactionId) {
        try {
          const result = await updateOrderByTransactionId(transactionId);
          if (result.success) {
            setStatus('success');

            // 🎉 Disparar evento purchase al DataLayer
            // Estructura específica para Facebook Pixel y GTM
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'purchase',
              // IMPORTANTE: Datos en la raíz para facilitar GTM
              transaction_id: transactionId, // ID único de Izipay (Vital para deduplicar)
              value: result.order?.totalAmount || 0,
              currency: 'PEN',

              // Datos del Usuario (Vital para Facebook Advanced Matching)
              user_data: {
                email: result.order?.buyer?.email || '',
                phone_number: result.order?.buyer?.phone || '', // Si lo tienes
                address: {
                  first_name: result.order?.buyer?.firstName || '',
                  last_name: result.order?.buyer?.lastName || '',
                  city: "Lima", // O el dato real si lo tienes
                  country: "PE"
                }
              },

              // Array de productos
              items: [{
                item_id: result.order?.event?._id || '',
                item_name: result.order?.event?.title || 'Evento',
                item_category: result.order?.event?.category?.name || "concierto", // O la categoría real
                price: result.order?.totalAmount || 0,
                quantity: result.order?.quantity || 1
              }]
            });

            console.log('✅ Evento purchase enviado al DataLayer:', transactionId);
          } else {
            setStatus('error');
            setError(result.error || 'No se pudo confirmar la orden.');
          }
        } catch (e) {
          setStatus('error');
          setError(e instanceof Error ? e.message : 'Ocurrió un error inesperado.');
        }
      } else {
        setStatus('error');
        setError('No se encontró un ID de transacción.');
      }
    };

    confirmOrder();
  }, [transactionId]);

  return (
    <section className="wrapper">
      {status === 'confirming' && (
        <>
          <h1>Confirmando tu pedido...</h1>
          <p>Por favor, espera un momento mientras procesamos la confirmación.</p>
        </>
      )}
      {status === 'success' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu entrada para Armonía 10 ha sido procesada con éxito y tu pedido ha sido confirmado.</p>

          <div style={{ margin: '20px 0', background: 'white', padding: '16px', borderRadius: '8px' }}>
            <QRCode value={transactionId ?? ''} />
          </div>
          <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>Presenta este código en la entrada</p>

          <p>
            Para ingresar al evento, solo necesitas presentar este código o tu DNI en la puerta.
            Si tienes alguna consulta, contáctanos por WhatsApp.
          </p>
          <a href="https://wa.me/51957846321" target="_blank" rel="noopener noreferrer" className="button">
            Contactar por WhatsApp
          </a>
        </div>
      )}
      {status === 'error' && (
        <>
          <h1>Hubo un problema al confirmar tu pedido</h1>
          <p>Error: {error}</p>
          <p>Por favor, contáctanos por WhatsApp con tu ID de transacción para ayudarte: <strong>{transactionId}</strong></p>
          <a href="https://wa.me/51957846321" target="_blank" rel="noopener noreferrer" className="button">
            Contactar por WhatsApp
          </a>
        </>
      )}
    </section>
  );
};

export default SuccessPage;
