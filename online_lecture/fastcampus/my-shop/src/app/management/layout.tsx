"use client";

import clsx from "clsx";
import { useEffect, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Management = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminRole = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.error("권한 확인 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdminRole();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={clsx("flex flex-col items-center p-4")}>
      <h1 className="text-2xl font-bold mb-4">마이 페이지</h1>
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );
};

export default Management;
