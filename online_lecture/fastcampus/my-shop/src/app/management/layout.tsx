"use client";

import clsx from "clsx";
import { useEffect, useState, ReactNode } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

const Management = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) redirect("/");

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile?.role !== "admin") {
          alert("관리자 권한이 필요합니다.");
          redirect("/");
        }
        setIsLoading(true);
      } catch (error) {
        console.error("권한 확인 중 오류 발생:", error);
        redirect("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminRole();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={clsx("flex flex-col items-center p-4")}>
      <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );
};

export default Management;
