"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { User } from "@/types/user";

export default function UserProfile() {
  const [users, setUsers] = useState<User | null>(null);

  // Supabase 세션 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      // 현재 세션을 먼저 확인
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        // 세션이 있으면 사용자 정보 가져오기
        setUsers(session.user as User);
      }
    };

    fetchUser();

    // 세션 상태 변화 리스너 설정
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUsers(session?.user as User);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe(); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  // 로그아웃 처리
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUsers(null); // 로그아웃 후 유저 상태를 null로 설정
  };

  return (
    <div className="flex items-center gap-4">
      {users && (
        <>
          <Avatar>
            <AvatarImage src={users.identities[0].identity_data.avatar_url} />
            <AvatarFallback>사용자</AvatarFallback>
          </Avatar>
          <div>
            <p>{users.identities[0].identity_data.name}</p>
            <p>{users?.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="ml-4">
            로그아웃
          </Button>
        </>
      )}
    </div>
  );
}
