'use client';

import styled from 'styled-components';

import OrderContentTemplate from '@/components/OrderContentTemplate';

export const OrderPointStyled = styled(OrderContentTemplate)`
  .label-label {
    color: ${props => props.theme.colors.red937};
  }

  .children-wrapper {
    display: flex;
    gap: 8px;

    > .Input,
    .Button {
      height: 48px;
    }
  }

  p {
    margin-top: 16px;
    ${props => props.theme.fontStyle['body04-3']};
    color: ${props => props.theme.colors.gray999};
  }
`;
