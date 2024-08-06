'use client';

import styled from 'styled-components';

export const OrderDetailStyled = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.grayada};
  .page-title-suffix {
    display: flex;
    align-items: center;
    gap: 4px;
    ${props => props.theme.fontStyle['body02-5']}
    color:${props => props.theme.colors.gray666};

    > span {
      ${props => props.theme.fontStyle['body02-4']};
      color: ${props => props.theme.colors.red937};
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }
  }

  .content-box-title-flex {
    ${props => props.theme.fontStyle['body02-4']}
    color: ${props => props.theme.colors.gray333};

    > span {
      ${props => props.theme.fontStyle['body02-5']};
    }
  }

  .content-item-wrapper {
    > div {
      display: flex;
      padding: 24px 0;
      align-items: center;
      gap: 20px;
      .product-info {
        flex: 1 0 auto;
        > p {
          cursor: pointer;
          ${props => props.theme.fontStyle['body02-5']};
          color: ${props => props.theme.colors.gray333};
          margin-bottom: 4px;
        }

        > div {
          ${props => props.theme.fontStyle['body02-4']};
          color: ${props => props.theme.colors.gray333};
          > span {
            ${props => props.theme.fontStyle['body02-5']};
            color: ${props => props.theme.colors.gray666};

            > span {
              color: ${props => props.theme.colors.grayada};
            }
          }
        }
      }

      .product-claim-type {
        ${props => props.theme.fontStyle['body02-5']};

        color: ${props => props.theme.colors.red937};
      }

      .product-button-wrapper {
        > .Button {
          &:not(:last-child) {
            margin-bottom: 4px;
          }
        }
      }

      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
      }

      &:not(:last-child) {
        border-bottom: 1px dashed ${props => props.theme.colors.grayada};
      }
    }
  }

  .order-history-detail-button-wrapper {
    display: flex;
    justify-content: center;
    gap: 8px;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    padding-top: 24px;
    margin: 0 0 60px;
    > .Button {
      width: 200px;
    }
  }

  .content-item {
    display: flex;
    > div {
      &:first-child {
        width: 180px;
        ${props => props.theme.fontStyle['body02-5']};
        color: ${props => props.theme.colors.gray666};
      }

      &:last-child {
        ${props => props.theme.fontStyle['body02-4']};
        color: ${props => props.theme.colors.gray333};
      }
    }
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  .discount-list {
    display: flex;
    margin-bottom: 12px;
    transform: translateY(-4px);
    ${props => props.theme.fontStyle['body03-3']};
    color: #a6a6a6;
    > p {
      width: 180px;
    }
  }

  .payment-sum {
    color: ${props => props.theme.colors.red32D};
  }

  .stress-needed {
    font-size: 18px;
  }
`;
