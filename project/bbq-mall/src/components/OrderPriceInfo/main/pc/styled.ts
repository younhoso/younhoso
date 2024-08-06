'use client';

import styled from 'styled-components';

export const OrderPriceInfoStyled = styled.div`
  border: 1px solid ${props => props.theme.colors.grayada};
  padding: 24px 20px;

  .order-price-title {
    ${props => props.theme.fontStyle['body01-3']}
    color:${props => props.theme.colors.gray333};
  }

  .order-price-info {
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.colors.gray333};
    gap: 12px;
    ${props => props.theme.fontStyle['body02-5']};
    margin: 24px 0 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &.discount-info {
        > div:last-child {
          > span {
            color: ${props => props.theme.colors.red32D};
          }
        }
      }

      &.discount-detail {
        ${props => props.theme.fontStyle['body03-3']};
        color: #a6a6a6;
      }
    }
  }

  .order-price-total {
    display: flex;
    color: ${props => props.theme.colors.gray333};
    align-items: center;
    justify-content: space-between;
    ${props => props.theme.fontStyle['body02-5']};

    > div {
      ${props => props.theme.fontStyle['body01-2']}
      >span {
        color: ${props => props.theme.colors.red937};
      }
    }
  }

  .accumulation-info {
    margin-top: 8px;

    > p {
      text-align: end;
      &:first-child {
        margin-bottom: 2px;
        ${props => props.theme.fontStyle['body03-1']};
        color: ${props => props.theme.colors.red32D};
      }

      &:last-child {
        ${props => props.theme.fontStyle['body03-2']};
        color: ${props => props.theme.colors.graya6a};
      }
    }
  }
`;
