'use client';

import { useEffect, useState } from 'react';

const SuccessPage = () => {
  const [orderInfo, setOrderInfo] = useState<{ eventTitle?: string } | null>(null);

  useEffect(() => {
    // Obtener información de la orden del localStorage o de los parámetros de la URL
    const storedOrderInfo = localStorage.getItem('pendingOrderInfo');
    if (storedOrderInfo) {
      try {
        setOrderInfo(JSON.parse(storedOrderInfo));
        // Limpiar después de usar
        localStorage.removeItem('pendingOrderInfo');
      } catch (e) {
        console.error('Error parsing order info', e);
      }
    }
  }, []);

  return (
    <section className="wrapper">
      <h1 className="text-2xl font-bold mb-4">¡Gracias por tu compra!</h1>
      <p className="mb-4">
        {orderInfo?.eventTitle 
          ? `Tu entrada para ${orderInfo.eventTitle} ha sido procesada con éxito.`
          : 'Tu pedido ha sido procesado con éxito.'}
      </p>
      <p className="mb-4">
        Para ingresar al evento, solo necesitas presentar tu DNI en la puerta. 
        Si tienes alguna consulta, contáctanos por WhatsApp.
      </p>
      <a 
        href="https://wa.me/TUNUMERODEWHATSAPP" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Contactar por WhatsApp
      </a>
    </section>
  );
};

export default SuccessPage;