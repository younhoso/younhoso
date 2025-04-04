import { createClient } from "@supabase/supabase-js";

// 환경 변수에서 Supabase URL과 익명 키를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase 클라이언트를 생성합니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 카카오톡 로그인 함수
export const handleKakaoLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) throw error;
  } catch (err: unknown) {
    console.error(
      "카카오 로그인 오류:",
      err instanceof Error ? err.message : String(err)
    );
  }
};
