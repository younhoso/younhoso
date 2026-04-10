---
name: recurring_issues
description: 코드 리뷰에서 반복적으로 발견된 이슈 패턴과 개선 방향
type: feedback
---

## 발견된 반복 이슈

### 1. AvatarImage — next/image 미사용
Avatar.tsx에서 `<img>` 태그 직접 사용 (eslint-disable 주석으로 경고 억제).
외부 이미지 URL(dicebear API 등) 사용 시 next/image로 교체 권장.

### 2. Footer — Server Component에서 new Date() 호출
Footer.tsx가 Server Component인데 `new Date().getFullYear()` 호출 → 빌드 시점 날짜로 고정됨.
ISR/SSG 환경에서 연도가 오래된 빌드 기준으로 표시될 수 있음.

### 3. ModeToggle — mounted 패턴 사용 (null 반환)
mounted 상태 전까지 null 반환 → 레이아웃 시프트(CLS) 발생 가능.
suppressHydrationWarning + SSR-safe 렌더링 패턴으로 개선 가능.

### 4. QueryProvider — ReactQueryDevtools 프로덕션 포함
개발/프로덕션 환경 구분 없이 항상 ReactQueryDevtools 렌더링.
process.env.NODE_ENV !== 'production' 조건 추가 권장.

### 5. Badge — displayName 없음
다른 UI 컴포넌트와 달리 Badge.displayName 설정 누락.

### 6. Alert — success/warning variant에 하드코딩 색상
CSS 변수 토큰 대신 green-50, yellow-800 등 Tailwind 기본 색상 직접 사용.
테마 일관성 위해 CSS 변수 확장 권장.

### 7. form/page.tsx — console.log 잔존
onSubmit 핸들러에 `console.log("폼 데이터:", data)` 남아있음. 프로덕션 전 제거 필요.

### 8. lang="en" — 한국어 프로젝트와 불일치
layout.tsx의 <html lang="en"> → 콘텐츠가 주로 한국어이므로 lang="ko" 권장.

**Why:** 전체 코드 리뷰(2026-03-19)에서 발견
**How to apply:** 동일 패턴 발견 시 즉시 지적. 신규 컴포넌트 작성 시 이 이슈들을 사전 방지.
