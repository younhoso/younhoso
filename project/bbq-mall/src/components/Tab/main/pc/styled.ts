'use client';

import styled from 'styled-components';

export const TabStyled = styled.div`
  cursor: pointer;
  width: 100%;
  text-align: center;
  background-color: ${props => props.theme.colors.gray5f5};
  border: 1px solid ${props => props.theme.colors.grayada};
  cursor: pointer;
  height: 60px;
  > button {
    width: 100%;
    height: 100%;
    color: inherit;
    cursor: pointer;
    color: ${props => props.theme.colors.gray666};
    ${props => props.theme.fontStyle['body02-3']}
  }
  &.mobile-tab {
    background-color: ${props => props.theme.colors.gray5f5};
  }
  &.active {
    border: 1px solid ${props => props.theme.colors.red937};
    > button {
      color: ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.red937};
    }
  }
`;
