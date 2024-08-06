'use client';

import styled from 'styled-components';

export const MobileEventTabsPageStyled = styled.div`
  .page-inner {
    padding-top: 20px;
  }

  .event-title {
    ${props => props.theme.fontStyle['body02-4']}
    margin: 12px 0 15px 0;
    text-align: center;
  }
  .event-error {
    display: flex;
    min-height: 50vh;
    justify-content: center;
    align-items: center;
  }
  .event-button-inner {
    position: sticky;
    z-index: 10;
    top: 0;
    background-color: white;
    display: flex;
    gap: 20px;
    justify-content: space-evenly;
    align-items: start;
    padding: 0 20px;
  }

  @media screen and (max-width: 320px) {
    .event-button-inner {
      max-width: 270px;
      margin: 0 auto;
      padding: 0;
    }
  }

  .event-winner-list {
    padding: 20px 16px;
  }

  &.not-webview {
    .event-button-inner {
      top: 51px !important;
    }
  }
`;
