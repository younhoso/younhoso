'use client';

import styled from 'styled-components';

export const HeaderMobileStyled = styled.div`
  &.not-webview {
    display: flex !important;
  }
  height: ${props => props.theme.sizes.mobileHeaderHeight};
  border-bottom: 1px solid ${props => props.theme.colors.grayaea};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;

  &.hide-border-bottom {
    border-bottom: none;
  }
  &.remove-sticky {
    position: relative;
  }

  gap: 37px;
  padding: 0 16px;

  .flex-wrapper {
    flex: 1 0 auto;
    max-width: 161px;
    display: flex;
    justify-content: center;

    > span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      min-width: 0;
      font-size: 16px;
      font-weight: 600;
      color: ${props => props.theme.colors.gray333};
    }
  }

  .header-image-wrapper {
    width: 61px;
    display: flex;
    align-items: center;
  }

  .icon-wrapper {
    width: 61px;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: end;
  }
  display: none;

  @media (max-width: 375px) {
    gap: 15px;
  }

  @media (max-width: 320px) {
    gap: 7px;
    padding: 0 16px;
    .HeaderToggleMobile {
      width: 114px;
      font-size: 12px;
    }
    .icon-wrapper {
      width: 49px;
      gap: 0;
    }

    .new-wrapper > img {
      right: 5px !important;
    }
  }
`;
