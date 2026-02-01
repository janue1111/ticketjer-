import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import Ticket from '@/lib/database/models/ticket.model';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        await connectToDatabase();

        // Await params in Next.js 15+
        const { orderId } = await params;

        // Obtener todos los tickets de esta orden
        const tickets = await Ticket.find({ order: orderId })
            .sort({ ticketNumber: 1 }) // Ordenar por número de ticket
            .select('ticketId ticketNumber isUsed scannedAt');

        if (!tickets || tickets.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No se encontraron tickets para esta orden' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            tickets: JSON.parse(JSON.stringify(tickets)),
            total: tickets.length
        });

    } catch (error) {
        console.error('Error al obtener tickets:', error);
        return NextResponse.json(
            { success: false, message: 'Error al obtener los tickets' },
            { status: 500 }
        );
    }
}
