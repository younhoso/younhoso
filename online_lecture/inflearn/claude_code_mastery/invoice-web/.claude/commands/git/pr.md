---
description: 'GitHub Pull Request를 생성하고 관리합니다'
allowed-tools:
  [
    'Bash(gh pr:*)',
    'Bash(gh api:*)',
    'Bash(gh repo:*)',
    'Bash(git push:*)',
    'Bash(git status:*)',
    'Bash(git log:*)',
    'Bash(git diff:*)',
    'Bash(git branch:*)',
    'Bash(git fetch:*)',
  ]
---

# Claude 명령어: Pull Request

GitHub Pull Request를 자동으로 생성하고 관리하는 통합 도구입니다.

## 사용법

```
/git:pr                       # 현재 브랜치로 PR 생성 (대화형)
/git:pr "PR 제목"              # 제목 지정하여 PR 생성
/git:pr --draft               # Draft PR 생성
/git:pr --ready               # Draft PR을 Ready로 전환
```

## 주요 기능

### 1. 스마트 PR 생성

- 커밋 히스토리 기반 제목/설명 자동 생성
- 변경된 파일 분석으로 PR 유형 자동 분류
- 브랜치명에서 작업 유형 추출 (feature, fix, docs 등)

### 2. 자동 메타데이터 설정

- 라벨 자동 할당 (feat, fix, docs, breaking-change)
- 리뷰어 자동 할당 (팀 규칙 기반)
- 마일스톤 및 프로젝트 연결

### 3. 템플릿 기반 PR 설명

- 체크리스트 자동 생성
- 변경사항 요약
- 테스트 계획 포함

## 프로세스

### PR 생성 전 점검

1. **브랜치 상태 확인**
   - 현재 브랜치가 최신 상태인지 확인
   - 원격 브랜치 푸시 상태 점검
   - Uncommitted 변경사항 확인

2. **변경사항 분석**
   - 수정된 파일 목록 및 통계
   - 추가/삭제된 줄 수 계산
   - 변경 유형 분류 (feature/fix/docs/test)

3. **PR 요구사항 검증**
   - 브랜치명 규칙 준수 확인
   - 커밋 메시지 품질 검사
   - 필수 파일 변경 여부 확인

### 자동 PR 내용 생성

1. **제목 생성 규칙**

   ```
   브랜치 유형별 제목 패턴:
   feature/user-auth  → "✨ feat: 사용자 인증 기능 추가"
   fix/login-bug      → "🐛 fix: 로그인 버그 수정"
   docs/readme        → "📝 docs: README 문서 업데이트"
   ```

2. **설명 자동 생성**
   - 커밋 메시지 요약
   - 주요 변경사항 하이라이트
   - 영향도 분석

3. **체크리스트 생성**
   - 코드 리뷰 체크리스트
   - 테스트 관련 항목
   - 문서 업데이트 항목

### PR 메타데이터 설정

1. **라벨 자동 할당**

   ```
   변경사항 기반 라벨:
   - 새 파일 추가        → "feature"
   - 버그 수정 패턴      → "bug", "fix"
   - 문서 파일 변경      → "documentation"
   - 테스트 파일        → "test"
   - 설정/빌드 파일      → "chore"
   - Breaking Change    → "breaking-change"
   ```

2. **리뷰어 할당**
   - CODEOWNERS 파일 기반 자동 할당
   - 팀 구성원 라운드로빈 할당
   - 파일별 전문가 할당

3. **연결 항목**
   - 관련 Issue 자동 연결
   - 마일스톤 할당
   - 프로젝트 보드 추가

## PR 템플릿

### 기본 PR 템플릿

```markdown
## 📋 변경사항 요약

[자동 생성된 변경사항 요약]

## 🎯 목적 및 배경

[브랜치명과 커밋 메시지 기반 목적 설명]

## 🔧 주요 변경내용

- [ ] [변경사항 1]
- [ ] [변경사항 2]
- [ ] [변경사항 3]

## ✅ 체크리스트

### 코드 품질

- [ ] 코드가 프로젝트의 스타일 가이드를 따름
- [ ] Self-review 완료
- [ ] 적절한 주석 추가
- [ ] 불필요한 console.log/debug 코드 제거

### 테스트

- [ ] 기존 테스트 모두 통과
- [ ] 새로운 기능에 대한 테스트 추가
- [ ] 엣지 케이스 테스트 포함

### 문서화

- [ ] 코드 변경에 따른 문서 업데이트
- [ ] README.md 업데이트 (필요시)
- [ ] API 문서 업데이트 (필요시)

## 🧪 테스트 방법

[테스트 시나리오 및 확인 방법]

## 📸 스크린샷 (UI 변경 시)

[필요시 Before/After 스크린샷]

## 🔗 관련 이슈

Closes #[issue-number]

## 📝 추가 노트

[리뷰어가 알아야 할 추가 정보]
```

