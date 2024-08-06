'use client';

import styled from 'styled-components';

export const ConfirmModalStyled = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  z-index: 10000;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);

  .confirm-wrapper {
    width: 360px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;

    .confirm-content {
      padding: 40px 30px;
      border-bottom: 1px solid ${props => props.theme.colors.grayada};
      color: ${props => props.theme.colors.gray333};
      ${props => props.theme.fontStyle['body02-4']};
      text-align: center;
    }

    .confirm-button-wrapper {
      display: flex;
      align-items: center;

      .divider {
        height: 71px;
        width: 1px;
        border-right: 1px solid ${props => props.theme.colors.grayada};
      }

      > button {
        flex-grow: 1;
        padding: 24px 0;
        cursor: pointer;
        ${props => props.theme.fontStyle['body02-4']}
        color:${props => props.theme.colors.red937};
        border: 0 !important;

        &:disabled {
          cursor: not-allowed;
        }

        &:first-child {
          border-bottom-left-radius: 16px;
        }

        &:last-child {
          border-bottom-right-radius: 16px;
        }
      }
    }
  }
`;
