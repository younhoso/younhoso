'use client';

import styled from 'styled-components';

export const AcodionStyled = styled.div`
  .downArrow-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    > img {
      transform: rotate(0deg);
      transition: all 0.2s ease-in-out;
    }
  }
  &.active {
    margin-bottom: 32px;
    .downArrow-inner {
      border-bottom: 1px solid ${props => props.theme.colors.grayada};
      > img {
        transform: rotate(180deg);
      }
    }
  }

  .info-inner {
    max-height: 0;

    overflow: hidden;
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }
  &.active {
    .info-inner {
      max-height: 1000px;
      margin-top: 25px;
    }
  }

  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }
`;
