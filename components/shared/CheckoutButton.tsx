"use client"

import { IEvent } from '@/lib/database/models/event.model'
import { SignedOut } from '@clerk/clerk-react'
import { SignedIn, useUser } from '@clerk/nextjs'

import React, { useCallback } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

const CheckoutButton = ({event}: {event:IEvent}) => {
    const {user} = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event.endDateTime) < new Date();

  const handleBeginCheckoutClick = useCallback(() => {
    const unitPrice = event.isFree ? 0 : parseFloat(event.price || "0");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'begin_checkout',
      currency: 'PEN',
      value: unitPrice,
      items: [
        {
          item_id: event._id,
          item_name: event.title,
          item_category: event.category?.name,
          price: unitPrice,
          quantity: 1,
        },
      ],
    });
  }, [event]);

  return (
    <div className='flex items-center gap-3'>
        {/* WE cant buy past events */}
        {hasEventFinished ? (
            <p className='p-2 text-red-400'> Lo sentimos, las entradas ya no están disponibles.</p>
        ):(
            <>
            <SignedOut>
                <Button asChild className='button rounded-full bg-red-600 hover:bg-red-700 text-white' size="lg">
                    <Link href="/sign-in" onClick={handleBeginCheckoutClick}>
                        Comprar Entradas
                    </Link>
                </Button>
            </SignedOut>

            <SignedIn>
                <Checkout event={event} userId={userId}/>

            </SignedIn>
            </>
        )}
    </div>
  )
}

export default CheckoutButton