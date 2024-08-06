'use client';

import styled from 'styled-components';

export const CartPageDivideStyled = styled.div`
  > h2 {
    ${props => props.theme.fontStyle['title02-2']}
    text-align: center;
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 40px;
  }

  .cart-order {
    display: flex;
    gap: 40px;

    .cart-product {
      width: calc(100% - 40px - 400px);
      .cart-product-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        .cart-product-info-left {
          display: flex;
          align-items: center;
          ${props => props.theme.fontStyle['body02-5']}
          color:${props => props.theme.colors.gray333};
          .Checkbox {
            gap: 8px;
          }
        }

        .cart-product-info-right {
          display: flex;
          ${props => props.theme.fontStyle['body03-1']}
          gap:12px;
          color: ${props => props.theme.colors.gray333};
          > div {
            cursor: pointer;

            &:first-child {
              display: flex;
              gap: 12px;
              &:after {
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

      .cart-product-content {
        border-top: 1px solid ${props => props.theme.colors.gray999};
        &.empty {
          height: 129px;
          padding: 60px 0;
          border-bottom: 1px solid ${props => props.theme.colors.grayada};
          > div {
            text-align: center;
            ${props => props.theme.fontStyle['body02-5']};
            color: ${props => props.theme.colors.gray666};
          }
        }
      }

      > .Button {
        gap: 6px;
        width: 400px;
        margin: 16px auto 0;
      }
    }

    .cart-brief {
      width: 400px;

      .cart-brief-order {
        width: 100%;
        margin: 16px 0;
        height: 60px;
      }

      .cart-brief-npay {
        margin-top: 8px;
        height: 60px;
        background-color: #00c73c;
        border: 1px solid #00c73c;
        width: 100%;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 7px;

        &:disabled {
          background-color: #00c73c !important;
          border: 1px solid #00c73c !important;
        }
      }

      .cart-brief-description {
        display: flex;
        flex-direction: column;
        gap: 4px;
        > div {
          display: flex;
          ${props => props.theme.fontStyle['body04-3']};
          color: ${props => props.theme.colors.gray999};
        }
      }
    }
  }

  .cart-recommend {
    margin-top: 40px;

    h3 {
      ${props => props.theme.fontStyle['title03-2']};
      color: ${props => props.theme.colors.gray333};
      margin-bottom: 4px;
    }

    .sub-title {
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray999};
      margin-bottom: 24px;
    }

    .cart-recomment-product-wrapper {
      display: flex;
      gap: 24px;
      > div {
        width: 243px;
      }
    }
  }
`;
