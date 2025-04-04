import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase/supabaseClient"; // Supabase 클라이언트를 설정했다고 가정합니다.
import { User } from "@supabase/supabase-js"; // Supabase의 User 타입을 가져옵니다.

const useAuth = () => {
  const [users, setUsers] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUsers(session?.user ?? null);
      } catch (error) {
        console.error("세션을 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsers(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUsers(null);
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다:", error);
    }
  };

  return { users, handleLogout };
};

export default useAuth;
