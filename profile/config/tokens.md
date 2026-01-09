# 디자인 토큰

> 색상, 타이포그래피, 스페이싱 정의

---

## 색상

| 용도        | 변수명                     | 색상코드  |
| ----------- | -------------------------- | --------- |
| 배경        | `--color-bg`               | `#f4f5f7` |
| 텍스트      | `--color-text`             | `#191f28` |
| 보조 텍스트 | `--color-text-secondary`   | `#8b95a1` |
| 액센트      | `--color-accent`           | `#3182f6` |

---

## 타이포그래피

### 폰트 패밀리

```css
font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
  sans-serif;
```

- 시스템 폰트 스택 사용
- 외부 폰트 로드 없음 (성능 최적화)

### 폰트 크기

| 토큰         | 크기   | 용도                 |
| ------------ | ------ | -------------------- |
| `--text-xs`  | 12px   | 캡션, 보조 텍스트    |
| `--text-sm`  | 14px   | 본문 보조, 라벨      |
| `--text-md`  | 16px   | 본문 기본            |
| `--text-lg`  | 18px   | 강조 본문            |
| `--text-xl`  | 20px   | 소제목 (h3)          |
| `--text-2xl` | 24px   | 중제목 (h2)          |
| `--text-3xl` | 30px   | 대제목 (h1)          |

### 폰트 웨이트

| 토큰              | 값  | 용도           |
| ----------------- | --- | -------------- |
| `--font-regular`  | 400 | 본문 기본      |
| `--font-medium`   | 500 | 약간 강조      |
| `--font-semibold` | 600 | 제목, 강조     |
| `--font-bold`     | 700 | 강한 강조      |

### 줄 간격

| 토큰              | 값   | 용도           |
| ----------------- | ---- | -------------- |
| `--leading-tight` | 1.25 | 제목           |
| `--leading-snug`  | 1.4  | 짧은 텍스트    |
| `--leading-base`  | 1.6  | 본문 기본      |
| `--leading-loose` | 1.8  | 긴 본문        |

---

## 스페이싱 시스템

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

### 컨테이너 패딩

```css
/* 모바일 */
padding: var(--space-4); /* 16px */

/* 데스크톱 */
padding: var(--space-6); /* 24px */
```

---

## CSS 변수 정의

> 복사하여 사용

```css
:root {
  /* 색상 */
  --color-bg: #f4f5f7;
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
