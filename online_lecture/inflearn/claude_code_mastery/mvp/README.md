# MVP 컨텍스트 아키텍처

> Claude Code가 프로젝트를 이해하고 일관된 코드를 생성하도록 돕는 컨텍스트 파일 구조입니다.

---

## 구조

```
mvp/
├── CLAUDE.md                   # 진입점 (Claude가 가장 먼저 읽는 파일)
├── config/
│   ├── mvp-stack.yaml          # 기술 스택 정의
│   └── design-system.md        # 디자인 토큰, 컴포넌트 스타일
└── prompt/
    ├── mvp-rules.md            # 개발 규칙, 코딩 컨벤션
    └── templates.md            # 작업 지시문 템플릿
```

---

## 파일 역할

| 파일                      | 역할                                          |
| ------------------------- | --------------------------------------------- |
| `CLAUDE.md`               | 프로젝트 개요, 규칙 요약, 다른 파일 참조 안내 |
| `config/mvp-stack.yaml`   | 사용 기술 (HTML5, CSS3, Vanilla JS, Supabase) |
| `config/design-system.md` | 색상, 타이포그래피, 컴포넌트 CSS              |
| `prompt/mvp-rules.md`     | 파일 구조, 코딩 규칙, 필수/금지 사항          |
| `prompt/templates.md`     | 작업 지시문, 기능 요청, 버그 리포트 템플릿    |

---

## 사용 방법

### 1. 새 작업 요청 시

**방법 A: 파일로 요청 (복잡한 작업)**

```
1. prompt/templates.md 열기
2. 필요한 템플릿 복사 (작업 지시문 / 기능 요청 / 버그 리포트)
3. prompt/ 폴더에 새 파일 생성 (예: feature-login.md)
4. 템플릿 내용 채우기
5. Claude에게 요청: "@prompt/feature-login.md 이거 구현해줘"
```

**방법 B: 대화로 요청 (간단한 작업)**

```
프로필 섹션 추가해줘.
- 헤더 아래에 배치
- 이름, 사진, 한 줄 소개
- design-system.md 색상 사용
```

### 2. 코드 생성 시

Claude가 자동으로 참조:

- `prompt/mvp-rules.md` → 코딩 규칙, 파일 구조
- `config/design-system.md` → 색상, 컴포넌트 스타일

### 3. 기술 확인 시

`config/mvp-stack.yaml` 참조

---

## 설계 원칙

- **최소 파일**: 6개 파일로 전체 컨텍스트 커버
- **역할 분리**: 설정(config) / 규칙(prompt) 분리
- **단일 진입점**: CLAUDE.md에서 모든 파일 참조
