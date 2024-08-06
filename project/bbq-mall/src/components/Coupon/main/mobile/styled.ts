'use client';

import styled from 'styled-components';

export const CouponMobileStyled = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.theme.colors.grayada};
  position: relative;

  > img {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  > div {
    &:first-child {
      margin-bottom: 20px;
      > p {
        &:first-child {
          font-size: 14px;
          font-weight: 600;
          color: ${props => props.theme.colors.red937};
          margin-bottom: 6px;
        }

        &:nth-child(2) {
          font-size: 20px;
          font-weight: 600;
          color: ${props => props.theme.colors.gray333};
          margin-bottom: 6px;
        }

        &:last-child {
          font-size: 15px;
          font-weight: 500;
          color: ${props => props.theme.colors.gray666};
        }
      }
    }

    &.coupon-bottom {
      display: flex;
      justify-content: space-between;
      align-items: end;
      height: 38px;

      > div:first-child {
        > p {
          font-size: 14px;
          font-weight: 500;
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
