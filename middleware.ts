import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Add cache headers for API routes
  if (url.pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return response;
  }

  // Handle API errors gracefully
  if (url.pathname.startsWith('/api/server')) {
    try {
      const response = await fetch(request.url);
      if (!response.ok) {
        return NextResponse.json(
          { 
            error: 'Service temporarily unavailable',
            message: 'The external service is currently experiencing issues. Please try again later.'
          },
          { status: 503 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Service unavailable',
          message: 'Unable to connect to the external service. Please check your connection and try again.'
        },
        { status: 503 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/anime/:path*',
    '/episode/:path*',
    '/film/:path*',
    '/series/:path*',
  ],
};