'use client';

import styled from 'styled-components';

export const ProductCardMobileStyled = styled.div`
  width: 100%;
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.gray333};
  }

  .title-product-name {
    font-size: 14px;
    color: ${props => props.theme.colors.gray333};
    font-weight: 500;
    line-height: 18px;
    margin-top: 12px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    margin-top: 8px;
    display: flex;
    gap: 4px;
    > p {
      font-size: 16px;
      font-weight: 700;
      line-height: normal;
      &:first-child {
        color: ${props => props.theme.colors.red937};
      }
      &:last-child {
        color: ${props => props.theme.colors.gray333};
      }
    }
  }

  .count-inner {
    display: flex;
    color: ${props => props.theme.colors.gray666};
    margin-top: 6px;
    gap: 16px;

    > div {
      font-size: ${props => props.theme.fontSizes.font14};
      display: flex;
      font-weight: ${props => props.theme.fontWeight.medium};
      align-items: center;
      gap: 4px;
    }
  }
`;
