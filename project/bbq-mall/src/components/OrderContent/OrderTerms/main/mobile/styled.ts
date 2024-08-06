'use client';

import styled from 'styled-components';

export const OrderTermsMobileStyled = styled.div`
  padding: 20px 16px 0;

  background-color: white;
  color: ${props => props.theme.colors.gray333};
  .order-terms-header {
    padding-bottom: 20px;
    border-bottom: 1px dashed ${props => props.theme.colors.grayada};
    .checkbox-label {
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
    }
  }

  .order-terms-body {
    margin-top: 24px;
    padding-bottom: 24px;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .checkbox-label {
        font-size: 14px;
        font-weight: 500;
      }

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      .checkbox-show {
        font-size: 13px;
        font-weight: 600;
        text-decoration: underline;
        min-width: 16px;
        white-space: nowrap;
      }
    }
  }
`;
