'use client';

import styled from 'styled-components';

import OrderContentTemplate from '@/components/OrderContentTemplate';

export const OrderBuyerStyled = styled(OrderContentTemplate)`
  .content-email {
    .Input {
      margin-bottom: 8px;
    }
    p {
      ${props => props.theme.fontStyle['body04-3']};
      color: ${props => props.theme.colors.gray999};
    }
  }
`;
