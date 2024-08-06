'use client';

import styled from 'styled-components';

export const ProductPriceInfoMobileStyled = styled.div`
  padding: 20px 16px 40px 16px;
  border-bottom: 1px solid ${props => props.theme.colors.grayada};

  h2 {
    ${props => props.theme.fontStyle['body01-6']}
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 12px;
  }
  .price {
    .default-price-inner {
      display: flex;
      align-items: center;
      gap: 6px;
      p {
        ${props => props.theme.fontStyle['title03-4']}
        color: ${props => props.theme.colors.gray333};
      }
    }
    .sale-price-inner {
      display: flex;
      gap: 6px;
      margin-top: 5px;
      > p {
        font-size: ${props => props.theme.fontSizes.font15};
        font-weight: ${props => props.theme.fontWeight.medium};

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
  }
  .reviewReview-inner {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 16px;
    .reviewRate-inner {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 600;
      p {
        color: ${props => props.theme.colors.gray333};
      }
    }
    .review-inner {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 600;
      p {
        color: ${props => props.theme.colors.gray333};
      }
    }
  }
`;
