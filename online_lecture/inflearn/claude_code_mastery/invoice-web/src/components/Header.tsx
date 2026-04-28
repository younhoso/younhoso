"use client";

/**
 * 공통 헤더 컴포넌트
 * 견적서 공유 서비스 로고와 다크모드 토글 표시
 */

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { FileText } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 print:hidden">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FileText className="w-5 h-5 text-primary" />
          <span className="text-base font-bold">견적서</span>
        </Link>

        {/* 우측 액션 */}
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
