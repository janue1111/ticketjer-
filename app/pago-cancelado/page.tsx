import React from 'react';

const CanceledPaymentPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Pago Cancelado</h1>
        <p className="text-lg">
          Has cancelado el proceso de pago. Tu compra no ha sido completada y no se ha realizado ningún cargo.
        </p>
      </div>
    </main>
  );
};

export default CanceledPaymentPage;
