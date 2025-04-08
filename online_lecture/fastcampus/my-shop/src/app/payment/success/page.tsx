// app/payment/success/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    if (paymentId) {
      // ✅ 성공 메시지 보여주기 또는 서버로 검증 요청
      console.log("결제 성공:", paymentId);
    } else {
      // 잘못된 접근일 경우 홈으로 이동
      router.replace("/");
    }
  }, [router, searchParams]);

  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold">🎉 결제가 완료되었습니다!</h1>
      <p className="mt-4">강의를 즐겨주세요 🙌</p>
    </main>
  );
}
