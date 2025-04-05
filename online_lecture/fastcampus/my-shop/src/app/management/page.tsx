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
  });

  useEffect(() => {
    const fetchData = async () => {
      // 총 매출액 조회c
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

      setStats({ totalRevenue, totalUsers, recentPurchases });
    };

    fetchData();
  }, []);

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
        <div className="bg-white shadow-md rounded-lg p-4">
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
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
