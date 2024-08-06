'use client';

import styled from 'styled-components';

export const CartIconStyled = styled.div`
  position: relative;
  height: 32px;
  cursor: pointer;
  .count-wrapper {
    position: absolute;
    right: -5px;
    top: -2px;
    width: 20px;
    height: 20px;
    background-color: white;
    font-size: 10px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    > div {
      background-color: ${props => props.theme.colors.red937};
      width: 16px;
      height: 16px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
  }
`;
