'use client'

import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import IzipaySDKForm from "@/components/shared/IzipaySDKForm";
import { useUser } from "@clerk/nextjs";
import BillingForm, { BillingDetails } from "@/components/shared/BillingForm";
import { Minus, Plus, ChevronRight, Ticket, CreditCard, ShoppingCart } from "lucide-react";

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
  const unitPrice = lowestPrice ?? 0;
  const totalAmount = unitPrice * quantity;

  // Funciones para el contador de cantidad
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleProceedToBilling = () => {
    handleBeginCheckoutClick();
    setShowBillingForm(true);
  };

  const handleBillingSubmit = (data: BillingDetails) => {
    // Enviar evento de GA4 para add_shipping_info (Paso 2 completado)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'add_shipping_info',
      currency: 'PEN',
      value: unitPrice * quantity,
      items: [{
        item_id: event._id,
        item_name: event.title,
        item_category: event.category?.name,
        price: unitPrice,
        quantity: quantity,
      }],
      shipping_tier: 'Digital Delivery',
      // Datos del usuario del formulario
      user_data: {
        email: data.email,
        phone_number: data.phoneNumber,
        address: {
          first_name: data.firstName,
          last_name: data.lastName,
          street: data.street,
          city: data.city,
          region: data.state,
          postal_code: data.postalCode,
          country: data.country,
        },
      },
      // Datos adicionales personalizados
      customer_info: {
        document_type: data.documentType,
        document_number: data.document,
        full_name: `${data.firstName} ${data.lastName}`,
      },
    });

    setBillingDetails(data);
    setShowBillingForm(false); // Ocultar el formulario de facturación
  };


  const handleBeginCheckoutClick = useCallback(() => {
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
  }, [event, quantity, unitPrice]);

  // Si ya tenemos los detalles de facturación, mostramos el IzipaySDKForm
  if (billingDetails) {
    const amount = unitPrice * quantity;
    return (
      <div className="w-full max-w-2xl mx-auto">
        {/* Card Container for Step 3 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Paso 3: Realizar Pago</h2>
                <p className="text-blue-100 text-sm">Completa tu compra de forma segura</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <IzipaySDKForm
              eventId={event._id.toString()}
              eventName={event.title}
              amount={amount}
              buyerId={userId}
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
        </div>
      </div>
    );
  }

  // Si el usuario ha decidido proceder, mostramos el formulario de facturación
  if (showBillingForm) {
    return (
      <div className="mt-6">
        <BillingForm
          onSubmit={handleBillingSubmit}
          isProcessing={isProcessing}
        />
      </div>
    )
  }

  // Estado inicial: selección de cantidad
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Ticket className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Selecciona tus Entradas</h2>
              <p className="text-blue-100 text-sm">Elige cuántas personas asistirán</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Event Info */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="font-semibold text-gray-900 text-lg">{event.title}</p>
            <p className="text-sm text-gray-500 mt-1">Entrada General</p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Cantidad de Entradas</label>
            <div className="flex items-center justify-center gap-6 py-4">
              {/* Minus Button */}
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1 || isProcessing}
                className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200"
              >
                <Minus className="h-6 w-6 text-gray-600" />
              </button>

              {/* Quantity Display */}
              <div className="w-20 text-center">
                <span className="text-5xl font-bold text-gray-900">{quantity}</span>
              </div>

              {/* Plus Button */}
              <button
                onClick={incrementQuantity}
                disabled={isProcessing}
                className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <Plus className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-gray-600">
              <span>Precio unitario</span>
              <span>S/. {unitPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Cantidad</span>
              <span>x {quantity}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-medium text-gray-700">Total a Pagar</span>
              <span className="text-3xl font-bold text-gray-900">S/. {totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <Button
              onClick={handleProceedToBilling}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg h-auto"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Continuar con la Compra
                  <ChevronRight className="h-5 w-5" />
                </span>
              )}
            </Button>
          </div>

          {paymentError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2 mt-4">
              <span className="text-sm">{paymentError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutClient;