'use client';

import styled from 'styled-components';

export const CartProductMobileStyled = styled.div`
  display: flex;
  padding: 20px 0;
  gap: 8px;
  align-items: flex-start;

  .cart-product-mobile-content {
    flex: 1 0 0;
    .cart-product-mobile-title {
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 16px;

      > div {
        font-size: 15px;
        line-height: 20px;
        font-weight: 500;
        color: ${props => props.theme.colors.gray333};
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        min-width: 0;
        word-break: break-all;
      }
    }

    .cart-product-mobile-info {
      display: flex;
      gap: 16px;
      align-items: center;

      picture {
        width: 72px;
        height: 72px;
        position: relative;
      }

      &.sold-out {
        picture {
          &::after {
            display: flex;
            align-items: center;
            justify-content: center;
            ${props => props.theme.fontStyle['body02-3']};
            color: white;
            content: '품절';
            position: absolute;
            left: 0;
            top: 0;
            width: 72px;
            height: 72px;
            z-index: 1;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(1px);
          }
        }
      }
      .cart-product-mobile-price {
        flex: 1 0 auto;
        .cart-product-mobile-price-info {
          margin-bottom: 11px;
          margin-top: 1px;
          display: flex;
          gap: 4px;
          white-space: nowrap;

          > p:first-child {
            color: ${props => props.theme.colors.gray333};
            font-size: 16px;
            font-weight: 600;
          }

          > p:not(:first-child) {
            font-size: 14px;
            font-weight: 500;
            color: ${props => props.theme.colors.graybbb};
            text-decoration-line: line-through;
          }
        }

        > .Stepper {
          width: 104px;
        }
      }
    }

    @media (max-width: 340px) {
      .cart-product-mobile-info {
        picture {
          width: 66px;
          height: 66px;
        }

        &.sold-out {
          picture {
            &::after {
              width: 66px;
              height: 66px;
            }
          }
        }
        .cart-product-mobile-price-info {
          > p:first-child {
            font-size: 14px !important;
          }
          > p:not(:first-child) {
            font-size: 12px !important;
          }
        }
      }
    }
  }

  picture {
  }
`;
