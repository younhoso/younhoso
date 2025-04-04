import { getSupabaseServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = getSupabaseServerClient();

  // OAuth 로그인 후 세션 처리
  const { data, error } = await (await supabase).auth.getSession();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ session: data.session });
}
