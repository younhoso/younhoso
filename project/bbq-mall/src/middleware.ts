import { decode, getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { mobilePcRegex } from './hooks/useGetReplacedPathname';

const mobileRegex = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|bbqapp/i;

export async function middleware(req: NextRequest, _: NextFetchEvent) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();

  const isMobileDevice = mobileRegex.test(req.headers.get('user-agent') ?? '');

  const redirectTo = (dest: string) => NextResponse.redirect(new URL(dest, url));

  if (url.pathname.includes('/sign/in') && !url.pathname.includes('/sign/ing')) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET!,
      raw: true,
    });

    try {
      const decoded = await decode({ token, secret: process.env.NEXTAUTH_SECRET! });
      if (token && decoded?.type !== 'guest') {
        return redirectTo('/');
      }
    } catch (e) {
      return redirectTo('/');
    }
  }

  if (
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.xml') ||
    url.pathname.endsWith('.txt')
  ) {
    return res;
  }

  if (!mobilePcRegex.test(url.pathname)) {
    if (isMobileDevice) {
      return redirectTo(`/mobile${url.pathname}${url.search}`);
    }
    return redirectTo(`/pc${url.pathname}${url.search}`);
  }

  const isMobilePath = /^\/mobile.*$/.test(url.pathname);
  const replaced = url.pathname.replace(mobilePcRegex, '');

  if (isMobileDevice && !isMobilePath) {
    return redirectTo('/mobile' + replaced);
  }

  if (!isMobileDevice && isMobilePath) {
    return redirectTo('/pc' + replaced);
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
