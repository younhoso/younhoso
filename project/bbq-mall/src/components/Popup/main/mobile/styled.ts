'use client';

import styled from 'styled-components';

export const PopupMobileStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100%;
  width: 100vw;
  max-height: 100%;
  height: 100vh;
  display: flex;
  align-items: end;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10000;

  > div {
    width: 100vw;
    .swiper-pagination {
      margin-left: calc(100vw - 50px - 10px);
      margin-bottom: 5px;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 2px 12px;
      border-radius: 16px;
      width: 50px;
      color: white;
      font-size: 12px;
      font-weight: 500;
    }
    .popup-image-wrapper {
      position: relative;
      height: 265px;
      border-radius: 12px 12px 0 0;
      display: flex;
      align-items: center;
      img {
        border-radius: inherit;
      }
    }

    .popup-bottom {
      border-top: 1px solid ${props => props.theme.colors.grayaea};
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;

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
        color: #281d19;
      }
    }
  }
`;
