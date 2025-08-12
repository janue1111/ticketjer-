import { Document, Schema, models, model } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  immersiveImages?: {
    backgroundUrl?: string;
    artistUrl?: string;
    dateUrl?: string;
    zoneMapUrl?: string;
  };
  startDateTime: Date;
  endDateTime: Date;
  url?: string;
  layoutType: 'standard' | 'immersive';
  pricingPhases: {
    name: string;
    active: boolean;
    description?: string;
    tiers: {
      name: string;
      price: string;
      originalPrice?: string;
      description?: string;
      color?: string;
    }[];
  }[];
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const TierSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  originalPrice: { type: String },
  description: { type: String },
  color: { type: String },
});

const PricingPhaseSchema = new Schema({
  name: { type: String, required: true },
  active: { type: Boolean, default: false },
  description: { type: String },
  tiers: [TierSchema],
});

const EventSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  immersiveImages: {
    backgroundUrl: { type: String },
    artistUrl: { type: String },
    dateUrl: { type: String },
    zoneMapUrl: { type: String },
  },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  url: { type: String },
  layoutType: {
    type: String,
    enum: ['standard', 'immersive'],
    default: 'standard',
  },
  pricingPhases: [PricingPhaseSchema],
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Event = models.Event || model('Event', EventSchema);

export default Event;