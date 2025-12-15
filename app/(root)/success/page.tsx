'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { updateOrderByTransactionId } from '@/lib/actions';

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
        <>
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu entrada para Armonía 10 ha sido procesada con éxito y tu pedido ha sido confirmado.</p>
          <p>
            Para ingresar al evento, solo necesitas presentar tu DNI en la puerta. 
            Si tienes alguna consulta, contáctanos por WhatsApp.
          </p>
          <a href="https://wa.me/51957846321" target="_blank" rel="noopener noreferrer" className="button">
            Contactar por WhatsApp
          </a>
        </>
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
