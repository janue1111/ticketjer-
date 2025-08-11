import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('Webhook de IziPay recibido!');

  return NextResponse.json({ message: 'Webhook recibido' }, { status: 200 });
}
