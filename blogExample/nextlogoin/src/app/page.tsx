"use client"; 
import styled from "styled-components";

export default function Home() {
  return (
    <SkeletonInner>
      메인페이지 입니다.
    </SkeletonInner>
  )
}

const SkeletonInner = styled.div`
  ${props => {
    const { theme } = props;
    return `
      color: ${theme.colors?.orangeffa};
      font-size: 22px;
    `
  }}
`;