import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { amount, orderNumber } = await req.json()

    const transactionId = Math.random().toString(36).substring(7)
    const formattedAmount = Number(amount).toFixed(2);

    const response = await fetch('https://sandbox-api-pw.izipay.pe/security/v1/Token/Generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'transactionId': transactionId
      },
      body: JSON.stringify({
        "requestSource": "ECOMMERCE",
        "merchantCode": process.env.IZIPAY_MERCHANT_CODE,
        "orderNumber": orderNumber,
        "publicKey": process.env.IZIPAY_PUBLIC_KEY,
        "amount": formattedAmount
      })
    })

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Izipay API Error:", errorBody);
      throw new Error(`Izipay API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'An error occurred while generating the token.' }, { status: 500 })
  }
}
