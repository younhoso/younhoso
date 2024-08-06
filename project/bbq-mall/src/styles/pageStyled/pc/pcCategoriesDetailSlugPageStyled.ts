'use client';

import styled from 'styled-components';

export const PcCategoriesDetailSlugPageStyled = styled.div`
  padding-bottom: ${props => props.theme.sizes.headerHeight};
  min-width: 1280px;
  min-height: 600px;
  .product-detail {
    .product-priceInfo {
      display: grid;
      grid-template-columns: 1fr 1fr;

      > picture {
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
            width: 520px;
            height: 520px;
            z-index: 1;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(1px);
          }
        }
      }
    }
  }
  .productDetail-tabs-inner {
    width: 100%;
    display: flex;
    margin-top: 40px;
    width: 100%;
    position: sticky;
    top: ${props => props.theme.sizes.headerHeight};
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.gray666};
    z-index: 9;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      font-size: 16px;
      font-weight: 500;
      line-height: 60px;
      cursor: pointer;
      white-space: nowrap;
      color: inherit;
      border: 1px solid #dadada;
      text-align: center;
      background-color: #f5f5f5;
      &.active {
        color: ${props => props.theme.colors.red937};
        background-color: white;
        border-bottom: none;
      }
    }
  }
  .product-description-inner {
    padding-top: 20px;
    .product-description {
      img {
        width: 100% !important;
      }
    }

    .detail-info-title {
      margin-top: 40px;
      ${props => props.theme.fontStyle['body01-2']}
      border-bottom: 1px solid ${props => props.theme.colors.grayada};
      padding-bottom: 24px;
      margin-bottom: 24px;
    }

    .review-header {
      margin-top: 80px;
      .review-title {
        ${props => props.theme.fontStyle['body01-2']};
      }
      .review-description {
        margin-top: 16px;
        ${props => props.theme.fontStyle['body02-5']};
        span {
          margin-left: 4px;
          color: ${props => props.theme.colors.red937};
        }
        .line {
          width: 2px;
          height: 13px;
          background-color: ${props => props.theme.colors.gray999};
          display: inline-block;
          margin: 0 5px;
        }
      }
      .review-description {
      }
    }

    .review-inner {
      .review-count {
        ${props => props.theme.fontStyle['body02-4']};
        padding-bottom: 32px;
        margin-top: 40px;
        border-bottom: 1px solid ${props => props.theme.colors.gray999};
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .Select {
        width: 130px;
      }
    }
    .reviews-pagination {
      padding: 40px 0 80px 0;
    }

    .detail-review-cases {
      ${props => props.theme.fontStyle['body02-4']};
      margin-top: 41px;
      padding-bottom: 32px;
      border-bottom: 1px solid ${props => props.theme.colors.gray999};
    }
  }
  .default-type {
    padding-bottom: 32px;
  }
  .essential {
    p {
      color: ${props => props.theme.colors.gray333};
      ${props => props.theme.fontStyle['body02-4']}
    }
  }

  .as-notes {
    p {
      color: ${props => props.theme.colors.gray333};
      ${props => props.theme.fontStyle['body02-4']}
    }
  }
`;
