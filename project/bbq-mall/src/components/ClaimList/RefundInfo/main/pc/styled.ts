'use client';

import styled from 'styled-components';

export const RefundInfoStyled = styled.div`
  .refund-info-title {
    ${props => props.theme.fontStyle['body02-4']};
    color: ${props => props.theme.colors.gray333};
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.gray999};
    margin-bottom: 24px;
  }

  .charge-info,
  .refundable-info {
    > div {
      display: flex;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 12px;
      }
      color: ${pr => pr.theme.colors.gray333};
      ${props => props.theme.fontStyle['body02-5']};

      &.sub {
        ${props => props.theme.fontStyle['body03-3']};
        color: #a6a6a6;
      }

      > span {
        &.stress {
          color: ${props => props.theme.colors.red32D};
        }

        &.super-stress {
          color: ${props => props.theme.colors.red937};
          ${props => props.theme.fontStyle['body01-2']};
        }
      }
    }
  }

  .refundable-info {
    padding-top: 24px;
    margin-top: 24px;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    margin-bottom: 32px;
  }

  .refund-notice {
    padding: 20px 24px;
    background-color: #f6f6f6;
    color: ${props => props.theme.colors.gray666};

    > div {
      ${props => props.theme.fontStyle['body03-1']};
      margin-bottom: 12px;
    }

    > p {
      &:not(:last-child) {
        margin-bottom: 8px;
      }

      > div {
        ${props => props.theme.fontStyle['body03-2']};
        margin-bottom: 4px;
      }

      > p {
        ${props => props.theme.fontStyle['body03-3']};
      }
    }
  }
`;
