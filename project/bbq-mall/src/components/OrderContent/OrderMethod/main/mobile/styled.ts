'use client';

import styled from 'styled-components';

import ContentBox from '@/components/ContentBox';

export const OrderMethodMobileStyled = styled(ContentBox.Mobile)`
  .order-method-children {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    > .Button {
      width: calc(50% - 8px);
    }
  }
`;
