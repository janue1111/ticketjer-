
import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  console.log('Using Stripe Webhook Secret:', endpointSecret);

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  
  const eventType = event.type

  
  if (eventType === 'checkout.session.completed') {
    

    const session = event.data.object as Stripe.Checkout.Session;

    
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      session.id,
      {
        expand: ['line_items'], 
      }
    );
    
    
    const quantity = sessionWithLineItems.line_items?.data[0]?.quantity || 1;

   

    
    const order = {
      stripeId: session.id,
      eventId: session.metadata?.eventId || '',
      buyerId: session.metadata?.buyerId || '',
      totalAmount: session.amount_total ? (session.amount_total / 100).toString() : '0',
      createdAt: new Date(),
      eventTitle: session.metadata?.eventTitle || '', 
      price: session.amount_total ? (session.amount_total / 100).toString() : '0', 
      isFree: session.amount_total === 0, 
      quantity: quantity, 
    }

    const newOrder = await createOrder(order)
    return NextResponse.json({ message: 'OK', order: newOrder })
  }

  return new Response('', { status: 200 })
}