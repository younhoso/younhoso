---
description: 새 shadcn/ui 스타일의 React 컴포넌트를 생성합니다
argument-hint: <컴포넌트명> (예: /add-component Button)
---

`src/components/` 폴더에 새 컴포넌트를 생성해주세요.

컴포넌트 이름: $ARGUMENTS

요구사항:
- `src/components/$ARGUMENTS.tsx` 파일 생성
- TypeScript + React 함수형 컴포넌트
- `cva`(class-variance-authority)로 variant 정의
- `cn()` 헬퍼 (`@/lib/utils`)로 클래스 병합
- `React.forwardRef` + `displayName` 설정
- Tailwind CSS 스타일링
- `default`, `outline`, `ghost` variant 기본 제공
- `sm`, `md`, `lg` size 기본 제공
- Props 인터페이스에 `VariantProps` 포함

컴포넌트 생성 후 `src/app/components/page.tsx`에 예시 사용법도 추가해주세요.
