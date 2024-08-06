'use client';

import styled from 'styled-components';

import ContentBox from '@/components/ContentBox';

export const OrderHistoryItemStyled = styled(ContentBox)`
  .order-history-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      ${props => props.theme.fontStyle['body02-4']};
      color: ${props => props.theme.colors.gray333};
    }
  }

  .order-history-content {
    display: flex;
    align-items: center;
    gap: 20px;

    .order-history-info {
      flex: 1 0 auto;
      > div {
        display: flex;
        &:not(:last-child) {
          margin-bottom: 4px;
        }

        > div {
          &:first-child {
            width: 75px;
            color: ${props => props.theme.colors.gray666};
            ${props => props.theme.fontStyle['body02-5']};
          }
          &:last-child {
            color: ${props => props.theme.colors.gray333};
            ${props => props.theme.fontStyle['body02-4']};
          }
        }
      }
    }

    .order-history-button-wrapper {
      > .Button {
        height: 40px;
        &:not(:last-child) {
          margin-bottom: 4px;
        }
      }
    }
  }
`;
