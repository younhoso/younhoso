'use client';

import styled from 'styled-components';

export const ProductOptionPayInfoStyled = styled.div`
  .npay {
    background-color: #00c73c;
    border: 1px solid #00c73c;
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 8px;
    height: 60px;
  }
  .option-inner {
    display: flex;
    justify-content: space-between;
    padding: 24px 0;
    align-items: flex-start;
    gap: 10px;
    > div:nth-child(1) {
      width: 142px;
      flex-shrink: 0;
      line-height: 46px;
    }
    > div:nth-child(2) {
      flex: 1;
    }
    .item-inner {
      .item {
        padding: 20px;
        border: 1px solid ${props => props.theme.colors.grayada};
        .quantityPay-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          ${props => props.theme.fontStyle['body03-3']}
          margin-bottom: 20px;
          color: ${props => props.theme.colors.gray333};
          img {
            cursor: pointer;
          }
        }
        .quantityPay-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .quantity {
            width: 100px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid ${props => props.theme.colors.grayada};
            button {
              height: 16px;
            }
            .inputNumber {
              width: 40px;
              text-align: center;
            }
          }
          .buyPrice {
            color: ${props => props.theme.colors.gray333};
            ${props => props.theme.fontStyle['body02-4']}
          }
        }
      }
    }
  }
  .price-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0 8px 0;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    color: ${props => props.theme.colors.gray333};
    p {
      color: inherit;
    }
    .price {
      ${props => props.theme.fontStyle['title02-2']}
    }
  }

  .point-text-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-bottom: 32px;
    .title {
      color: ${props => props.theme.colors.red32D};
      ${props => props.theme.fontStyle['body03-1']}
    }
    .desc {
      color: ${props => props.theme.colors.graya6a};
      ${props => props.theme.fontStyle['body03-2']}
      margin-top: 2px;
    }
  }

  .button-inner {
    display: flex;
    gap: 8px;
    button {
      height: 60px;
      padding: 12px;
      ${props => props.theme.fontStyle['body01-3']};
    }

    button:nth-child(1) {
      flex-shrink: 0;
      border: 1px solid ${props => props.theme.colors.graybbb};
      cursor: pointer;
    }
    button:nth-child(2) {
      flex-shrink: 0;
      width: 62px;
    }
    button:nth-child(3) {
      flex-grow: 1;
    }
  }
`;
