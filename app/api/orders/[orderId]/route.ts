import { NextRequest, NextResponse } from 'next/server';
import { getOrderById } from '@/lib/actions/order.actions';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        const { orderId } = await params;

        const order = await getOrderById(orderId);

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Orden no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json(order);

    } catch (error) {
        console.error('Error al obtener orden:', error);
        return NextResponse.json(
            { success: false, message: 'Error al obtener la orden' },
            { status: 500 }
        );
    }
}
