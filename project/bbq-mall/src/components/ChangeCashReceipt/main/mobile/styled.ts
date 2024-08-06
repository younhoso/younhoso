'use client';

import styled from 'styled-components';

export const ChangeCashReceiptMobileStyled = styled.div`
  .show-in-pg {
    margin-top: 16px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: ${props => props.theme.colors.red32D};
  }
  background-color: #f6f6f6;
  .radio-item {
    border-bottom: none;
    padding: 12px 0;
  }

  .cash-receipt-wrapper {
    padding: 20px;
  }

  .cash-receipt-info {
    text-indent: 0;
    padding: 20px;
    font-size: 12px;
    font-weight: 500;
    color: ${props => props.theme.colors.gray999};
  }

  .cash-title {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
  }

  .cash-receipt-modal {
    p {
      ${props => props.theme.fontStyle['body04-3']};
      color: ${props => props.theme.colors.gray333};

      &.cash-receipt-modal-title {
        ${props => props.theme.fontStyle['body03-1']};
        margin: 16px 0 8px;
      }
    }
  }
`;
