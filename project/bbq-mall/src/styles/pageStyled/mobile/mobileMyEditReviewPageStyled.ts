'use client';

import styled from 'styled-components';

export const MobileMyEditReviewPageStyled = styled.div`
  background-color: white;
  .review-product-info {
    padding: 16px 0;
    margin: 0 16px;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    display: flex;
    align-items: center;
    gap: 12px;

    .info-image-wrapper {
      width: 72px;
      height: 72px;
    }

    .review-info-title {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      color: ${props => props.theme.colors.gray333};
    }
  }

  form {
    padding: 16px 16px 40px;
    .rate-check {
      font-size: 15px;
      font-weight: 500;
      color: ${props => props.theme.colors.gray333};
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      justify-content: center;
      margin: 8px 0 24px;
    }

    .Textarea {
      margin-bottom: 16px;
    }

    .ImageUploadMobile {
      padding-bottom: 16px;
      border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    }

    .review-button-wrapper {
      margin-top: 20px;
      display: flex;
      gap: 7px;

      > .Button {
        flex: 1 0 auto;
      }
    }
  }
`;
