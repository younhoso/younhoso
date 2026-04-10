# nextjs-starter-kit 상세 정보

## 레이아웃 렌더링 순서
```
ThemeProvider → Header → <main>{children}</main> → Footer
```
- `src/app/layout.tsx`가 전체 앱 감싸기
- `Header`는 `"use client"` (ModeToggle 포함)

## 페이지 목록
| 경로 | 파일 |
|------|------|
| `/` | `src/app/page.tsx` |
| `/components` | `src/app/components/page.tsx` |
| `/examples/form` | `src/app/examples/form/page.tsx` |

## 테마 시스템 3레이어
1. `src/app/globals.css` → `:root` / `.dark` HSL CSS 변수
2. `tailwind.config.ts` → CSS 변수를 Tailwind 토큰으로 연결
3. `next-themes` → `<html>`에 `.dark` 클래스 토글

새 색상 추가 시 **globals.css + tailwind.config.ts 두 곳 모두** 수정 필요

## UI 컴포넌트 패턴 (shadcn/ui)
```tsx
const variants = cva("기본-스타일", {
  variants: { variant: {...}, size: {...} },
  defaultVariants: { variant: "default" }
})
export interface Props extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof variants> {}
```
- `src/lib/utils.ts`: `cn()` = `twMerge(clsx(inputs))`
- `src/lib/validations.ts`: zod 스키마 정의

## 상태 관리
- **Zustand**: `src/stores/counter.ts` (전역 상태)
- **TanStack Query**: `src/providers/QueryProvider.tsx` (서버 상태)

## 개발 도구
- ESLint + Prettier (prettier-plugin-tailwindcss)
- Husky + lint-staged (커밋 훅)
- shadcn CLI (`npx shadcn add [component]`)
