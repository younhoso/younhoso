'use client';

import styled from 'styled-components';

import { PrsentBarStyledProps } from '../pc/styled';

const progressWidth = 11.6;

export const MembershipProgressBarMobileStyled = styled.div`
  display: flex;
  position: relative;

  > div {
    .progress-bar {
      width: ${progressWidth * 2 + 'vw'};
      height: 12px;
      background-color: ${props => props.theme.colors.grayaea};
      margin-bottom: 14px;
    }

    > p {
      text-align: center;
      ${props => props.theme.fontStyle['body03-1']};
      color: ${props => props.theme.colors.gray999};
      width: ${progressWidth * 2 + 'vw'};
      word-break: break-all;
    }

    &.active {
      > p {
        color: ${props => props.theme.colors.gray333};
      }
    }
  }
`;

export const MobilePresentBarStyled = styled.div<PrsentBarStyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props =>
    props.$index * progressWidth * 2 +
    (props.$index === props.$maxLength - 1 ? progressWidth * 2 : progressWidth)}vw;
  height: 12px;
  background-color: ${props => props.$backgroundColor};

  > div {
    position: absolute;
    top: -6px;
    width: 24px;
    height: 24px;
    left: calc(${props => props.$index * progressWidth * 2 + progressWidth}vw - 12px);
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
