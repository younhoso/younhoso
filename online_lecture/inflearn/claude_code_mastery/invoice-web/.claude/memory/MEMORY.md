# invoice-web 프로젝트 메모리

> 마지막 업데이트: 2026-04-28

## 프로젝트 개요
- **목적**: 노션 기반 견적서 공유 서비스 (인프런 Claude Code 마스터리 강의)
- **스택**: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui
- **PRD**: `docs/PRD.md` 참조

## 현재 구조
```
src/
├── app/
│   ├── page.tsx                  # 랜딩 페이지 (서비스 소개)
│   ├── layout.tsx                # 루트 레이아웃
│   ├── globals.css               # CSS 변수 + 인쇄 스타일 (@media print)
│   └── invoice/
│       └── [id]/
│           └── page.tsx          # 견적서 공개 페이지 (Server Component)
├── components/
│   ├── Header.tsx                # 공통 헤더 (인쇄 시 숨김)
│   ├── Footer.tsx                # 공통 푸터 (인쇄 시 숨김)
│   ├── mode-toggle.tsx           # 다크모드 토글
│   ├── theme-provider.tsx        # next-themes 프로바이더
│   ├── invoice/
│   │   ├── InvoiceView.tsx       # 견적서 렌더링 컴포넌트
│   │   ├── InvoiceTable.tsx      # 품목 테이블
│   │   └── PdfDownloadButton.tsx # PDF 다운로드 (Client Component)
│   └── ui/
│       ├── Table.tsx             # 테이블 컴포넌트 (직접 생성)
│       ├── Button.tsx, Card.tsx, Badge.tsx ...
│       └── (기타 shadcn/ui 패턴 컴포넌트들)
├── lib/
│   ├── notion.ts                 # 노션 클라이언트 + 파싱 함수 (목업 포함)
│   └── utils.ts                  # cn() 헬퍼
├── types/
│   └── invoice.ts                # Invoice, InvoiceItem 타입
├── providers/
│   └── QueryProvider.tsx         # TanStack Query 프로바이더
└── stores/
    └── counter.ts                # 미사용 (스타터킷 잔재 — 추후 삭제 가능)
```

## 핵심 패턴
- 컴포넌트: `cva` + `cn()` + `React.forwardRef` (shadcn/ui 패턴)
- 경로 별칭: `@/*` → `./src/*`
- 테마: `next-themes` (attribute="class"), CSS 변수 + Tailwind 매핑
- 견적서 페이지: Server Component에서 노션 API 호출 (보안상 서버 사이드 전용)

## 환경변수
- `NOTION_API_KEY` — 노션 API 인증 (서버 전용, NEXT_PUBLIC_ 없음)
- `NEXT_PUBLIC_SUPPLIER_NAME` — 공급자 이름 (견적서 헤더 표시)
- `NEXT_PUBLIC_SUPPLIER_EMAIL` — 공급자 이메일

## 미완성 작업 (TODO)
- [ ] `@notionhq/client` 패키지 설치: `npm install @notionhq/client`
- [ ] `src/lib/notion.ts` — 목업 데이터를 실제 노션 API 호출로 교체
- [ ] 노션 하위 블록(테이블)에서 품목 데이터 파싱 구현
- [ ] `src/app/examples/` 및 `src/app/components/` 스타터킷 데모 페이지 정리 (사용자 직접 삭제 가능)

## 주요 결정사항
- `draft` 상태 견적서는 `/invoice/[id]` 접근 시 공개 차단 (메시지 표시)
- 존재하지 않는 ID → `notFound()` → 404 페이지
- PDF: `window.print()` 방식 (MVP), 필요 시 html2canvas 전환
- 캐싱: `export const revalidate = 60` (60초마다 재검증)
- 인쇄 시 헤더/푸터/버튼 숨김: `print:hidden` Tailwind 클래스 + `@media print` CSS
