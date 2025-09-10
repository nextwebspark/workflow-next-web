import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes starting with /dashboard
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Redirect to dashboard after successful sign-in
  const { userId } = await auth();
  if (userId && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
  runtime: 'nodejs', // Ensure Node.js runtime for crypto support
};
