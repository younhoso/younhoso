'use client';

import styled from 'styled-components';

export const CartIconMobileStyled = styled.div`
  position: relative;
  height: 26px;
  cursor: pointer;
  .count-wrapper {
    position: absolute;
    right: -3px;
    top: -1px;
    width: 15px;
    height: 15px;
    background-color: white;
    font-size: 8px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    > div {
      background-color: ${props => props.theme.colors.red937};
      width: 12px;
      height: 12px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
  }
`;
