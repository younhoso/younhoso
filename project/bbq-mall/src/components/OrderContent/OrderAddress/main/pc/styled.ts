'use client';

import styled from 'styled-components';

import OrderContentTemplate from '@/components/OrderContentTemplate';

export const OrderAddressStyled = styled(OrderContentTemplate)`
  .order-address-where {
    .order-address-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > p:first-child {
        margin-bottom: 6px;
      }

      > .Button {
        width: 60px;
        height: 32px;
      }
      .line-height-needed {
        line-height: 46px;
      }
    }
  }

  .manual-type {
    margin-top: 10px;
  }
`;
