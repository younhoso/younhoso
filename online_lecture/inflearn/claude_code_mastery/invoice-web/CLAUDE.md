# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 메모리

프로젝트 컨텍스트와 패턴은 [`memory/MEMORY.md`](./.claude/memory/MEMORY.md)를 참조할 것.

## 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # Next.js ESLint 검사
```

테스트 프레임워크는 현재 구성되어 있지 않습니다.

## 아키텍처 개요

**Next.js 15 App Router** 기반 스타터 키트로, 모든 소스 코드는 `src/` 디렉토리 아래에 있습니다.

### 레이아웃 구조

`src/app/layout.tsx`가 전체 앱을 감싸며 다음 순서로 렌더링됩니다:

```
ThemeProvider → Header → <main>{children}</main> → Footer
```

- `ThemeProvider`(`next-themes`)가 최상위에서 다크/라이트 모드를 제공
- `Header`와 `Footer`는 모든 페이지에 공통으로 표시
- `Header`는 `"use client"` 컴포넌트 (ModeToggle 포함)

### 테마 시스템

3개 레이어로 구성됩니다:

1. **CSS 변수** (`src/app/globals.css`): `:root`와 `.dark`에 HSL 값 정의 (예: `--primary: 0 0% 9%`)
2. **Tailwind 매핑** (`tailwind.config.ts`): CSS 변수를 Tailwind 색상 토큰으로 연결 (예: `primary: "hsl(var(--primary))"`)
3. **next-themes**: `attribute="class"`로 `.dark` 클래스를 `<html>`에 토글

새 색상을 추가하려면 `globals.css`의 `:root`/`.dark`와 `tailwind.config.ts` 두 곳 모두 수정해야 합니다.

### 컴포넌트 패턴

UI 컴포넌트(`src/components/ui/`)는 shadcn/ui 패턴을 따릅니다:

- `cva`(class-variance-authority)로 variant 정의
- `cn()` 헬퍼(`src/lib/utils.ts`)로 클래스 병합: `twMerge(clsx(inputs))`
- `React.forwardRef` + `displayName` 설정

```tsx
// 컴포넌트 추가 시 기본 패턴
const variants = cva("기본-스타일", {
  variants: { variant: {...}, size: {...} },
  defaultVariants: { variant: "default" }
})
export interface Props extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof variants> {}
```

### 경로 별칭

`@/*` → `./src/*` (tsconfig.json에 설정됨)

```tsx
import { Button } from "@/components/ui/Button"; // src/components/ui/Button.tsx
import { cn } from "@/lib/utils"; // src/lib/utils.ts
```

### 페이지 라우팅

- `/` → `src/app/page.tsx`
- `/components` → `src/app/components/page.tsx`

새 페이지는 `src/app/[경로]/page.tsx` 형태로 추가합니다.

## 샌드박스 제약사항

`.claude/claude-sandbox.conf`에 정의된 실행 환경 제약입니다.

- **파일 쓰기**: 프로젝트 디렉토리(`invoice-web/`) 내부에만 허용, 외부 경로 쓰기 금지
- **파일 삭제**: `rm` 명령어 실행 금지 (`/bin/rm` 차단)
- **네트워크**: 외부 네트워크 아웃바운드 연결 금지

> 파일 삭제가 필요한 경우 `rm` 대신 다른 방법을 사용하거나 사용자에게 안내할 것.
