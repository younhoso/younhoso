import { getToken } from 'next-auth/jwt';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: true });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/signin')) {
    if (session) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    if (!session) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
