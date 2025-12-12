import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  
  // Define valid routes
  const authPages = ['/login', '/signup'];
  const protectedPages = ['/dashboard', '/expenses', '/analytics'];
  
  const isAuthPage = authPages.some(page => pathname.startsWith(page));
  const isProtectedPage = protectedPages.some(page => pathname.startsWith(page));
  const isRootPage = pathname === '/';
  
  // Verify token if it exists
  let session = null;
  if (token) {
    session = await verifyToken(token);
  }

  // Handle root path (/)
  if (isRootPage) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protected pages - require authentication
  if (isProtectedPage) {
    if (!token || !session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Auth pages - redirect if already logged in
  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Any other route not defined above
  // Redirect to dashboard if logged in, otherwise to login
  if (session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
