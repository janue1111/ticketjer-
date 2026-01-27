"use client"

import { IEvent } from '@/lib/database/models/event.model'
import { SignedOut } from '@clerk/clerk-react'
import { SignedIn, useUser } from '@clerk/nextjs'

import React, { useCallback } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'


const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  const handleBeginCheckoutClick = useCallback(() => {
    const activePhase = event.pricingPhases?.find((phase) => phase.active);
    const prices = activePhase?.tiers?.map((tier) => Number(tier.price)).filter((p) => !Number.isNaN(p)) || [];
    const unitPrice = prices.length > 0 ? Math.min(...prices) : 0;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'add_to_cart',
      currency: 'PEN',
      value: unitPrice,
      items: [
        {
          item_id: event._id,
          item_name: event.title,
          item_category: event.category?.name,
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
  }, [event]);

  return (
    <div className='flex items-center gap-3'>
      {/* WE cant buy past events */}
      {hasEventFinished ? (
        <p className='p-2 text-red-400'> Lo sentimos, las entradas ya no están disponibles.</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className='button rounded-full bg-red-600 hover:bg-red-700 text-white' size="lg">
              <Link href="/sign-in" onClick={handleBeginCheckoutClick}>
                Comprar Entradas
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Button asChild className='button rounded-full bg-red-600 hover:bg-red-700 text-white' size="lg">
              <Link href={`/events/${event._id}/checkout`} onClick={handleBeginCheckoutClick}>
                Comprar Entradas
              </Link>
            </Button>
          </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckoutButton