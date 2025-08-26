// app/api/create-order/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, description, eventId, userEmail } = body;

    if (!amount || !description) {
      return NextResponse.json({ message: "Monto y descripción son requeridos." }, { status: 400 });
    }

    // Prepara los datos para la API de Culqi
    const expirationDate = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 horas
    const secretKey = process.env.CULQI_SECRET_KEY;
    const culqiApiUrl = 'https://api.culqi.com/v2/orders';

    // Realiza la llamada directa a la API de Culqi usando fetch
    const response = await fetch(culqiApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency_code: "PEN",
        description: description,
        order_number: `evento-${eventId}-${Date.now()}`, // Un número de orden único
        client_details: {
          email: userEmail,
        },
        expiration_date: expirationDate,
      }),
    });

    const orderData = await response.json();

    // Si la propia API de Culqi devuelve un error, lo propagamos
    if (!response.ok) {
      throw new Error(orderData.user_message || 'Error desde la API de Culqi al crear la orden.');
    }

    // Si la creación fue exitosa, devolvemos los datos de la orden al frontend
    return NextResponse.json(orderData);
  } catch (error: any) {
    console.error("Error en el endpoint /api/create-order:", error);
    return NextResponse.json(
      { message: error.message || "Error interno del servidor." },
      { status: 500 }
    );
  }
}