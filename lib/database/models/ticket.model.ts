import { Schema, model, models, Document } from 'mongoose';
import { IEvent } from './event.model';

export interface ITicket extends Document {
    ticketId: string;
    order: string; // Reference to Order ID
    event: IEvent;
    buyer: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    ticketNumber: number; // 1, 2, 3, etc. (for "Entrada X de Y")
    isUsed: boolean;
    scannedAt?: Date;
    createdAt: Date;
}

const TicketSchema = new Schema({
    ticketId: {
        type: String,
        required: true,
        unique: true,
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ticketNumber: {
        type: Number,
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
    scannedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Ticket = models.Ticket || model('Ticket', TicketSchema);

export default Ticket;
