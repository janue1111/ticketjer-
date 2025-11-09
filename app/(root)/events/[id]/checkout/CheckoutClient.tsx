'use client'

import { useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import { checkoutOrder } from "@/lib/actions/order.actions";
import { Input } from "@/components/ui/input";
import IzipayForm from "@/components/shared/IzipayForm";
import IzipaySDKForm from "@/components/shared/IzipaySDKForm";
import { useUser } from "@clerk/nextjs";

const CheckoutClient = ({ event, userId }: { event: IEvent; userId: string }) => {
  const { user } = useUser();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [izipayParams, setIzipayParams] = useState<{[key: string]: string | number} | null>(null);
  const [useNewIzipaySDK, setUseNewIzipaySDK] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const activePhase = event.pricingPhases?.find((phase) => phase.active);
  const prices = activePhase?.tiers?.map((tier) => Number(tier.price)).filter((p) => !Number.isNaN(p)) || [];
  const lowestPrice: number | null = prices.length > 0 ? Math.min(...prices) : null;
  const amountInCents = Math.round((lowestPrice ?? 0) * quantity * 100);

  const createCharge = async (tokenId: string) => {
    setPaymentError(null);
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenId: tokenId,
          eventId: event._id,
          amount: amountInCents,
          quantity: quantity,
          buyerId: userId,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'El pago no pudo ser procesado.');
      }

      const newOrder = await response.json();
      console.log('Orden creada en la BD:', newOrder);
      window.location.href = `/orders`;
    } catch (error: any) {
      console.error("Error in createCharge:", error);
      setPaymentError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const culqiHandler = () => {
      if (Culqi.token) {
        console.log('Token recibido:', Culqi.token.id);
        createCharge(Culqi.token.id);
      } else if (Culqi.error) {
        console.error('Error de Culqi:', Culqi.error);
        setPaymentError(Culqi.error.user_message || 'Ocurrió un error con Culqi.');
        setIsProcessing(false);
      } else {
        // User simply closed the modal
        setIsProcessing(false);
      }
    };

    window.culqi = culqiHandler;

    return () => {
      if (window.culqi === culqiHandler) {
        window.culqi = () => {};
      }
    };
  }, [event, quantity, userId, amountInCents]);

  const handleIzipayCheckout = async () => {
    setIsProcessing(true);
    setPaymentError(null);
    try {
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: String(lowestPrice ?? 0),
            isFree: (lowestPrice ?? 0) === 0,
            buyerId: userId,
            quantity: quantity,
        };
        const params = await checkoutOrder(order);
        setIzipayParams(params);
    } catch (error) {
        console.error("Error en Izipay Checkout:", error);
        setPaymentError("No se pudo iniciar el pago con Izipay.");
    } finally {
        // On Izipay, processing stops when the form is submitted and redirected
        // so we might not need to set isProcessing back to false here
    }
  };

  const handleIzipaySDKCheckout = () => {
    // Activar el uso del nuevo SDK de Izipay
    setUseNewIzipaySDK(true);
  };

  const handleCulqiPayment = async () => {
    setIsProcessing(true);
    setPaymentError(null);
    try {
      // --- PASO 1: Crear la Orden en nuestro backend --- 
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInCents,
          description: `Compra de entradas para: ${event.title}`,
          eventId: event._id,
          userEmail: user?.emailAddresses[0]?.emailAddress ?? 'no-email@example.com',
        }),
      });

      if (!orderResponse.ok) {
        const errorResult = await orderResponse.json();
        throw new Error(errorResult.message || 'No se pudo crear la orden de pago.');
      }
      const order = await orderResponse.json();

      // --- PASO 2: Configurar y abrir el Checkout de Culqi con la Orden ---
      Culqi.settings({
        title: event.title,
        currency: 'PEN',
        amount: amountInCents,
        order: order.id, // <-- ¡Este es el paso clave!
      });
      Culqi.open();
    } catch (error: any) {
      console.error("Error en el flujo de pago Culqi:", error);
      setPaymentError(error.message);
      setIsProcessing(false); // Also stop processing on error before opening modal
    } finally {
      // Note: setIsProcessing(false) is removed from here, because now
      // the action finalizes when the user closes the modal (in the useEffect).
    }
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



  if (izipayParams) {
    return <IzipayForm params={izipayParams} izipayUrl={process.env.NEXT_PUBLIC_IZIPAY_URL!} />;
  }

  if (useNewIzipaySDK) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Pago con Izipay</h3>
        <IzipaySDKForm
          eventId={event._id}
          eventName={event.title}
          amount={lowestPrice ?? 0}
          buyerId={userId}
          buyerName={`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Cliente'}
          buyerEmail={user?.emailAddresses[0]?.emailAddress || ''}
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

  return (
    <div>
      <div className="flex items-center gap-3">
        <p className="whitespace-nowrap">Cantidad:</p>
        <Input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center rounded-md"
          disabled={isProcessing}
        />
      </div>

      <div className="payment-options-container flex flex-col sm:flex-row items-center gap-3 mt-4">
        <Button
          onClick={() => {
            handleBeginCheckoutClick();
            handleIzipaySDKCheckout();
          }}
          role="link"
          size="lg"
          className="button w-full sm:w-fit rounded-full bg-red-600 hover:bg-red-700 text-white"
          disabled={isProcessing}
        >
          Pagar con Izipay (SDK)
        </Button>
        <Button
          onClick={() => {
            handleBeginCheckoutClick();
            handleIzipayCheckout();
          }}
          role="link"
          size="lg"
          className="button w-full sm:w-fit rounded-full bg-orange-600 hover:bg-orange-700 text-white"
          disabled={isProcessing}
        >
          Pagar con Izipay (Legacy)
        </Button>
        <Button
          id="culqi-payment-button"
          onClick={() => {
            handleBeginCheckoutClick();
            handleCulqiPayment();
          }}
          role="link"
          size="lg"
          className="button w-full sm:w-fit rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isProcessing}
        >
          {isProcessing ? 'Procesando...' : 'Pagar con Tarjeta (Culqi)'}
        </Button>
      </div>
      {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
    </div>
  );
};

export default CheckoutClient;