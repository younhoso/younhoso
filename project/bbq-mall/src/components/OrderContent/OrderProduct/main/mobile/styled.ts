'use client';

import styled from 'styled-components';

import ContentBox from '@/components/ContentBox';

export const OrderProductMobileStyled = styled(ContentBox.Mobile)`
  .order-product-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div > span {
      color: ${props => props.theme.colors.red937};
    }
  }

  .order-product-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;

    &:not(:last-child) {
      padding-bottom: 20px;
      border-bottom: 1px dashed ${props => props.theme.colors.grayada};
    }

    &:not(:first-child) {
      padding-top: 20px;
    }

    > div {
      min-width: 0;
      > p {
        font-weight: 500;
        line-height: 20px;

        color: ${props => props.theme.colors.gray333};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.product-name {
          ${props => props.theme.fontStyle['body02-4']};
          color: ${props => props.theme.colors.gray333};
          margin-bottom: 2px;
        }

        &.option-name {
          ${props => props.theme.fontStyle['body02-5']};
          color: ${props => props.theme.colors.gray666};
        }
      }
      > div {
        font-weight: 600;
        color: ${props => props.theme.colors.gray333};

        > span {
          font-weight: 500;
          color: ${props => props.theme.colors.gray666};
          > span {
            color: ${props => props.theme.colors.grayada};
          }
        }
      }
    }
  }
`;
