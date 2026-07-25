# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## .claude 디렉토리 구조

```
.claude/
├── agent-memory/   # 서브 에이전트(code-reviewer 등) 전용 영구 메모리
├── agents/         # 커스텀 에이전트 정의 (code-reviewer.md)
├── memory/         # Claude Code(메인 대화)가 대화 간 지속되는 프로젝트 컨텍스트 메모리
├── plans/          # /plan 모드에서 생성되는 작업 계획 파일
├── skills/         # 재사용 가능한 슬래시 커맨드 스킬 (git-commit, add-page, add-component, review-ui)
└── settings.json   # Claude Code 프로젝트 설정 — PreToolUse/PostToolUse/SessionStart 등 훅이 여기 인라인으로 정의됨
```

`.claude/settings.json`의 `PostToolUse` 훅은 `.ts/.tsx/.js/.css/.json/.md` 등 확장자를 건드리는 모든 도구 호출에 대해 `prettier --write`를 실행합니다. **이 정규식은 Read 같은 조회성 도구의 `file_path` 인자에도 매칭되므로, 해당 파일을 단순히 읽기만 해도 prettier가 재저장하며 파일 mtime이 바뀝니다.** dev 서버를 띄운 채로 소스를 많이 Read하면 예상치 못한 Fast Refresh가 발생할 수 있음에 유의합니다.

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

**테스트 프레임워크는 구성되어 있지 않습니다.** `playwright`는 devDependency로 설치되어 있지만 e2e 테스트 러너(`playwright.config.ts`)가 아니라 `.mcp.json`에 등록된 **Playwright MCP 서버**(Claude Code의 브라우저 자동화용)로만 쓰입니다.

**ESLint 설정 파일이 저장소에 없습니다.** `eslint`, `eslint-config-next`, `eslint-config-prettier`가 devDependency로는 있지만 `.eslintrc*`/`eslint.config.*`가 없으므로 `yarn lint`를 처음 실행하면 Next.js가 설정 생성 여부를 대화형으로 물어봅니다. `husky`/`lint-staged`도 devDependency로만 존재하며 `.husky/` 디렉터리나 `prepare` 스크립트가 없어 **커밋 시 자동 실행되는 git hook은 현재 없습니다** — 대신 위에서 설명한 Claude Code의 `PostToolUse` 훅이 도구 사용 시점에 prettier 포맷팅을 대신하고 있습니다.

## 아키텍처

### 레이아웃 렌더링 순서

`src/app/layout.tsx`가 전체 앱을 감싸며 다음 순서로 렌더링됩니다:

```
QueryProvider → ThemeProvider → Header → <main>{children}</main> → Footer → Toaster
```

### 컴포넌트 구조

```
src/
├── app/        # App Router 페이지 (page.tsx, layout.tsx, globals.css)
├── components/
│   ├── layout/     # Header, Footer, mode-toggle — 레이아웃 전용
│   ├── providers/  # ThemeProvider (next-themes), QueryProvider (TanStack Query)
│   └── ui/         # shadcn/ui 패턴의 재사용 컴포넌트
├── lib/        # utils.ts (cn 헬퍼), validations.ts (zod 스키마 모음)
├── stores/     # Zustand 스토어 (예: counter.ts)
└── types/      # 공용 TypeScript 타입 정의
```

새 페이지는 `src/app/[경로]/page.tsx`, 새 UI 컴포넌트는 `src/components/ui/[Name].tsx`에 추가합니다.

### 상태 관리

| 레이어 | 위치 | 용도 |
|--------|------|------|
| 전역 클라이언트 상태 | `src/stores/` (Zustand + devtools 미들웨어) | UI 상태, 페이지 간 유지 |
| 서버 상태 | `useQuery` / `useMutation` (TanStack Query) | API 데이터 캐싱·동기화 |
| 폼 상태 | `react-hook-form` + `zodResolver` | 유효성 검사 |

zod 스키마는 `src/lib/validations.ts`에 모아 정의하고, `z.infer<>`로 타입을 자동 생성합니다. Radix UI의 비제어 컴포넌트(Select 등)는 `Controller`로 감쌉니다 (`src/app/examples/form/page.tsx`가 react-hook-form + zod + zustand + sonner + Radix Select/Dialog 통합 예시).

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

`src/components/ui/`의 모든 Radix 래퍼(Select, Dialog, DropdownMenu, Tabs 등)가 이 패턴을 따릅니다.

### 경로 별칭

`@/*` → `./src/*` (tsconfig.json `paths` 설정)

### 개발 도구

- **ESLint + Prettier**: `prettier-plugin-tailwindcss`로 Tailwind 클래스 자동 정렬 (단, 위 "패키지 매니저" 절 참고 — ESLint 설정 파일 자체는 아직 없음)
- 커밋 시 자동 lint/format을 걸고 싶다면 `husky`/`lint-staged`를 실제로 초기화(`.husky/` + `prepare` 스크립트)해야 함 — 현재는 devDependency만 설치된 상태

### 알려진 이슈: 상위 폴더의 중복 lockfile

이 프로젝트는 `/Users/mac/Documents/work/younhoso/` 아래 여러 인프런 강의 폴더 중 하나이며, 상위 폴더에도 별도의 `yarn.lock`이 존재합니다. Next.js가 이를 모노레포로 착각해 워크스페이스 루트를 잘못 추론하는 경고가 뜰 수 있어 `next.config.js`에 `outputFileTracingRoot`를 명시해 고정해 두었습니다. 새로 `next.config.js`를 건드릴 때 이 설정을 지우지 않도록 주의합니다.
