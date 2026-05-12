---
description: '브랜치를 안전하게 병합하고 충돌을 해결합니다'
allowed-tools:
  [
    'Bash(git merge:*)',
    'Bash(git status:*)',
    'Bash(git diff:*)',
    'Bash(git log:*)',
    'Bash(git branch:*)',
    'Bash(git fetch:*)',
    'Bash(git pull:*)',
    'Bash(git reset:*)',
    'Bash(git checkout:*)',
    'Bash(git stash:*)',
  ]
---

# Claude 명령어: Merge

브랜치를 안전하게 병합하고 충돌을 자동으로 해결하는 Git 병합 전문 도구입니다.

## 사용법

```
/git:merge [브랜치명]           # 지정된 브랜치를 현재 브랜치에 병합
/git:merge                    # 대화형 병합 메뉴
```

## 주요 기능

### 1. 안전한 병합 프로세스

- 병합 전 상태 점검 (uncommitted changes, conflicts)
- 자동 백업 및 복구 지점 생성
- 병합 충돌 자동 감지 및 단계별 해결 가이드

### 2. 다양한 병합 전략

- **Fast-forward**: 선형 히스토리 유지
- **No-fast-forward**: 병합 커밋 생성하여 브랜치 히스토리 보존
- **Squash**: 여러 커밋을 하나로 압축하여 병합

### 3. 지능적 충돌 해결

- 충돌 파일 자동 식별
- 충돌 내용 시각적 표시
- 단계별 해결 가이드 제공
- 해결 후 자동 검증

## 프로세스

### 병합 전 검사 단계

1. **현재 브랜치 상태 확인**
   - Uncommitted 변경사항 확인
   - Working directory 정리 상태 점검

2. **대상 브랜치 검증**
   - 브랜치 존재 여부 확인
   - 원격 브랜치 동기화 상태 점검
   - 브랜치 간 분기점 분석

3. **병합 가능성 사전 점검**
   - Potential conflicts 미리 감지
   - 병합 후 예상 결과 미리보기

### 병합 실행 단계

1. **자동 백업 생성**
   - 현재 상태를 stash로 백업
   - 병합 전 커밋 SHA 기록

2. **병합 전략 선택**
   - Fast-forward 가능 여부 확인
   - 프로젝트 정책에 따른 전략 결정

3. **병합 수행**
   - 선택된 전략으로 병합 실행
   - 실시간 진행 상황 모니터링

### 충돌 해결 단계

1. **충돌 파일 식별**
   - 충돌이 발생한 모든 파일 나열
   - 충돌 유형별 분류 (content, delete/modify 등)

2. **대화형 해결 프로세스**
   - 파일별 충돌 내용 표시
   - 해결 옵션 제시 (ours/theirs/manual)
   - 실시간 해결 상태 추적

3. **해결 검증**
   - 모든 충돌 해결 확인
   - 문법 오류 및 빌드 테스트
   - 최종 커밋 생성

## 병합 전략

### Fast-Forward 병합

```
Before:  A---B---C (main)
              \
               D---E (feature)

After:   A---B---C---D---E (main)
```

- 선형 히스토리 유지
- 브랜치 흔적 없음
- 간단한 변경사항에 적합

### No-Fast-Forward 병합

```
Before:  A---B---C (main)
              \
               D---E (feature)

After:   A---B---C-------F (main)
              \         /
               D---E----
```

- 병합 커밋으로 브랜치 히스토리 보존
- 기능 단위 추적 가능
- 협업 프로젝트에 권장

### Squash 병합

```
Before:  A---B---C (main)
              \
               D---E---F (feature)

After:   A---B---C---G (main)
                     (D+E+F를 압축한 단일 커밋)
```

- 여러 커밋을 하나로 통합
- 깔끔한 히스토리 유지
- 실험적 커밋 정리에 유용

## 대화형 메뉴

