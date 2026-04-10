---
name: react19_migration_pattern
description: React 19 ref-as-prop 마이그레이션 패턴 — forwardRef 제거 후 적용된 방식과 일관성 이슈
type: project
---

## 마이그레이션 완료 상태 (2026-03-19 기준)

13개 파일에서 React.forwardRef → ref를 일반 prop으로 처리하는 방식으로 전환 완료.

## 적용된 패턴 (일관성 문제 있음)

### 패턴 A: interface에 ref 명시 (Button, Input, Textarea, Alert, Separator)
```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ref?: React.Ref<HTMLButtonElement>;  // interface에 직접 추가
}
function Button({ className, variant, size, ref, ...props }: ButtonProps) { ... }
```

### 패턴 B: 인라인 교차 타입 (Card, Avatar, Skeleton, Label 등)
```tsx
function Card({
  className, ref, ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) { ... }
```

### 패턴 C: Radix 기반 컴포넌트 (Dialog, DropdownMenu, Select, Tabs)
```tsx
function DialogOverlay({
  className, ref, ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Overlay>>;
}) { ... }
```

## 이슈: 패턴 불일치
Badge 컴포넌트는 ref prop 자체가 없음 (마이그레이션 누락 가능성).
패턴 A/B/C 혼재 — 통일 필요.

**Why:** 코드 리뷰에서 발견한 불일치 패턴
**How to apply:** UI 컴포넌트 작성 시 패턴 통일 권장 (패턴 A 또는 C로 표준화)
