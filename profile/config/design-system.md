# 디자인 시스템

> 개발자 웹 이력서 프로젝트의 통합 디자인 가이드 (Dark Theme)

---

## 목차

1. [개요](#개요)
2. [레이아웃](#레이아웃)
3. [아이콘](#아이콘)
4. [주요 기능](#주요-기능)
5. [디자인 토큰](#디자인-토큰)
6. [컴포넌트 스타일](#컴포넌트-스타일)

---

## 개요

이 문서는 프로젝트의 디자인 시스템을 정의합니다.
**다크 테마** 기반으로 색상, 타이포그래피, 스페이싱, 컴포넌트 스타일을 포함합니다.

참고 사이트: [Linkpie](https://lnkpie.com/)

---

## 레이아웃

- **모바일 우선**: 기본 최대 너비 480px
- **데스크톱**: 481px 이상에서 카드형 레이아웃
- **터치 영역**: 최소 44px
- **배경**: 순수 검정 (#000)

---

## 아이콘

- 인라인 SVG 사용
- 외부 아이콘 라이브러리 없음
- 아이콘 색상: 투명도 있는 흰색 또는 액센트 컬러

---

## 주요 기능

### 프로필 공유

- Web Share API 지원 시: 네이티브 공유
- 미지원 시: 클립보드 복사 폴백

### 토스트 알림

- DOM에 동적 생성
- 자동 사라짐 (3초)
- 다크 테마: 흰색 배경 + 검정 텍스트

### 이미지 폴백

- 프로필 이미지 로드 실패 시 SVG 플레이스홀더 표시

### 섹션별 애니메이션

- fadeIn 애니메이션으로 순차 등장 효과

---

## 디자인 토큰

> 다크 테마 색상, 타이포그래피, 스페이싱 정의

### 색상

| 용도           | 변수명                      | 색상코드                      |
| -------------- | --------------------------- | ----------------------------- |
| 배경           | `--color-bg`                | `#000000`                     |
| 카드 배경      | `--color-card`              | `rgba(255, 255, 255, 0.05)`   |
| 카드 테두리    | `--color-border`            | `rgba(255, 255, 255, 0.08)`   |
| 텍스트         | `--color-text`              | `#ffffff`                     |
| 보조 텍스트    | `--color-text-secondary`    | `rgba(255, 255, 255, 0.5)`    |
| 비활성 텍스트  | `--color-text-muted`        | `rgba(255, 255, 255, 0.3)`    |
| 액센트 (보라)  | `--color-accent`            | `#a78bfa`                     |
| 액센트 (파랑)  | `--color-accent-blue`       | `#60a5fa`                     |
| 액센트 (초록)  | `--color-accent-green`      | `#4ade80`                     |
| 액센트 (핑크)  | `--color-accent-pink`       | `#f472b6`                     |
| 액센트 (주황)  | `--color-accent-orange`     | `#fb923c`                     |
| 액센트 (노랑)  | `--color-accent-yellow`     | `#fbbf24`                     |

### 타이포그래피

#### 폰트 패밀리

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
  sans-serif;
```

- Google Fonts Inter 사용
- 시스템 폰트 폴백

#### 폰트 크기

| 토큰         | 크기   | 용도                 |
| ------------ | ------ | -------------------- |
| `--text-xs`  | 10px   | 태그, 배지           |
| `--text-sm`  | 12px   | 캡션, 보조 텍스트    |
| `--text-md`  | 13px   | 본문 보조            |
| `--text-base`| 15px   | 본문 기본            |
| `--text-lg`  | 16px   | 강조 본문            |
| `--text-xl`  | 20px   | 소제목 (h3)          |
| `--text-2xl` | 24px   | 중제목 (h2)          |

#### 폰트 웨이트

| 토큰              | 값  | 용도           |
| ----------------- | --- | -------------- |
| `--font-regular`  | 400 | 본문 기본      |
| `--font-medium`   | 500 | 약간 강조      |
| `--font-semibold` | 600 | 제목, 강조     |
| `--font-bold`     | 700 | 강한 강조      |

#### 줄 간격

| 토큰              | 값   | 용도           |
| ----------------- | ---- | -------------- |
| `--leading-tight` | 1.25 | 제목           |
| `--leading-snug`  | 1.4  | 짧은 텍스트    |
| `--leading-base`  | 1.5  | 본문 기본      |
| `--leading-loose` | 1.7  | 긴 본문        |

### 스페이싱 시스템

> 4px 베이스 스케일 사용

| 토큰          | 값    | 용도                    |
| ------------- | ----- | ----------------------- |
| `--space-1`   | 4px   | 아이콘-텍스트 간격      |
| `--space-2`   | 8px   | 요소 내부 작은 여백     |
| `--space-3`   | 12px  | 요소 내부 중간 여백     |
| `--space-4`   | 16px  | 요소 간 기본 간격       |
| `--space-5`   | 20px  | 그룹 간 간격            |
| `--space-6`   | 24px  | 섹션 내부 여백          |
| `--space-8`   | 32px  | 섹션 간 간격            |
| `--space-10`  | 40px  | 큰 섹션 구분            |
| `--space-12`  | 48px  | 페이지 여백             |

#### 컨테이너 패딩

```css
/* 모바일 */
padding: var(--space-4); /* 16px */

/* 데스크톱 */
padding: var(--space-6); /* 24px */
```

### CSS 변수 정의

> 복사하여 사용

```css
:root {
  /* 색상 - 다크 테마 */
  --color-bg: #000000;
  --color-card: rgba(255, 255, 255, 0.05);
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.15);
  --color-text: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.5);
  --color-text-muted: rgba(255, 255, 255, 0.3);

  /* 액센트 컬러 */
  --color-accent: #a78bfa;
  --color-accent-blue: #60a5fa;
  --color-accent-green: #4ade80;
  --color-accent-pink: #f472b6;
  --color-accent-orange: #fb923c;
  --color-accent-yellow: #fbbf24;

  /* 타이포그래피 */
  --text-xs: 10px;
  --text-sm: 12px;
  --text-md: 13px;
  --text-base: 15px;
  --text-lg: 16px;
  --text-xl: 20px;
  --text-2xl: 24px;

  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  --leading-tight: 1.25;
  --leading-snug: 1.4;
  --leading-base: 1.5;
  --leading-loose: 1.7;

  /* 스페이싱 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* 반경 */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 50%;
}
```

---

## 컴포넌트 스타일

> 다크 테마 UI 컴포넌트 스타일 가이드

### 버튼

#### Primary 버튼 (흰색)

```css
.btn-primary {
  background: #ffffff;
  color: #000000;
  padding: var(--space-4) var(--space-6); /* 16px 24px */
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  min-height: 44px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.9);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

#### Secondary 버튼 (투명)

```css
.btn-secondary {
  background: var(--color-card);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  min-height: 44px;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-border-hover);
}
```

#### Ghost 버튼

```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
}
```

### 카드

```css
.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4); /* 16px */
}

.card-hover {
  transition: all 0.2s ease;
}

.card-hover:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}
```

### 리스트 아이템

```css
.list-item {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  margin: 0 16px 8px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
}

.list-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-border-hover);
}

.list-item:active {
  transform: scale(0.98);
}
```

### 아이콘 박스

```css
.icon-box {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 이메일 */
.icon-box.email {
  background: rgba(59, 130, 246, 0.15);
  color: var(--color-accent-blue);
}

/* 전화 */
.icon-box.phone {
  background: rgba(34, 197, 94, 0.15);
  color: var(--color-accent-green);
}

/* 인스타그램 */
.icon-box.instagram {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%);
  color: var(--color-accent-pink);
}

/* GitHub */
.icon-box.github {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
}

/* 블로그 */
.icon-box.blog {
  background: rgba(251, 146, 60, 0.15);
  color: var(--color-accent-orange);
}
```

### 배지

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
}

.badge-primary {
  background: rgba(168, 85, 247, 0.2);
  color: #c084fc;
}

.badge-outline {
  background: transparent;
  border: 1px solid rgba(168, 85, 247, 0.3);
  color: var(--color-accent);
}
```

### 링크

```css
.link {
  color: var(--color-accent);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.link:hover {
  opacity: 0.8;
}
```

### 구분선

```css
.divider {
  height: 1px;
  background: var(--color-border);
  margin: var(--space-6) 0;
}
```

### 입력 필드

```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  color: var(--color-text);
  min-height: 44px;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.15);
}

.input::placeholder {
  color: var(--color-text-muted);
}
```

### 토스트

```css
.toast {
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  color: #000000;
  padding: 14px 24px;
  border-radius: var(--radius-lg);
  font-size: var(--text-md);
  font-weight: var(--font-medium);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: toast-in 0.3s ease;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
```

### 프로필 이미지

```css
.profile-image {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 3px solid var(--color-border);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
