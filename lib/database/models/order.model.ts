import { Schema, model, models, Document } from 'mongoose'
import { IEvent } from './event.model'

export interface IOrder extends Document {

  createdAt: Date
  transactionId: string
  totalAmount: string
  event: IEvent
  buyer: {
    _id: string
    firstName: string
    lastName: string
  }
  quantity: number;
  status: string;
}

export type IOrderItem = {
  _id: string
  totalAmount: string
  createdAt: Date
  eventTitle: string
  eventId: string
  buyer: string
}

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
  },
})

const Order = models.Order || model('Order', OrderSchema)

export default Order