'use client';

import styled from 'styled-components';

export const MainBannerMobileStyled = styled.div`
  .custom-swiper {
    height: 100%;
  }

  .main-swiper-wrapper {
    max-width: 475px;
    min-width: 280px;
    width: 100%;
    margin: 0 auto;
    .swiper-image-wrapper {
      padding-bottom: 78.94%;
      display: flex;
      justify-content: center;
      cursor: pointer;
      height: 100%;
    }
    .swiper-pagination {
      width: auto;
      display: inline-block;
      color: #fff;
      position: absolute;
      right: 20px;
      bottom: 20px;
      left: auto;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 2px 12px;
      border-radius: 1em;
      ${props => props.theme.fontStyle['body04-2']};
    }
  }
`;
