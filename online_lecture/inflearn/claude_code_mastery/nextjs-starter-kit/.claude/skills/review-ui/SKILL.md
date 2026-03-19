---
description: "UI/UX 관점에서 컴포넌트나 페이지를 코드 리뷰합니다"
argument-hint: "<파일경로> (예: /review-ui src/components/Header.tsx)"
allowed-tools:
  [
    "Read",
    "Glob",
    "Grep",
  ]
---

# 스킬: review-ui

UI/UX 관점에서 컴포넌트나 페이지를 코드 리뷰합니다.

## 사용법

```
/review-ui <파일경로>
```

## 프로세스

1. `$ARGUMENTS` 파일을 읽기
2. 아래 5가지 항목 기준으로 리뷰
3. 문제점과 개선 방안을 코드 예시와 함께 제시

## 리뷰 항목

### 1. 접근성 (Accessibility)
- ARIA 속성 누락 여부
- 키보드 네비게이션 지원
- 색상 대비 문제 (`text-muted-foreground` 등 활용 여부)

### 2. 반응형 디자인
- 모바일/태블릿/데스크톱 대응 여부
- Tailwind breakpoint 활용 (`sm:`, `md:`, `lg:`)

### 3. 다크모드 지원
- `dark:` variant 누락 여부
- CSS 변수 활용 일관성 (`globals.css` 변수 사용 여부)

### 4. 컴포넌트 구조
- shadcn/ui 패턴 준수 여부
- `cva` + `cn()` 올바른 사용 여부
- Props 타입 정의 완성도

### 5. 성능
- 불필요한 리렌더링 가능성
- 이미지 최적화 여부 (`next/image` 사용)
- `"use client"` 불필요한 사용 여부

## 출력 형식

각 항목별로 `✅ 양호` / `⚠️ 개선 권장` / `❌ 문제 있음` 으로 구분하여 출력합니다.
