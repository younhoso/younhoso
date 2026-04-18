# 메타 프롬프트: 노션 기반 견적서 웹 뷰어 MVP PRD 작성

## 목적

이 메타 프롬프트는 Claude Code에게 **노션에서 입력한 견적서 내용을 클라이언트가 웹에서 확인하고 PDF로 다운로드**할 수 있는 서비스의 MVP PRD(제품 요구사항 문서)를 작성하도록 지시합니다.

---

## 메타 프롬프트 (복사해서 사용)

```
당신은 시니어 프로덕트 매니저입니다.

아래 프로젝트 컨텍스트를 바탕으로 MVP PRD 문서를 작성해 주세요.

---

## 프로젝트 컨텍스트

**프로젝트명**: 노션 기반 견적서 웹 뷰어 & PDF 다운로드

**문제 정의**:
프리랜서 또는 소규모 에이전시가 노션에서 작성한 견적서를 클라이언트에게 공유할 때,
노션 링크를 직접 공유하면 편집 권한 문제, UI 일관성 부재, 인쇄/PDF 품질 저하 등의 문제가 있습니다.

**솔루션**:
1. 노션 API로 견적서 데이터를 읽어와
2. 전용 웹 페이지에 브랜드된 UI로 렌더링하고
3. 클라이언트가 PDF로 다운로드할 수 있게 합니다.

**기술 스택**:
- Next.js 15 App Router (현재 프로젝트 기반)
- Notion API (데이터 소스)
- Tailwind CSS + shadcn/ui 컴포넌트 패턴
- PDF 생성: react-pdf 또는 puppeteer (후보 기술, PRD에서 비교 제안)
- 배포: Vercel

**현재 프로젝트 구조**:
- `src/app/` — 페이지 라우팅 (App Router)
- `src/components/ui/` — shadcn/ui 패턴 컴포넌트
- `src/lib/utils.ts` — cn() 헬퍼
- `src/providers/` — 전역 프로바이더
- `src/stores/` — 상태 관리
- `src/types/` — TypeScript 타입

---

## PRD 작성 요구사항

다음 구조와 기준에 맞춰 PRD를 작성하세요.

### 1. 개요 (Overview)
- 제품 한 줄 설명
- 핵심 가치 제안 (Value Proposition) 3가지
- 대상 사용자 (프라이머리 / 세컨더리)

### 2. 목표 및 성공 지표 (Goals & Success Metrics)
- MVP 목표 3~5가지 (측정 가능하게)
- 성공 기준: 정량 지표 (예: PDF 다운로드 성공률 > 95%)
- MVP 범위 밖(Out of Scope) 명시

### 3. 사용자 스토리 (User Stories)
아래 역할에 대해 각각 3개 이상 작성:
  - **관리자** (견적서를 노션에 입력하는 사람)
  - **클라이언트** (웹에서 견적서를 확인하는 사람)

형식: `As a [역할], I want to [행동], so that [목적].`
각 스토리에 **수용 기준(Acceptance Criteria)** 2~3개 포함.

### 4. 기능 요구사항 (Functional Requirements)
우선순위: P0(반드시) / P1(중요) / P2(있으면 좋음)으로 분류.

최소 포함할 기능:
  - P0: 노션 데이터베이스에서 견적서 항목 읽기
  - P0: 고유 URL로 견적서 웹 페이지 렌더링
  - P0: PDF 다운로드 버튼 및 파일 생성
  - P1: 견적서 유효기간 만료 처리
  - P1: 로딩/에러/빈 상태(empty state) UI
  - P2: 클라이언트 열람 여부 추적 (조회 로그)

### 5. 비기능 요구사항 (Non-Functional Requirements)
- 성능: 초기 페이지 로드, PDF 생성 시간 목표
- 보안: 견적서 URL 접근 제어 방식 (예: 토큰 기반)
- 접근성: WCAG 2.1 AA 준수 항목
- 반응형: 모바일/태블릿/데스크탑 지원 범위

### 6. 데이터 모델 (Data Model)
노션 데이터베이스 스키마 제안:
  - 견적서(Invoice) 테이블 필드 목록 (필드명, 타입, 설명)
  - 견적 항목(LineItem) 구조
  - 관계형 속성 설계

TypeScript 인터페이스 예시 코드 포함 (`src/types/invoice.ts` 기준).

### 7. API 설계 (API Design)
Next.js App Router Route Handler 기준으로 설계:
  - `GET /api/invoices/[id]` — 견적서 단건 조회
  - `GET /api/invoices/[id]/pdf` — PDF 스트림 반환 (또는 presigned URL)
  - 요청/응답 타입, 에러 코드 포함

### 8. 페이지 및 컴포넌트 구조 (Page & Component Architecture)
App Router 라우팅 기준:
  - 페이지 목록과 경로 (`/invoice/[id]` 등)
  - 주요 컴포넌트 트리 (InvoiceViewer, LineItemTable, PDFDownloadButton 등)
  - 각 컴포넌트의 props 인터페이스 요약

### 9. UX 플로우 (UX Flow)
텍스트 기반 플로우차트(Mermaid 문법)로 표현:
  - 관리자 플로우: 노션 입력 → 공유 링크 생성 → 클라이언트 전달
  - 클라이언트 플로우: URL 접속 → 견적서 확인 → PDF 다운로드

### 10. 기술 결정 사항 (Technical Decisions)
아래 항목에 대해 옵션 비교 후 권장안 제시:
  - PDF 생성 방식: `react-pdf` vs `puppeteer` vs `@react-pdf/renderer`
  - 노션 데이터 캐싱 전략: ISR vs 온디맨드 재검증 vs 클라이언트 페칭
  - 견적서 URL 보안: UUID vs 서명된 토큰(JWT/HMAC)

### 11. 구현 로드맵 (Implementation Roadmap)
스프린트 단위(1주)로 구분:
  - Sprint 1: 노션 연동 + 기본 렌더링
  - Sprint 2: PDF 생성 + 스타일링
  - Sprint 3: 보안 + 에러 처리 + 배포

각 스프린트별 완료 조건(Definition of Done) 포함.

### 12. 리스크 및 가정 (Risks & Assumptions)
- 기술 리스크 2~3가지 (노션 API 레이트 리밋, PDF 한글 폰트 등)
- 비즈니스 가정 2~3가지
- 각 리스크에 대한 완화 전략

---

## 출력 형식

- 마크다운 형식으로 작성
- 파일 저장 위치: `docs/PRD.md`
- 한국어로 작성 (코드/변수명은 영어 유지)
- 각 섹션은 명확한 제목(##, ###)과 표, 코드 블록을 활용해 가독성을 높일 것
- 분량: 약 1,500~2,500단어 (충분한 상세도 유지)
- 불필요한 마케팅 문구 없이 실무 중심으로 작성
```

---

## 사용 방법

1. 위 메타 프롬프트 블록 전체를 복사합니다.
2. Claude Code 대화창에 붙여넣습니다.
3. Claude가 `docs/PRD.md` 파일을 생성합니다.
4. 생성된 PRD를 검토하고 팀 요구사항에 맞게 수정합니다.

---

## 체크리스트 (PRD 작성 후 검토)

- [ ] 사용자 스토리에 수용 기준이 모두 포함되었는가?
- [ ] P0 기능만으로 MVP가 동작 가능한가?
- [ ] 데이터 모델이 현재 프로젝트 타입 구조(`src/types/`)와 일치하는가?
- [ ] API 설계가 Next.js App Router 컨벤션을 따르는가?
- [ ] 리스크에 한글 폰트 문제가 포함되었는가? (PDF 생성 시 필수 고려사항)
- [ ] 구현 로드맵이 현실적인 1주 단위로 나뉘어 있는가?
