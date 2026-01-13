# 코드 리뷰 체크리스트

> MVP 규칙 준수 여부 검증용

---

## HTML

- [ ] 시맨틱 태그 사용 (`<header>`, `<main>`, `<section>`, `<footer>`)
- [ ] 접근성 속성 (`alt`, `aria-label`)
- [ ] 모바일 viewport 설정

---

## CSS

- [ ] CSS 변수 사용
- [ ] `clamp()` 폰트 크기
- [ ] 최소 44px 터치 영역
- [ ] 모바일 우선 미디어쿼리

---

## JavaScript

- [ ] 함수형 패턴 사용 (순수 함수, 불변성)
- [ ] async/await 비동기 처리
- [ ] 폼 중복 제출 방지
- [ ] console.log 제거

---

## 보안

- [ ] API 키 환경변수 처리
- [ ] innerHTML XSS 방지 (textContent 사용)
- [ ] 이미지 용량 검증 (5MB 이하)
