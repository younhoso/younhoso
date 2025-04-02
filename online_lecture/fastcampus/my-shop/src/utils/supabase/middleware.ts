import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user && // 로그인이 안 되어 있고
    !request.nextUrl.pathname.startsWith("/login") && // 현재 URL이 /login이 아니고
    !request.nextUrl.pathname.startsWith("/auth") && //auth도 아니고
    !request.nextUrl.pathname.startsWith("/") // 홈("/") 페이지도 아닐 때
  ) {
    // 사용자가 없으면 사용자를 로그인 페이지로 리디렉션
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url); // 로그인 페이지 대신 홈("/")으로 리디렉션
  }

  return supabaseResponse;
}
