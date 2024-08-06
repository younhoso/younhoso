'use client';

import styled from 'styled-components';

import Modal from '@/components/Modal';

export const ViewClaimStyled = styled(Modal)`
  h4 {
    padding: 20px 24px;

    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray333};
    background-color: #f6f6f6;

    > span {
      ${props => props.theme.fontStyle['body02-4']};
    }
  }

  .product-wrapper {
    margin-bottom: 40px;
    > div {
      display: flex;
      border-bottom: 1px dashed ${props => props.theme.colors.grayada};
      padding: 24px 0;
      align-items: center;
      gap: 18px;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        border-bottom: 1px solid ${props => props.theme.colors.grayada};
      }

      .claim-detail {
        flex: 1 0 auto;
        > p {
          &.product-name {
            ${props => props.theme.fontStyle['body02-4']};
            color: ${props => props.theme.colors.gray333};
            margin-bottom: 4px;
          }

          &.option-name {
            ${props => props.theme.fontStyle['body02-5']};
            color: ${props => props.theme.colors.gray666};
          }
        }
        > div {
          ${props => props.theme.fontStyle['body02-4']};
          color: ${porps => porps.theme.colors.gray333};

          > span {
            ${props => props.theme.fontStyle['body02-5']};
            color: ${props => props.theme.colors.gray666};

            > span {
              color: ${props => props.theme.colors.grayada};
            }
          }
        }
      }

      .claim-status {
        color: ${props => props.theme.colors.red937};
        ${props => props.theme.fontStyle['body02-4']};
      }
    }
  }

  .product-claim-reason {
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    padding-bottom: 24px;
    margin-bottom: 40px;
    .claim-label {
      ${props => props.theme.fontStyle['body02-4']};
      color: ${props => props.theme.colors.gray333};
      padding-bottom: 20px;
      border-bottom: 1px solid ${props => props.theme.colors.gray999};
      margin-bottom: 24px;
    }

    .red-highlight {
      color: ${props => props.theme.colors.red937};
    }
  }

  .product-refund-info {
    .refund-title {
      ${props => props.theme.fontStyle['body02-4']};
      color: ${props => props.theme.colors.gray333};
      padding-bottom: 20px;
      margin-bottom: 24px;
      border-bottom: 1px solid ${props => props.theme.colors.gray999};
    }

    .refund-detail {
      &.refund-price-stress {
        span {
          ${props => props.theme.fontStyle['body01-2']};
          color: ${props => props.theme.colors.red937};
        }
      }

      display: flex;
      justify-content: space-between;
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray333};
      margin-bottom: 12px;

      &.sub {
        ${props => props.theme.fontStyle['body03-3']};
        color: #a6a6a6;
      }
    }
  }
`;
