'use client';

import styled from 'styled-components';

export const CouponStyled = styled.div`
  position: relative;
  padding: 24px;
  border: 1px solid ${props => props.theme.colors.grayada};

  > img {
    position: absolute;
    right: 24px;
    top: 24px;
  }

  > div {
    &:first-child {
      margin-bottom: 27px;
      > p {
        &:first-child {
          ${props => props.theme.fontStyle['body04-1']};
          color: ${props => props.theme.colors.red937};
          margin-bottom: 6px;
        }

        &:nth-child(2) {
          ${props => props.theme.fontStyle['title03-2']};
          color: ${props => props.theme.colors.gray333};
          margin-bottom: 4px;
        }

        &:last-child {
          ${props => props.theme.fontStyle['body03-3']};
          color: ${props => props.theme.colors.gray666};
        }
      }
    }

    &.coupon-bottom {
      display: flex;
      justify-content: space-between;
      align-items: end;
      height: 32px;

      > div:first-child {
        > p {
          ${props => props.theme.fontStyle['body04-2']};
          &:first-child {
            color: ${props => props.theme.colors.gray999};
            margin-bottom: 4px;
          }

          &:last-child {
            color: ${props => props.theme.colors.gray333};
          }
        }
      }
    }
  }
`;
