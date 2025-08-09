"use client"

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IEvent } from "@/lib/database/models/event.model";

import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from "@/lib/actions/order.actions";
import { Input } from "../ui/input";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
      quantity: quantity,
    };

    await checkoutOrder(order);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <form action={onCheckout}>
      <div className="flex items-center gap-3">
        <p className="whitespace-nowrap">Cantidad:</p>
        <Input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center rounded-md"
        />
        <Button type="submit" role="link" size="lg" className="button sm:w-fit">
          {event.isFree ? "Obtener Entrada" : "Comprar Entrada"}
        </Button>
      </div>
    </form>
  );
};

export default Checkout;
