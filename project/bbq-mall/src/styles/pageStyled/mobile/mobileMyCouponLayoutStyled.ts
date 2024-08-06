'use client';

import styled from 'styled-components';

export const MobileMyCouponLayoutStyled = styled.div`
  position: relative;
  .tab-wrapper {
    display: flex;
    padding: 0 16px;
    background-color: white;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    transform: translateY(-11px);

    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
  }

  .mobile-coupone-children-wrapper {
    min-height: 100vh;
  }

  .my-coupon-button-wrapper {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 16px;
    background-color: white;
    border-top: 1px solid ${props => props.theme.colors.grayaea};
    > .Button {
      width: 100%;
    }
  }

  &.not-webview {
    .tab-wrapper {
      top: 62px !important;
    }
  }
`;
