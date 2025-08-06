import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Asegúrate de que todas estas rutas, incluida la de inicio y éxito, sean públicas.
  publicRoutes: [
    '/',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
    '/success',
  ],

  // Rutas que Clerk debe ignorar completamente.
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
  ],
});

export const config = {
  // El matcher protege todas las rutas por defecto, incluidas las rutas de la API.
  // Esto asegura que el middleware se ejecute en casi todo, EXCEPTO en las rutas
  // que explícitamente ignoramos para evitar interferencias.
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};