'use client';

import styled from 'styled-components';

import Modal from '@/components/Modal';

export const ExchangeStyled = styled(Modal)`
  .order-number-wrapper {
    ${p => p.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray333};
    padding: 20px 24px;
    background-color: #f6f6f6;
    margin-bottom: 32px;

    > span {
      ${p => p.theme.fontStyle['body02-4']};
    }
  }

  .cancel-label {
    ${props => props.theme.fontStyle['body02-4']};
    color: ${props => props.theme.colors.gray333};
  }

  .check-cancel-all {
    margin-top: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${props => props.theme.colors.gray999};
  }

  .cancel-item {
    margin-bottom: 40px;
    border-bottom: 1px solid ${p => p.theme.colors.grayada};
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 24px 0;
    margin-top: 20px;

    border-bottom: 1px solid ${p => p.theme.colors.grayada};
    border-top: 1px solid ${p => p.theme.colors.gray999};

    > div {
      > p {
        color: ${props => props.theme.colors.gray333};
        ${props => props.theme.fontStyle['body02-5']};
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
  }
  .cancel-select {
    padding-top: 24px;
    margin-top: 20px;
    border-top: 1px solid ${props => props.theme.colors.gray999};
    margin-bottom: 16px;
  }

  .Textarea {
    padding-bottom: 24px;
    border-bottom: 1px solid ${p => p.theme.colors.grayada};
    margin-bottom: 40px;
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
    display: flex;
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray333};

    .collect-address-label {
      width: 156px;
    }

    .collect-address-content {
      flex: 1 0 auto;
      > p:first-child {
        margin-bottom: 6px;
      }
    }

    > .Button {
      width: 60px;
      height: 32px;
    }
  }

  .selected-item {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 24px 0 0;

    .title-label {
      flex: 1 0 auto;
      ${props => props.theme.fontStyle['body02-2']};
      color: ${props => props.theme.colors.gray333};
      > p:last-child {
        margin-top: 4px;
        ${props => props.theme.fontStyle['body02-5']};
        color: ${props => props.theme.colors.gray666};
      }
    }

    .price-wrapper {
      width: 80px;
      text-align: end;
      ${props => props.theme.fontStyle['body02-2']};
      color: ${props => props.theme.colors.gray333};
    }

    .Stepper {
      width: 120px;
    }
  }

  .margin-exist {
    margin-bottom: 8px;
  }
`;
