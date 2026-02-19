"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">Next.js</span>
          <span className="hidden text-muted-foreground sm:inline">Starter Kit</span>
        </Link>

        {/* 네비게이션 링크 */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
          >
            홈
          </Link>
          <Link
            href="/components"
            className="text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
          >
            컴포넌트
          </Link>
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
          >
            문서
          </Link>
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/components" className="hidden sm:inline">
            <Button size="sm" variant="outline">
              시작하기
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
