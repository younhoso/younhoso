'use client';

import styled from 'styled-components';

import WrapperModal from '@/components/WrapperModal';

export const ViewClaimMobileStyled = styled(WrapperModal.Mobile)`
  h4 {
    color: ${props => props.theme.colors.gray333};
    font-size: 15px;
    font-weight: 500;
    padding: 20px;
    background-color: #f6f6f6;
    margin-bottom: 32px;
    margin-top: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > span {
      font-weight: 600;
    }
  }

  .product-wrapper {
    border-bottom: 1px solid ${p => p.theme.colors.grayada};
    margin-bottom: 32px;
    > div {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 16px 0;

      &:not(:last-child) {
        border-bottom: 1px dashed ${p => p.theme.colors.grayada};
      }

      .claim-detail {
        > p {
          color: ${props => props.theme.colors.gray333};
          font-size: 15px;
          font-weight: 500;
          line-height: 20px;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        > div {
          font-size: 15px;
          font-weight: 600;
          color: ${props => props.theme.colors.gray333};
          > span {
            font-weight: 500;

            color: ${props => props.theme.colors.gray666};
            > span {
              color: ${props => props.theme.colors.grayada};
            }
          }
        }
      }

      .claim-status {
        color: ${props => props.theme.colors.red937};
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      }
    }
  }

  .product-claim-reason {
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    padding-bottom: 24px;
    .claim-label {
      font-size: 15px;
      font-weight: 600;
      color: ${props => props.theme.colors.gray333};
      padding-bottom: 16px;
      border-bottom: 1px solid ${props => props.theme.colors.gray999};
      margin-bottom: 16px;
    }

    .red-highlight {
      color: ${props => props.theme.colors.red937};
    }
  }

  .product-refund-info {
    margin-top: 24px;
    .refund-title {
      font-size: 15px;
      font-weight: 600;
      color: ${props => props.theme.colors.gray333};
      padding-bottom: 16px;
      margin-bottom: 20px;
      border-bottom: 1px solid ${props => props.theme.colors.gray999};
    }

    .refund-detail {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      font-weight: 600;
      color: ${props => props.theme.colors.gray333};
      margin-bottom: 12px;

      &.sub {
        font-size: 14px;
        font-weight: 500;
        color: #a6a6a6;
      }
      &.refund-price-stress {
        span {
          font-weight: 700;
          font-size: 20px;
          color: ${props => props.theme.colors.red937};
        }
      }
    }
  }
`;
