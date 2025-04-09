import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// Add paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/check',
  '/api/auth/logout'
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow access to public paths
  if (publicPaths.some(prefix => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow access to individual event pages
  if (path.match(/^\/events\/[^\/]+$/)) {
    return NextResponse.next();
  }

  // Check authentication for /events and its sub-paths
  if (path === '/events' || path.startsWith('/events/create')) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      verify(token, process.env.JWT_SECRET || 'your-secret-key');
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // For other protected routes
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // Redirect to login if no token is present
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the token
    verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return NextResponse.next();
  } catch {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 