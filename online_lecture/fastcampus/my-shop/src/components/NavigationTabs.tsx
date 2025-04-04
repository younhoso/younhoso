"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useRouter } from "next/navigation";

export default function NavigationTabs() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        setIsAdmin(profile?.role === "admin");
      }
    };

    checkAdminRole();
  }, []);

  const handleAdminTabClick = () => {
    if (isAdmin) {
      router.push("/management");
    } else {
      alert("관리자 권한이 필요합니다.");
      router.push("/");
    }
  };

  return (
    <Tabs defaultValue="product" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">상품</TabsTrigger>
        {isAdmin && (
          <TabsTrigger value="password" onClick={handleAdminTabClick}>
            관리
          </TabsTrigger>
        )}
      </TabsList>
    </Tabs>
  );
}
