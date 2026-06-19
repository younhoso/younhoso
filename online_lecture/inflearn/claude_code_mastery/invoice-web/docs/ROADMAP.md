# 노션 기반 견적서 공유 서비스 개발 로드맵

노션 데이터베이스에 입력한 견적서를 고유 URL로 클라이언트에게 공유하고, 웹 브라우저에서 확인 및 PDF 다운로드할 수 있는 서비스

## 개요

노션 기반 견적서 공유 서비스는 프리랜서 및 소규모 에이전시 운영자를 위한 견적서 공유 솔루션으로 다음 기능을 제공합니다:

- **노션 DB 연동**: Notion API를 통해 견적서 데이터를 실시간 조회하여 별도 DB 없이 운영
- **견적서 공개 페이지**: 고유 URL(`/invoice/[id]`)로 클라이언트가 별도 계정 없이 견적서 열람
- **PDF 다운로드**: 브라우저 인쇄 기능 또는 html2canvas + jsPDF를 통한 PDF 저장
- **관리자 대시보드**: 견적서 목록 조회 및 클라이언트 공유 링크 복사
- **다크모드**: 시스템 설정 또는 수동 전환을 통한 다크/라이트 테마 지원

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router, Server Component) |
| UI | shadcn/ui + Tailwind CSS |
| 테마 | next-themes (다크모드 지원) |
| 노션 연동 | `@notionhq/client` |
| PDF | `window.print()` (MVP), `html2canvas` + `jsPDF` (고급) |
| 배포 | Vercel |

## 개발 워크플로우

1. **작업 계획**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - 모든 작업 파일에 "## 테스트 체크리스트" 섹션 필수 포함 (API/비즈니스 로직은 Playwright MCP 시나리오를 상세히 작성, UI 작업도 주요 인터랙션 테스트 시나리오 포함)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 예를 들어, 현재 작업이 `012`라면 `011`과 `010`을 예시로 참조.
   - 이러한 예시들은 완료된 작업이므로 내용이 완료된 작업의 최종 상태를 반영함 (체크된 박스와 변경 사항 요약). 새 작업의 경우, 문서에는 빈 박스와 변경 사항 요약이 없어야 함. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**

   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - **구현이 완료된 모든 기능은 반드시 Playwright MCP로 테스트 수행 (예외 없음)**
   - 테스트 순서: 구현 → `browser_navigate`로 페이지 접근 → 기능 동작 확인 → `browser_snapshot`으로 결과 캡처
   - API 엔드포인트: 요청/응답 검증, 에러 케이스 테스트 필수
   - UI 인터랙션: 버튼 클릭, 폼 제출, 네비게이션 등 사용자 플로우 전체 테스트 필수
   - 비즈니스 로직: 정상 케이스 + 엣지 케이스 + 에러 케이스 모두 테스트 필수
   - 테스트 실패 시 반드시 수정 후 재테스트, 통과 확인 전까지 다음 단계 진행 금지
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

   - 로드맵에서 완료된 작업을 ✅로 표시

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 ✅

- **Task 001: 프로젝트 구조 및 라우팅 설정** ✅ - 완료
  - See: `/tasks/001-project-structure.md`
  - ✅ Next.js App Router 기반 견적서 라우트 구조 생성 (`/invoice/[id]`)
  - ✅ Server Component 기반 페이지 골격 구현 (`src/app/invoice/[id]/page.tsx`)
  - ✅ 공통 레이아웃 (Header, Footer) 활용한 페이지 구조 확인

- **Task 002: 타입 정의 및 데이터 모델 설계** ✅ - 완료
  - See: `/tasks/002-type-definitions.md`
  - ✅ `Invoice`, `InvoiceItem` TypeScript 타입 정의 (`src/types/invoice.ts`)
  - ✅ 노션 DB 필드와 앱 내부 타입 매핑 구조 설계
  - ✅ 견적서 상태(`draft` / `sent` / `accepted`) 타입 정의

### Phase 2: UI/UX 완성 (더미 데이터 활용) ✅

- **Task 003: 견적서 컴포넌트 라이브러리 구현** ✅ - 완료
  - See: `/tasks/003-invoice-components.md`
  - ✅ `InvoiceView` 견적서 전체 렌더링 컴포넌트 구현 (`src/components/invoice/InvoiceView.tsx`)
  - ✅ `InvoiceTable` 품목 테이블 컴포넌트 구현 (`src/components/invoice/InvoiceTable.tsx`)
  - ✅ `PdfDownloadButton` PDF 다운로드 버튼 Client Component 구현 (`src/components/invoice/PdfDownloadButton.tsx`)
  - ✅ shadcn/ui Table, Badge, Separator, Button 컴포넌트 활용

