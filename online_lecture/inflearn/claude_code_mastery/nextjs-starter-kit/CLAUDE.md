# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## .claude 디렉토리 구조

```
.claude/
├── agent-memory/   # 서브 에이전트 전용 영구 메모리
├── agents/         # 커스텀 에이전트 정의
├── memory/         # Claude Code(메인 대화)가 대화 간 지속되는 프로젝트 컨텍스트 메모리
├── skills/         # 재사용 가능한 슬래시 커맨드 스킬
└── settings.json   # Claude Code 프로젝트 설정
```

## 메모리

프로젝트 컨텍스트와 패턴은 [`.claude/memory/MEMORY.md`](./.claude/memory/MEMORY.md)를 참조할 것.

## 패키지 매니저

**yarn만 사용한다. npm은 절대 사용하지 않는다.**

```bash
yarn dev          # 개발 서버 (http://localhost:3000)
yarn build        # 프로덕션 빌드
yarn start        # 프로덕션 서버
yarn lint         # ESLint 검사
yarn add <pkg>    # 의존성 추가
yarn add -D <pkg> # dev 의존성 추가
```

shadcn 컴포넌트 추가는 예외적으로 npx를 사용한다:

```bash
npx shadcn add <component>
```

테스트 프레임워크는 구성되어 있지 않습니다.

## 아키텍처

### 레이아웃 렌더링 순서

`src/app/layout.tsx`가 전체 앱을 감싸며 다음 순서로 렌더링됩니다:

```
QueryProvider → ThemeProvider → Header → <main>{children}</main> → Footer → Toaster
```

### 컴포넌트 구조

```
src/components/
├── layout/     # Header, Footer, mode-toggle — 레이아웃 전용
├── providers/  # ThemeProvider (next-themes), QueryProvider (TanStack Query)
└── ui/         # shadcn/ui 패턴의 재사용 컴포넌트
```

새 페이지는 `src/app/[경로]/page.tsx`, 새 UI 컴포넌트는 `src/components/ui/[Name].tsx`에 추가합니다.

### 상태 관리

| 레이어 | 위치 | 용도 |
|--------|------|------|
| 전역 클라이언트 상태 | `src/stores/` (Zustand + devtools) | UI 상태, 페이지 간 유지 |
| 서버 상태 | `useQuery` / `useMutation` | API 데이터 캐싱·동기화 |
| 폼 상태 | `react-hook-form` + `zodResolver` | 유효성 검사 |

zod 스키마는 `src/lib/validations.ts`에 모아 정의하고, `z.infer<>`로 타입을 자동 생성합니다. Radix UI의 비제어 컴포넌트(Select 등)는 `Controller`로 감쌉니다.

### 테마 시스템

3개 레이어가 연동됩니다:

1. **`src/app/globals.css`**: `:root` / `.dark`에 HSL CSS 변수 정의 (예: `--primary: 0 0% 9%`)
2. **`tailwind.config.ts`**: CSS 변수를 Tailwind 색상 토큰으로 매핑 (예: `primary: "hsl(var(--primary))"`)
3. **`next-themes`**: `attribute="class"`로 `<html>`에 `.dark` 클래스 토글

새 색상 추가 시 `globals.css`와 `tailwind.config.ts` **두 곳 모두** 수정해야 합니다. Tailwind CSS v4는 `@tailwind` 디렉티브 대신 `@import "tailwindcss"`를 사용합니다.

### 컴포넌트 패턴 (React 19+)

**React 19부터 `forwardRef`가 불필요합니다.** `ref`를 일반 prop으로 직접 받습니다:

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva("base-styles", {
  variants: {
    variant: { default: "...", outline: "...", ghost: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "md" },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  ref?: React.Ref<HTMLDivElement>
}

export function Component({ className, variant, size, ref, ...props }: ComponentProps) {
  return (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

### 경로 별칭

`@/*` → `./src/*` (tsconfig.json `paths` 설정)

### 개발 도구

- **ESLint + Prettier**: `prettier-plugin-tailwindcss`로 Tailwind 클래스 자동 정렬
- **Husky + lint-staged**: 커밋 시 자동 lint/format 실행
