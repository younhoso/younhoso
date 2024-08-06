'use client';

import styled from 'styled-components';

import OrderContentTemplate from '@/components/OrderContentTemplate';

export const OrderCouponStyled = styled(OrderContentTemplate)`
  .discount-amount {
    color: ${props => props.theme.colors.red937};
  }

  .product-coupon-click {
    height: 46px;
    border: 1px solid ${props => props.theme.colors.grayada};
    display: flex;
    padding: 13px 16px 12px 16px;
    justify-content: space-between;
    ${props => props.theme.fontStyle['body03-3']};
    cursor: pointer;

    > span {
      color: ${props => props.theme.colors.red937};
    }

    &.disabled {
      background-color: ${props => props.theme.colors.gray5f5};
      border: 1px solid ${props => props.theme.colors.grayada};
      color: ${props => props.theme.colors.gray999};
      cursor: not-allowed;
    }
  }
`;

export const DisableInfoStyled = styled.div`
  margin-top: 16px;
  padding: 20px;
  border: 1px solid #f5c6cb;
  background-color: #f8d7da;
  color: ${props => props.theme.colors.red32D};
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
`;
