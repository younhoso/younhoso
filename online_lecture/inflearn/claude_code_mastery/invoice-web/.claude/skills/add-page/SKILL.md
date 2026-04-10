---
description: "새 Next.js App Router 페이지를 생성합니다"
argument-hint: "<경로> (예: /add-page about 또는 /add-page blog/[slug])"
allowed-tools:
  [
    "Read",
    "Write",
    "Edit",
    "Glob",
    "Grep",
  ]
---

# 스킬: add-page

Next.js App Router 방식으로 새 페이지를 생성합니다.

## 사용법

```
/add-page <경로>
```

## 프로세스

1. `$ARGUMENTS`를 페이지 경로로 사용
2. `src/app/$ARGUMENTS/page.tsx` 파일 생성
3. 동적 라우트(`[slug]` 등) 포함 시 params 타입 정의
4. Header 네비게이션 링크 추가 (필요한 경우)

## 생성 규칙

- TypeScript 사용
- 페이지 메타데이터(`export const metadata`) 포함
- 기본 레이아웃 구조 (제목, 설명 영역)
- Tailwind CSS 스타일링
- 생성 후 확인 URL 안내

## 템플릿

```tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "페이지 제목",
  description: "페이지 설명",
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">페이지 제목</h1>
      <p className="text-muted-foreground">페이지 설명</p>
    </div>
  )
}
```

동적 라우트 예시 (`[slug]`):

```tsx
interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  // ...
}
```
