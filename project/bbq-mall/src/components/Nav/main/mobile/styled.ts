'use client';

import styled from 'styled-components';

export const NavMobileStyled = styled.div`
  &.not-webview {
    display: block !important;
  }
  position: sticky;
  bottom: 0;
  left: 0;
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.05);
  z-index: 100;
  width: 100%;
  background-color: white;

  .nav-wrapper {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      aspect-ratio: 1 / 1;
      height: 72px;
      margin: 12px 0;

      .nav-item-title {
        font-size: 14px;
        font-weight: 600;
        color: ${props => props.theme.colors.gray333};
        white-space: nowrap;
      }

      &.active {
        .nav-item-title {
          color: #de1f38;
        }
      }

      &.main {
        background-color: #de1f38;
        border-radius: 50%;
        box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;

        .nav-item-title {
          font-weight: 700;
          color: white;
        }
      }

      @media (max-width: 360px) {
        width: 20vw;
        height: auto;

        .nav-item-title {
          font-size: 12px;
        }
      }
    }
  }
  display: none;
`;
