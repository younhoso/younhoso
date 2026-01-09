# 디자인 시스템

> 개발자 웹 이력서 프로젝트의 통합 디자인 가이드

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
색상, 타이포그래피, 스페이싱, 컴포넌트 스타일을 포함합니다.

---

## 레이아웃

- **모바일 우선**: 기본 최대 너비 480px
- **데스크톱**: 481px 이상에서 카드형 레이아웃
- **터치 영역**: 최소 44px

---

## 아이콘

- 인라인 SVG 사용
- 외부 아이콘 라이브러리 없음

---

## 주요 기능

### 프로필 공유

- Web Share API 지원 시: 네이티브 공유
- 미지원 시: 클립보드 복사 폴백

### 토스트 알림

- DOM에 동적 생성
- 자동 사라짐 (3초)

### 이미지 폴백

- 프로필 이미지 로드 실패 시 SVG 플레이스홀더 표시

### 섹션별 애니메이션

- fadeIn 애니메이션으로 순차 등장 효과

---

## 디자인 토큰

> 색상, 타이포그래피, 스페이싱 정의

### 색상

| 용도        | 변수명                   | 색상코드  |
| ----------- | ------------------------ | --------- |
| 배경        | `--color-bg`             | `#f4f5f7` |
| 텍스트      | `--color-text`           | `#191f28` |
| 보조 텍스트 | `--color-text-secondary` | `#8b95a1` |
| 액센트      | `--color-accent`         | `#3182f6` |

### 타이포그래피

#### 폰트 패밀리

```css
font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
  sans-serif;
```

- 시스템 폰트 스택 사용
- 외부 폰트 로드 없음 (성능 최적화)

#### 폰트 크기

| 토큰         | 크기 | 용도              |
| ------------ | ---- | ----------------- |
| `--text-xs`  | 12px | 캡션, 보조 텍스트 |
| `--text-sm`  | 14px | 본문 보조, 라벨   |
| `--text-md`  | 16px | 본문 기본         |
| `--text-lg`  | 18px | 강조 본문         |
| `--text-xl`  | 20px | 소제목 (h3)       |
| `--text-2xl` | 24px | 중제목 (h2)       |
| `--text-3xl` | 30px | 대제목 (h1)       |

#### 폰트 웨이트

| 토큰              | 값  | 용도       |
| ----------------- | --- | ---------- |
| `--font-regular`  | 400 | 본문 기본  |
| `--font-medium`   | 500 | 약간 강조  |
| `--font-semibold` | 600 | 제목, 강조 |
| `--font-bold`     | 700 | 강한 강조  |

#### 줄 간격

| 토큰              | 값   | 용도        |
| ----------------- | ---- | ----------- |
| `--leading-tight` | 1.25 | 제목        |
| `--leading-snug`  | 1.4  | 짧은 텍스트 |
| `--leading-base`  | 1.6  | 본문 기본   |
| `--leading-loose` | 1.8  | 긴 본문     |

### 스페이싱 시스템

> 4px 베이스 스케일 사용

| 토큰         | 값   | 용도                |
| ------------ | ---- | ------------------- |
| `--space-1`  | 4px  | 아이콘-텍스트 간격  |
| `--space-2`  | 8px  | 요소 내부 작은 여백 |
| `--space-3`  | 12px | 요소 내부 중간 여백 |
| `--space-4`  | 16px | 요소 간 기본 간격   |
| `--space-5`  | 20px | 그룹 간 간격        |
| `--space-6`  | 24px | 섹션 내부 여백      |
| `--space-8`  | 32px | 섹션 간 간격        |
| `--space-10` | 40px | 큰 섹션 구분        |
| `--space-12` | 48px | 페이지 여백         |

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
  /* 색상 */
  --color-bg: #1a1a1a;
  --color-text: #191f28;
  --color-text-secondary: #8b95a1;
  --color-accent: #3182f6;

  /* 타이포그래피 */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-md: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;

  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  --leading-tight: 1.25;
  --leading-snug: 1.4;
  --leading-base: 1.6;
  --leading-loose: 1.8;

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
}
```

---

## 컴포넌트 스타일

> UI 컴포넌트 스타일 가이드

### 버튼

#### Primary 버튼

```css
.btn-primary {
  background: var(--color-accent); /* #3182f6 */
  color: #ffffff;
  padding: var(--space-3) var(--space-5); /* 12px 20px */
  border-radius: 8px;
  font-weight: var(--font-semibold);
  font-size: var(--text-md);
  min-height: 44px; /* 터치 영역 */
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #1b64da;
}

.btn-primary:active {
  background: #1557c0;
}
```

#### Secondary 버튼

```css
.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  padding: var(--space-3) var(--space-5);
  border-radius: 8px;
  font-weight: var(--font-medium);
  min-height: 44px;
}
```

#### Ghost 버튼

```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-3);
  border-radius: 6px;
}

.btn-ghost:hover {
  background: rgba(0, 0, 0, 0.05);
}
```

### 카드

```css
.card {
  background: #ffffff;
  border-radius: 12px;
  padding: var(--space-5); /* 20px */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### 배지

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2); /* 4px 8px */
  border-radius: 4px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.badge-primary {
  background: rgba(49, 130, 246, 0.1);
  color: var(--color-accent);
}

.badge-gray {
  background: rgba(139, 149, 161, 0.15);
  color: var(--color-text-secondary);
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
  text-decoration: underline;
}
```

### 구분선

```css
.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: var(--space-6) 0;
}
```

### 입력 필드

```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4); /* 12px 16px */
  border: 1px solid #e5e8eb;
  border-radius: 8px;
  font-size: var(--text-md);
  min-height: 44px;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(49, 130, 246, 0.1);
}

.input::placeholder {
  color: var(--color-text-secondary);
}
```

### 토스트

```css
.toast {
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-text); /* #191f28 */
  color: #ffffff;
  padding: var(--space-3) var(--space-5);
  border-radius: 8px;
  font-size: var(--text-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
