'use client';

import styled from 'styled-components';

export const CartPageDivideMobileStyled = styled.div`
  min-height: 100vh;
  .no-product {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
    margin-top: 120px;

    > p {
      font-size: 15px;
      font-weight: 500;
      color: ${props => props.theme.colors.graybbb};
    }

    > .Button {
      width: 220px;
    }
  }

  .mobile-cart-content {
    .mobile-cart-product {
      padding: 16px 16px 20px 16px;
      .mobile-cart-product-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 18px;
        border-bottom: 1px solid ${props => props.theme.colors.grayaea};
        > div {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${props => props.theme.colors.gray333};

          &:first-child {
            font-size: 15px;
            line-height: normal;
            font-weight: 500;
          }

          &:last-child {
            font-size: 14px;
            font-weight: 500;
            > div {
              display: flex;
              gap: 8px;
              &:first-child::after {
                content: '';
                border-right: 2px solid ${props => props.theme.colors.graybbb};
                display: block;
                height: 13px;
                margin-top: 2px;
              }
            }
          }
        }
      }

      .cart-product-mobile-wrapper {
        .CartProductMobile {
          &:not(:last-child) {
            border-bottom: 1px dashed ${props => props.theme.colors.grayada};
          }
        }
      }

      .cart-product-button-wrapper {
        padding-top: 16px;
        border-top: 1px solid ${props => props.theme.colors.grayaea};
        > .Button {
          width: 100%;
        }
      }
    }
    .mobile-cart-recommend {
      padding: 16px;
      margin-bottom: 20px;
      h3 {
        font-size: 15px;
        font-weight: 600;
        line-height: normal;
        color: ${props => props.theme.colors.gray333};
        margin-bottom: 4px;
      }

      > p {
        font-size: 14px;
        font-weight: 500;
        color: ${props => props.theme.colors.gray999};
      }

      .mobile-cart-recommend-products {
        overflow-x: scroll;
        display: flex;
        gap: 10px;
        margin-top: 20px;
        padding-bottom: 32px;

        &::-webkit-scrollbar {
          height: 2px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: ${props => props.theme.colors.gray333};
        }
        &::-webkit-scrollbar-track {
          background-color: ${props => props.theme.colors.grayaea};
        }

        > div {
          min-width: 156px;
          width: 156px;
        }
      }
    }

    .cart-mobile-footer {
      position: sticky;
      width: 100%;
      left: 0;
      bottom: 0;
      padding: 10px 16px;
      border-top: 1px solid ${props => props.theme.colors.grayada};
      background-color: white;

      .cart-brief-npay {
        background-color: #00c73c;
        border: 1px solid #00c73c;
        display: flex;
        min-width: 100%;
        align-items: center;
        gap: 5px;
        margin-top: 8px;
        width: 100px;
        height: 50px;
        color: white;
        &:disabled {
          background-color: #00c73c !important;
          border: 1px solid #00c73c !important;
        }
      }

      .cart-brief-order {
        width: 100%;
        > span {
          font-weight: 700;
        }
      }
    }
    position: relative;
  }
`;
