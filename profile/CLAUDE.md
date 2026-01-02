# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

소윤호(GospelFix 대표)의 디지털 명함/프로필 페이지. 순수 HTML, CSS, JavaScript로 구성된 모바일 우선 반응형 웹 페이지.

## 개발 방법

브라우저에서 `index.html` 파일을 직접 열어 확인. 빌드 도구, 번들러, 서버 불필요.

## 파일 구조

- `index.html` - 메인 페이지 (SEO 메타 태그, Open Graph, Twitter Card 포함)
- `style.css` - 스타일시트 (CSS 변수 미사용, 직접 색상값 사용)
- `script.js` - JavaScript (Web Share API, 클립보드 복사, 토스트 알림)
- `img/` - 프로필 이미지

## 디자인 시스템

- 모바일 우선: 기본 최대 너비 480px, 481px 이상에서 카드형 레이아웃
- 색상: 배경 #f4f5f7, 텍스트 #191f28, 보조 텍스트 #8b95a1, 액센트 #3182f6
- 폰트: 시스템 폰트 스택 (-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo')
- 아이콘: 인라인 SVG 사용 (외부 아이콘 라이브러리 없음)

## 주요 기능

- **프로필 공유**: Web Share API 지원 시 네이티브 공유, 미지원 시 클립보드 복사
- **토스트 알림**: DOM에 동적 생성되는 피드백 메시지
- **이미지 폴백**: 프로필 이미지 로드 실패 시 SVG 플레이스홀더 표시
- **섹션별 애니메이션**: fadeIn 애니메이션으로 순차 등장 효과
