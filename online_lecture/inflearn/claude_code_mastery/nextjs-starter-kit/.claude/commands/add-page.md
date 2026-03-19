---
description: 새 Next.js App Router 페이지를 생성합니다
argument-hint: <경로> (예: /add-page about 또는 /add-page blog/[slug])
---

Next.js App Router 방식으로 새 페이지를 생성해주세요.

페이지 경로: $ARGUMENTS

요구사항:
- `src/app/$ARGUMENTS/page.tsx` 파일 생성
- TypeScript 사용
- 동적 라우트(`[slug]` 등)가 포함된 경우 `params` prop 타입 정의
- 페이지 메타데이터(`export const metadata`) 포함
- 기본 레이아웃 구조 (제목, 설명 영역)
- Tailwind CSS 스타일링
- `src/app/layout.tsx`의 Header에 네비게이션 링크 추가 (필요한 경우)

생성 후 개발 서버에서 확인할 수 있는 URL도 알려주세요.
