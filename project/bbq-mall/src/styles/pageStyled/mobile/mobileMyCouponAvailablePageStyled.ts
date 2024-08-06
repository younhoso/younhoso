'use client';

import styled from 'styled-components';

export const MobileMyCouponAvailablePageStyled = styled.div`
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

  .download-button {
    width: 80px;
    height: 40px;
  }
`;
