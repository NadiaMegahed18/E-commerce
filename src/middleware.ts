import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Get Authentication Tokens
  const jwt = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });
  const manualToken = req.cookies.get('token-user')?.value;
  const isAuthenticated = !!jwt || !!manualToken;

  // 2. Define Auth Pages and Public Pages
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';
  const isPublicPage = pathname === '/' || pathname.startsWith('/products') || pathname.startsWith('/categories') || pathname.startsWith('/brands');

  // 3. Logic
  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // 4. Protection: redirect to login if not authenticated and trying to access a protected route
  // If it's not a public page and not authenticated, redirect to login
  if (!isAuthenticated && !isPublicPage) {
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