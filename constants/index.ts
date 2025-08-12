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
  
  export const eventDefaultValues = {
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
            price: '',
            originalPrice: '',
            description: '',
            color: 'bg-blue-500'
          }
        ]
      }
    ]
  }