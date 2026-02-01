'use server';

import { connectToDatabase } from '@/lib/database';
import Ticket from '@/lib/database/models/ticket.model';
import User from '@/lib/database/models/user.model';
import Event from '@/lib/database/models/event.model';
import { handleError } from '@/lib/utils';

export async function validateTicket(ticketId: string) {
    try {
        await connectToDatabase();

        // 1. Buscar el Ticket en la BD por su ticketId (UUID)
        const ticket = await Ticket.findOne({ ticketId: ticketId })
            .populate({
                path: 'buyer',
                model: User,
                select: 'firstName lastName'
            })
            .populate({
                path: 'event',
                model: Event,
                select: 'title'
            });

        // 2. Si no existe: Retornar error "Ticket Inválido"
        if (!ticket) {
            return { success: false, message: 'Ticket Inválido' };
        }

        // 3. Si isUsed es true: Retornar error "Ticket YA Usado"
        if (ticket.isUsed) {
            return { success: false, message: 'Ticket YA Usado / Duplicado' };
        }

        // 4. Si todo está bien:
        // - Actualizar isUsed a true
        // - Actualizar scannedAt a la fecha actual
        ticket.isUsed = true;
        ticket.scannedAt = new Date();
        await ticket.save();

        const buyerName = ticket.buyer ? `${ticket.buyer.firstName} ${ticket.buyer.lastName}` : 'Nombre no disponible';
        const eventTitle = ticket.event?.title || 'Evento Desconocido';

        // - Retornar éxito
        return {
            success: true,
            message: `Acceso Permitido - ${buyerName}`,
            ticketInfo: {
                eventTitle: eventTitle,
                ticketNumber: ticket.ticketNumber
            }
        };

    } catch (error) {
        handleError(error);
        return { success: false, message: 'Error interno del servidor al validar el ticket' };
    }
}
