import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/events(.*)',
  '/api/webhook/clerk',
  '/api/webhook/izipay',
  '/api/uploadthing',
  '/sign-in(.*)',
  '/sign-up(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Excluir explícitamente la ruta del webhook de Izipay del middleware
    '/((?!api/webhook/izipay|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes, EXCEPT izipay
    '/(api(?!/webhook/izipay)|trpc)(.*)',
  ],
};