"use client";

import styled from "styled-components";

export const HeaderStyled = styled.div`
  width: 100%;
  height: 80px;
  line-height: 80px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  position: static;
  &.mainHeader {
    position: fixed;
    background-color: #fff;
  }

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      display: inline-flex;
    }
    .category-inner {
      display: flex;
      gap: 32px;

      .item {
        font-size: ${(props) => props.theme.fontSizes.font16};
        font-weight: ${(props) => props.theme.fontWeight.medium};
        &.active {
          color: ${(props) => props.theme.colors.main3F2};
          font-weight: ${(props) => props.theme.fontWeight.bold};
          border-bottom: 1px solid ${(props) => props.theme.colors.main3F2};
        }
      }
    }
  }
`;
