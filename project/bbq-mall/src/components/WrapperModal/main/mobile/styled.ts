'use client';

import styled from 'styled-components';

export const WrapperModalMobileStyled = styled.div`
  width: 100vw;
  max-width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: white;
  height: 100vh;
  max-height: 100%;
  z-index: 100;
  overflow: scroll;

  .wrapper-modal-header {
    z-index: 10;
    display: flex;
    position: sticky;
    background-color: white;
    top: 0;
    left: 0;
    align-items: center;
    padding: 0 16px;
    height: 52px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.colors.gray333};
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    > p {
      flex: 1 0 auto;
    }

    > div {
      width: 24px;
      height: 24px;
    }
    display: none;
  }

  &.not-webview {
    .wrapper-modal-header {
      display: flex;
    }
  }

  .wrapper-modal-children {
    padding: 0 16px;
    margin-bottom: 95px;

    &.no-footer {
      margin-bottom: 24px;
    }
  }

  .wrapper-modal-footer {
    position: fixed;
    background-color: white;
    bottom: 0;
    left: 0;
    right: 0;
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
`;
