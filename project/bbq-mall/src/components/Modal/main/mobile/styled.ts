'use client';

import styled from 'styled-components';

export const ModalMobileStyled = styled.div<{ $width: string }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 255;
  background: rgba(0, 0, 0, 0.6);

  .modal_wrapper {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    width: ${props => props.$width};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .close {
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      border-bottom: 1px solid ${props => props.theme.colors.grayada};

      h3 {
        font-size: 15px;
        font-weight: 500;
        line-height: 20px;
      }
      img {
        cursor: pointer;
      }
    }

    .children-wrapper {
      padding: 20px 24px;
    }

    .footer {
      display: flex;
      justify-content: end;
      gap: 8px;
      padding: 10px 24px 24px;
      border-top: 1px solid ${props => props.theme.colors.grayada};

      > .Button {
        height: 40px;
        flex: 1 0 auto;
      }
    }
  }
`;
