'use server';

import { connectToDatabase } from '@/lib/database';
import Order from '@/lib/database/models/order.model';
import Ticket from '@/lib/database/models/ticket.model';
import crypto from 'crypto';

/**
 * Script para generar tickets faltantes en órdenes completadas
 * Se ejecuta manualmente para una orden específica
 */
export async function generateMissingTickets(orderId: string) {
    try {
        await connectToDatabase();

        // Buscar la orden
        const order = await Order.findById(orderId);
        if (!order) {
            return { success: false, message: 'Orden no encontrada' };
        }

        // Verificar cuántos tickets existen
        const existingTickets = await Ticket.countDocuments({ order: orderId });
        const expectedTickets = order.quantity;

        if (existingTickets >= expectedTickets) {
            return {
                success: true,
                message: `La orden ya tiene ${existingTickets} tickets (esperados: ${expectedTickets})`
            };
        }

        // Generar tickets faltantes
        const ticketsToCreate = [];
        const startNumber = existingTickets + 1; // Empezar desde el siguiente número

        for (let i = startNumber; i <= expectedTickets; i++) {
            const ticketId = crypto.randomUUID();
            ticketsToCreate.push({
                ticketId: ticketId,
                order: order._id,
                event: order.event,
                buyer: order.buyer,
                ticketNumber: i,
                isUsed: false,
            });
        }

        await Ticket.insertMany(ticketsToCreate);

        return {
            success: true,
            message: `✅ Generados ${ticketsToCreate.length} tickets faltantes (de ${startNumber} a ${expectedTickets})`,
            created: ticketsToCreate.length,
            total: expectedTickets
        };

    } catch (error) {
        console.error('Error generando tickets:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error desconocido'
        };
    }
}
