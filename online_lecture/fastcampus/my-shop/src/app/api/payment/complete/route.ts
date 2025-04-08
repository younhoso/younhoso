import { supabase } from "@/utils/supabase/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get("paymentId"); // 대소문자 정확히 확인

  if (!paymentId) {
    return NextResponse.json(
      { error: "paymentId가 없습니다." },
      { status: 400 }
    );
  }

  // 결제 정보 조회
  const paymentResponse = await fetch(
    `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
    {
      headers: { Authorization: `PortOne ${process.env.PORTONE_API_SECRET}` },
    }
  );

  if (!paymentResponse.ok) {
    return NextResponse.json(
      { error: "결제 정보를 가져오는 데 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?paymentId=${paymentId}`
  );
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  console.log("searchParams:", searchParams);
  const paymentId = searchParams.get("paymentid");
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!paymentId) {
    return NextResponse.json(
      { error: "paymentid가 없습니다." },
      { status: 400 }
    );
  }

  if (!user || !user.identities || user.identities.length === 0) {
    return NextResponse.json(
      { error: "사용자 정보를 가져올 수 없습니다." },
      { status: 401 }
    );
  }

  // 사용자 이름 안전하게 추출
  const userName =
    user.identities[0]?.identity_data?.full_name || "Unknown User";

  // 1. 포트원 결제내역 단건조회 API 호출
  const paymentResponse = await fetch(
    `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
    {
      headers: { Authorization: `PortOne ${process.env.PORTONE_API_SECRET}` },
    }
  );

  if (!paymentResponse.ok)
    throw new Error(`paymentResponse: ${await paymentResponse.json()}`);
  const payment = await paymentResponse.json();

  // purchases 테이블의 상태 업데이트
  const { error } = await supabase
    .from("purchases")
    .insert({
      user_id: userName,
      status: "completed",
      payment_id: paymentId,
      amount: payment.amount.total,
    })
    .select();

  if (error) {
    throw error;
  }

  return NextResponse.json({ message: "결제가 완료되었습니다.", paymentId });
}
