'use client'

import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

declare global {
  interface Window {
    Izipay?: any;
    culqi?: any;
    Culqi?: any;
    dataLayer?: any[];
  }
}

const CheckoutClient = ({ event, userId }: { event: IEvent; userId: string }) => {
  const { user } = useUser() || { user: null }; // Mock user when not in ClerkProvider
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const activePhase = event.pricingPhases?.find((phase) => phase.active);
  const prices = activePhase?.tiers?.map((tier) => Number(tier.price)).filter((p) => !Number.isNaN(p)) || [];
  const lowestPrice: number | null = prices.length > 0 ? Math.min(...prices) : null;
  const amount = (lowestPrice ?? 0) * quantity;

  const handleIzipayCheckout = async () => {
    setIsProcessing(true);
    setPaymentError(null);
    try {
      const response = await fetch('/api/izipay/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          orderNumber: `ORDER-${Date.now()}`,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'El pago no pudo ser procesado.');
      }

      const izipayResponse = await response.json();
      const sessionToken = izipayResponse.Response.Token;

      const iziConfig = {
        publicKey: process.env.NEXT_PUBLIC_IZIPAY_PUBLIC_KEY,
        config: {
          transactionId: Math.random().toString(36).substring(7),
          action: 'pay',
          merchantCode: process.env.NEXT_PUBLIC_IZIPAY_MERCHANT_CODE,
          order: {
            orderNumber: `ORDER-${Date.now()}`,
            currency: 'PEN',
            amount: amount,
            payMethod: "CARD,QR",
            processType: 'AT',
            merchantBuyerId: userId,
            installments: '00',
            dateTimeTransaction: new Date().toISOString(),
          },
          billing: {
            firstName: user?.firstName || 'Test',
            lastName: user?.lastName || 'User',
            email: user?.emailAddresses[0]?.emailAddress || 'test@user.com',
            phoneNumber: '',
            street: '',
            city: '',
            state: '',
            country: 'PE',
            postalCode: '',
            document: '',
            documentType: 'DNI',
          },
          render: {
            typeForm: window.Izipay.enums.typeForm.POP_UP,
            container: '#your-iframe-payment',
            showButtonProcessForm: true,
            redirectUrls: {
              onSuccess: process.env.NEXT_PUBLIC_IZIPAY_SUCCESS_URL,
              onError: process.env.NEXT_PUBLIC_IZIPAY_ERROR_URL,
              onCancel: process.env.NEXT_PUBLIC_IZIPAY_CANCEL_URL,
            }
          },
          appearance: {
            logo: 'https://demo-izipay.azureedge.net/test/img/millasb.svg',
          },
        },
      };

      const izi = new window.Izipay({ config: iziConfig });

      const callbackResponsePayment = (response: any) => {
        if (response.code === '00') {
          window.location.href = '/orders';
        } else {
          setPaymentError('El pago fue rechazado. Por favor, intente de nuevo.');
        }
        setIsProcessing(false);
      };

      izi.LoadForm({
        autorization: sessionToken,
        keyRSA: 'RSA', // This is a placeholder, check Izipay docs if a real key is needed
        callbackResponse: callbackResponsePayment
      });

    } catch (error: any) {
      console.error("Error in Izipay Checkout:", error);
      setPaymentError("No se pudo iniciar el pago con Izipay.");
      setIsProcessing(false);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

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
          onClick={handleIzipayCheckout}
          role="link"
          size="lg"
          className="button w-full sm:w-fit rounded-full bg-red-600 hover:bg-red-700 text-white"
          disabled={isProcessing}
        >
          {isProcessing ? 'Procesando...' : 'Pagar con Izipay'}
        </Button>
      </div>
      {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
      <div id="your-iframe-payment"></div>
    </div>
  );
};

export default CheckoutClient;
