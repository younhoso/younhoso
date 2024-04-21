"use client";

import styled from "styled-components";

export const HomePageStyled = styled.div`
  .title-inner {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.font60};
    color: ${(props) => props.theme.colors.white};

    p {
      font-size: ${(props) => props.theme.fontSizes.font16};
    }
  }
`;
