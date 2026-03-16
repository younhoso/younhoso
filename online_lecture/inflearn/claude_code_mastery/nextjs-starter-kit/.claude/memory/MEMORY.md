# nextjs-starter-kit 프로젝트 메모리

> 상세 정보: [project-details.md](./project-details.md)

## 프로젝트 개요
- **목적**: 인프런 Claude Code 마스터리 강의용 Next.js 스타터 키트
- **스택**: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui

## 핵심 구조
```
src/
├── app/          # 페이지 라우팅 (App Router)
├── components/   # 공통 컴포넌트 (ui/, Header, Footer)
├── providers/    # QueryProvider (TanStack Query)
├── stores/       # Zustand 상태관리
├── lib/          # utils.ts, validations.ts
└── types/        # TypeScript 타입 정의
```

## 주요 패턴
- 컴포넌트: `cva` + `cn()` + `React.forwardRef` (shadcn/ui 패턴)
- 경로 별칭: `@/*` → `./src/*`
- 테마: `next-themes` (attribute="class"), CSS 변수 + Tailwind 매핑

## 의존성 요약
- UI: Radix UI, shadcn/ui, lucide-react, sonner
- 상태: Zustand, TanStack Query v5
- 폼: react-hook-form + zod
- 스타일: Tailwind CSS v4, class-variance-authority, tailwind-merge
