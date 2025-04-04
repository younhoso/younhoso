import React from "react";
import MarkdownRenderer from "../src/components/MarkdownRenderer";

const courseDetails = `
## 강의 소개
이 강의는 Next.js, Supabase, 그리고 Cursor AI를 활용하여 풀스택 개발을 배우는 과정입니다.

## 커리큘럼
1. **Next.js 기초**
   - Next.js의 기본 개념과 설정 방법을 배웁니다.
2. **Supabase 연동**
   - Supabase를 사용하여 데이터베이스와의 연동을 학습합니다.
3. **Cursor AI 활용**
   - AI 툴을 활용하여 개발 생산성을 높이는 방법을 알아봅니다.

## 강의 방식
- 온라인 강의
- 실습 과제
- 프로젝트 기반 학습
`;

const CourseDetails = () => {
  return <MarkdownRenderer content={courseDetails} />;
};

export default CourseDetails;
