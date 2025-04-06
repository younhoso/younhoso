"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import clsx from "clsx";

const ManagementPage = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    recentPurchases: [] as {
      id: string;
      email: string;
      amount: number;
      created_at: Date;
      user_id: string;
    }[],
    monthlyStats: [] as { month: string; revenue: number }[],
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

    // 총 사용자 수 조회
    const { data: usersData } = await supabase
      .from("profiles")
      .select("id", { count: "exact" });
    const totalUsers = usersData ? usersData.length : 0;

    // 최근 구매 내역 조회
    const { data: purchasesData } = await supabase
      .from("purchases")
      .select("id, email, amount, created_at, user_id")
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(5);
    const recentPurchases = purchasesData || [];

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
      totalUsers,
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
          <p className="text-lg font-semibold">
            총 매출액: {stats.totalRevenue}원
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <p className="text-lg font-semibold">
            총 사용자 수: {stats.totalUsers}명
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">월별 매출</h2>
          <ul>
            {stats.monthlyStats.map((monthData, index) => (
              <li key={index} className="border-b last:border-none py-2">
                <div className="flex justify-between">
                  <p className="font-medium">{monthData.month}</p>
                  <p className="text-lg font-semibold">{monthData.revenue}원</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">최근 구매 내역</h2>
          <ul>
            {stats.recentPurchases.map((purchase, index) => (
              <li key={index} className="border-b last:border-none py-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{purchase.user_id}</p>
                    <p className="text-sm text-gray-600">{purchase.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{purchase.amount}원</p>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleCancelPurchase(purchase.id)}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 ">
          <h2 className="text-xl font-bold">월 평균 매출</h2>
          <p className="text-sm text-gray-600 mb-2">최근 6개월 평균 매출액</p>
          <p className="text-lg font-semibold">
            {stats.monthlyAverage.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
