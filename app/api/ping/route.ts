import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('--- PING RECIBIDO EN /api/ping ---');
  return NextResponse.json({ message: 'Ping recibido con éxito.' }, { status: 200 });
}
