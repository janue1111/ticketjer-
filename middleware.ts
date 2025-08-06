import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


const isPublicRoute = createRouteMatcher([
  '/',
  '/events(.*)', // Esto cubre /events/:id y cualquier subruta
  '/success',
  '/sign-in(.*)',
  '/sign-up(.*)',
])


const isIgnoredRoute = createRouteMatcher([
  '/api/webhook/clerk',
  '/api/webhook/stripe', 
  '/api/uploadthing',
])

export default clerkMiddleware((auth, request) => {
  // Si es una ruta ignorada, no hacer nada
  if (isIgnoredRoute(request)) {
    return
  }
  
  
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    // Excluye archivos con extensiones (imágenes, CSS, JS, etc.)
    // Excluye carpetas de Next.js (_next)
    // Incluye todas las rutas de páginas y API
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ],
}