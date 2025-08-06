'use client'

import { useState } from 'react';
import CheckoutButton from './CheckoutButton';
import { IEvent } from '@/lib/database/models/event.model';

type QuantitySelectorProps = {
  event: IEvent;
}

const QuantitySelector = ({ event }: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // Asegurémonos de que no se puedan poner valores negativos o cero
    if (value >= 1 && value <= 10) { 
      setQuantity(value);
    } else if (isNaN(value) || value < 1) {
      // Si el campo está vacío o es inválido, reseteamos a 1
      setQuantity(1); 
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <label htmlFor="quantity" className="p-medium-16">Cantidad:</label>
        <input 
          type="number" 
          id="quantity"
          name="quantity"
          min="1"
          max="10"
          value={quantity}
          onChange={handleQuantityChange}
          className="input-field w-20 text-center" // Puedes ajustar tus clases aquí
        />
      </div>
      <CheckoutButton event={event} quantity={quantity} />
    </div>
  );
};

export default QuantitySelector;