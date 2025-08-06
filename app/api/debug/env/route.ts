import { NextResponse } from 'next/server'

export async function GET() {
  // Solo habilitar en desarrollo
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'Not available in production' }, { status: 403 })
  }

  return NextResponse.json({
    environment: process.env.VERCEL_ENV || 'local',
    nodeEnv: process.env.NODE_ENV,
    hasStripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasStripeWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    stripeWebhookSecretPrefix: process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 12) + '...',
    serverUrlProd: process.env.NEXT_PUBLIC_SERVER_URL_PROD,
    serverUrlDev: process.env.NEXT_PUBLIC_SERVER_URL_DEV,
    timestamp: new Date().toISOString()
  })
}