### 특화된 템플릿

#### Feature PR 템플릿

- 기능 명세 및 요구사항
- 사용자 시나리오
- 성능 영향도 분석

#### Bugfix PR 템플릿

- 버그 재현 방법
- 근본 원인 분석
- 수정 방법 설명
- 회귀 방지 계획

#### Documentation PR 템플릿

- 문서 변경 범위
- 독자 대상
- 검토 포인트

## 대화형 PR 생성

### PR 생성 마법사

```
🚀 Pull Request 생성 마법사

1. 📊 변경사항 분석 중...
   ✅ 파일 15개 변경됨 (+234, -67)
   ✅ 브랜치: feature/user-authentication
   ✅ 기반 브랜치: main

2. 🏷️  PR 유형 자동 감지
   → ✨ Feature: 새로운 기능 추가

3. 📝 PR 제목 제안
   → "✨ feat: 사용자 인증 시스템 구현"

4. 👥 리뷰어 추천
   → @frontend-team, @security-team

5. 🏷️  라벨 제안
   → feature, authentication, breaking-change

PR을 생성하시겠습니까? (y/N)
```

### 고급 옵션 설정

```
⚙️ 고급 설정

📋 템플릿 선택:
  1. 기본 템플릿
  2. 기능 개발 템플릿
  3. 버그 수정 템플릿
  4. 문서 업데이트 템플릿

🎯 대상 브랜치: main ▼
👥 리뷰어: @team-frontend ▼
🏷️  라벨: feature, ui ▼
📌 마일스톤: v2.1.0 ▼

⭐ 추가 옵션:
  [ ] Draft PR로 생성
  [ ] Auto-merge 활성화
  [ ] 브랜치 자동 삭제 설정
```

## GitHub Actions 통합

### 자동 CI/CD 트리거

- PR 생성 시 자동 빌드 시작
- 테스트 실행 및 결과 표시
- 코드 커버리지 리포트

### 품질 검사

- ESLint/Prettier 검사
- TypeScript 타입 체크
- 보안 스캔 (Dependabot)

### 자동 업데이트

- 의존성 충돌 자동 해결
- 코드 포맷팅 자동 적용
- 라이센스 확인

## 고급 기능

### PR 상태 관리

```
/git:pr --status          # PR 상태 확인
/git:pr --draft           # Draft로 전환
/git:pr --ready           # Ready for review로 전환
/git:pr --merge           # 자동 병합 (조건 충족시)
/git:pr --close           # PR 닫기
```

### 배치 작업

```
/git:pr --sync-all        # 모든 PR 상태 동기화
/git:pr --cleanup         # 병합된 PR의 브랜치 정리
/git:pr --update-all      # 모든 PR을 최신 베이스로 업데이트
```

### 분석 및 리포트

```
/git:pr --analytics       # PR 분석 리포트
/git:pr --conflicts       # 충돌 발생 PR 목록
/git:pr --reviews         # 리뷰 대기 중인 PR 목록
```

## 팀 협업 기능

### 코드 리뷰 지원

- 리뷰 요청 자동 알림
- 리뷰 완료 상태 추적
- 승인 조건 자동 체크

### 프로젝트 관리 연동

- Jira/Linear 이슈 연동
- 스프린트 보드 업데이트
- 작업 시간 추적

## 보안 및 권한

### 권한 관리

- PR 생성 권한 확인
- 브랜치 보호 규칙 준수
- 리뷰 승인 요구사항 체크

### 보안 검사

- 시크릿 정보 누출 검사
- 의존성 보안 스캔
- 라이센스 호환성 확인

## 사용 예시

### 기본 PR 생성

```
/git:pr
# 대화형으로 PR 생성

/git:pr "사용자 인증 기능 구현"
# 제목 지정하여 PR 생성
```

### 특수 옵션 사용

```
/git:pr --draft --reviewer="@team-lead"
# Draft PR로 생성하고 특정 리뷰어 지정

/git:pr --template=bugfix --label="urgent"
# 버그 수정 템플릿 사용하고 urgent 라벨 추가
```

## 문제 해결

### 자주 발생하는 문제

1. **GitHub CLI 인증 오류**
   - `gh auth login` 실행 안내
   - 토큰 권한 확인

2. **브랜치 푸시 오류**
   - 원격 브랜치 생성
   - 권한 문제 해결

3. **PR 생성 실패**
   - 중복 PR 확인
   - 베이스 브랜치 확인

### 복구 방법

- 실패한 PR 재생성
- 메타데이터 수동 수정
- 템플릿 재적용

이 커맨드는 GitHub Pull Request 생성의 모든 과정을 자동화하면서도 팀의 워크플로우에 맞게 커스터마이징할 수 있습니다.
