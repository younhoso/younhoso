'use client';

import styled from 'styled-components';

export const MobileCategoriesDetailSlugPageStyled = styled.div`
  padding-bottom: 100px;
  .productDetail-tabs-inner {
    width: 100%;
    position: sticky;
    display: flex;
    justify-content: space-between;
    padding: 0 39px;

    top: 0px;
    background-color: ${props => props.theme.colors.white};
    z-index: 9;
    line-height: 44px;
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.theme.colors.gray666};
    a {
      height: 44px;
      display: inline-block;
      color: inherit;
      white-space: nowrap;
      &.active {
        border-bottom: 2px solid ${props => props.theme.colors.red937};
      }
    }
  }
  &.not-webview {
    .productDetail-tabs-inner {
      top: 51px;
    }
  }

  @media screen and (max-width: 320px) {
    .productDetail-tabs-inner {
      padding: 0 10px;
    }
  }

  .product-description {
    img {
      width: 100% !important;
      padding: 18px;
    }
  }
  .review-header {
    padding: 16px 16px 24px 16px;
    .review-title {
      font-size: ${props => props.theme.fontSizes.font15};
      font-weight: ${props => props.theme.fontWeight.semiBold};
      line-height: 17.9px;
      padding-bottom: 8px;
      color: ${props => props.theme.colors.gray333};
    }
    .review-description {
      color: ${props => props.theme.colors.gray666};
      font-size: ${props => props.theme.fontSizes.font13};
      font-weight: ${props => props.theme.fontWeight.medium};
      line-height: 18px;
      span {
        color: ${props => props.theme.colors.red937};
      }
      .line {
        width: 2px;
        height: 10px;
        background-color: ${props => props.theme.colors.gray999};
        display: inline-block;
        margin: 0 5px;
      }
    }
  }
  .review-inner {
    .review-count {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      margin-bottom: 12px;
      > P {
        color: ${props => props.theme.colors.gray333};
        font-size: 14px;
        font-weight: 600;
      }
      .SelectMobile {
        width: 130px;
      }
    }
    .review-item-wrapper {
      padding: 0 16px;
      .review-img-inner {
        .review-content-inner {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-top: 16px;
        }
        span {
          color: ${props => props.theme.colors.gray999};
          font-size: 13px;
          font-weight: 600;
        }
      }
    }
  }
  .reviews-pagination {
    padding: 28px 0;
  }
  .detail-info-title {
    padding: 0 16px;
  }

  picture {
    position: relative;
    &.sold-out {
      &::after {
        display: flex;
        align-items: center;
        justify-content: center;
        ${props => props.theme.fontStyle['body01-1']};
        color: white;
        content: '품절';
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vw;
        z-index: 1;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(1px);
      }
    }
  }
`;
