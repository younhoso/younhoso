'use client';

import styled from 'styled-components';

export const MembershipProgressBarStyled = styled.div`
  display: flex;
  position: relative;

  > div {
    .progress-bar {
      width: 148px;
      height: 12px;
      background-color: ${props => props.theme.colors.grayaea};
      margin-bottom: 14px;
    }

    > p {
      text-align: center;
      ${props => props.theme.fontStyle['body03-1']};
      color: ${props => props.theme.colors.gray999};
    }

    &.active {
      > p {
        color: ${props => props.theme.colors.gray333};
      }
    }
  }
`;

export interface PrsentBarStyledProps {
  $index: number;
  $backgroundColor: string;
  $maxLength: number;
}

export const PrsentBarStyled = styled.div<PrsentBarStyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.$index * 148 + (props.$index === props.$maxLength - 1 ? 148 : 74)}px;
  height: 12px;
  background-color: ${props => props.$backgroundColor};

  > div {
    position: absolute;
    top: -6px;
    width: 24px;
    height: 24px;
    left: ${props => props.$index * 148 + 74 - 12}px;
    background-color: ${props => props.$backgroundColor};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: white;
    }
  }
`;
