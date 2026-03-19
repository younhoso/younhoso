---
name: project_architecture
description: nextjs-starter-kit의 핵심 아키텍처 패턴, 컴포넌트 구조, 주요 라이브러리 버전 현황
type: project
---

## 아키텍처 개요

- Next.js 15 App Router, React 19, TypeScript strict 모드
- Tailwind CSS v4 (PostCSS 방식, tailwind.config.ts 없음 — globals.css에서 직접 CSS 변수 정의)
- shadcn/ui 패턴: cva + cn() + displayName 구조

## 컴포넌트 분류

### Server Components (기본)
- src/app/page.tsx
- src/app/components/page.tsx
- src/components/Footer.tsx

### Client Components ("use client")
- src/app/examples/form/page.tsx
- src/components/Header.tsx
- src/components/mode-toggle.tsx
- src/components/theme-provider.tsx
- src/components/ui/Dialog.tsx
- src/components/ui/DropdownMenu.tsx
- src/components/ui/Select.tsx
- src/components/ui/Tabs.tsx
- src/components/ui/Sonner.tsx
- src/components/ui/RadixDemos.tsx

### 순수 UI (Server-safe)
- Button, Card, Input, Label, Badge, Alert, Avatar, Skeleton, Separator, Textarea

## 주요 라이브러리
- zustand 5.0.5 (devtools 미들웨어 사용)
- @tanstack/react-query 5.x (staleTime 5분, refetchOnWindowFocus false)
- react-hook-form 7.x + zod 4.x + @hookform/resolvers
- sonner 2.x (next-themes 연동)
- @radix-ui/* 다수

## Why / How to apply
**Why:** 스타터 킷 구조 파악을 위해 전체 코드 리뷰 시 확인
**How to apply:** 컴포넌트 분류 판단 시 이 목록 참조. Tailwind v4는 tailwind.config.ts 없이 globals.css에서 CSS 변수 정의함을 기억.
