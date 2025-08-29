import React from 'react';

const RejectedPaymentPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Pago Rechazado</h1>
        <p className="text-lg">
          Tu pago no pudo ser procesado. Por favor, intenta nuevamente con otro medio de pago o contacta a tu banco.
        </p>
      </div>
    </main>
  );
};

export default RejectedPaymentPage;
