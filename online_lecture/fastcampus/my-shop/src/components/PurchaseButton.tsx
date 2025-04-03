"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { COURSE_PRICE } from "../../constants/Pricing";
import * as PortOne from "@portone/browser-sdk/v2";

type PurchaseButtonProps = {
  price: number;
};

export default function PurchaseButton({ price }: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }

      // 결제 요청
      const response = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-3978f4d4-7706-4773-b9e9-48c503bb60e6",
        // 채널 키 설정
        channelKey: "channel-key-8ca3026a-942a-4a78-a6e4-b0efd57c147a",
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: "Supa 강의",
        totalAmount: price,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
        redirectUrl: `${window.location.origin}/api/payment/complete`,
      });

      console.log("✅ 결제 응답:", response); // 결제 응답 확인

      // 결제 성공 시 DB에 저장
      const { error: insertError } = await supabase.from("purchases").insert([
        {
          user_id:
            user.identities?.[0].identity_data?.full_name ?? "Unknown User",
          status: "completed",
          payment_id: `payment-${crypto.randomUUID()}`,
          amount: COURSE_PRICE.original,
          created_at: new Date().toISOString(),
        },
      ]);
      console.log("❌ insertError:", insertError);

      if (response?.pgCode === "FAILURE_TYPE_PG") {
        alert("결제가 실패했습니다.");
        // 결제 실패 후 처리 로직
      }

      // 팝업 창이 닫혔을 때 상태 업데이트
      if (response?.pgCode === "PAY_PROCESS_CANCELED") {
        // 상태에 따라 UI 업데이트
        alert("결제가 취소되었습니다.");
        return;
      }

      if (!response?.pgCode) {
        alert("구매가 완료되었습니다.!");
        return;
      }
    } catch (e) {
      console.error("❌ 오류 발생:", e);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm p-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center space-y-2">
        <span className="text-lg font-semibold">
          가격: {COURSE_PRICE.discounted.toLocaleString()}원
        </span>
      </div>
      <button
        onClick={handlePurchase}
        disabled={loading}
        className={`px-4 py-2 w-full text-center rounded ${
          loading ? "bg-gray-400" : "bg-black text-white"
        }`}
      >
        {loading ? "구매 중..." : "수강권 구매하기"}
      </button>
    </div>
  );
}
