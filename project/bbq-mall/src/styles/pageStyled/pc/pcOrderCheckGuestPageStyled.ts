'use client';

import styled from 'styled-components';

export const PcOrderCheckGuestPageStyled = styled.form`
  > h2 {
    text-align: center;
    ${props => props.theme.fontStyle['body01-2']};
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 40px;
  }

  .Input,
  .Button {
    width: 340px;
    margin: 0 auto;
  }

  > .Input {
    margin-bottom: 10px;
    &.order-password {
      -webkit-text-security: disc;
      text-security: disc;
    }
  }

  > .Button {
    margin-top: 20px;
  }

  .find-password-wrapper {
    width: 340px;
    margin: 0 auto;
    display: flex;
    justify-content: end;
    button {
      font-size: 14px;
      font-weight: 500;
      line-height: 23px;
      text-decoration-line: underline;
      color: ${props => props.theme.colors.gray666};
      cursor: pointer;
    }
  }
`;
