'use client';

import styled from 'styled-components';

export const PopupStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100%;
  width: 100vw;
  max-height: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10000;

  > div {
    width: 800px;
    position: relative;

    .swiper-pagination {
      margin-left: 720px;
      margin-bottom: 10px;
      white-space: nowrap;
      width: 60px;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      color: white;
    }
  }

  .image-wrapper {
    &.cursor-needed {
      img {
        cursor: pointer;
      }
    }
    .popup-image-wrapper {
      border-radius: 12px 12px 0 0;
      display: flex;
      align-items: center;
      img {
        border-radius: inherit;
      }
    }
  }

  .popup-bottom {
    border-radius: 0 0 12px 12px;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #281d19;

    > div {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 8px;
      font-size: 16px;
      font-weight: 500;
      color: ${props => props.theme.colors.graya6a};
    }

    > p {
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      color: white;
    }
  }
`;
