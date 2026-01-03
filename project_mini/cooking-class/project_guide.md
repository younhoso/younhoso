# 요리반상회 프로젝트 가이드

> 메뉴판 사진 한 장으로 재료를 자동 분석하는 AI 서비스

---

## 📋 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [기능 명세](#3-기능-명세)
4. [개발 프로세스](#4-개발-프로세스)
5. [API 연동 가이드](#5-api-연동-가이드)
6. [파일 구조](#6-파일-구조)
7. [배포 가이드](#7-배포-가이드)
8. [MVP 범위 및 로드맵](#8-mvp-범위-및-로드맵)
9. [비용 산정](#9-비용-산정)

---

## 1. 프로젝트 개요

### 1.1 문제 정의

요식업 사장님들이 메뉴판에 있는 음식의 재료, 알레르겐, 원산지 정보를 일일이 정리하기 어려움

### 1.2 솔루션

- 메뉴판/음식 사진 업로드
- AI(LMM) 기반 이미지 인식으로 메뉴명·재료 자동 추출
- 21대 알레르겐 자동 태깅
- 원산지 표기 필수 항목 체크리스트 생성

### 1.3 타겟 사용자

- 요식업 소상공인
- 프랜차이즈 본사 (메뉴 관리)
- 급식/단체급식 업체

### 1.4 비즈니스 모델

| 구분         | 내용                                   |
| ------------ | -------------------------------------- |
| 정부지원사업 | 희망리턴패키지, AI바우처, 데이터바우처 |
| 수익모델     | SaaS 구독 / 건당 과금 / 컨설팅 연계    |
| MVP 예산     | 5,000만원 (정책자금 기준)              |

---

## 2. 기술 스택

### 2.1 프론트엔드

```
- HTML5 / CSS3 / Vanilla JavaScript (MVP)
- Next.js 14+ (확장 시)
- Tailwind CSS
- 반응형 디자인 (모바일 우선)
```

### 2.2 백엔드 (확장 시)

```
- Next.js API Routes / Node.js
- Supabase (PostgreSQL + Auth + Storage)
- Vercel Serverless Functions
```

### 2.3 AI/ML 서비스

| 서비스            | 용도                      | 비고          |
| ----------------- | ------------------------- | ------------- |
| Google Gemini     | 이미지 분석 + 텍스트 정제 | 추천 (가성비) |
| OpenAI GPT-4o     | Vision + 자연어 처리      | 정확도 높음   |
| Claude Vision     | 이미지 분석 + 설명        | 한국어 강점   |
| Google Vision OCR | 텍스트 추출 전용          | 보조 도구     |

### 2.4 인프라

```
- Vercel (프론트엔드 + Serverless)
- Supabase (DB + Storage + Auth)
- Cloudflare (CDN, 선택)
```

---

## 3. 기능 명세

### 3.1 핵심 기능 (MVP)

#### F1. 메뉴판 입력

| 항목        | 설명                                   |
| ----------- | -------------------------------------- |
| 사진 업로드 | 드래그앤드롭, 클릭 업로드, 모바일 촬영 |
| 지원 포맷   | JPG, PNG, HEIC, WebP                   |
| 다중 업로드 | 여러 메뉴판 한 번에 처리               |

#### F2. 재료 자동 추출 (핵심)

| 항목          | 설명                               |
| ------------- | ---------------------------------- |
| LMM 분석      | 이미지 → 메뉴명 + 재료 리스트 분리 |
| 불확실도 표시 | 확정/추정 플래그 구분              |
| 동의어 매핑   | 대파=파, 계란=달걀 등 표준화       |

#### F3. 알레르겐/주의 정보

| 항목          | 설명                        |
| ------------- | --------------------------- |
| 21대 알레르겐 | 자동 태깅                   |
| 위험도 구분   | "포함" / "포함 가능성 있음" |

#### F4. 원산지 표기 보조

| 항목       | 설명                     |
| ---------- | ------------------------ |
| 체크리스트 | 필수 표기 항목 자동 생성 |
| 경고 표시  | 누락 항목 하이라이트     |
| 법적 고지  | "법적 자문 아님" 명시    |

#### F5. 결과 출력

| 항목      | 설명                       |
| --------- | -------------------------- |
| 카드 UI   | 메뉴별 재료 카드 (큰 폰트) |
| 내보내기  | JSON, CSV, PDF 다운로드    |
| 인쇄용 뷰 | A4 최적화 레이아웃         |

### 3.2 확장 기능 (고도화)

| 기능          | 설명                   | 우선순위 |
| ------------- | ---------------------- | -------- |
| 히스토리 관리 | 업로드 기록, 버전 관리 | 높음     |
| 사용자 인증   | 매장별 계정 관리       | 높음     |
| POS 연동      | 배달앱/POS 시스템 연결 | 중간     |
| 다국어 지원   | 한/영/중/일            | 낮음     |
| 영양정보 분석 | 칼로리, 영양소 추정    | 낮음     |

---

## 4. 개발 프로세스

> 회의에서 논의된 개발 절차 기준

### 4.1 전체 프로세스

```
┌─────────────────────────────────────────────────────────────┐
│  1. 기획                                                      │
│  ├─ 문제 정의 (어떤 문제 해결?)                                │
│  ├─ 타겟 사용자 정의                                          │
│  ├─ 기술 스택 선정                                            │
│  └─ BM 설계                                                   │
├─────────────────────────────────────────────────────────────┤
│  2. 설계                                                      │
│  ├─ UI/UX 디자인                                              │
│  │   └─ 와이어프레임 → 프로토타입 → 최종 디자인               │
│  ├─ 데이터베이스 설계                                         │
│  │   └─ 테이블 관계, ERD 작성                                 │
│  └─ API 설계                                                  │
│      └─ 외부 API 연동 명세, 내부 API 엔드포인트 정의          │
├─────────────────────────────────────────────────────────────┤
│  3. 개발 환경 구축                                            │
│  ├─ GitHub 저장소 생성                                        │
│  ├─ 개발 도구 세팅 (VSCode, Node.js, etc.)                   │
│  ├─ API 키 발급 (Gemini, OpenAI, etc.)                       │
│  └─ CI/CD 파이프라인 구축                                     │
├─────────────────────────────────────────────────────────────┤
│  4. 개발                                                      │
│  ├─ 프론트엔드 개발 (껍데기)                                   │
│  ├─ 백엔드 개발 (내장, 로직)                                   │
│  └─ AI 연동 (LMM API 호출)                                    │
├─────────────────────────────────────────────────────────────┤
│  5. 테스트 & 배포                                             │
│  ├─ 내부 테스트 (스테이징 환경)                                │
│  ├─ 외부 배포 (프로덕션)                                       │
│  └─ 유지보수 & 개선                                           │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 개발 방식 (하이브리드)

> "완전 자동화도 아니고 노가다도 아닌 하이브리드"

| 영역         | AI 활용                      | 사람 필수      |
| ------------ | ---------------------------- | -------------- |
| 껍데기 (UI)  | ✅ Claude Code로 빠르게 생성 | 디자인 검수    |
| 내부 로직    | ✅ 반자동화 가능             | 보안/권한 설계 |
| 인프라       | ❌                           | ✅ 사람이 직접 |
| 데이터베이스 | ❌                           | ✅ 사람이 직접 |
| 보안         | ❌                           | ✅ 사람이 직접 |

### 4.3 주의사항

```
⚠️ AI에게 맡기면 안 되는 3가지:
1. 인프라 구축 - 서버, 클라우드 설정
2. 데이터베이스 - 권한, 접근 제어
3. 보안 - 인증, 암호화, API 키 관리

→ 이 3가지는 검증된 개발자가 직접 담당
```

---

## 5. API 연동 가이드

### 5.1 Google Gemini (추천)

#### API 키 발급

1. [Google AI Studio](https://aistudio.google.com/) 접속
2. API 키 생성
3. 환경변수에 저장

#### 호출 예시

```javascript
const analyzeWithGemini = async (imageBase64, apiKey) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: ANALYSIS_PROMPT },
              { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};
```

#### 프롬프트 템플릿

```
이 메뉴판/음식 이미지를 분석해서 다음 JSON 형식으로 응답해주세요:
{
  "menus": [
    {
      "menuName": "메뉴 이름",
      "ingredients": [
        {"name": "재료명", "icon": "이모지", "certain": true/false}
      ],
      "allergens": ["알레르겐1", "알레르겐2"],
      "originRequired": ["원산지 표기 필요 항목"]
    }
  ]
}

21대 알레르겐: 난류, 우유, 메밀, 땅콩, 대두, 밀, 고등어, 게, 새우,
돼지고기, 복숭아, 토마토, 아황산류, 호두, 닭고기, 쇠고기, 오징어,
조개류, 잣, 굴, 전복
```

### 5.2 OpenAI GPT-4o

#### 호출 예시

```javascript
const analyzeWithOpenAI = async (imageBase64, apiKey) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: ANALYSIS_PROMPT },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
            },
          ],
        },
      ],
      max_tokens: 2000,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
};
```

### 5.3 비용 비교

| 서비스           | 가격 (1000 요청 기준) | 정확도     | 속도 |
| ---------------- | --------------------- | ---------- | ---- |
| Gemini 1.5 Flash | ~$0.50                | ⭐⭐⭐⭐   | 빠름 |
| GPT-4o           | ~$5.00                | ⭐⭐⭐⭐⭐ | 보통 |
| Claude Vision    | ~$3.00                | ⭐⭐⭐⭐   | 보통 |

---

## 6. 파일 구조

### 6.1 현재 (MVP - 단일 HTML)

```
yori-bansanghoe/
├── index.html          # 메인 앱 (HTML + CSS + JS 통합)
├── PROJECT_GUIDE.md    # 프로젝트 가이드 문서
└── README.md           # 간단한 설명
```

### 6.2 확장 시 (Next.js)

```
yori-bansanghoe/
├── app/
│   ├── page.tsx                 # 메인 페이지
│   ├── layout.tsx               # 레이아웃
│   ├── analyze/
│   │   └── page.tsx             # 분석 페이지
│   ├── history/
│   │   └── page.tsx             # 히스토리 페이지
│   └── api/
│       ├── analyze/
│       │   └── route.ts         # 분석 API
│       └── export/
│           └── route.ts         # 내보내기 API
├── components/
│   ├── upload-area.tsx          # 업로드 컴포넌트
│   ├── menu-card.tsx            # 메뉴 카드
│   ├── ingredient-tag.tsx       # 재료 태그
│   └── allergen-badge.tsx       # 알레르겐 뱃지
├── lib/
│   ├── gemini.ts                # Gemini API 래퍼
│   ├── openai.ts                # OpenAI API 래퍼
│   └── supabase.ts              # Supabase 클라이언트
├── types/
│   └── menu.ts                  # 타입 정의
├── .env.local                   # 환경변수
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 7. 배포 가이드

