# 변경사항 커밋 계획

## Context
이번 세션에서 헤더 메뉴("예시"/"컴포넌트") 서브페이지 진입 시 콘솔 에러를 조사하는 과정에서 Next.js 개발 서버의 "워크스페이스 루트 오탐지" 경고(상위 폴더의 중복 `yarn.lock`으로 인해 발생)를 발견하고 `next.config.js`에 `outputFileTracingRoot`를 추가해 해결했습니다. 이 변경의 자동 부수효과로 Next.js가 `tsconfig.json`의 `include` 배열 순서를 스스로 재정렬했습니다. 별개로, 이번 세션에서 Playwright MCP 브라우저 자동화 도구를 사용하면서 Claude Code 하네스가 `.claude/settings.json`의 허용 권한 목록에 `mcp__playwright`를 자동 추가했습니다.

`git status`에는 이 외에도 본 작업과 무관한 항목들이 섞여 있어 커밋 대상에서 제외합니다:
- `../../../../.DS_Store` (레포 최상위 폴더의 macOS Finder 메타데이터, 이번 작업과 무관)
- `../mcp-shrimp-task-manager/` (완전히 별개의 미추적 프로젝트 폴더)
- `.playwright-mcp/`, `tmp/` (이번 세션의 브라우저 테스트 스크래치 산출물 — 커밋하지 않고 삭제)

## 커밋 분리 계획

**정리 (커밋 아님)**
- `rm -rf .playwright-mcp tmp` — 테스트 스크래치 아티팩트 삭제 (커밋 대상 아님)

**커밋 1 — `fix: Next.js 워크스페이스 루트 자동 추론 경고 해결`**
- 대상: `next.config.js`, `tsconfig.json`
- 이유: 상위 폴더의 중복 `yarn.lock`으로 인해 Next.js가 잘못된 디렉토리를 프로젝트 루트로 추론하던 문제를 `outputFileTracingRoot` 명시로 해결. `tsconfig.json`의 변경은 Next.js가 이 설정에 반응해 자동으로 재정렬한 것이므로 같은 원인의 부수효과로 함께 묶음.

**커밋 2 — `chore: Claude Code playwright MCP 권한 허용 추가`**
- 대상: `.claude/settings.json`
- 이유: 이번 세션에서 브라우저 자동화 디버깅에 사용한 `mcp__playwright` 도구가 허용 목록에 자동 반영됨. 애플리케이션 코드 변경과 성격이 다르므로 별도 커밋으로 분리.

**커밋 제외 (그대로 둠)**
- `../../../../.DS_Store` — 이번 작업과 무관, 커밋하지 않음
- `../mcp-shrimp-task-manager/` — 별개 프로젝트, 손대지 않음

## 검증
- 각 커밋 후 `git status --short`로 의도한 파일만 반영됐는지 확인
- `git log --oneline -3`으로 커밋 메시지와 분리가 계획대로 됐는지 확인
- 최종 `git status --short`에는 제외 대상(`.DS_Store`, `mcp-shrimp-task-manager/`)만 남아야 함
