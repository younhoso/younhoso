import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  console.log(url);
  // 특정 폴더로의 접근을 감지
  if (url.pathname.startsWith('/특정-폴더/')) {
    // NextResponse.rewrite를 사용하여 현재 URL을 유지
    // 이 경우, 서버는 클라이언트로 페이지를 다시 전송하지 않고 URL은 변경되지 않습니다.
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
