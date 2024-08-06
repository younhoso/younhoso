'use client';

import styled from 'styled-components';

import ContentBox from '@/components/ContentBox';

export const OrderCouponMobileStyled = styled(ContentBox.Mobile)`
  .product-coupon-click {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    font-size: 15px;
    line-height: 20px;
    font-weight: 500;

    border: 1px solid ${props => props.theme.colors.grayada};
    gap: 12px;
    > div {
      flex: 1 0 auto;
    }

    > span {
      color: ${props => props.theme.colors.red937};
    }

    &:first-child {
      margin-bottom: 8px;
    }

    &.disabled {
      background-color: ${props => props.theme.colors.gray5f5};
      border: 1px solid ${props => props.theme.colors.grayada};

      color: ${props => props.theme.colors.gray999};
    }
  }
`;

export const DisableInfoMobileStyled = styled.div`
  border: 1px solid #f5c6cb;
  background-color: #f8d7da;
  margin-top: 16px;
  padding: 16px;
  color: #c6132d;
  font-size: 12px;
  font-weight: 500;
`;
