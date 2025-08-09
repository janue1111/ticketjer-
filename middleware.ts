import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define las rutas que estarán protegidas
const isProtectedRoute = createRouteMatcher([
  '/events/:id/update',
  '/events/create',
  '/orders',
  '/profile',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ['/((?!.+\.[\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};