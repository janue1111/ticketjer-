// app/api/create-charge/route.ts
import { NextResponse } from "next/server";
import Culqi from 'culqi-node';
import { createOrder } from "@/lib/actions/order.actions";

export async function POST(request: Request) {
  try {
    // 1. Inicializa Culqi con tu llave secreta solo cuando sea necesario
    const culqiSecretKey = process.env.CULQI_SECRET_KEY;
    
    if (!culqiSecretKey) {
      return new NextResponse(
        JSON.stringify({ message: "Configuración de Culqi no disponible." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    
    const culqi = new Culqi({ privateKey: culqiSecretKey });
    const body = await request.json();
    // Extraemos el email del comprador de los datos que envías.
    // Si no lo envías, puedes usar uno genérico.
    const { tokenId, amount, eventId, quantity, buyerId, email = "test@example.com" } = body;

    if (!tokenId) {
      return new NextResponse(
        JSON.stringify({ message: "El token ID es requerido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 2. Crea el objeto de cargo usando la librería de Culqi
    const charge = await culqi.charges.createCharge({
      amount: amount,
      currency_code: "PEN",
      email: email,
      source_id: tokenId,
    });

    // 3. Guarda la orden en tu base de datos
    if (charge) {
      const newOrder = await createOrder({
        transactionId: charge.id,
        eventId: eventId,
        buyerId: buyerId,
        totalAmount: (charge.amount / 100).toString(),
        quantity: quantity,
        createdAt: new Date(),
      });
      return NextResponse.json(newOrder, { status: 200 });
    }

    return new NextResponse(
      JSON.stringify({ message: "La creación del cargo no devolvió un objeto." }),
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error al procesar cargo con Culqi:", error);
    // Devuelve el error específico de Culqi si está disponible
    const errorMessage = error.user_message || "Error interno del servidor.";
    return new NextResponse(
      JSON.stringify({ message: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}