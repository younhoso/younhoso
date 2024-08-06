'use client';

import styled from 'styled-components';

export const MobileSignInPageStyled = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: 0 auto;
  gap: 10px;
  background-color: white;

  .HeaderMobile {
    border-bottom: 0;
  }

  .logo-image {
    margin: 0 auto 36px;
  }

  form {
    padding: 0 24px 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .login-check-up {
      margin-top: 10px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        gap: 6px;
        align-items: center;
        color: ${props => props.theme.colors.gray666};
        font-size: 15px;
        font-weight: 500;
      }
    }

    .Button {
      width: 100%;

      &.sign-up {
        margin-bottom: 22px;
      }
    }
  }

  .login-with-sns {
    font-size: 14px;
    font-weight: 600;
    line-height: 19px;
    color: ${props => props.theme.colors.gray666};
    margin-bottom: 14px;
  }

  .sns-button-wrapper {
    display: flex;
    gap: 16px;
    justify-content: center;
    padding-bottom: 40px;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    margin-bottom: 6px;
  }

  .guest-order-check {
    width: 100%;
  }

  .copyright {
    margin-top: 52px;
    font-size: 12px;
    font-weight: 600;
    color: #a6a6a6;
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
