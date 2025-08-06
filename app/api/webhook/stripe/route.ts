
import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  // Validar variables de entorno críticas
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET no está configurado')
    return NextResponse.json({ 
      message: 'Server configuration error' 
    }, { status: 500 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY no está configurado')
    return NextResponse.json({ 
      message: 'Server configuration error' 
    }, { status: 500 })
  }

  let body: string
  let sig: string | null

  try {
    // Procesar el body como raw text - crítico para Stripe
    body = await request.text()
    
    // Obtener la firma de Stripe
    sig = request.headers.get('stripe-signature')
    
    if (!sig) {
      console.error('Falta la cabecera stripe-signature')
      return NextResponse.json({ 
        message: 'No stripe signature header' 
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Error al procesar el request:', error)
    return NextResponse.json({ 
      message: 'Invalid request body' 
    }, { status: 400 })
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  // Log para debugging (ocultar el secret en producción)
  console.log('Webhook Secret configurado:', process.env.VERCEL_ENV !== 'production' ? endpointSecret.substring(0, 10) + '...' : '[HIDDEN]')
  console.log('Signature recibida:', sig.substring(0, 20) + '...')
  console.log('Body length:', body.length)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    console.log('✅ Evento verificado exitosamente:', event.type)
  } catch (err: any) {
    console.error('❌ Error en verificación del webhook:', {
      message: err.message,
      type: err.type,
      sigHeader: sig?.substring(0, 20) + '...',
      secretUsed: endpointSecret.substring(0, 10) + '...',
      bodyLength: body.length
    })
    
    return NextResponse.json({ 
      message: 'Webhook signature verification failed',
      error: err.message,
      timestamp: new Date().toISOString()
    }, { status: 401 })
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