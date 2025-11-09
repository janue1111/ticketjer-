import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({searchParams}: SearchParamProps) => {
    const resolvedSearchParams = (await searchParams) ?? {}
    const { userId } = await auth();

    const ordersPage = Number(resolvedSearchParams?.ordersPage) || 1;

    const eventsPage = Number(resolvedSearchParams?.eventsPage) || 1;

    // Verificar que userId exista antes de hacer las llamadas
    const orders = userId ? await getOrdersByUser({userId, page:1}) : {data: [], totalPages: 0};
    const orderedEvents = orders?.data || [];
    const organizedEvents = userId ? await getEventsByUser({userId, page:1}) : {data: [], totalPages: 0};

    console.log({orderedEvents})
  return (
    <>
    {/* My tickets */}
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
            <h3 className='h3-bold text-center sm:text-left'>Mis Entradas</h3>
            <Button asChild size="lg" className='button hidden sm:flex'>
                <Link href="/#events">
                    Explorar más eventos
                </Link>
                
            </Button>

        </div>
    </section>
    <section className='wrapper my-8'>
    <Collection
    data={orderedEvents}
    emptyTitle="No events tickets purchased yet"
    emptyStateSubtext="No worries -  plenty of exciting events to explore"
    collectionType="My_Tickets"
    limit={3}
    page={ordersPage}
    urlParamName='ordersPage'
    totalPages={orders?.totalPages}
    />
    </section>
    {/* My Events */}

    {/* Event Organized */}
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
            <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
            <Button asChild size="lg" className='button hidden sm:flex'>
                <Link href="/events/create">
                    Create New Event
                </Link>
                
            </Button>

        </div>
    </section>
    
    <section className='wrapper my-8'>
    <Collection
    data={organizedEvents?.data}
    emptyTitle="No events created yet"
    emptyStateSubtext="Create some now!"
    collectionType='Events_Organized'
    limit={3}
    page={eventsPage}
    urlParamName='eventsPage'
    totalPages={organizedEvents?.totalPages}
    />
    </section>
    {/* My Events */}
  
    </>
  )
}

export default ProfilePage