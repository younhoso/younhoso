'use client';

import styled from 'styled-components';

export const RefundInfoMobileStyled = styled.div`
  .refund-info-title {
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.theme.colors.gray333};
    padding-bottom: 16px;
    border-bottom: 1px solid ${props => props.theme.colors.gray999};
    margin-bottom: 20px;
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
      font-size: 15px;
      font-weight: 600;

      &.sub {
        font-size: 14px;
        font-weight: 500;
        color: #a6a6a6;
      }

      > span {
        &.stress {
          color: ${props => props.theme.colors.red32D};
        }

        &.super-stress {
          color: ${props => props.theme.colors.red937};
          font-size: 15px;
          font-weight: 700;
        }
      }
    }
  }

  .refundable-info {
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    margin-bottom: 24px;
  }

  .refund-notice {
    padding: 20px;
    background-color: #f6f6f6;
    color: ${props => props.theme.colors.gray666};
    > div {
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 600;
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
