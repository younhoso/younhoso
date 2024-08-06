'use client';

import styled from 'styled-components';

import ContentBox from '@/components/ContentBox';

export const OrderPointMobileStyled = styled(ContentBox.Mobile)`
  .order-point-header {
    display: flex;
    justify-content: space-between;
    span {
      color: ${props => props.theme.colors.red937};
    }
  }

  .order-point-children-wrapper {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;

    > .Input,
    .Button {
      height: 48px;
    }

    .input-wrapper,
    .Input {
      flex: 1 0 0;
    }
  }

  p {
    ${props => props.theme.fontStyle['body04-3']};
    color: ${props => props.theme.colors.gray999};
  }
`;
