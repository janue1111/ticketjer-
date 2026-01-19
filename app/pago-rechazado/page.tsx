import React from 'react';
import Link from 'next/link';
import { XCircle, ArrowLeft, MessageCircle } from 'lucide-react';

const RejectedPaymentPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Card Container */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Pago no Procesado
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Hubo un inconveniente con tu transacción. No te preocupes, no se ha realizado ningún cargo.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Button - Retry */}
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Intentar
          </Link>

          {/* Secondary Button - Support */}
          <a
            href="https://wa.me/51992748352?text=Hola,%20tuve%20un%20problema%20con%20mi%20pago"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out"
          >
            <MessageCircle className="h-5 w-5" />
            Contactar Soporte
          </a>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-gray-400 mt-6">
          Si el problema persiste, puedes contactarnos por WhatsApp y te ayudaremos a completar tu compra.
        </p>
      </div>
    </main>
  );
};

export default RejectedPaymentPage;
