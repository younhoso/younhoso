'use client';

import styled from 'styled-components';

export const PcSignInPageStyled = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .login-title {
    text-align: center;
    ${props => props.theme.fontStyle['body01-2']};
    margin-bottom: 40px;
  }

  .Input {
    width: 340px;
    margin-bottom: 10px;
    height: 56px;
  }

  .login-info {
    width: 340px;
    margin-top: 16px;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray333};

    > div {
      display: flex;
      align-items: center;
      gap: 8px;
      > div {
        cursor: pointer;
      }
    }
  }

  button {
    width: 340px;
    &.sign-in {
      margin-bottom: 10px;
    }

    &.sign-up {
      margin-bottom: 40px;
    }

    &.guest-order-check {
      margin-top: 16px;
    }
  }

  .sns-label {
    ${props => props.theme.fontStyle['body03-2']};
    color: ${props => props.theme.colors.gray666};
    margin-bottom: 24px;
  }

  .sns-icon-wrapper {
    width: 340px;
    justify-content: center;
    display: flex;
    gap: 16px;
    padding-bottom: 40px;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};

    > img {
      cursor: pointer;
    }
  }

  .Input {
    .input-wrapper {
      .input-forward {
        height: 100%;
      }
      padding: 0;
      input {
        padding: 13px 14px 12px;
      }
    }
  }
`;
