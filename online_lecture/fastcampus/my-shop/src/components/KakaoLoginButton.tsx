"use client";
import { handleKakaoLogin } from "@/utils/supabase/supabaseClient";
import React from "react";

const KakaoLoginButton = () => {
  return (
    <button
      onClick={handleKakaoLogin}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
    >
      카카오톡으로 로그인
    </button>
  );
};

export default KakaoLoginButton;