- **Task 004: 견적서 페이지 UI 및 더미 데이터 완성** ✅ - 완료
  - See: `/tasks/004-page-ui-dummy-data.md`
  - ✅ 견적서 공개 페이지 레이아웃 완성 (헤더 → 클라이언트 정보 → 품목 테이블 → 합계 → 비고)
  - ✅ 개발용 목업 데이터 기반 UI 검증 (`src/lib/notion.ts` 내 mockInvoice)
  - ✅ draft 상태 공개 차단 UI 구현 ("준비 중인 견적서입니다" 표시)
  - ✅ 존재하지 않는 ID 접근 시 404 처리 (`notFound()`)
  - ✅ `@media print` CSS로 인쇄 시 UI 요소 숨김 처리 (`globals.css`)
  - ✅ 금액 포맷(`formatAmount`) 및 날짜 포맷(`formatDate`) 유틸 함수 구현
  - ✅ 공급자 정보 환경변수 연동 (`NEXT_PUBLIC_SUPPLIER_NAME`, `NEXT_PUBLIC_SUPPLIER_EMAIL`)

### Phase 3: 핵심 기능 구현

- **Task 005: 노션 API 클라이언트 연동 및 데이터 파싱** - 우선순위
  - `@notionhq/client` 패키지 설치 및 노션 클라이언트 초기화 (`src/lib/notion.ts`)
  - 환경변수 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 설정 및 `.env.local` 구성
  - `getInvoice()` 함수에서 목업 데이터를 실제 노션 API 호출로 교체
  - `parseInvoicePage()` 함수 구현: 노션 PageObjectResponse Properties를 Invoice 타입으로 변환
  - 노션 하위 블록(테이블 블록)에서 품목(items) 데이터 파싱 로직 구현
  - 소계/부가세(10%)/총액 자동 계산 로직 구현
  - Playwright MCP를 활용한 노션 API 연동 통합 테스트

- **Task 006: 에러 처리 및 예외 상황 대응**
  - 노션 API 오류 코드별 분기 처리 (401: 권한 없음, 404: 견적서 없음)
  - 네트워크 오류 시 사용자 친화적 안내 메시지 ("잠시 후 다시 시도해주세요")
  - 커스텀 에러 페이지 구현 (`not-found.tsx`, `error.tsx`)
  - 잘못된 노션 페이지 ID 형식 검증 및 예외 처리
  - 빈 데이터(품목 없음, 필드 누락) 처리를 위한 방어 코드 작성
  - Playwright MCP로 에러 시나리오별 E2E 테스트 수행

- **Task 007: 노션 연동 통합 테스트**
  - Playwright MCP를 사용한 전체 사용자 플로우 테스트 (URL 접근 → 견적서 렌더링 → 데이터 검증)
  - 유효한 노션 Page ID로 접근 시 견적서 정상 렌더링 확인
  - draft 상태 견적서 공개 차단 동작 검증
  - 존재하지 않는 ID 접근 시 404 페이지 표시 확인
  - 품목 테이블 데이터 정합성 검증 (수량 × 단가 = 금액, 소계/부가세/총액 계산)
  - 에러 핸들링 및 엣지 케이스 테스트

### Phase 4: 기본 최적화 및 배포

- **Task 008: PDF 다운로드 고도화**
  - `html2canvas` + `jsPDF` 패키지 설치 및 PDF 직접 생성 기능 구현
  - 파일명 자동 생성 규칙 적용: `견적서_[클라이언트명]_[발행일].pdf`
  - `window.print()` 방식과 직접 생성 방식 간 전환 옵션 제공
  - 인쇄 레이아웃 정밀 조정 (페이지 넘김, 여백, 폰트 크기)
  - Playwright MCP로 PDF 다운로드 기능 E2E 테스트

- **Task 009: 성능 최적화 및 캐싱 전략**
  - Next.js `revalidate` 캐싱 전략 최적화 (현재 60초 설정 검증)
  - 노션 API 응답 캐싱 레이어 구현 (필요 시 Redis 또는 메모리 캐시)
  - 페이지 로드 성능 3초 이내 목표 달성 확인 (노션 API 응답 포함)
  - Metadata(OG 태그) 최적화 및 SEO 기본 설정
  - 이미지 및 정적 자원 최적화

