import styled from 'styled-components';

export const ModalStyled = styled.div<{ $width: string; $maxHeight: string }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 255;
  background: rgba(0, 0, 0, 0.4);

  .modal_wrapper {
    position: absolute;
    background-color: white;
    border-radius: 16px;
    width: ${props => props.$width};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .close {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 32px;

      border-bottom: 1px solid ${props => props.theme.colors.gray999};

      h3 {
        ${props => props.theme.fontStyle['title03-2']};
        color: ${props => props.theme.colors.gray333};
      }
      img {
        cursor: pointer;
      }

      &.no-margin {
        margin-bottom: 0;
      }
    }

    .modal-children-wrapper {
      padding: 24px 24px 0 32px;
      &.overflow-visible {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: calc(${props => props.$maxHeight} - 32px - 32px - 63px - 60px);
        @media (max-height: 1100px) {
          max-height: calc(80vh - 32px - 32px - 63px - 60px);
        }
      }

      &.padding-bottom-needed {
        padding-bottom: 32px;
      }

      &.hide-padding-top {
        padding-top: 0;
      }
    }

    .footer {
      display: flex;
      justify-content: end;
      gap: 8px;
      padding: 0 32px 32px 32px;

      margin-top: 24px;

      > .Button {
        height: 60px;
        flex: 1 0 auto;
        ${props => props.theme.fontStyle['body02-4']}
      }
    }
  }
`;
