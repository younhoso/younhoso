'use client';

import styled from 'styled-components';

export const OrderTermsStyled = styled.div`
  border: 1px solid ${props => props.theme.colors.grayada};
  padding: 24px;
  .order-terms-header {
    padding-bottom: 24px;
    border-bottom: 1px dashed ${props => props.theme.colors.grayada};
  }

  .order-terms-body {
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    > div {
      display: flex;
      gap: 12px;
      align-items: center;
      .checkbox-label {
        max-width: 250px;
        ${props => props.theme.fontStyle['body03-3']};
        color: ${props => props.theme.colors.gray333};
      }

      .checkbox-show {
        text-align: end;
        flex: 1 0 auto;
        text-decoration: underline;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        color: ${props => props.theme.colors.gray333};
      }
    }
  }
`;
