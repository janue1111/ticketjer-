import type * as z from 'zod'
import { eventFormSchema } from '@/lib/validator'

// ====== ROLE CONSTANTS
export const USER_ROLES = {
  USER: 'user',
  ORGANIZER: 'organizer',
  ADMIN: 'admin',
} as const

export const ROLE_LABELS = {
  user: 'Usuario',
  organizer: 'Organizador',
  admin: 'Administrador',
} as const

export const headerLinks = [
  {
    label: 'Inicio',
    route: '/',
  },
  {
    label: 'Crear Evento',
    route: '/events/create',
  },
  {
    label: 'Mi Perfil',
    route: '/profile',
  },
]

export const eventDefaultValues: z.infer<typeof eventFormSchema> = {
  title: '',
  slug: '',
  description: '',
  location: '',
  imageUrl: '',
  immersiveImages: {
    backgroundUrl: '',
    artistUrl: '',
    dateUrl: '',
    zoneMapUrl: '',
  },
  standardDescription: '',
  scenarioImageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  url: '',
  layoutType: 'standard',
  pricingPhases: [
    {
      name: 'PRECIO REGULAR',
      active: true,
      description: '',
      tiers: [
        {
          name: 'ENTRADA GENERAL',
          price: '0',
          originalPrice: '',
          description: '',
          color: 'bg-blue-500'
        }
      ]
    }
  ]
}