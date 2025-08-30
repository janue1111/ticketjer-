import QRCode from 'react-qr-code';
import { auth } from '@clerk/nextjs/server';
import { getOrderById } from '@/lib/actions/order.actions';
import { redirect } from 'next/navigation';
import React from 'react';

const TicketPage = async ({ params }: { params: { orderId: string } }) => {
  const { orderId } = params;
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  if (!userId) {
    redirect('/');
    return null;
  }

  const order = await getOrderById(orderId);

  if (!order) {
    // Opcional: podrías redirigir a una página de "no encontrado"
    redirect('/');
    return null;
  }

  if (order.buyer._id.toString() !== userId) {
    // Medida de seguridad: un usuario no puede ver el ticket de otro
    redirect('/');
    return null;
  }

  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <div className="wrapper flex items-center justify-center">
        {order.status === 'completed' ? (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="h2-bold text-green-600">¡Compra Exitosa!</h2>
            <p className="text-gray-600 mt-2 mb-6">Presenta este QR en la entrada del evento.</p>
            <div style={{ background: 'white', padding: '16px' }}>
              <QRCode value={order._id} size={256} />
            </div>
            <div className="mt-6 text-left">
              <h3 className="h3-bold">{order.event.title}</h3>
              <p className="text-gray-700 mt-2"><strong>Comprador:</strong> {order.buyer.firstName} {order.buyer.lastName}</p>
              <p className="text-gray-700"><strong>Fecha del Evento:</strong> {new Date(order.event.startDateTime).toLocaleDateString()}</p>
              <p className="text-gray-700"><strong>Total Pagado:</strong> S/ {(order.totalAmount / 100).toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="h2-bold text-amber-600">Pago en Procesamiento</h2>
            <p className="text-gray-600 mt-4">
              Estamos esperando la confirmación final de la pasarela de pago.
              Por favor, refresca esta página en unos momentos. Si el problema persiste después de unos minutos, contacta a soporte.
            </p>
            <p className="text-gray-500 text-sm mt-4">ID de Orden: {order._id}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TicketPage;
