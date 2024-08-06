'use client';

import styled from 'styled-components';

export const MobileMyEditCouponPageStyled = styled.div`
  padding: 33px 16px;

  > h3 {
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    color: ${props => props.theme.colors.gray333};
    text-align: center;
    margin-bottom: 31px;
  }

  > .Button {
    margin-top: 10px;
  }

  > ul {
    margin-top: 16px;
    padding: 20px 16px;
    background-color: #f5f5f5;

    > li {
      list-style-type: disc;
      margin-left: 16px;
      font-size: 13px;
      color: ${props => props.theme.colors.gray666};
      line-height: 18px;
      font-weight: 500;

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }

  .coupon-banner-wrapper {
    position: relative;
    width: 100%;
    height: 82px;
  }
`;
