import { decode, getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { MYPAGES } from './constants';

// NOTE: absolute url에 0.0.0.0:3000이 들어가는 현상이 발생해서 임시로 만든 함수
const normalizeUrlForBug = (url: string) => {
  return url
    .replace('http://localhost:3000', '')
    .replace('http://0.0.0.0:3000', '')
    .replace('https://0.0.0.0:3000', '');
};

const useSecureCookies = (process.env.NEXTAUTH_URL ?? '').startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';

const name = `${cookiePrefix}next-auth.session-token`;

export async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/main.asp')) {
    return NextResponse.redirect('/');
  }

  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET!,
      raw: true,
    });
    const session = await decode({
      token: token,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    // ci-callback은 허용
    if (pathname.startsWith('/ci-callback')) {
      // do nothing
    } else if (session?.type === 'member') {
      if (pathname.startsWith('/member')) {
        // 로그인,회원가입 등 접근 제한
        return NextResponse.redirect(new URL('/mypage', req.url));
      }
    } else {
      // 게스트에게도 허용된 페이지
      const guestAllowedVisitedPages = MYPAGES.filter(page => !page.memberOnly).filter(
        page =>
          pathname.startsWith(page.href) ||
          (page.alternativeHref && pathname.startsWith(page.alternativeHref)),
      );

      // 멤버에게만 허용된 페이지
      const memberOnlyVisitedPages = MYPAGES.filter(page => page.memberOnly).filter(
        page =>
          pathname.startsWith(page.href) ||
          (page.alternativeHref && pathname.startsWith(page.alternativeHref)),
      );

      // 현재 접근하려는 페이지에 대해 게스트가 접근할 수 없는지 여부
      const guestForbidden = !guestAllowedVisitedPages.length && memberOnlyVisitedPages.length > 0;

      // redirections
      if (guestForbidden) {
        // 만약 대체 페이지가 있다면 거기로 이동
        if (
          memberOnlyVisitedPages.filter(
            page => page.guestAlternativeHref && page.guestAlternativeHref.trim().length,
          ).length > 0
        ) {
          return NextResponse.redirect(
            new URL(
              memberOnlyVisitedPages.filter(
                page => page.guestAlternativeHref && page.guestAlternativeHref.trim().length,
              )[0].guestAlternativeHref!,
              req.url,
            ),
          );
        }
        // 아니면 로그인 페이지로 이동
        else {
          return NextResponse.redirect(
            new URL(
              `/member/login?redirect_to=${encodeURIComponent(normalizeUrlForBug(req.url))}`,
              req.url,
            ),
          );
        }
      }
    }
  } catch (e) {
    const res = NextResponse.redirect(new URL('/', req.url));
    res.cookies.delete(name);
    return res;
  }
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
