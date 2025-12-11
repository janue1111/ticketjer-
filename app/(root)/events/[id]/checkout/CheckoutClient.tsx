'use client'

import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import { Input } from "@/components/ui/input";
import IzipaySDKForm from "@/components/shared/IzipaySDKForm";
import { useUser } from "@clerk/nextjs";
import BillingForm, { BillingDetails } from "@/components/shared/BillingForm";

const CheckoutClient = ({ event, userId }: { event: IEvent; userId: string }) => {
  const { user } = useUser();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Nuevos estados para el flujo de facturación
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);

  const activePhase = event.pricingPhases?.find((phase) => phase.active);
  const prices = activePhase?.tiers?.map((tier) => Number(tier.price)).filter((p) => !Number.isNaN(p)) || [];
  const lowestPrice: number | null = prices.length > 0 ? Math.min(...prices) : null;

  const handleProceedToBilling = () => {
    handleBeginCheckoutClick();
    setShowBillingForm(true);
  };
  
  const handleBillingSubmit = (data: BillingDetails) => {
    setBillingDetails(data);
    setShowBillingForm(false); // Ocultar el formulario de facturación
  };


  const handleBeginCheckoutClick = useCallback(() => {
    const unitPrice = lowestPrice ?? 0;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'begin_checkout',
      currency: 'PEN',
      value: unitPrice * quantity,
      items: [{
        item_id: event._id,
        item_name: event.title,
        item_category: event.category?.name,
        price: unitPrice,
        quantity: quantity,
      }],
    });
  }, [event, quantity, lowestPrice]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // Si ya tenemos los detalles de facturación, mostramos el IzipaySDKForm
  if (billingDetails) {
    const amount = (lowestPrice ?? 0) * quantity;
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Paso 3: Realizar Pago</h3>
        <p className="mb-4 text-gray-600">Estás a punto de pagar S/. {amount.toFixed(2)} por {quantity} entrada(s). Haz clic en el botón para completar tu compra.</p>
        <IzipaySDKForm
          eventId={event._id.toString()}
          eventName={event.title}
          amount={amount}
          buyerId={userId}
          // Pasamos todos los detalles de facturación al componente
          billingDetails={billingDetails}
          onSuccess={() => {
            console.log('CheckoutClient: onSuccess ¡Redirigiendo a /success!');
            router.push('/success');
          }}
          onError={(error: string) => {
            console.error('CheckoutClient: onError', error);
            router.push('/pago-rechazado');
          }}
        />
      </div>
    );
  }

  // Si el usuario ha decidido proceder, mostramos el formulario de facturación
  if (showBillingForm) {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Paso 2: Completa tus Datos</h3>
            <BillingForm 
                onSubmit={handleBillingSubmit}
                isProcessing={isProcessing}
            />
        </div>
    )
  }

  // Estado inicial: selección de cantidad
  return (
    <div>
        <h3 className="text-lg font-semibold mb-4">Paso 1: Selecciona la Cantidad</h3>
        <div className="flex items-center gap-3">
            <p className="whitespace-nowrap">Cantidad:</p>
            <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20 text-center rounded-md"
            disabled={isProcessing}
            min="1"
            />
        </div>
        <div className="mt-4 text-xl font-bold">
            Total: S/. {((lowestPrice ?? 0) * quantity).toFixed(2)}
        </div>

        <div className="payment-options-container flex flex-col sm:flex-row items-center gap-3 mt-6">
            <Button
            onClick={handleProceedToBilling}
            size="lg"
            className="button w-full sm:w-fit rounded-full bg-red-600 hover:bg-red-700 text-white"
            disabled={isProcessing}
            >
            {isProcessing ? 'Procesando...' : 'Continuar'}
            </Button>
        </div>
        {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
    </div>
  );
};

export default CheckoutClient;