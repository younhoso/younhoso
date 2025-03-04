import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();
  const isAuthPage = url.pathname.startsWith("/auth/signin"); // 로그인 페이지 확인

  // 세션 상태 확인
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
    raw: true,
  });

  const redirectTo = (dest: string) =>
    NextResponse.redirect(new URL(dest, url));

  if (!session) {
    // 로그인 상태가 아니면, 로그인 페이지는 접근 가능, 나머지는 그대로 유지
    if (isAuthPage) {
      return res;
    }
    return res;
  }

  if (isAuthPage) {
    // 로그인 상태일 때, 로그인 페이지로 접근하면 main 경로로 리디렉션
    return redirectTo("/"); // 로그인된 사용자의 리디렉션 경로
  }

  return res;
}

export const config = {
  matcher: ["/public/:path*", "/auth/signin"],
};
