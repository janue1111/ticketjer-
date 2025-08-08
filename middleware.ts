import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define las rutas que no estarán protegidas
const isProtectedRoute = createRouteMatcher([
  '/events/:id/update',
  '/events/create',
  '/orders',
  '/profile',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};