# 체크리스트 생성 작업

> 이 파일은 팀원별 체크리스트 파일을 자동 생성하는 작업 지시문입니다.

---

## 목표

`agent-input/team/*` 이미지들에 대해, `{NAME}-checklist.yaml`과 동일한 형식의 체크리스트 파일을 초기화 상태로 생성

---

## 실행 조건

1. `agent-input/team/` 폴더 내 이미지 파일 탐색
2. 파일명에서 `{NAME}` 추출
3. `{NAME}-checklist.yaml` 형식으로 체크리스트 생성
4. 스크립트 실행 성공 시 스크립트 파일 삭제

---

## 체크리스트 템플릿

```yaml
name: "{NAME}"
created_at: "{TIMESTAMP}"
status: "pending"

tasks:
  - id: 1
    title: "프로필 확인"
    completed: false
  - id: 2
    title: "역할 배정"
    completed: false
  - id: 3
    title: "온보딩 완료"
    completed: false
```

---

## 실행 방법

```bash
# Claude Code에게 이 파일을 참조하여 작업 요청
# 예: "prompt/create-check-list.md 참고해서 실행해줘"
```
