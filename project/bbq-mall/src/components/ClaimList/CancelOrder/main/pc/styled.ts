'use client';

import styled from 'styled-components';

import Modal from '@/components/Modal';

export const CancelOrderStyled = styled(Modal)`
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

  .cancel-item-wrapper {
    border-bottom: 1px solid ${p => p.theme.colors.grayada};
    margin-bottom: 40px;
    > div {
      display: flex;
      gap: 16px;
      align-items: center;
      padding: 24px 0;

      &:not(:last-child) {
        border-bottom: 1px dashed ${p => p.theme.colors.grayada};
      }

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

  .refund-account-info {
    > .Select,
    .Input {
      margin-bottom: 16px;
    }
  }
`;