```
🔀 Git Merge 메뉴

1. 📥 브랜치 병합 (Fast-forward)
2. 🔗 브랜치 병합 (No-fast-forward)
3. 📦 브랜치 병합 (Squash)
4. 🔍 병합 가능성 사전 확인
5. ⚡ 진행 중인 병합 완료
6. ❌ 병합 중단 및 되돌리기
7. 📊 병합 히스토리 확인
```

## 충돌 해결 가이드

### 충돌 유형별 해결법

#### 1. 내용 충돌 (Content Conflict)

```
병합할 브랜치의 내용
```

**해결 옵션:**

- `ours`: 현재 브랜치 내용 유지
- `theirs`: 병합할 브랜치 내용 채택
- `manual`: 수동으로 편집

#### 2. 파일 삭제/수정 충돌

```
deleted by us:     src/component.js
modified by them:  src/component.js
```

**해결 옵션:**

- 파일 삭제 유지
- 수정된 내용 채택
- 새로운 버전으로 재작성

#### 3. 이름 변경 충돌

```
renamed:    src/old-name.js -> src/new-name1.js
renamed:    src/old-name.js -> src/new-name2.js
```

**해결 과정:**

1. 적절한 파일명 결정
2. 불필요한 복사본 제거
3. 코드 참조 업데이트

### 충돌 해결 도구

#### 자동 해결 도구

- **semantic merge**: 의미론적 분석으로 자동 병합
- **whitespace normalization**: 공백 차이 자동 정규화
- **import sorting**: import 문 자동 정렬

#### 수동 해결 지원

- 충돌 구간 하이라이팅
- 원본 파일 내용 비교
- 단계별 해결 체크리스트

## 병합 후 정리

### 자동 정리 작업

1. **브랜치 정리**
   - 병합된 브랜치 삭제 옵션
   - 원격 브랜치 정리

2. **히스토리 정리**
   - 불필요한 stash 정리
   - 임시 파일 제거

3. **상태 확인**
   - 병합 결과 검증
   - 빌드 상태 확인

## 안전 기능

### 병합 취소 및 복구

```
/git:merge --abort    # 진행 중인 병합 중단
/git:merge --reset    # 병합 전 상태로 복구
```

### 백업 및 복구점

- 병합 전 자동 stash 생성
- 커밋 SHA 기반 복구점
- 브랜치 상태 스냅샷

### 안전 검사

- 중요 브랜치 보호 (main, develop)
- 병합 권한 확인
- 코드 리뷰 상태 점검

## 고급 기능

### 부분 병합

```
/git:merge --pick [커밋SHA]    # 특정 커밋만 선택적 병합
/git:merge --range [시작]..[끝] # 커밋 범위 지정 병합
```

### 병합 전략 옵션

```
-X ours          # 충돌 시 현재 브랜치 우선
-X theirs        # 충돌 시 병합할 브랜치 우선
-X patience      # 더 정확한 충돌 감지
-X ignore-space-change  # 공백 변경 무시
```

### GitHub/PR 통합

- PR 상태 기반 병합 제어
- 리뷰 승인 상태 확인
- CI/CD 파이프라인 연동

## 사용 예시

### 기본 병합

```
/git:merge feature/user-auth
```

### 병합 전략 지정

```
/git:merge --no-ff feature/user-auth    # No-fast-forward
/git:merge --squash feature/user-auth   # Squash merge
```

### 충돌 해결 모드

```
/git:merge --resolve    # 진행 중인 충돌 해결 계속
```

## 문제 해결

### 자주 발생하는 문제

1. **병합 충돌이 복잡할 때**
   - 단계별 해결 가이드 제공
   - 파일별 개별 해결
   - 전문가 모드 지원

2. **병합 후 빌드 실패**
   - 자동 빌드 테스트
   - 실패 시 롤백 옵션
   - 수정 후 재시도

3. **히스토리가 복잡할 때**
   - 병합 시각화 도구
   - 브랜치 관계 다이어그램
   - 커밋 히스토리 분석

이 커맨드는 Git 병합의 모든 복잡성을 처리하면서도 안전하고 직관적인 인터페이스를 제공합니다.
