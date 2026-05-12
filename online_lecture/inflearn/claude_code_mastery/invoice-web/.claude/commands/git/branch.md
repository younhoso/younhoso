---
description: '브랜치 생성, 전환, 삭제 등 브랜치 관리 작업을 수행합니다'
allowed-tools:
  [
    'Bash(git branch:*)',
    'Bash(git checkout:*)',
    'Bash(git switch:*)',
    'Bash(git status:*)',
    'Bash(git stash:*)',
    'Bash(git log:*)',
    'Bash(git fetch:*)',
  ]
---

# Claude 명령어: Branch

브랜치 생성, 전환, 삭제 등 Git 브랜치 관리를 위한 종합 도구입니다.

## 사용법

```
/git:branch [브랜치명]           # 새 브랜치 생성 및 전환
/git:branch                    # 대화형 브랜치 관리 메뉴
```

## 주요 기능

### 1. 브랜치 생성 및 전환

- 새 브랜치 생성과 동시에 전환
- 브랜치명 규칙 자동 검증
- 프리픽스 자동 제안 (feature/, fix/, hotfix/, docs/, chore/)

### 2. 안전한 브랜치 전환

- 전환 전 uncommitted 변경사항 자동 감지
- 필요시 자동 stash 생성
- 원격 브랜치 추적 설정

### 3. 브랜치 관리

- 현재 브랜치 상태 및 목록 확인
- 로컬/원격 브랜치 동기화
- 안전한 브랜치 삭제 (병합 여부 확인)

## 프로세스

### 브랜치 생성 플로우

1. 현재 Git 상태 확인
2. uncommitted 변경사항 처리 (stash 또는 커밋 권장)
3. 브랜치명 검증 및 규칙 적용
4. 최신 main/develop 브랜치에서 분기
5. 새 브랜치 생성 및 전환

### 브랜치 전환 플로우

1. 현재 작업 상태 확인
2. 필요시 변경사항 stash
3. 대상 브랜치로 전환
4. 원격 추적 브랜치 설정

### 브랜치 삭제 플로우

1. 병합 상태 확인
2. 원격 브랜치 존재 여부 확인
3. 안전 확인 후 삭제

## 브랜치 네이밍 규칙

### 권장 프리픽스

```
feature/    - 새로운 기능 개발
fix/        - 버그 수정
hotfix/     - 긴급 수정
docs/       - 문서화 작업
chore/      - 빌드, 설정 등 유지보수
refactor/   - 코드 리팩토링
test/       - 테스트 코드 작업
```

### 네이밍 패턴

```
✅ 좋은 예시:
feature/user-authentication
fix/login-validation-error
hotfix/security-patch
docs/api-documentation

❌ 피해야 할 예시:
feature-user-auth          # 슬래시 사용
FEATURE/USER-AUTH          # 대문자 사용
feature/user auth          # 공백 사용
temp                       # 불명확한 이름
```

## 대화형 메뉴 옵션

브랜치명 없이 실행 시 표시되는 메뉴:

```
1. 📝 새 브랜치 생성
2. 🔄 브랜치 전환
3. 📋 브랜치 목록 보기
4. 🗑️  브랜치 삭제
5. 🔄 원격 브랜치 동기화
6. 📊 브랜치 상태 확인
```

## 안전 기능

### 자동 백업

- 브랜치 전환 전 자동 stash 생성
- Stash 메시지에 이전 브랜치명 포함
- 작업 손실 방지를 위한 확인 프롬프트

### 충돌 방지

- 원격 브랜치와의 동기화 상태 확인
- 병합되지 않은 브랜치 삭제 시 경고
- 현재 브랜치에서의 미완료 작업 감지

### 복구 지원

- 실수로 삭제한 브랜치 복구 안내
- Stash 목록 및 복구 방법 제시
- 브랜치 히스토리 추적

## 사용 예시

### 새 기능 브랜치 생성

```
/git:branch feature/user-profile
```

### 버그 수정 브랜치 생성

```
/git:branch fix/authentication-error
```

### 대화형 모드 실행

```
/git:branch
```

## 통합 기능

### 다른 Git 커맨드와의 연계

- `/git:commit`과 연동한 커밋 워크플로우
- `/git:merge`와 연동한 병합 워크플로우
- `/git:pr`과 연동한 PR 생성 워크플로우

### GitHub CLI 통합

- 원격 브랜치 자동 설정
- Issue 번호 기반 브랜치 생성
- PR 생성 시 브랜치 정보 자동 연결

## 고급 옵션

### 브랜치 생성 옵션

- `--from-issue` : GitHub Issue에서 브랜치 생성
- `--track` : 원격 브랜치 추적 설정
- `--no-stash` : 자동 stash 비활성화

### 정리 옵션

- `--cleanup` : 병합된 브랜치 일괄 삭제
- `--prune` : 원격에서 삭제된 브랜치 정리
- `--dry-run` : 삭제 예상 결과 미리보기

## 문제 해결

### 자주 발생하는 문제

1. **브랜치 전환 실패** → uncommitted 변경사항 처리
2. **브랜치 삭제 거부** → 병합 상태 확인 필요
3. **원격 브랜치 추적 오류** → fetch 후 재시도
4. **브랜치명 규칙 위반** → 자동 제안 받아 수정

### 복구 방법

- 잘못 삭제한 브랜치: `git reflog`로 복구
- 손실된 변경사항: `git stash list`에서 복구
- 꼬인 브랜치 상태: `git reset`으로 초기화

이 커맨드는 Git 브랜치 관리의 모든 측면을 안전하고 효율적으로 처리합니다.
