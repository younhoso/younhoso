# CLAUDE.md - AI 개발 가이드

> 이 파일은 Claude Code가 프로젝트를 이해할 때 참고하는 가이드입니다.

---

## 프로젝트 개요

- **프로젝트명**: 개발자 웹 이력서
- **목적**: Claude Code 테스트
- **타겟**: 테스트

---

## 규칙

1. 기술 스택은 `config/mvp-stack.yaml` 참조
2. 작업 지시문은 `prompt/*.md` 파일로 분리
3. MVP 수준 유지 - 최소 기능으로 빠르게 검증

---

## 폴더 구조

```
mvp/
├── CLAUDE.md                   # 진입점
├── config/
│   ├── mvp-stack.yaml          # 기술 스택
│   └── design-system.md        # 디자인 시스템
└── prompt/
    ├── mvp-rules.md            # MVP 개발 규칙
    ├── review-checklist.md     # 리뷰 체크리스트
    └── templates.md            # 작업 템플릿 모음
```

---

## 파일 목록

| 파일 | 설명 |
| ---- | ---- |
| `config/mvp-stack.yaml` | 기술 스택 (HTML5, CSS3, Vanilla JS, Supabase) |
| `config/design-system.md` | 색상, 타이포그래피, 컴포넌트 |
| `prompt/mvp-rules.md` | 파일 구조, 코딩 규칙, 필수/금지 사항 |
| `prompt/templates.md` | 작업 지시문, 기능 요청, 버그 리포트 템플릿 |

---

## 개발 규칙

> 📁 MVP 단계: `prompt/mvp-rules.md` 참조
