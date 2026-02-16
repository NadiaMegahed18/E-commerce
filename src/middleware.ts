import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Get JWT Token
  const jwt = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  // 2. Define Auth Pages
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';

  // 3. Logic
  if (isAuthPage) {
    if (jwt) {
      // If logged in, don't let them go to login/signup, redirect to home
      return NextResponse.redirect(new URL('/', req.url));
    }
    // If not logged in, they CAN access auth pages
    return NextResponse.next();
  }

  // 4. Protection: redirect to login if not authenticated and trying to access a protected route
  if (!jwt) {
    const loginUrl = new URL('/login', req.url);
    // Optional: save the current path to redirect back after login
    // loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}