'use client';

import styled from 'styled-components';

export const TabMobileStyled = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.gray5f5};
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  background-color: white;

  button {
    padding-top: 14px;
    padding-bottom: 13px;
    width: 100%;
    font-weight: 500;
    color: ${props => props.theme.colors.gray666};
    font-size: 14px;
    white-space: pre;
  }
  &.width-auto {
    width: auto;
  }

  &.active {
    > button {
      box-sizing: border-box;
      color: ${props => props.theme.colors.red937};
      border-bottom: 2px solid ${props => props.theme.colors.red937};
      font-weight: ${props => props.theme.fontWeight.semiBold};
    }
  }

  @media screen and (max-width: 320px) {
    button {
      font-size: 11px;
    }
  }
`;
