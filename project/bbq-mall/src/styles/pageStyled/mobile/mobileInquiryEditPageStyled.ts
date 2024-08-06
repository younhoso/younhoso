'use client';

import styled from 'styled-components';

export const MobileInquiryEditPageStyled = styled.div`
  padding: 24px 16px 80px;
  .footer {
    display: flex;

    position: fixed;
    background-color: white;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 16px;
    gap: 7px;
    border-top: 1px solid ${props => props.theme.colors.grayaea};
    > .Button {
      flex: 1 0 auto;

      padding: 11px 0;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    > .Checkbox {
      margin-bottom: 12px;
    }

    .divider {
      border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    }
  }
`;