### 7.1 Vercel 배포 (권장)

#### 단일 HTML (현재 MVP)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 프로젝트 폴더에서 배포
cd yori-bansanghoe
vercel

# 3. 프로덕션 배포
vercel --prod
```

#### Next.js 버전

```bash
# 1. GitHub에 푸시
git push origin main

# 2. Vercel 연동
# vercel.com에서 GitHub 저장소 연결

# 3. 환경변수 설정
# Vercel Dashboard > Settings > Environment Variables
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

### 7.2 환경변수

```env
# .env.local
NEXT_PUBLIC_DEMO_MODE=true
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 8. MVP 범위 및 로드맵

### 8.1 Phase 1: MVP (현재) - 예산 5,000만원

| 항목          | 상태    | 설명            |
| ------------- | ------- | --------------- |
| UI/UX 껍데기  | ✅ 완료 | 반응형 웹앱     |
| 데모 모드     | ✅ 완료 | API 없이 테스트 |
| Gemini 연동   | ✅ 완료 | 이미지 분석     |
| OpenAI 연동   | ✅ 완료 | 대체 옵션       |
| JSON 내보내기 | ✅ 완료 | 결과 다운로드   |
| PDF 내보내기  | ✅ 완료 | 인쇄용          |

### 8.2 Phase 2: 고도화 - 예산 1억~2억

| 항목          | 예상 기간 | 설명             |
| ------------- | --------- | ---------------- |
| 사용자 인증   | 2주       | Supabase Auth    |
| 히스토리 저장 | 2주       | DB 연동          |
| 관리자 페이지 | 3주       | 대시보드         |
| POS 연동 API  | 4주       | 외부 시스템 연결 |

### 8.3 Phase 3: 확장 - AI바우처/데이터바우처

| 항목             | 예상 기간 | 설명           |
| ---------------- | --------- | -------------- |
| 커스텀 모델 학습 | 8주       | 메뉴 특화 모델 |
| 영양정보 분석    | 4주       | 칼로리/영양소  |
| 다국어 지원      | 2주       | 한/영/중/일    |
| 모바일 앱        | 8주       | React Native   |

---

## 9. 비용 산정

### 9.1 개발 비용 (MVP 기준)

| 항목        | 예상 비용     | 비고                    |
| ----------- | ------------- | ----------------------- |
| 기획/설계   | 500만원       | 요구사항 정의, 화면설계 |
| 프론트엔드  | 1,000만원     | UI/UX 구현              |
| 백엔드      | 1,500만원     | API, DB, 인증           |
| AI 연동     | 1,000만원     | LMM 프롬프트 최적화     |
| 테스트/배포 | 500만원       | QA, 서버 세팅           |
| 예비비      | 500만원       | 변경사항 대응           |
| **합계**    | **5,000만원** |                         |

### 9.2 운영 비용 (월간)

| 항목          | 예상 비용       | 비고             |
| ------------- | --------------- | ---------------- |
| 서버 (Vercel) | 무료~$20        | Pro 플랜 기준    |
| DB (Supabase) | 무료~$25        | Pro 플랜 기준    |
| AI API        | $50~$500        | 사용량 따라 변동 |
| **합계**      | **$50~$545/월** |                  |

---

## 📞 문의

- **프로젝트**: 요리반상회
- **담당**: 에드스파크컨설팅
- **버전**: MVP v1.0
- **최종 수정**: 2026.01.03

---

## 📝 변경 이력

| 버전 | 날짜       | 내용          |
| ---- | ---------- | ------------- |
| v1.0 | 2026.01.03 | 초기 MVP 완성 |
