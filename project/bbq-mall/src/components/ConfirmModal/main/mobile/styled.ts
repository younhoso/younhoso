'use client';

import styled from 'styled-components';

export const ConfirmModalMobileStyled = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  z-index: 10000;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);

  .confirm-wrapper {
    width: 90vw;
    max-width: 327px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 32px 24px;

    .confirm-content {
      text-align: center;
      margin-bottom: 32px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: #281d19;
    }

    .confirm-button-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;

      > button {
        padding: 11px;
        width: 100%;
        font-size: 15px;
        font-weight: 600;
        line-height: 20px;

        &.confirm-ok-button {
          background-color: #de1f38;
          color: white;
          border: 1px solid #de1f38;
        }

        &.confirm-cancel-button {
          background-color: white;
        }
      }
    }
  }
`;
