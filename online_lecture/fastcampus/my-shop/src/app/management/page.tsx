"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import clsx from "clsx";
import { DashboardStats } from "@/types/purchase";

const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed":
      return "결제 완료";
    case "cancelled":
      return "결제 취소";
    default:
      return status;
  }
};

const ManagementPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    recentPurchases: [],
    monthlyStats: [],
    monthlyAverage: 0,
  });

  const fetchData = async () => {
    // 총 매출액 조회
    const { data: revenueData } = await supabase
      .from("purchases")
      .select("amount");
    const totalRevenue = (revenueData || []).reduce(
      (acc: number, purchase: { amount: number }) => acc + purchase.amount,
      0
    );

    // 최근 구매 내역 조회
    const { data: purchasesData } = await supabase
      .from("purchases")
      .select("id, email, amount, created_at, status, user_id, user_name")
      .in("status", ["completed", "cancelled"])
      .order("created_at", { ascending: false })
      .limit(5);
    const recentPurchases = purchasesData || [];
    console.log("recentPurchases", recentPurchases);

    // 월별 매출 통계 조회
    const { data: monthlyRevenueData } = await supabase
      .from("purchases")
      .select("amount, created_at")
      .eq("status", "completed");

    // 월별 데이터 가공
    const monthlyStats = (monthlyRevenueData || []).reduce(
      (
        acc: { [key: string]: number },
        purchase: { amount: number; created_at: Date }
      ) => {
        const month = new Date(purchase.created_at).toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += purchase.amount;
        return acc;
      },
      {}
    );

    // 최근 6개월 데이터만 추출하고 배열로 변환
    const last6Months = Object.entries(monthlyStats || [])
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 6)
      .reverse()
      .map(([month, revenue]) => ({ month, revenue }));

    // 월 평균 매출 계산
    const monthlyAverage =
      last6Months.reduce((acc, { revenue }) => acc + revenue, 0) /
      last6Months.length;

    setStats({
      totalRevenue,
      recentPurchases,
      monthlyStats: last6Months || [],
      monthlyAverage: monthlyAverage || 0,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancelPurchase = async (purchaseId: string) => {
    try {
      const { error } = await supabase
        .from("purchases")
        .update({ status: "cancelled" })
        .eq("id", purchaseId);

      if (error) {
        console.error("구매 취소 오류:", error);
      } else {
        // 성공적으로 취소된 경우, UI를 업데이트하거나 알림을 표시할 수 있습니다.
        alert("구매가 성공적으로 취소되었습니다");
        fetchData();
      }
    } catch (error) {
      console.error("구매 취소 오류:", error);
    }
  };

  return (
    <div className={clsx("flex flex-col items-center p-4")}>
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">최근 구매 내역</h2>
          <ul>
            {stats.recentPurchases.map((purchase, index) => {
              const isCompleted = purchase.status === "completed";

              return (
                <li key={index} className="border-b last:border-none py-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{purchase.user_name}</p>
                      <p className="text-sm text-gray-600">{purchase.email}</p>
                      <p
                        className={
                          purchase.status === "completed"
                            ? "text-green-600"
                            : purchase.status === "cancelled"
                            ? "text-red-500"
                            : "text-gray-600"
                        }
                      >
                        {getStatusLabel(purchase.status)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {purchase.amount.toLocaleString("ko-KR")}원
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(purchase.created_at).toLocaleString("ko-KR")}
                      </p>

                      {isCompleted && (
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleCancelPurchase(purchase.id)}
                        >
                          취소
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 ">
          <h2 className="text-xl font-bold">월 평균 소비 통계</h2>
          <p className="text-sm text-gray-600 mb-2">최근 6개월 평균 매출액</p>
          <p className="text-lg font-semibold">
            {stats.monthlyAverage.toLocaleString("ko-KR")}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
