import { modalCssString } from '~/utils/modalCssString';
import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const FilmSlideStyled = styled.div<{ activeNum: number }>`
  @keyframes filmTextshow {
    0% {
      opacity: 0;
      transform: translate(0, 100%);
      visibility: hidden;
    }
    100% {
      opacity: 1;
      transform: translate(0%);
      visibility: visible;
    }
  }
  text-transform: uppercase;
  background: black;
  /* align-items: center; */
  /* height: 42rem; */

  .slick-list {
    height: 100%;
  }
  .slick-track {
    height: 100%;
  }

  .slick-slide {
    > div {
      height: 100%;
    }
  }

  .slideImages {
    padding-top: 2.5rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    width: 100%;
    height: ${numberToRem(400, 1)};
    > div {
      width: 100%;
      height: 100%;
      > div {
        height: 100%;
      }
    }
  }

  .filmCloseButtonStyle {
    cursor: pointer;
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    background: transparent;
    color: white !important;

    svg {
      path {
        stroke: white;
      }
    }
  }

  .player-wrapper {
    width: auto; // Reset width
    height: auto; // Reset height
  }
  .react-player {
    padding-top: 56.25%; // Percentage ratio for 16:9
    position: relative; // Set to relative
  }

  .react-player > div {
    position: absolute; // Scaling will occur since parent is relative now
    top: 0;
  }

  .bottomText {
    overflow: hidden;
    height: 10rem;
    padding-top: 3rem;
  }

  & .slide {
    position: relative;
    .textItem {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 100%;
      text-transform: uppercase;

      p {
        height: 100%;
        font-weight: bold;
        font-size: 2rem;
      }
    }

    & .swiper-wrapper {
      & .swiper-slide {
        height: 100%;
        /* display: flex; */
        /* justify-content: center; */
        /* max-width: 15rem;

        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(1);
        transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93); */
        opacity: 0.6;

        &.swiper-slide-active {
          opacity: 1;
        }
      }
    }

    .item {
      transform: scale(1) !important;
      transition: 0.2s all;
    }
  }

  .circleText {
    position: relative;

    .circleTextItem {
      position: absolute;
      font-size: 2rem;
      font-weight: bold;
      color: white;
      transition: 0.5s all;
      white-space: nowrap;
      /* word-break: break-all; */
      /* max-width: ${numberToRem(250, 1)}; */
      text-align: center;
      height: 50%;
      top: 0;

      left: 50%;
      transform-origin: bottom;
      transform: translate(-50%, 0) rotate(0);

      /* display: flex;
      justify-content: center;
      height: 50%;
      top: 0;
      left: 50%;
      transform-origin: bottom;
      transform: translateX(-50%); */
    }
  }
`;
