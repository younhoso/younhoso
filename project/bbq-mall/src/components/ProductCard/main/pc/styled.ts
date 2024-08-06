'use client';

import styled from 'styled-components';

export const ProductCardStyled = styled.div`
  width: 100%;
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.gray333};
  }
  .title-product-name {
    ${props => props.theme.fontStyle['body02-5']}
    margin-top: 16px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    margin-top: 8px;
    .default-price-inner {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      img {
        margin-right: 4px;
      }

      .title-sale-price {
        ${props => props.theme.fontStyle['body01-2']}
      }
    }
    .sale-price-inner {
      display: flex;
      > p {
        ${props => props.theme.fontStyle['body02-1']}

        &:first-child {
          font-weight: ${props => props.theme.fontWeight.bold};
          color: ${props => props.theme.colors.red937};
          margin-right: 4px;
        }

        &:last-child {
          ${props => props.theme.fontStyle['text-line']}
          color: ${props => props.theme.colors.graybbb};
        }
      }
    }
  }

  .count-inner {
    display: flex;
    color: ${props => props.theme.colors.gray666};
    margin-top: 8px;
    > div {
      font-size: ${props => props.theme.fontSizes.font14};
      display: flex;
      font-weight: ${props => props.theme.fontWeight.bold};
      align-items: center;
      margin-right: 16px;

      > p {
        margin-left: 4px;
      }
    }
  }
`;
