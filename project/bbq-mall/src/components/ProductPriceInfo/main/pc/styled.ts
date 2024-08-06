'use client';

import styled from 'styled-components';

export const ProductPriceInfoStyled = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.grayada};
  h2 {
    ${props => props.theme.fontStyle['title03-2']}
    color: ${props => props.theme.colors.gray333};
  }
  .reviewRate-inner {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .reviewReview-inner {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 14px 0;
    .review-inner {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .price-inner {
      display: flex;
    }
    p {
      color: ${props => props.theme.colors.gray333};
      ${props => props.theme.fontStyle['body03-1']}
    }
  }

  .price {
    .default-price-inner {
      display: flex;
      gap: 5px;
      align-items: center;

      .title-sale-price {
        color: ${props => props.theme.colors.gray333};
        ${props => props.theme.fontStyle['title02-2']}
      }
    }
  }

  .sale-price-inner {
    display: flex;
    gap: 6px;
    margin-top: 8px;
    > p {
      ${props => props.theme.fontStyle['body01-1']}

      &:first-child {
        font-weight: ${props => props.theme.fontWeight.extraBold};
        color: ${props => props.theme.colors.red937};
      }

      &:last-child {
        ${props => props.theme.fontStyle['text-line']}
        color: ${props => props.theme.colors.graybbb};
        font-weight: ${props => props.theme.fontWeight.medium};
      }
    }
  }
`;
