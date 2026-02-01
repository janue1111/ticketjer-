'use client';

import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'next/navigation';

export default function TicketPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [orderData, setOrderData] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderAndTickets = async () => {
      try {
        // Obtener los tickets de la orden
        const ticketsResponse = await fetch(`/api/tickets/${orderId}`);
        const ticketsData = await ticketsResponse.json();

        if (ticketsData.success && ticketsData.tickets?.length > 0) {
          setTickets(ticketsData.tickets);
        } else {
          setError('No se encontraron tickets para esta orden');
        }

        // Obtener los datos de la orden
        const orderResponse = await fetch(`/api/orders/${orderId}`);
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          setOrderData(orderData);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error al obtener tickets:', err);
        setError('Error al cargar los tickets');
        setLoading(false);
      }
    };

    fetchOrderAndTickets();
  }, [orderId]);

  // Navegación del carousel
  const nextTicket = () => {
    setCurrentTicketIndex((prev) => (prev + 1) % tickets.length);
  };

  const prevTicket = () => {
    setCurrentTicketIndex((prev) => (prev - 1 + tickets.length) % tickets.length);
  };

  if (loading) {
    return (
      <section className="wrapper my-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mb-6"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cargando tus entradas...</h1>
        </div>
      </section>
    );
  }

  if (error || tickets.length === 0) {
    return (
      <section className="wrapper my-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-red-200 overflow-hidden">
            <div className="bg-red-500 text-center py-8 px-6">
              <h1 className="text-3xl font-bold text-white mb-2">No se encontraron entradas</h1>
            </div>
            <div className="p-8 text-center">
              <p className="text-red-600 mb-4 font-semibold">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wrapper my-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header con check de éxito */}
          <div className="text-center pt-10 pb-6 px-6" style={{ backgroundColor: '#00BFA5' }}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
              ¡Compra Exitosa!
            </h1>
            <p className="text-white/95 text-lg md:text-xl">
              {tickets.length === 1 ? 'Tu entrada ha sido confirmada' : 'Tus entradas han sido confirmadas'}
            </p>
          </div>

          {/* Contenido */}
          <div className="p-8 md:p-12">
            {/* Nombre del evento */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-sm uppercase tracking-wide mb-2">
                {tickets.length === 1 ? 'Entrada para' : 'Entradas para'}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {orderData?.event?.title || 'Tu Evento'}
              </h2>
              <p className="text-gray-600 text-lg">
                {tickets.length} {tickets.length === 1 ? 'entrada' : 'entradas'}
              </p>
            </div>

            {/* Aviso IMPORTANTE para múltiples entradas */}
            {tickets.length > 1 && (
              <div className="bg-yellow-50 border-3 border-yellow-400 rounded-xl p-5 mb-8 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-yellow-900 text-lg mb-1">⚠️ IMPORTANTE</p>
                    <p className="text-yellow-800 font-medium">
                      Compraste <span className="font-bold">{tickets.length} entradas</span>.
                      Usa las flechas grandes para ver todos tus códigos QR.
                      Cada entrada tiene su propio código único.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* QR Code Carousel */}
            <div className="flex flex-col items-center mb-8">
              {/* Indicador de ticket actual */}
              <div className="mb-4">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">
                  Entrada {currentTicketIndex + 1} de {tickets.length}
                </span>
              </div>

              {/* Carousel Container */}
              <div className="relative w-full max-w-sm">
                {/* Botón Anterior - MUY VISIBLE */}
                {tickets.length > 1 && (
                  <button
                    onClick={prevTicket}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 
                      w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl 
                      flex items-center justify-center
                      transition-all duration-300 hover:scale-110 hover:shadow-xl
                      border-4 border-white"
                    style={{ backgroundColor: '#D5006D' }}
                    aria-label="Ticket anterior"
                  >
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* QR Code */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-4 border-gray-100">
                  <QRCode value={tickets[currentTicketIndex]?.ticketId || ''} size={220} />
                </div>

                {/* Botón Siguiente - MUY VISIBLE */}
                {tickets.length > 1 && (
                  <button
                    onClick={nextTicket}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 
                      w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl 
                      flex items-center justify-center
                      transition-all duration-300 hover:scale-110 hover:shadow-xl
                      border-4 border-white"
                    style={{ backgroundColor: '#D5006D' }}
                    aria-label="Siguiente ticket"
                  >
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Indicadores de puntos */}
              {tickets.length > 1 && (
                <div className="flex gap-2 mt-6">
                  {tickets.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTicketIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${index === currentTicketIndex
                        ? 'w-8'
                        : 'opacity-50 hover:opacity-75'
                        }`}
                      style={{ backgroundColor: '#D5006D' }}
                      aria-label={`Ir a entrada ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              <p className="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-2">
                Presenta este código en la entrada
              </p>
              <p className="text-gray-600 text-center max-w-md">
                Para ingresar al evento, solo necesitas presentar este código o tu DNI en la puerta.
              </p>
            </div>

            {/* ID de ticket */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
              <p className="text-sm text-gray-500 mb-1">ID de Ticket</p>
              <p className="font-mono text-xs md:text-sm text-gray-900 font-semibold break-all">
                {tickets[currentTicketIndex]?.ticketId}
              </p>
            </div>

            {/* Botón de WhatsApp */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">¿Tienes alguna consulta?</p>
              <a
                href="https://wa.me/51992748352"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
