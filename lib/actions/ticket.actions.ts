'use server';

import { connectToDatabase } from '@/lib/database';
import Order from '@/lib/database/models/order.model';
import User from '@/lib/database/models/user.model';
import { handleError } from '@/lib/utils';
import { Schema } from 'mongoose';

export async function validateTicket(ticketId: string) {
    try {
        await connectToDatabase();

        // 1. Buscar la Orden en la BD por su transactionId
        const order = await Order.findOne({ transactionId: ticketId })
            .populate({
                path: 'buyer',
                model: User,
                select: 'firstName lastName'
            })
            .populate({
                path: 'event',
                model: 'Event',
                select: 'title'
            });

        // 2. Si no existe: Retornar error "Ticket Inválido"
        if (!order) {
            return { success: false, message: 'Ticket Inválido' };
        }

        // 3. Si isUsed es true: Retornar error "Ticket YA Usado / Duplicado"
        if (order.isUsed) {
            return { success: false, message: 'Ticket YA Usado / Duplicado' };
        }

        // 4. Si todo está bien:
        // - Actualizar isUsed a true
        // - Actualizar scannedAt a la fecha actual
        order.isUsed = true;
        order.scannedAt = new Date();
        await order.save();

        const buyerName = order.buyer ? `${order.buyer.firstName} ${order.buyer.lastName}` : 'Nombre no disponible';
        const eventTitle = order.event?.title || 'Evento Desconocido';

        // - Retornar éxito
        // IMPORTANTE: Devolvemos objetos planos (strings/numbers) para evitar errores de serialización "buffer"
        return {
            success: true,
            message: `Acceso Permitido - ${buyerName}`,
            ticketInfo: {
                eventTitle: eventTitle,
                quantity: JSON.parse(JSON.stringify(order.quantity)) // Asegurar que sea número plano
            }
        };

    } catch (error) {
        handleError(error);
        return { success: false, message: 'Error interno del servidor al validar el ticket' };
    }
}
