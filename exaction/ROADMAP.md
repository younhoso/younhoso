# ROADMAP - MVP 개발 로드맵

> 디자인시스템 분석 및 상세페이지 신청링크 작업

---

## 프로젝트 개요

| 항목       | 내용                                 |
| ---------- | ------------------------------------ |
| 프로젝트명 | 상세페이지 신청링크 작업             |
| 목적       | 디자인시스템 분석 및 상세페이지 작업 |
| 타겟       | 강남중앙침례교회 청년들              |

---

## MVP 목표

- [ ] 디자인시스템 기반 상세페이지 구현
- [ ] 신청링크 연동
- [ ] 모바일 최적화

---

## 기술 스택

| 분류       | 기술                           |
| ---------- | ------------------------------ |
| Frontend   | HTML5, CSS3, Vanilla JS (ES6+) |
| AI Service | Google Gemini 1.5 Flash        |
| Deployment | Vercel / Netlify               |

---

## 파일 구조

```
/
├── index.html          # 메인 페이지
├── css/
│   └── style.css       # 스타일
├── js/
│   ├── app.js          # 메인 로직
│   └── api.js          # API 통신
└── assets/
    └── images/         # 이미지 리소스
```

---

## 개발 단계

### Phase 1: 환경 설정 및 기본 구조

- [ ] 프로젝트 폴더 구조 생성
- [ ] index.html 기본 템플릿 작성
- [ ] CSS 변수 및 리셋 스타일 적용
- [ ] 모바일 viewport 설정

### Phase 2: 디자인시스템 적용

- [ ] post.png 디자인 분석
- [ ] 색상 토큰 적용 (`#f4f5f7`, `#191f28`, `#3182f6`)
- [ ] 타이포그래피 적용
- [ ] 스페이싱 시스템 적용 (4px 베이스)
- [ ] 컴포넌트 스타일 구현 (버튼, 카드, 배지)

### Phase 3: 상세페이지 구현

- [ ] 레이아웃 구현 (모바일 우선, max-width 480px)
- [ ] 헤더 섹션
- [ ] 본문 콘텐츠 영역
- [ ] 푸터 섹션
- [ ] 반응형 스타일 적용

### Phase 4: 신청링크 연동

- [ ] 신청 버튼 구현 (최소 44px 터치 영역)
- [ ] 링크 연동
- [ ] 클릭 피드백 (hover, active 상태)

### Phase 5: 배포

- [ ] 코드 정리 (console.log 제거)
- [ ] 이미지 최적화
- [ ] Vercel 또는 Netlify 배포
- [ ] 최종 테스트

---

## 체크리스트

### 필수 사항

- [ ] 시맨틱 태그 사용 (`<header>`, `<main>`, `<section>`, `<footer>`)
- [ ] 접근성 속성 (`alt`, `aria-label`)
- [ ] 모바일 viewport 설정
- [ ] 터치 영역 최소 44px
- [ ] CSS 변수로 디자인 토큰 관리

### 금지 사항

- [ ] API 키 하드코딩 금지
- [ ] document.write() 사용 금지
- [ ] innerHTML로 사용자 입력 삽입 금지 (XSS)
- [ ] console.log 배포 전 제거

---

## 참조 문서

- `config/mvp-stack.yaml` - 기술 스택
- `config/design-system.md` - 디자인 시스템
- `prompt/mvp-rules.md` - MVP 개발 규칙