- **Task 010: 반응형 디자인 정밀화 및 접근성 강화**
  - 모바일 환경 품목 테이블 레이아웃 최적화 (가로 스크롤 없이 읽기 가능)
  - 태블릿/데스크탑 브레이크포인트별 UI 미세 조정
  - Chrome, Safari, Firefox 최신 버전 크로스 브라우저 테스트
  - 모바일 Chrome/Safari 호환성 검증
  - 인쇄 미리보기에서 레이아웃 깨짐 확인 및 수정

- **Task 011: 배포 파이프라인 및 운영 환경 구성**
  - Vercel 배포 설정 및 환경변수 구성 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NEXT_PUBLIC_SUPPLIER_*`)
  - 프로덕션 빌드 검증 (`npm run build` 성공 확인)
  - 커스텀 도메인 설정 (선택)
  - 배포 후 프로덕션 환경 E2E 테스트
  - README.md 업데이트 (설치 가이드, 환경변수 설정 안내, 노션 DB 구성 가이드)

### Phase 5: 고도화 - 관리자 기능 및 사용성 향상

- **Task 012: 다크모드 구현** - 우선순위
  - 견적서 공개 페이지(`/invoice/[id]`) 다크모드 CSS 변수 완성 (`globals.css` `.dark` 블록)
  - next-themes의 `ThemeProvider`가 견적서 페이지에도 적용되는지 루트 레이아웃 확인
  - 견적서 페이지 우측 상단에 `ModeToggle` 버튼 배치 (인쇄 시 `@media print`로 숨김)
  - 다크모드에서 가독성 검증: 품목 테이블 테두리, 금액 강조, 상태 Badge 색상
  - 인쇄 시 다크모드 무관하게 밝은 배경(`white`)으로 강제 출력되도록 `@media print` 처리
  - Playwright MCP로 라이트/다크 모드 전환 및 각 모드에서 견적서 렌더링 테스트

- **Task 013: 관리자 레이아웃 구축**
  - `/admin` 경로에 관리자 전용 레이아웃 생성 (`src/app/admin/layout.tsx`)
  - Next.js Middleware(`src/middleware.ts`)로 관리자 접근 보호 구현
    - 환경변수 `ADMIN_TOKEN` 기반 쿼리 파라미터 인증 (`?token=xxx`) 또는 쿠키 방식
  - 관리자용 사이드바 또는 상단 네비게이션 컴포넌트 구현 (shadcn/ui)
    - 메뉴: 견적서 목록 (`/admin/invoices`)
  - 기본 관리자 대시보드 페이지 생성 (`src/app/admin/page.tsx`) → 견적서 목록으로 리다이렉트
  - 관리자 레이아웃에 `ModeToggle` 통합 (다크모드 전환)
  - Playwright MCP로 인증 플로우 및 레이아웃 렌더링 테스트

- **Task 014: 견적서 목록 페이지 구현**
  - Notion `queryDatabase()` API로 견적서 데이터베이스 전체 목록 조회 (`src/lib/notion.ts`)
  - `getInvoiceList()` 함수 구현: 발행일 내림차순 정렬, 상태별 필터링 지원
  - 견적서 목록 페이지 UI 구현 (`src/app/admin/invoices/page.tsx`)
    - 목록 표시 컬럼: 번호, 견적서 제목, 클라이언트명, 발행일, 유효기간, 상태 Badge
    - 상태별 필터 탭: 전체 / 발송됨(sent) / 수락됨(accepted) / 초안(draft)
  - 각 견적서 행에서 공개 페이지(`/invoice/[id]`) 이동 링크 제공
  - 빈 목록 상태 UI (노션에 데이터 없을 때 안내 메시지)
  - 노션 API 오류 시 에러 상태 UI 표시
  - Playwright MCP로 목록 조회, 상태 필터링, 페이지 이동 테스트

- **Task 015: 클라이언트 공유 링크 복사 기능**
  - `CopyLinkButton` Client Component 구현 (`src/components/admin/CopyLinkButton.tsx`)
    - `navigator.clipboard.writeText()`로 공개 URL 클립보드 복사 (`/invoice/[id]`)
    - 복사 성공 피드백: 버튼 텍스트 "링크 복사" → "복사됨 ✓" 2초간 전환
    - shadcn/ui `Toast`(Sonner) 또는 `useToast`로 복사 완료 알림
  - draft 상태 견적서 복사 시 경고 Toast 표시: "초안 상태입니다. 공개 전 확인하세요."
  - 견적서 목록 각 행에 `CopyLinkButton` 통합 (Task 014 테이블 우측 액션 열)
  - HTTPS 환경이 아닐 때 클립보드 API 폴백 처리 (`document.execCommand` 또는 안내 메시지)
  - Playwright MCP로 링크 복사 동작, 피드백 UI, draft 경고 메시지 테스트
