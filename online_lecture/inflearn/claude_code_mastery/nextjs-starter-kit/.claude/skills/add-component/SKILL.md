---
description: "새 shadcn/ui 스타일의 React 컴포넌트를 생성합니다"
argument-hint: "<컴포넌트명> (예: /add-component Card)"
allowed-tools: ["Read", "Write", "Edit", "Glob", "Grep"]
---

# 스킬: add-component

새 shadcn/ui 스타일의 React 컴포넌트를 생성합니다.

## 사용법

```
/add-component <컴포넌트명>
```

## 프로세스

1. `$ARGUMENTS`를 컴포넌트 이름으로 사용
2. `src/components/$ARGUMENTS.tsx` 파일 생성
3. `src/app/components/page.tsx`에 예시 사용법 추가

## 생성 규칙

- TypeScript + React 함수형 컴포넌트
- `cva`(class-variance-authority)로 variant 정의
- `cn()` 헬퍼 (`@/lib/utils`)로 클래스 병합
- **React 19+**: `forwardRef` 대신 `ref`를 일반 prop으로 직접 받기
- Tailwind CSS 스타일링
- `default`, `outline`, `ghost` variant 기본 제공
- `sm`, `md`, `lg` size 기본 제공
- Props 인터페이스에 `VariantProps` 포함

## 템플릿

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const [name]Variants = cva("기본-스타일", {
  variants: {
    variant: {
      default: "...",
      outline: "...",
      ghost: "...",
    },
    size: {
      sm: "...",
      md: "...",
      lg: "...",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export interface [Name]Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof [name]Variants> {
  ref?: React.Ref<HTMLDivElement>
}

// React 19+: ref를 일반 prop으로 직접 전달 (forwardRef 불필요)
export function [Name]({ className, variant, size, ref, ...props }: [Name]Props) {
  return (
    <div
      ref={ref}
      className={cn([name]Variants({ variant, size, className }))}
      {...props}
    />
  )
}

export { [name]Variants }
```
