'use client';

import styled from 'styled-components';

export const OrderPriceInfoMobileStyled = styled.div`
  padding: 24px 16px;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  color: #281d19;

  .order-price-mobile-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > div {
      display: flex;
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

  .order-price-mobile-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    > div {
      font-size: 20px;
      font-weight: 500;

      > span {
        font-weight: 700;
        color: ${props => props.theme.colors.red937};
      }
    }
  }

  .accumulation-info {
    text-align: end;
    margin-top: 6px;

    > p {
      font-weight: 600;
      line-height: 16px;
      &:first-child {
        font-size: 12px;
        color: #de1f38;
      }

      &:last-child {
        font-size: 11px;
        color: ${props => props.theme.colors.graya6a};
      }
    }
  }
`;
