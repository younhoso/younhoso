'use client';

import styled from 'styled-components';

import ContentBox from '@/components/ContentBox';

export const OrderBuyerMobileStyled = styled(ContentBox.Mobile)`
  form {
    .order-buyer-item {
      display: flex;

      &:not(:last-child) {
        margin-bottom: 10px;
      }

      .order-buyer-item-label {
        font-size: 15px;
        font-weight: 500;
        width: 90px;
        min-width: 90px;
        color: ${props => props.theme.colors.gray666};

        &.line-height-needed {
          line-height: 45px;
        }
      }

      .order-buyer-item-value {
        font-size: 15px;
        font-weight: 500;
        color: ${props => props.theme.colors.gray333};
      }

      > .Input {
        flex: 1 0 auto;
        .input-wrapper {
          width: 150px;
        }
        @media (max-width: 320px) {
          .input-wrapper {
            max-width: 157px;
          }
        }
      }
    }

    .email-info {
      > p {
        font-size: 12px;
        font-weight: 500;
        color: ${props => props.theme.colors.gray999};
        &:first-child {
          margin-top: 20px;
          margin-bottom: 6px;
        }
      }
    }
  }
`;
