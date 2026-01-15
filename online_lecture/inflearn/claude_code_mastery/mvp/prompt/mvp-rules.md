# MVP 단계 개발 규칙

> HTML5 + CSS3 + Vanilla JS 기반 MVP 개발 시 적용하는 규칙입니다.

---

## 기술 스택

> 📁 참조: `config/mvp-stack.yaml`

---

## 파일 구조

```
/
├── index.html              # 메인 페이지 (루트에만 위치)
├── pages/                  # 서브 페이지 폴더
│   └── [페이지명].html      # 추가 페이지는 여기에 생성
├── css/
│   ├── style.css           # 공통 스타일
│   └── [페이지명].css       # 페이지별 스타일 (HTML과 동일한 이름)
├── js/
│   ├── app.js              # 메인 로직
│   ├── api.js              # API 통신
│   └── [페이지명].js        # 페이지별 스크립트 (HTML과 동일한 이름)
├── data/
│   └── *.json              # 목데이터
└── assets/
    └── images/             # 이미지 리소스
```

### 새 페이지 생성 규칙

> "[페이지명] 페이지 만들어줘" 요청 시 아래 3개 파일을 일괄 생성

| 파일 | 경로 | 설명 |
| ---- | ---- | ---- |
| HTML | `pages/[페이지명].html` | 페이지 마크업 |
| CSS | `css/[페이지명].css` | 페이지 전용 스타일 |
| JS | `js/[페이지명].js` | 페이지 전용 스크립트 |

### 경로 규칙 (pages/ 내 파일 기준)

| 대상             | 경로                             |
| ---------------- | -------------------------------- |
| CSS              | `../css/style.css`               |
| JS               | `../js/app.js`                   |
| 이미지           | `../assets/images/`              |
| 메인으로 이동    | `../index.html`                  |
| 다른 서브 페이지 | `./other.html` 또는 `other.html` |

---

## HTML 규칙

- 시맨틱 태그 사용 (`<header>`, `<main>`, `<section>`, `<footer>`)
- 접근성 속성 필수 (`alt`, `aria-label`)
- 모바일 viewport 설정

---

## CSS 규칙

- 모바일 우선 (max-width 미디어쿼리)
- 폰트 크기: `clamp()` 사용
- 버튼/터치 영역: 최소 44px
- CSS 변수로 색상/크기 관리

```css
:root {
  --color-primary: #2563eb;
  --color-text: #1f2937;
  --font-size-base: clamp(16px, 4vw, 20px);
  --touch-min: 44px;
}
```

---

## JavaScript 규칙

- ES6+ 문법 사용
- 전역 변수 최소화
- 함수형 패턴 사용 (순수 함수, 불변성)
- async/await로 비동기 처리
- **정의 함수는 상단에, 실행 함수는 하단에 배치**

```javascript
const createApp = (initialState = {}) => {
  const state = { ...initialState };

  // 정의 함수 (상단)
  const handleSubmit = (data) => { /* ... */ };

  // 실행 함수 (하단)
  const init = () => { /* 이벤트 바인딩 */ };

  return { init };
};

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp({ isLoading: false });
  app.init();
});
```

---

## 목데이터 규칙

- 모든 데이터는 `data/*.json` 파일로 분리하여 관리
- API 연동 전 목데이터로 UI 개발 및 테스트

---

## ⚠️ 절대 하지 말 것

- [ ] API 키를 JS 파일에 하드코딩
- [ ] document.write() 사용
- [ ] innerHTML로 사용자 입력 삽입 (XSS 위험)
- [ ] 이미지 용량 검증 없이 업로드

---

## ✅ 반드시 할 것

- [x] API 키는 환경변수 또는 서버 프록시 사용
- [x] 이미지 업로드 전 용량/형식 검증 (5MB 이하, jpg/png)
- [x] 로딩 스피너 표시
- [x] 에러 시 사용자 친화적 알림
- [x] 폼 제출 시 버튼 비활성화 (중복 방지)
