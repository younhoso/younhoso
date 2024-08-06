'use client';

import styled from 'styled-components';

export const ChangeCashReceiptStyled = styled.div`
  .show-in-pg {
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: ${props => props.theme.colors.red32D};
  }
  .Radio {
    display: flex;
    gap: 60px;

    .radio-item {
      border-bottom: none;
    }
  }
  .cash-recipt-input {
    width: 70%;
    margin-bottom: 24px;
  }

  .cash-title {
    display: flex;
    align-items: center;
    gap: 26px;
    margin-bottom: 8px;
  }

  .cash-receipt-info {
    ${props => props.theme.fontStyle['body04-3']};
    color: ${props => props.theme.colors.gray999};
  }

  .cash-receipt-modal {
    p {
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray333};

      &.cash-receipt-modal-title {
        ${props => props.theme.fontStyle['body02-1']};
        margin: 32px 0 8px;
      }
    }
  }
`;
