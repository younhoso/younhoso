"use client";

import React from "react";

interface KakaoLoginButtonProps {
  onClick: () => void;
}

const KakaoLoginButton = ({ onClick }: KakaoLoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
    >
      카카오톡으로 로그인
    </button>
  );
};

export default KakaoLoginButton;
