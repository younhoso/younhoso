"use client";

import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function NavigationTabs() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAdminTabClick = () => {
    router.push("/management");
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session?.user);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Tabs defaultValue="product" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">상품</TabsTrigger>

        {isLoggedIn && (
          <TabsTrigger value="password" onClick={handleAdminTabClick}>
            마이페이지
          </TabsTrigger>
        )}
      </TabsList>
    </Tabs>
  );
}
