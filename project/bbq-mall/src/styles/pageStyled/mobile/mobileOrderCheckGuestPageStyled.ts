'use client';

import styled from 'styled-components';

export const MobileOrderCheckGuestPageStyled = styled.form`
  background-color: white;
  padding: 0 24px;

  > .Input {
    margin-bottom: 10px;

    &.margin-needed {
      padding-top: 16px;
    }

    &.order-password {
      -webkit-text-security: disc;
      text-security: disc;
    }
  }

  > .Button {
    margin-top: 20px;
    margin-bottom: 56px;
    width: 100%;
  }

  > p {
    font-size: 12px;
    text-align: center;
    color: #a6a6a6;
    font-weight: 600;
  }

  .find-password-wrapper {
    display: flex;
    justify-content: end;
    font-size: 14px;
    font-weight: 500;
    line-height: 23px;
    text-decoration-line: underline;
    color: ${props => props.theme.colors.gray666};
    cursor: pointer;
  }
`;
