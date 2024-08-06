'use client';

import styled from 'styled-components';

export const MainBannerStyled = styled.div`
  height: 320px;
  .main-swiper-wrapper {
    position: absolute;
    height: 320px;
    width: 100%;
    left: 0;
    right: 0;
    top: ${props => props.theme.sizes.headerHeight};
    max-width: 1920px;
    min-width: 1280px;
    margin: 0 auto;

    .swiper-image-wrapper {
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
  }

  .my-swiper {
    &:hover {
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 1;
      }
    }
  }
  .swiper-slide {
    height: 320px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    opacity: 0;
    transition: opacity 0.5s;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.25);

    &::after {
      font-size: 25px;
    }
  }

  .swiper-button-prev {
    left: calc(50% - 640px + 30px);
    transform: translateX(-50%);
    &::after {
      margin-right: 4px;
    }
  }
  .swiper-button-next {
    right: calc(50% - 640px + 30px);
    transform: translateX(50%);
    &::after {
      margin-left: 4px;
    }
  }

  .swiper-pagination {
    width: auto;
    color: #fff;
    position: absolute;
    right: calc(50% - 640px + 33.5px + 140px);
    transform: translateX(50%);
    left: auto;
    bottom: 24px;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
  }
`;
