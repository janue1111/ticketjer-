'use client'

import { useState } from 'react'
import { IEvent } from "@/lib/database/models/event.model"
import { useUser } from '@clerk/nextjs'
import { checkoutOrder } from '@/lib/actions/order.actions'
import IzipayForm from './IzipayForm'

interface ITier {
  name: string;
  price: string;
  originalPrice?: string;
  description?: string;
  color?: string;
}

type TicketSelectionProps = {
  event: IEvent
}

const TicketSelection = ({ event }: TicketSelectionProps) => {
  const activePhase = event.pricingPhases.find(phase => phase.active);
  const [selectedTier, setSelectedTier] = useState<ITier | null>(null);
  const [izipayParams, setIzipayParams] = useState<{ [key: string]: string | number } | null>(null)
  const { user } = useUser()

  if (!activePhase) {
    return <div className="text-white text-center py-10 bg-neutral-700/80 rounded-2xl">Las entradas no están a la venta en este momento.</div>;
  }

  // Si ya tenemos los parámetros de Izipay, renderizamos el formulario auto-enviable
  if (izipayParams) {
    return (
      <IzipayForm 
        params={izipayParams} 
        izipayUrl={process.env.NEXT_PUBLIC_IZIPAY_URL!}
      />
    )
  }

  const handleBeginCheckout = () => {
    if (!selectedTier) return;

    const unitPrice = Number(selectedTier.price) || 0;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'begin_checkout',
      currency: 'PEN',
      value: unitPrice, // Quantity is 1
      items: [
        {
          item_id: event._id,
          item_name: event.title,
          item_category: event.category?.name,
          item_variant: selectedTier.name, // Add tier name as variant
          price: unitPrice,
          quantity: 1,
          ...(event.layoutType === 'immersive' && event.immersiveImages ? {
            backgroundUrl: event.immersiveImages.backgroundUrl,
            artistUrl: event.immersiveImages.artistUrl,
            dateUrl: event.immersiveImages.dateUrl,
            zoneMapUrl: event.immersiveImages.zoneMapUrl,
          } : {}),
        },
      ],
    });
  };

  const onCheckout = async () => {
    if (!selectedTier) return

    handleBeginCheckout();

    // Obtenemos el userId mapeado a nuestra BD desde Clerk
    const buyerId = (user?.publicMetadata as any)?.userId as string | undefined
    if (!buyerId) return

    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: selectedTier.price,
      isFree: Number(selectedTier.price) === 0,
      buyerId,
      quantity: 1,
    }

    const params = await checkoutOrder(order)
    setIzipayParams(params)
  }

  return (
    <div className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/80 rounded-2xl p-6 text-white max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-300">ENTRADAS</h2>
      <div className="text-center mb-6">
        <p className="text-xl font-semibold">{activePhase.name}</p>
        <p className="text-neutral-400 text-sm mt-1">{activePhase.description}</p>
      </div>

      <div className="space-y-4 mb-8">
        {activePhase.tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex items-center justify-between p-4 bg-neutral-900/70 rounded-lg border border-neutral-700/60 hover:bg-neutral-700/50 transition-all cursor-pointer
              ${selectedTier?.name === tier.name ? 'border-purple-500 ring-2 ring-purple-500' : ''}
            `}
            onClick={() => setSelectedTier(tier)}
          >
            <div className="flex items-center">
              <span className="w-5 h-5 rounded-full mr-4 border-2 border-neutral-600" style={{ backgroundColor: tier.color }}></span>
              <div>
                <p className="font-semibold text-lg">{tier.name}</p>
                <p className="text-xs text-neutral-400">{tier.description}</p>
              </div>
            </div>
            <div className="text-right pl-2">
              <p className="font-bold text-xl">S/ {Number(tier.price).toFixed(2)}</p>
              {tier.originalPrice && (
                <p className="text-xs text-neutral-500 line-through">S/ {Number(tier.originalPrice).toFixed(2)}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button 
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg shadow-purple-600/20"
        disabled={!selectedTier}
        onClick={onCheckout}
      >
        COMPRAR AHORA
      </button>
    </div>
  )
}

export default TicketSelection