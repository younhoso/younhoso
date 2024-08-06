'use client';

import styled from 'styled-components';

export const CartProductStyled = styled.div`
  padding: 24px 10px;
  border-bottom: 1px solid ${props => props.theme.colors.grayada};
  display: flex;
  align-items: center;
  gap: 56px;
  > div {
    display: flex;
    align-items: center;

    picture {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 16px;

      &.sold-out {
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
          width: 80px;
          height: 80px;
          z-index: 1;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(1px);
        }
      }
    }

    .cart-product-title {
      width: 370px;

      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;

      > p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

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

      &.sold-out {
        color: ${props => props.theme.colors.graybbb};
      }
    }

    &:last-child {
      width: 268px;
      display: flex;
      justify-content: end;

      .cart-product-price-wrapper {
        display: flex;
        justify-content: space-between;
        width: 218px;
        margin-right: 16px;

        .Stepper {
          width: 104px;
        }

        .cart-product-price {
          display: flex;
          gap: 4px;
          flex-direction: column;
          align-items: end;
          justify-content: center;

          > p:first-child {
            ${props => props.theme.fontStyle['body02-2']};
            color: ${props => props.theme.colors.gray333};
          }

          > p:not(:first-child) {
            font-size: 14px;
            font-weight: 500;
            line-height: normal;
            text-decoration-line: line-through;
            color: ${props => props.theme.colors.graybbb};
          }
        }
      }
      .delete-cart-icon {
        cursor: pointer;
      }
    }
  }
`;
