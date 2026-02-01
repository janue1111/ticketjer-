'use client'

import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import IzipaySDKForm from "@/components/shared/IzipaySDKForm";
import { useUser } from "@clerk/nextjs";
import BillingForm, { BillingDetails } from "@/components/shared/BillingForm";
import { Minus, Plus, ChevronRight, Ticket, CreditCard, ShoppingCart } from "lucide-react";
import CheckoutStepper from "@/components/shared/CheckoutStepper";

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
        {/* Stepper - Paso 3: Pago */}
        <CheckoutStepper currentStep={3} />

        {/* Card Container for Step 3 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header - Fucsia #D5006D */}
          <div className="px-6 py-5" style={{ backgroundColor: '#D5006D' }}>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Paso 3: Realizar Pago</h2>
                <p className="text-white/90 text-sm">Completa tu compra de forma segura</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <IzipaySDKForm
              eventId={event._id.toString()}
              eventName={event.title}
              amount={amount}
              buyerId={userId}
              quantity={quantity} // 🔥 Pasar la cantidad seleccionada
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
      <div className="w-full max-w-2xl mx-auto">
        {/* Stepper - Paso 2: Datos */}
        <CheckoutStepper currentStep={2} />

        <BillingForm
          onSubmit={handleBillingSubmit}
          isProcessing={isProcessing}
        />
      </div>
    )
  }

  // Estado inicial: selección de cantidad

  // Debug: verificar datos del evento
  console.log('CheckoutClient - Event data:', {
    layoutType: event.layoutType,
    scenarioImageUrl: event.scenarioImageUrl,
    hasImmersiveImages: !!event.immersiveImages,
    zoneMapUrl: event.immersiveImages?.zoneMapUrl,
  });

  // Obtener URL de imagen del escenario según el tipo de layout
  const stageImageUrl = event.layoutType === 'immersive'
    ? event.immersiveImages?.zoneMapUrl
    : event.scenarioImageUrl;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Stepper - Paso 1: Cantidad */}
      <CheckoutStepper currentStep={1} />
      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagen del Escenario - para ambos tipos de layout */}
        {stageImageUrl && (
          <div className="w-full md:w-2/5 lg:w-1/2">
            <div className="bg-black text-white text-center py-3 font-bold text-lg tracking-wider">
              ESCENARIO
            </div>
            <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-lg">
              <img
                src={stageImageUrl}
                alt="Mapa del escenario"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* Card de Selección de Cantidad */}
        <div className={stageImageUrl ? "w-full md:w-3/5 lg:w-1/2" : "w-full max-w-2xl mx-auto"}>
          {/* Card Container */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header - Fucsia #D5006D */}
            <div className="px-6 py-5" style={{ backgroundColor: '#D5006D' }}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Ticket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Selecciona tus Entradas</h2>
                  <p className="text-white/90 text-sm">Elige cuántas personas asistirán</p>
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
                  {/* Minus Button - Gris discreto */}
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || isProcessing}
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-300"
                    style={{ backgroundColor: '#ECEFF1' }}
                  >
                    <Minus className="h-6 w-6 text-gray-600" />
                  </button>

                  {/* Quantity Display */}
                  <div className="w-20 text-center">
                    <span className="text-5xl font-bold text-gray-900">{quantity}</span>
                  </div>

                  {/* Plus Button - Fucsia vibrante */}
                  <button
                    onClick={incrementQuantity}
                    disabled={isProcessing}
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:brightness-110"
                    style={{ backgroundColor: '#D5006D' }}
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
                  <span className="text-3xl font-extrabold" style={{ color: '#000000' }}>S/. {totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-4">
                <Button
                  onClick={handleProceedToBilling}
                  size="lg"
                  className="w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg h-auto text-white hover:brightness-110"
                  style={{ backgroundColor: '#00BFA5' }}
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
      </div>
    </div>
  );
};

export default CheckoutClient;