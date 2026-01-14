# MVP 단계 개발 규칙

> HTML5 + CSS3 + Vanilla JS 기반 MVP 개발 시 적용하는 규칙입니다.

---

## 기술 스택

> 📁 참조: `config/mvp-stack.yaml`

---

## 파일 구조

```
/www
├── index.html              # 메인 페이지 (루트에만 위치)
├── pages/                  # 서브 페이지 폴더
│   └── [새페이지].html      # 추가 페이지는 여기에 생성
├── css/
│   ├── style.css           # 공통 스타일
│   └── [페이지명].css       # 페이지별 스타일 (필요시)
├── js/
│   ├── app.js              # 메인 로직
│   └── api.js              # API 통신
├── data/
│   └── *.json              # 목데이터
└── assets/
    └── images/             # 이미지 리소스
```

### 페이지 생성 규칙

- **메인 페이지**: `index.html`만 루트에 위치
- **서브 페이지**: 반드시 `pages/` 폴더 내에 생성
- **페이지별 CSS**: `css/[페이지명].css` 형태로 분리 (선택)

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

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

## CSS 규칙

- 모바일 우선 (max-width 미디어쿼리)
- 폰트 크기: `clamp()` 사용 (어르신 가독성)
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
// 함수형 패턴 예시
const createApp = (initialState = {}) => {
  // ==========================================================================
  // State (상단)
  // ==========================================================================
  const state = { ...initialState };

  // ==========================================================================
  // Utility Functions (정의 함수 - 상단)
  // ==========================================================================
  const getState = () => ({ ...state });

  const setState = (newState) => {
    Object.assign(state, newState);
  };

  // ==========================================================================
  // Feature Functions (정의 함수 - 상단)
  // ==========================================================================
  const handleUpload = async (file) => {
    /* ... */
  };

  const handleSubmit = (data) => {
    /* ... */
  };

  // ==========================================================================
  // Bootstrap Functions (실행 함수 - 하단)
  // ==========================================================================
  const bindEvents = () => {
    /* 이벤트 바인딩 */
  };

  const init = () => {
    bindEvents();
  };

  return { init, getState, setState, handleUpload };
};

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const app = createApp({ isLoading: false });
  app.init();
});
```

---

## 목데이터 규칙

- 모든 데이터는 `data/*.json` 파일로 분리하여 관리
- API 연동 전 목데이터로 UI 개발 및 테스트
- 실제 API 응답 구조와 동일하게 작성

```json
// data/mock.json
{
  "users": [
    { "id": 1, "name": "홍길동", "email": "hong@example.com" },
    { "id": 2, "name": "김철수", "email": "kim@example.com" }
  ],
  "config": {
    "maxUploadSize": 5242880,
    "allowedTypes": ["image/jpeg", "image/png"]
  }
}
```

```javascript
// 목데이터 로드 예시
const loadMockData = async () => {
  const response = await fetch("./data/mock.json");
  return response.json();
};
```

---

## API 연동 (Gemini Flash)

```javascript
const analyzeMenu = async (imageBase64) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: ANALYZE_PROMPT },
              { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
            ],
          },
        ],
      }),
    }
  );
  return response.json();
};
```

---

## ⚠️ 절대 하지 말 것

- [ ] API 키를 JS 파일에 하드코딩
- [ ] document.write() 사용
- [ ] innerHTML로 사용자 입력 삽입 (XSS 위험)
- [ ] 동기식 XMLHttpRequest 사용
- [ ] 이미지 용량 검증 없이 업로드

---

## ✅ 반드시 할 것

- [x] API 키는 환경변수 또는 서버 프록시 사용
- [x] 이미지 업로드 전 용량/형식 검증 (5MB 이하, jpg/png)
- [x] 로딩 스피너 표시
- [x] 에러 시 사용자 친화적 알림
- [x] 폼 제출 시 버튼 비활성화 (중복 방지)
- [x] console.log 배포 전 제거
