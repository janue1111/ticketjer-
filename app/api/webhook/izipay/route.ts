import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { updateOrderStatus } from '@/lib/actions/order.actions'

function isValidSignature(body: string, signature: string, secret: string): boolean {
  const hash = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return hash === signature;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const notification = JSON.parse(rawBody)
    const signature = req.headers.get('izipay-signature')
    const secret = process.env.IZIPAY_WEBHOOK_SECRET

    if (!signature || !secret || !isValidSignature(rawBody, signature, secret)) {
      return NextResponse.json({ message: 'Invalid signature.' }, { status: 401 })
    }

    // Process the notification
    const { orderId, status } = notification
    await updateOrderStatus(orderId, status)

    return NextResponse.json({ status: 'received' })
  } catch (error) {
    console.error('Error processing Izipay webhook:', error)
    return NextResponse.json({ message: 'An error occurred while processing the webhook.' }, { status: 500 })
  }
}
