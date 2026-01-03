# CLAUDE.md - AI 개발 가이드

> 이 파일은 Claude Code가 프로젝트를 이해하고 개발할 때 참고하는 가이드입니다.

---

## 프로젝트 개요

- **프로젝트명**: 요리반상회
- **목적**: 메뉴판 사진으로 재료 자동 분석
- **타겟**: 요식업 소상공인
- **MVP 예산**: 5,000만원 (정부지원사업)

---

## 기술 스택

### 현재 (MVP)

```yaml
frontend: HTML5 + CSS3 + Vanilla JS
ai_service: Google Gemini 1.5 Flash (권장)
deployment: Vercel / Netlify
```

### 확장 시

```yaml
framework: Next.js 14+ (App Router)
styling: Tailwind CSS
database: Supabase (PostgreSQL)
auth: Supabase Auth
storage: Supabase Storage
ai_service:
  - primary: Google Gemini
  - fallback: OpenAI GPT-4o
```

---

## 코딩 규칙

### 파일 명명

```
- 컴포넌트: PascalCase (MenuCard.tsx)
- 유틸리티: camelCase (analyzeImage.ts)
- 스타일: kebab-case (menu-card.css)
- 상수: SCREAMING_SNAKE_CASE (API_ENDPOINTS.ts)
```

### 컴포넌트 구조

```typescript
// 권장 순서
import { ... } from 'react';           // 1. React
import { ... } from 'next/...';        // 2. Next.js
import { ... } from '@/components/...'; // 3. 내부 컴포넌트
import { ... } from '@/lib/...';       // 4. 유틸리티
import type { ... } from '@/types/...'; // 5. 타입

interface Props { ... }                 // 6. Props 정의

export function Component({ ... }: Props) {
  // 7. hooks
  // 8. state
  // 9. effects
  // 10. handlers
  // 11. render
}
```

### 스타일링 규칙

```
- Tailwind CSS 우선 사용
- 커스텀 CSS는 최소화
- 반응형: 모바일 우선 (min-width)
- 폰트 크기: clamp() 사용 (어르신 가독성)
```

---

## API 연동 규칙

### 환경변수

```env
# 클라이언트 노출 가능
NEXT_PUBLIC_DEMO_MODE=true

# 서버에서만 사용 (절대 노출 금지)
GEMINI_API_KEY=xxx
OPENAI_API_KEY=xxx
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
```

### AI 분석 프롬프트

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

### 에러 처리

```typescript
try {
  const result = await analyzeImage(imageBase64);
  return result;
} catch (error) {
  // 1. 로깅
  console.error("Analysis failed:", error);

  // 2. 사용자 친화적 메시지
  return {
    error: true,
    message: "분석 중 오류가 발생했습니다. 다시 시도해주세요.",
  };

  // 3. 폴백 (선택)
  // return DEMO_DATA;
}
```

---

## 보안 규칙

### ⚠️ 절대 하지 말 것

```
❌ API 키를 클라이언트 코드에 노출
❌ 사용자 입력을 검증 없이 사용
❌ SQL 인젝션 가능한 쿼리 작성
❌ 민감한 데이터를 로컬스토리지에 저장
```

### ✅ 반드시 할 것

```
✅ API 키는 서버 사이드에서만 사용
✅ 이미지 업로드 시 파일 타입 검증
✅ 응답 데이터 JSON 파싱 전 유효성 검사
✅ Rate limiting 적용
```

---

## 데이터베이스 스키마 (확장 시)

### menus 테이블

```sql
CREATE TABLE menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  menu_name TEXT NOT NULL,
  image_url TEXT,
  ingredients JSONB,
  allergens TEXT[],
  origin_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### analysis_history 테이블

```sql
CREATE TABLE analysis_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  image_url TEXT NOT NULL,
  result JSONB NOT NULL,
  ai_provider TEXT,
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 컴포넌트 명세

### UploadArea

```typescript
interface UploadAreaProps {
  onUpload: (file: File, base64: string) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
}
```

### MenuCard

```typescript
interface MenuCardProps {
  menuName: string;
  ingredients: Ingredient[];
  allergens: string[];
  originRequired: string[];
}

interface Ingredient {
  name: string;
  icon: string;
  certain: boolean;
}
```

### IngredientTag

```typescript
interface IngredientTagProps {
  name: string;
  icon: string;
  uncertain?: boolean;
}
```

---

## 테스트 시나리오

### 업로드 테스트

```
1. 정상 이미지 업로드 → 미리보기 표시
2. 잘못된 파일 형식 → 에러 메시지
3. 대용량 파일 (10MB+) → 에러 메시지
4. 드래그앤드롭 → 정상 동작
```

### 분석 테스트

```
1. 데모 모드 → 시뮬레이션 결과 표시
2. API 모드 (키 없음) → 에러 메시지
3. API 모드 (키 있음) → 실제 분석 결과
4. 네트워크 오류 → 재시도 옵션
```

### 내보내기 테스트

```
1. JSON 내보내기 → 파일 다운로드
2. PDF 내보내기 → 인쇄 화면 표시
```

---

## 성능 최적화

### 이미지 처리

```typescript
// 업로드 전 리사이징 (권장)
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 0.8;

async function resizeImage(file: File): Promise<string> {
  // canvas를 이용한 리사이징
  // base64 반환
}
```

### API 호출

```typescript
// 디바운싱 적용
const debouncedAnalyze = useDebouncedCallback(
  (image) => analyzeImage(image),
  500
);
```

---

## 배포 체크리스트

### 배포 전

```
□ 환경변수 설정 확인
□ API 키 유효성 확인
□ 빌드 에러 없음
□ 콘솔 에러 없음
□ 모바일 테스트 완료
□ 크로스 브라우저 테스트
```

### 배포 후

```
□ 실제 URL 접속 확인
□ HTTPS 적용 확인
□ 이미지 업로드 테스트
□ API 연동 테스트
□ 에러 로깅 확인
```

---

## 자주 발생하는 이슈

### 1. CORS 에러

```
해결: API Route를 통해 서버에서 호출
```

### 2. 이미지 base64 인코딩 오류

```
해결: data:image/jpeg;base64, 프리픽스 제거 후 전송
```

### 3. JSON 파싱 실패

````
해결: AI 응답에서 ```json``` 마커 제거 후 파싱
const jsonMatch = text.match(/\{[\s\S]*\}/);
````

### 4. 한글 깨짐

```
해결: Content-Type에 charset=utf-8 명시
```

---

## 연락처

- **프로젝트 담당**: 에드스파크컨설팅
- **문서 버전**: 1.0
- **최종 수정**: 2026.01.03
