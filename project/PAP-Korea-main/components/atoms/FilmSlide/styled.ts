import { modalCssString } from '~/utils/modalCssString';
import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const FilmSlideStyled = styled.div`
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
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45rem;

  padding: 0 4.125rem;

  .RoundSlide {
    overflow: hidden;
    color: white;
    text-transform: uppercase;
    font-size: 2rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40%;
    letter-spacing: 2px;
    line-height: 1.3em;

    & > .Title {
      font-weight: bold;
      font-size: 3rem;
    }

    & .list {
      transition: 0.7s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
      position: relative;
      width: 1rem;
      height: 1rem;
      transform-origin: center;
      margin-left: -10rem;
      transform: rotate(0deg);

      & div {
        font-weight: bold;
        font-size: 2rem;

        width: 22rem;
        text-align: left;
        padding-left: 35rem;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-100%, -50%);
        opacity: 0.4;
        transition: 0.7s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

        & > p {
          width: 20rem;
          cursor: pointer;
        }

        @media screen and (max-width: 1600px) {
          padding-left: 30rem;
        }

        @media screen and (max-width: 1300px) {
          padding-left: 25rem;
          font-size: 1.75rem;

          & > p {
            width: 15rem;
          }
        }

        letter-spacing: 0.3rem;
        &:hover {
          opacity: 0.8;
        }

        &.active {
          /* letter-spacing: 0.3rem; */
          opacity: 1;
        }
      }
    }
  }

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

  .SlideContent {
    width: ${numberToRem(1000, 1)};
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    color: white;

    > div:not(.explanations) {
      display: flex;
      width: 100%;
      background: black;
      height: 70%;
      overflow-x: hidden;

      transition: 0.7s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

      &:hover {
        cursor: pointer;
        transform: scale(0.95);
        border-radius: ${numberToRem(20, 1)};
      }

      > div {
        width: 100%;
        flex: none;
      }
    }

    .explanations {
      margin-top: 1.2rem;
      letter-spacing: 2px;
      position: relative;
      width: 100%;

      & .explanation {
        line-height: 1.4em;
        max-width: 70%;
        text-align: right;
        position: absolute;
        right: 0;

        opacity: 0;
        transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
        visibility: hidden;

        &.active {
          opacity: 1;
          animation: filmTextshow 0.7s;
          visibility: visible;
        }
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
`;
