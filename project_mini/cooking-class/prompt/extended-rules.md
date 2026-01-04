# 확장 단계 개발 규칙

> MVP 완료 후 React/Next.js로 확장 시 적용하는 규칙입니다.

---

## 기술 스택

> 📁 참조: `config/extended-stack.yaml`

---

## 컴포넌트 구조

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

---

## 스타일링 규칙

- Tailwind CSS 우선 사용
- 커스텀 CSS는 최소화
- 반응형: 모바일 우선 (min-width)
- 폰트 크기: `clamp()` 사용 (어르신 가독성)
- 버튼/터치 영역: 최소 44px 이상
- 색상 대비: WCAG AA 기준 충족

```css
/* 예시: 어르신 친화적 폰트 크기 */
font-size: clamp(16px, 4vw, 20px);
```

---

## API 연동 규칙

### 기본 구조

```javascript
const response = await fetch("/api/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ image: base64Data }),
});
```

### AI 분석 프롬프트

```javascript
const ANALYZE_PROMPT = `
당신은 요식업 메뉴판 분석 전문가입니다.

## 입력
- 메뉴판 이미지

## 출력 (JSON)
{
  "menu_items": [
    {
      "name": "메뉴명",
      "ingredients": ["재료1", "재료2"],
      "allergens": ["알레르기 유발 성분"]
    }
  ],
  "confidence": 0.95
}

## 규칙
- 한글로 응답
- 불확실한 재료는 제외
- 알레르기 성분 필수 표기
`;
```

### 에러 처리

```javascript
try {
  const result = await analyzeMenu(image);
  return result;
} catch (error) {
  if (error.code === "RATE_LIMIT") {
    return { error: "잠시 후 다시 시도해주세요", retry: true };
  }
  if (error.code === "INVALID_IMAGE") {
    return { error: "메뉴판 이미지를 다시 촬영해주세요", retry: false };
  }
  console.error("[API Error]", error);
  return { error: "분석 중 오류가 발생했습니다", retry: true };
}
```

---

## ⚠️ 절대 하지 말 것

- [ ] API 키를 클라이언트 코드에 노출
- [ ] 사용자 입력값 검증 없이 사용
- [ ] console.log로 민감 정보 출력
- [ ] any 타입 남발
- [ ] 에러 메시지에 시스템 정보 노출
- [ ] 하드코딩된 한글 문자열 (i18n 대비)
- [ ] 동기 방식의 대용량 파일 처리

---

## ✅ 반드시 할 것

- [x] 환경변수로 API 키 관리 (.env.local)
- [x] 이미지 업로드 전 용량/형식 검증
- [x] 로딩 상태 UI 표시
- [x] 에러 발생 시 사용자 친화적 메시지
- [x] 모바일 우선 반응형 디자인
- [x] 접근성 (aria-label, alt 텍스트)
- [x] TypeScript strict 모드 사용
- [x] 커밋 전 lint/format 검사
