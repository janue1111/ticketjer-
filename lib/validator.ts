import * as z from "zod"

const tierSchema = z.object({
  name: z.string().min(3, 'Tier name must be at least 3 characters'),
  price: z.string(),
  originalPrice: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
});

const pricingPhaseSchema = z.object({
  name: z.string().min(3, 'Phase name must be at least 3 characters'),
  active: z.boolean(),
  description: z.string().optional(),
  tiers: z.array(tierSchema),
});

export const eventFormSchema = z.object({
    title: z.string().min(3,'Title must be atleast 3 charccters'),
    slug: z
      .string()
      .min(3, 'Slug must be at least 3 characters')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
    description: z.string().min(3,'Title must be atleast 3 charccters').max(400,'Descrption must be less than 400 characters'),
    location:z.string().min(3,'Location must be atleast 3 characters').max(400,'Location must be less than 400 characters'),
    imageUrl:z.string(),
    immersiveImages: z.object({
      backgroundUrl: z.string().url().or(z.literal('')).optional(),
      artistUrl: z.string().url().or(z.literal('')).optional(),
      dateUrl: z.string().url().or(z.literal('')).optional(),
      zoneMapUrl: z.string().url().or(z.literal('')).optional(),
    }).optional(),
    standardDescription: z.string().refine((val) => {
      if (!val) return true;
      const wordCount = val.trim().split(/\s+/).filter(word => word.length > 0).length;
      return wordCount <= 100;
    }, {
      message: 'La descripción no puede exceder 100 palabras'
    }).optional(),
    scenarioImageUrl: z.string().url().or(z.literal('')).optional(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    categoryId:z.string(),
    url:z.string().url().or(z.literal('')),
    layoutType: z.enum(['standard', 'immersive']),
    pricingPhases: z.array(pricingPhaseSchema),
});