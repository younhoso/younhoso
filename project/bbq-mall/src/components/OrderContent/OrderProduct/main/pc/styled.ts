'use client';

import styled from 'styled-components';

import OrderContentTemplate from '@/components/OrderContentTemplate';

export const OrderProductStyled = styled(OrderContentTemplate)`
  .order-product-item {
    padding: 24px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      align-items: center;

      &:first-child {
        gap: 20px;
        p {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;

          &:first-child {
            ${props => props.theme.fontStyle['body02-4']};
            color: ${props => props.theme.colors.gray333};
            margin-bottom: 4px;
          }

          &:last-child {
            ${props => props.theme.fontStyle['body02-5']};
            color: ${props => props.theme.colors.gray666};
          }
        }
      }

      &:last-child {
        > div {
          width: 148px;
          text-align: center;
          ${props => props.theme.fontStyle['body02-3']}

          &:last-child {
            ${props => props.theme.fontStyle['body02-1']};
          }
        }
      }
    }

    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }

    &:not(:last-child) {
      border-bottom: 1px dashed ${props => props.theme.colors.grayada};
    }
  }

  .product-title {
    color: ${props => props.theme.colors.red937};
  }
`;
