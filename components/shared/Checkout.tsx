'use client'

import React, { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import { checkoutOrder } from "@/lib/actions/order.actions";
import { Input } from "../ui/input";
import IzipayForm from "./IzipayForm";

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [izipayParams, setIzipayParams] = useState<{[key: string]: string | number} | null>(null);

  // Derivar el precio base desde la fase activa y sus tiers
  const activePhase = event.pricingPhases?.find((phase) => phase.active);
  const prices = activePhase?.tiers?.map((tier) => Number(tier.price)).filter((p) => !Number.isNaN(p)) || [];
  const lowestPrice: number | null = prices.length > 0 ? Math.min(...prices) : null;

  const onCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
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
  };

  const handleBeginCheckoutClick = useCallback(() => {
    const unitPrice = lowestPrice ?? 0;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'begin_checkout',
      currency: 'PEN',
      value: unitPrice * quantity,
      items: [
        {
          item_id: event._id,
          item_name: event.title,
          item_category: event.category?.name,
          price: unitPrice,
          quantity: quantity,
          ...(event.layoutType === 'immersive' && event.immersiveImages ? {
            backgroundUrl: event.immersiveImages.backgroundUrl,
            artistUrl: event.immersiveImages.artistUrl,
            dateUrl: event.immersiveImages.dateUrl,
            zoneMapUrl: event.immersiveImages.zoneMapUrl,
          } : {}),
        },
      ],
    });
  }, [event, quantity, lowestPrice]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (izipayParams) {
    return (
      <IzipayForm 
        params={izipayParams} 
        izipayUrl={process.env.NEXT_PUBLIC_IZIPAY_URL!} 
      />
    );
  }

  return (
    <form onSubmit={onCheckout}>
      <div className="flex items-center gap-3">
        <p className="whitespace-nowrap">Cantidad:</p>
        <Input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center rounded-md"
        />
        <Button type="submit" role="link" size="lg" className="button sm:w-fit rounded-full bg-red-600 hover:bg-red-700 text-white" onClick={handleBeginCheckoutClick}>
          {(lowestPrice ?? 0) === 0 ? "Obtener Entrada" : "Comprar Entrada"}
        </Button>
      </div>
    </form>
  );
};

export default Checkout;