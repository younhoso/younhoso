"use client";
import NavigationTabs from "@/components/NavigationTabs";
import HeroSection from "@/components/HeroSection";
import CourseDetails from "../../constants/CourseDetails";
import KakaoLoginButton from "@/components/KakaoLoginButton";
import UserProfile from "@/components/UserProfile";
import PurchaseButton from "@/components/PurchaseButton";
import { COURSE_PRICE } from "../../constants/Pricing";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function Home() {
  useEffect(() => {
    const checkAdminRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        alert("관리자 권한이 필요합니다.");
        redirect("/");
      }
    };

    checkAdminRole();
  }, []);

  return (
    <main className="flex flex-col gap-2 lg:gap-8 row-start-2 items-center w-full lg:max-w-3xl mx-auto lg:px-8 px-2 pt-2">
      <UserProfile />
      <div className="sticky top-0 z-10 bg-white w-full">
        <NavigationTabs />
      </div>

      {/* 히어로 섹션 */}
      <HeroSection />
      {/* Kakao Login Button */}
      <div className="mt-4">
        <KakaoLoginButton />
      </div>

      {/* 상세 내용 섹션 */}
      <div className="w-full px-6 pb-36">
        <CourseDetails />
      </div>
      <PurchaseButton price={COURSE_PRICE.discounted} />
    </main>
  );
}
