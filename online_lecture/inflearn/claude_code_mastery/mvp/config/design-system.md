# 디자인 시스템

> 2025 겨울 수련회 "Love in Action" 미션 체크리스트 디자인 가이드

---

## 목차

1. [개요](#개요)
2. [테마 컨셉](#테마-컨셉)
3. [레이아웃](#레이아웃)
4. [주요 기능](#주요-기능)
5. [디자인 토큰](#디자인-토큰)
6. [컴포넌트 스타일](#컴포넌트-스타일)

---

## 개요

**프로젝트**: 강청 2025 겨울 수련회 미션 체크리스트
**테마**: Love in Action (요한일서 3:18)
**기간**: 2025.2.6(금) ~ 2.8(주일) 2박 3일
**장소**: 강화 그레이스힐

---

## 테마 컨셉

> "자녀들아 우리가 말과 혀로만 사랑하지 말고 행함과 진실함으로 하자" - 요한일서 3:18

### 디자인 방향

- **다크 모드 기반**: 포스터의 어두운 배경 톤 유지
- **컬러풀 악센트**: LOVE in ACTION 레터링의 다채로운 색상 활용
- **따뜻한 감성**: 하트, 손 이미지의 따뜻한 핑크/마젠타 톤

---

## 레이아웃

- **모바일 우선**: 기본 최대 너비 375px
- **터치 영역**: 최소 44px
- **다크 테마**: 어두운 배경 + 밝은 텍스트

---

## 주요 기능

### 1. 인트로 화면

- 이름 입력 후 시작
- 사용자 정보 로컬스토리지 저장
- 재방문 시 자동 로그인

### 2. 미션 체크리스트

- Day 1, 2, 3 섹션별 미션 표시
- 체크박스 토글로 완료 상태 변경
- 전체 진행률 프로그레스 바
- 완료 상태 로컬스토리지 저장

### 3. 간증문 작성

- 텍스트 입력 폼
- 임시저장 기능 (로컬스토리지)
- Supabase 연동 제출

### 4. 설문조사

- 장점/단점 서술형
- 만족도 평가 (5점 척도)
- Supabase 연동 제출

### 5. 토스트 알림

- 미션 완료, 저장 완료 등 피드백
- 3초 후 자동 사라짐

---

## 디자인 토큰

> "Love in Action" 포스터 기반 색상 체계

### 색상

#### 기본 색상 (다크 테마)

| 용도        | 변수명                   | 색상코드  | 설명             |
| ----------- | ------------------------ | --------- | ---------------- |
| 배경        | `--color-bg`             | `#0d0d0d` | 포스터 배경      |
| 배경 (카드) | `--color-bg-card`        | `#1a1a1a` | 카드/섹션 배경   |
| 배경 (입력) | `--color-bg-input`       | `#262626` | 입력 필드 배경   |
| 텍스트      | `--color-text`           | `#ffffff` | 메인 텍스트      |
| 보조 텍스트 | `--color-text-secondary` | `#a3a3a3` | 보조/설명 텍스트 |
| 경계선      | `--color-border`         | `#333333` | 구분선/테두리    |

#### 악센트 색상 (LOVE in ACTION)

| 용도        | 변수명           | 색상코드  | 설명              |
| ----------- | ---------------- | --------- | ----------------- |
| 핑크/마젠타 | `--color-pink`   | `#e91e63` | 하트, 주요 악센트 |
| 레드        | `--color-red`    | `#f44336` | L 글자, 경고      |
| 블루        | `--color-blue`   | `#2196f3` | O 글자, 정보      |
| 옐로우      | `--color-yellow` | `#ffeb3b` | V 글자, 강조      |
| 그린        | `--color-green`  | `#4caf50` | E 글자, 성공      |
| 오렌지      | `--color-orange` | `#ff9800` | 보조 악센트       |

#### 그라데이션

```css
/* 인트로/버튼용 그라데이션 */
--gradient-primary: linear-gradient(
  135deg,
  #e91e63 0%,
  #ff5722 50%,
  #ff9800 100%
);

/* 프로그레스 바용 */
--gradient-progress: linear-gradient(
  90deg,
  #e91e63 0%,
  #f44336 25%,
  #ff9800 50%,
  #ffeb3b 75%,
  #4caf50 100%
);
```

### 타이포그래피

#### 폰트 패밀리

```css
font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
  sans-serif;
```

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

### 스페이싱 시스템

> 4px 베이스 스케일

| 토큰        | 값   | 용도                |
| ----------- | ---- | ------------------- |
| `--space-1` | 4px  | 아이콘-텍스트 간격  |
| `--space-2` | 8px  | 요소 내부 작은 여백 |
| `--space-3` | 12px | 요소 내부 중간 여백 |
| `--space-4` | 16px | 요소 간 기본 간격   |
| `--space-5` | 20px | 그룹 간 간격        |
| `--space-6` | 24px | 섹션 내부 여백      |
| `--space-8` | 32px | 섹션 간 간격        |

### CSS 변수 정의

> 복사하여 사용

```css
:root {
  /* 다크 테마 기본 색상 */
  --color-bg: #0d0d0d;
  --color-bg-card: #1a1a1a;
  --color-bg-input: #262626;
  --color-text: #ffffff;
  --color-text-secondary: #a3a3a3;
  --color-border: #333333;

  /* 악센트 색상 (LOVE in ACTION) */
  --color-pink: #e91e63;
  --color-red: #f44336;
  --color-blue: #2196f3;
  --color-yellow: #ffeb3b;
  --color-green: #4caf50;
  --color-orange: #ff9800;

  /* 그라데이션 */
  --gradient-primary: linear-gradient(
    135deg,
    #e91e63 0%,
    #ff5722 50%,
    #ff9800 100%
  );
  --gradient-progress: linear-gradient(
    90deg,
    #e91e63 0%,
    #f44336 25%,
    #ff9800 50%,
    #ffeb3b 75%,
    #4caf50 100%
  );

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

  /* 스페이싱 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  /* 기타 */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --touch-min: 44px;
}
```

---

## 컴포넌트 스타일

> 다크 테마 기반 UI 컴포넌트

### 버튼

#### Primary 버튼

```css
.btn-primary {
  background: var(--gradient-primary);
  color: #ffffff;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-md);
  min-height: var(--touch-min);
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(233, 30, 99, 0.3);
}
```

#### Secondary 버튼

```css
.btn-secondary {
  background: transparent;
  color: var(--color-pink);
  border: 1px solid var(--color-pink);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  min-height: var(--touch-min);
}

.btn-secondary:hover {
  background: rgba(233, 30, 99, 0.1);
}
```

### 카드

```css
.card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
}
```

### 입력 필드

```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-input);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--text-md);
  min-height: var(--touch-min);
}

.input:focus {
  outline: none;
  border-color: var(--color-pink);
  box-shadow: 0 0 0 3px rgba(233, 30, 99, 0.2);
}

.input::placeholder {
  color: var(--color-text-secondary);
}
```

### 체크박스 (미션 아이템)

```css
.mission-item__checkbox {
  width: 28px;
  height: 28px;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mission-item--completed .mission-item__checkbox {
  background: var(--gradient-primary);
  border-color: transparent;
}
```

### 프로그레스 바

```css
.progress-bar {
  height: 8px;
  background: var(--color-bg-input);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--gradient-progress);
  border-radius: 4px;
  transition: width 0.3s ease;
}
```

### 토스트

```css
.toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-bg-card);
  color: var(--color-text);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  font-size: var(--text-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}
```

### Day 섹션 헤더

```css
.day-section__title {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-pink);
}

.day-section__subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
```

## 반응형 가이드

```css
/* 데스크톱 (기본) */
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.hero__headline {
  font-size: 48px;
}

/* 태블릿 */
@media (max-width: 1024px) {
  .container {
    max-width: 720px;
  }

  .service-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }
}

/* 모바일 */
@media (max-width: 768px) {
  .container {
    max-width: 390px;
  }

  .service-cards {
    grid-template-columns: 1fr;
  }

  .hero__headline {
    font-size: 32px;
  }
}
```
