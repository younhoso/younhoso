'use client';

import styled from 'styled-components';

export const AcodionMobileStyled = styled.div`
  .downArrow-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    p {
      font-size: ${props => props.theme.fontSizes.font15};
      font-weight: ${props => props.theme.fontWeight.semiBold};
      line-height: 17.9px;
      color: ${props => props.theme.colors.gray333};
    }
    > img {
      transform: rotate(0deg);
      transition: all 0.2s ease-in-out;
    }
  }
  &.active {
    .downArrow-inner {
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
      max-height: 2000px;
    }
  }
`;
