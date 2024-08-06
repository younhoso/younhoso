'use client';

import styled from 'styled-components';

export const MobileMyCouponOwnPageStyled = styled.div`
  background-color: white;
  &.no-item {
    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
    min-height: calc(
      100vh - ${props => props.theme.sizes.mobileHeaderHeight} - 10px -
        ${props => props.theme.sizes.navHeight}
    );
    color: ${props => props.theme.colors.graybbb};
    font-size: 15px;
    font-weight: 500;
  }

  .coupon-wrapper {
    padding: 16px;

    .CouponMobile {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }

  .right-arrow-wrpper {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.graybbb};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .coupon-modal-brief {
    > div {
      &:first-child {
        margin-bottom: 20px;
        > p {
          &:first-child {
            font-size: 20px;
            font-weight: 600;
            color: ${props => props.theme.colors.gray333};
            margin-bottom: 6px;
          }
          &:last-child {
            font-size: 15px;
            font-weight: 500;
            color: ${props => props.theme.colors.gray333};
          }
        }
      }
      &:last-child {
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

  .coupon-modal-description {
    border-top: 1px solid ${props => props.theme.colors.grayada};
    margin-top: 20px;
    padding-top: 20px;
    h4 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
      color: ${props => props.theme.colors.gray333};
    }

    > li {
      list-style: inherit;
      color: ${props => props.theme.colors.gray666};
      text-indent: -18px;
      font-size: 13px;
      font-weight: 500;
      line-height: 18px;
      margin-left: 18px;
    }
  }
`;
