# 디자인 시스템

> Polaris 플랫폼 - AI 기반 비즈니스 솔루션 디자인 가이드

---

## 목차

1. [개요](#개요)
2. [테마 컨셉](#테마-컨셉)
3. [레이아웃](#레이아웃)
4. [주요 섹션](#주요-섹션)
5. [디자인 토큰](#디자인-토큰)
6. [컴포넌트 스타일](#컴포넌트-스타일)

---

## 개요

**프로젝트**: Polaris 플랫폼 (폴라리스 플랫폼)
**슬로건**: "삶의 길을 잃었을 때, 당신의 북극성이 되겠습니다"
**포지셔닝**: 위기를 기회로 바꾸는 한국의 팔란티어(Palantir)
**핵심 서비스**: 알라딘(Aladdin) AI 솔루션
**타겟 사용자**: 고령층 (50대 이상) - 가독성 최우선

---

## 테마 컨셉

### 브랜드 메타포

- **북극성(Polaris)**: 길을 잃었을 때 방향을 알려주는 안내자
- **알라딘(Aladdin)**: 소원을 이루어주는 마법의 램프처럼 문제 해결

### 디자인 방향

- **다크 테마 기반**: 밤하늘/우주를 연상시키는 딥 네이비 배경
- **별빛 효과**: 배경에 미세한 별 입자로 몽환적 분위기 연출
- **골드 악센트**: 북극성의 빛을 상징하는 따뜻한 황금색 포인트
- **4색 시스템**: 4가지 핵심 서비스를 구분하는 컬러 체계

---

## 레이아웃

- **반응형 디자인**: 데스크탑 (1200px) / 태블릿 (768px~) / 모바일 (~767px)
- **터치 영역**: 최소 48px (고령층 터치 편의성)
- **다크 테마**: 딥 네이비 배경 + 밝은 텍스트
- **섹션 구분**: 충분한 여백으로 시각적 분리
- **가독성**: 고령층을 위해 폰트 크기 20~30% 확대, 행간 1.7

---

## 주요 섹션

### 1. 히어로 섹션

- 별빛 배경 + 그라데이션 오버레이
- 메인 헤드라인 (강조 텍스트 색상 변화)
- 서브 태그라인
- CTA 버튼 그룹 (Primary + Secondary)
- 스크롤 유도 화살표

### 2. 알라딘 AI 솔루션

- 서비스 소개 텍스트
- 4분할 원형 다이어그램 (인터랙티브)
- 각 영역별 라벨 + 설명

### 3. 서비스 카드 섹션

- 시장조사/분석 (레드)
- 홍보 마케팅 (옐로우)
- 판로 개척 (그린)
- 자금 유동성 (블루)

---

## 디자인 토큰

> Polaris 브랜드 기반 색상 체계

### 색상

#### 기본 색상 (다크 테마)

| 용도          | 변수명                   | 색상코드                     | 설명                |
| ------------- | ------------------------ | ---------------------------- | ------------------- |
| 배경 (메인)   | `--color-bg`             | `#0a1628`                    | 딥 네이비 메인 배경 |
| 배경 (카드)   | `--color-bg-card`        | `#0f2035`                    | 카드/섹션 배경      |
| 배경 (입력)   | `--color-bg-input`       | `#152540`                    | 입력 필드 배경      |
| 배경 (서피스) | `#ffffff`                | 흰색 카드 배경 (서비스 섹션) |
| 텍스트        | `--color-text`           | `#ffffff`                    | 메인 텍스트         |
| 보조 텍스트   | `--color-text-secondary` | `#8892a0`                    | 보조/설명 텍스트    |
| 경계선        | `--color-border`         | `#1e3a5f`                    | 구분선/테두리       |

#### 브랜드 악센트 색상

| 용도           | 변수명               | 색상코드  | 설명                   |
| -------------- | -------------------- | --------- | ---------------------- |
| 골드 (Primary) | `--color-gold`       | `#f4c542` | 북극성, CTA, 주요 강조 |
| 골드 (밝은)    | `--color-gold-light` | `#ffd966` | 호버, 하이라이트       |
| 골드 (어두운)  | `--color-gold-dark`  | `#d4a520` | 활성 상태              |

#### 서비스 구분 색상 (알라딘 4색)

| 서비스        | 변수명           | 색상코드  | 설명               |
| ------------- | ---------------- | --------- | ------------------ |
| 시장조사/분석 | `--color-red`    | `#e74c3c` | AX (AI Experience) |
| 홍보 마케팅   | `--color-yellow` | `#f1c40f` | AI 기반 마케팅     |
| 판로 개척     | `--color-green`  | `#2ecc71` | 글로벌 소싱        |
| 자금 유동성   | `--color-blue`   | `#3498db` | 현금 흐름 확보     |

#### 그라데이션

```css
/* 히어로 배경 그라데이션 */
--gradient-hero: linear-gradient(180deg, #0a1628 0%, #0f2847 50%, #0a1628 100%);

/* CTA 버튼 그라데이션 */
--gradient-cta: linear-gradient(90deg, #f4c542 0%, #ffd966 50%, #f4c542 100%);

/* 원형 다이어그램 배경 */
--gradient-circle: conic-gradient(
  #e74c3c 0deg 90deg,
  #f1c40f 90deg 180deg,
  #2ecc71 180deg 270deg,
  #3498db 270deg 360deg
);
```

### 타이포그래피

#### 폰트 패밀리

```css
/* 한글 최적화 */
font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
  sans-serif;
```

#### 폰트 크기 (고령층 최적화)

> 고령층 타겟을 위해 기본 폰트 크기를 20~30% 증가시켜 가독성 향상

| 토큰         | 데스크탑 | 모바일 | 용도                 |
| ------------ | -------- | ------ | -------------------- |
| `--text-xs`  | 14px     | 13px   | 캡션, 태그           |
| `--text-sm`  | 16px     | 15px   | 보조 텍스트, 라벨    |
| `--text-md`  | 18px     | 17px   | 본문 기본            |
| `--text-lg`  | 20px     | 19px   | 카드 제목, 강조 본문 |
| `--text-xl`  | 24px     | 22px   | 소제목               |
| `--text-2xl` | 28px     | 26px   | 중제목               |
| `--text-3xl` | 34px     | 30px   | 섹션 제목            |
| `--text-4xl` | 42px     | 36px   | 히어로 헤드라인      |

#### 폰트 웨이트

| 토큰              | 값  | 용도            |
| ----------------- | --- | --------------- |
| `--font-regular`  | 400 | 본문 기본       |
| `--font-medium`   | 500 | 약간 강조       |
| `--font-semibold` | 600 | 제목, 버튼      |
| `--font-bold`     | 700 | 강한 강조       |
| `--font-black`    | 800 | 히어로 헤드라인 |

### 스페이싱 시스템

> 4px 베이스 스케일

| 토큰         | 값   | 용도                |
| ------------ | ---- | ------------------- |
| `--space-1`  | 4px  | 아이콘-텍스트 간격  |
| `--space-2`  | 8px  | 요소 내부 작은 여백 |
| `--space-3`  | 12px | 요소 내부 중간 여백 |
| `--space-4`  | 16px | 요소 간 기본 간격   |
| `--space-5`  | 20px | 카드 내부 패딩      |
| `--space-6`  | 24px | 섹션 내부 여백      |
| `--space-8`  | 32px | 섹션 간 간격        |
| `--space-10` | 40px | 히어로 섹션 패딩    |
| `--space-12` | 48px | 대형 섹션 간격      |

### CSS 변수 정의

> 복사하여 사용 (고령층 최적화 버전)

```css
:root {
  /* 다크 테마 기본 색상 */
  --color-bg: #0a1628;
  --color-bg-card: #0f2035;
  --color-bg-input: #152540;
  --color-bg-surface: #ffffff;
  --color-text: #ffffff;
  --color-text-secondary: #8892a0;
  --color-text-dark: #1a1a2e;
  --color-text-light: #555555; /* 가독성 향상 */
  --color-text-muted: #777777; /* 가독성 향상 */
  --color-border: #1e3a5f;

  /* 브랜드 골드 */
  --color-gold: #f4c542;
  --color-gold-light: #ffd966;
  --color-gold-dark: #d4a520;

  /* 서비스 구분 색상 */
  --color-red: #C62828;
  --color-yellow: #F9A825;
  --color-green: #2E7D32;
  --color-blue: #1976D2;

  /* 그라데이션 */
  --gradient-hero: linear-gradient(
    180deg,
    #0a1628 0%,
    #0f2847 50%,
    #0a1628 100%
  );
  --gradient-cta: linear-gradient(90deg, #f4c542 0%, #ffd966 50%, #f4c542 100%);

  /* 타이포그래피 - 고령층 최적화 (데스크탑) */
  --text-xs: 14px;
  --text-sm: 16px;
  --text-md: 18px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 28px;
  --text-3xl: 34px;
  --text-4xl: 42px;

  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-black: 800;

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

  /* 기타 */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  --touch-min: 48px;

  /* 그림자 */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
  --shadow-glow: 0 0 20px rgba(244, 197, 66, 0.3);
}

/* 모바일 폰트 크기 (고령층 최적화) */
@media (max-width: 767px) {
  :root {
    --text-xs: 13px;
    --text-sm: 15px;
    --text-md: 17px;
    --text-lg: 19px;
    --text-xl: 22px;
    --text-2xl: 26px;
    --text-3xl: 30px;
    --text-4xl: 36px;
  }
}
```

---

## 컴포넌트 스타일

> Polaris 다크 테마 기반 UI 컴포넌트

### 버튼

#### Primary 버튼 (CTA)

```css
.btn-primary {
  background: var(--gradient-cta);
  color: var(--color-text-dark);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-full);
  font-weight: var(--font-semibold);
  font-size: var(--text-md);
  min-height: var(--touch-min);
  border: none;
  width: 100%;
  max-width: 280px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}
```

#### Secondary 버튼 (Outline)

```css
.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-text);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-full);
  font-weight: var(--font-medium);
  font-size: var(--text-md);
  min-height: var(--touch-min);
  width: 100%;
  max-width: 280px;
  transition: background 0.2s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

#### 태그 버튼 (Pill)

```css
.btn-tag {
  background: transparent;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
```

### 카드 (서비스 카드)

```css
.service-card {
  background: var(--color-bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  border-left: 4px solid currentColor;
}

.service-card--red {
  border-color: var(--color-red);
}
.service-card--yellow {
  border-color: var(--color-yellow);
}
.service-card--green {
  border-color: var(--color-green);
}
.service-card--blue {
  border-color: var(--color-blue);
}

.service-card__title {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: var(--space-3);
}

.service-card__list {
  list-style: disc;
  padding-left: var(--space-5);
  color: var(--color-text-dark);
}

.service-card__list li {
  font-size: var(--text-sm);
  margin-bottom: var(--space-2);
}
```

### 히어로 섹션

```css
.hero {
  background: var(--gradient-hero);
  padding: var(--space-10) var(--space-4);
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 별빛 효과 (의사 요소) */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    2px 2px at 20% 30%,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  background-size: 100px 100px;
}

.hero__headline {
  font-size: var(--text-4xl);
  font-weight: var(--font-black);
  color: var(--color-text);
  line-height: 1.3;
  margin-bottom: var(--space-4);
}

.hero__headline-accent {
  color: var(--color-gold);
}

.hero__subtext {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
}

.hero__brand {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-gold);
  margin-bottom: var(--space-6);
}
```

### 원형 다이어그램

```css
.circle-diagram {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    var(--color-red) 0deg 90deg,
    var(--color-yellow) 90deg 180deg,
    var(--color-green) 180deg 270deg,
    var(--color-blue) 270deg 360deg
  );
  position: relative;
  margin: 0 auto;
}

.circle-diagram__center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: var(--color-bg-surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-diagram__label {
  position: absolute;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  padding: var(--space-2) var(--space-3);
  background: rgba(0, 0, 0, 0.6);
  border-radius: var(--radius-sm);
}
```

### 섹션 헤더

```css
.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-header__icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-4);
}

.section-header__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-dark);
  margin-bottom: var(--space-2);
}

.section-header__title-accent {
  color: var(--color-gold);
}

.section-header__subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  max-width: 300px;
  margin: 0 auto;
}
```

### 스크롤 인디케이터

```css
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  margin-top: var(--space-8);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}
```

### 로고/헤더

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background: transparent;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.logo__icon {
  width: 32px;
  height: 32px;
}

.logo__text {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text);
}

.logo__subtext {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}
```

---

## 아이콘 가이드

### 브랜드 아이콘

- **로고**: 4색 창문 형태 (빨강, 노랑, 초록, 파랑)
- **북극성**: 4방향 빛나는 별 아이콘
- **램프**: 알라딘 램프 아이콘 (솔루션 섹션)

### 서비스 아이콘 (권장)

| 서비스        | 아이콘 제안    |
| ------------- | -------------- |
| 시장조사/분석 | 차트/그래프    |
| 홍보 마케팅   | 메가폰/스피커  |
| 판로 개척     | 지구/글로브    |
| 자금 유동성   | 동전/화폐 흐름 |

---

## 반응형 가이드

```css
/* 데스크톱 (기본) - 고령층 최적화 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

body {
  font-size: var(--text-md); /* 18px */
  line-height: 1.7; /* 가독성 향상 */
}

.hero__title {
  font-size: clamp(32px, 7vw, 56px);
}

/* 태블릿 */
@media (min-width: 768px) {
  .nav {
    display: flex;
  }

  .service-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* 데스크톱 */
@media (min-width: 1024px) {
  .service-cards {
    grid-template-columns: repeat(4, 1fr);
  }

  .process-steps {
    flex-direction: row;
  }
}

/* 모바일 - 고령층 폰트 크기 유지 */
@media (max-width: 767px) {
  :root {
    --text-xs: 13px;
    --text-sm: 15px;
    --text-md: 17px;
    --text-lg: 19px;
    --text-xl: 22px;
    --text-2xl: 26px;
    --text-3xl: 30px;
    --text-4xl: 36px;
  }

  .service-cards,
  .success-cards,
  .concerns-buttons,
  .stats,
  .realestate-cards {
    grid-template-columns: 1fr;
  }
}
```

### 고령층 가독성 가이드라인

1. **폰트 크기**: 최소 14px 이상 유지
2. **대비**: 텍스트와 배경 간 충분한 명도 대비
3. **행간**: 1.6~1.7 이상으로 여유롭게
4. **버튼 크기**: 최소 48px 터치 영역 확보
5. **여백**: 요소 간 충분한 간격으로 시각적 구분
