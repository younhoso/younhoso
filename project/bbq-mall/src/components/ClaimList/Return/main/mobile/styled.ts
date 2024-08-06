'use client';

import styled from 'styled-components';

import WrapperModal from '@/components/WrapperModal';

export const ReturnMobileStyled = styled(WrapperModal.Mobile)`
  .footer-button-wrapper {
    display: flex;
    margin-top: 24px;
    gap: 7px;

    > .Button {
      flex: 1 0 auto;
    }
  }
  .order-number-wrapper {
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

  .cancel-label {
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.theme.colors.gray333};
  }

  .check-cancel-all {
    margin-top: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${props => props.theme.colors.gray999};
  }

  .cancel-item-wrapper {
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

      > div {
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
    }
  }
  .cancel-select {
    padding-top: 24px;
    margin-top: 20px;
    border-top: 1px solid ${props => props.theme.colors.gray999};
    margin-bottom: 16px;
  }

  .refund-radio-wrpper {
    display: flex;
    margin-top: 24px;
    border-top: 1px solid ${props => props.theme.colors.gray999};
  }

  .invoice-input {
    margin-top: 8px;
  }

  .collect-address {
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.theme.colors.gray333};

    .collect-address-label {
      margin-bottom: 4px;
      color: ${props => props.theme.colors.gray666};
    }

    .collect-address-content {
      > p:first-child {
        margin-bottom: 4px;
        display: flex;
        gap: 4px;
      }
      > p:last-child {
        margin-bottom: 20px;
        color: ${props => props.theme.colors.gray999};
      }
    }

    > .Button {
      width: 60px;
      height: 32px;
    }
  }

  .refund-account-info {
    > .Select,
    .Input {
      margin-bottom: 16px;
    }
  }
  .radio-item {
    border-bottom: none;
    padding: 16px 0 12px;
  }
`;
