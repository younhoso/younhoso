import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const CategoryModalStyled = styled.div`
  @keyframes showAnimation {
    0% {
      opacity: 0;
      transform: ${`translateY(${numberToRem(200, 1)})`};
    }
    100% {
      opacity: 1;
      transform: ${`translateY(${numberToRem(0, 1)})`};
    }
  }

  @keyframes textShowAnimation {
    0% {
      opacity: 0;
      transform: ${`translate(-50%, -30%)`};
    }
    100% {
      opacity: 1;
      transform: ${`translate(-50%, -50%)`};
    }
  }

  @keyframes textOutAnimation {
    0% {
      opacity: 1;
      transform: ${`translate(-50%, -50%)`};
    }
    100% {
      opacity: 0;
      transform: ${`translate(-50%, -30%)`};
    }
  }

  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s all;
  opacity: 0;
  visibility: hidden;
  z-index: 9999;
  backdrop-filter: blur(0.15rem);

  & pre {
    white-space: pre-wrap;
    word-break: break-all;
    font-family: Montserrat, NotoSans;
  }

  &.open {
    .slideImages {
      opacity: 0;
      animation: 1s showAnimation forwards;
      animation-fill-mode: forwards;
      /* animation-delay : .3s; */
    }

    .contentLists {
      > div {
        > .left {
          opacity: 0;
          transition: 0.5s all;
          /* transform: ${`translateX(${numberToRem(-200, 1)})`}; */
          text-transform: uppercase;
          font-size: 0.9rem;
        }

        > .right {
          opacity: 0;
          transition: 0.5s all;
          transform: ${`translateX(${numberToRem(200, 1)})`};

          > div {
            pointer-events: auto;
            display: flex;
            font-size: 0.9rem;

            p {
              min-width: 7rem;
              max-width: 7rem;
            }

            div {
              flex-wrap: wrap;
              display: flex;
            }
          }
        }
      }

      > .show {
        > .left {
          opacity: 1;
          /* transition: 1s all; */
          /* transform: ${`translateX(${numberToRem(0, 1)})`}; */
        }

        > .right {
          transition: 1s all;
          /* transition-delay: .4s; */
          opacity: 1;
          transform: ${`translateX(${numberToRem(0, 1)})`};
        }
        /* animation: 1s textShowAnimation forwards;
        animation-fill-mode : forwards;
        opacity : 0; */
      }

      > .out {
        /* animation: 1s textOutAnimation forwards;
        animation-fill-mode : forwards;
        opacity : 0; */
      }
    }
  }

  .slideImages {
    width: 100%;
    height: ${numberToRem(750, 1)};
    > div {
      height: 100%;
    }

    .swiper-slide {
      max-width: ${numberToRem(550, 1)}!important;
      width: ${numberToRem(550, 1)};
      /* margin-right: ${numberToRem(450, 1)}; */
      /* width: ${numberToRem(600, 1)}!important; */
      /* width :100%; */
      height: 100%;
      opacity: 0.6;
      transition: 0.5s opacity;

      &.swiper-slide-active {
        opacity: 1;
      }
    }
  }

  .content {
    z-index: 1000;
    pointer-events: none;
    position: absolute;
    display: flex;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: ${numberToRem(750, 1)};
    color: white;
    transition: 2s all;
    visibility: hidden;
    opacity: 0;

    animation: 1s textShowAnimation forwards;

    &.show {
      opacity: 1;
      visibility: visible;
    }

    .left {
      text-align: right;
      padding-right: 2rem;
      width: ${numberToRem(475, 1)};
      padding-top: 6rem;

      .top {
        h2 {
          font-size: ${numberToRem(50, 1)};
          font-weight: bold;
          letter-spacing: 0.1em;
          line-height: 1.1em;
        }

        p {
          font-size: ${numberToRem(18, 1)};
        }
      }

      .bottom {
        margin-top: ${numberToRem(35, 1)};

        pre {
          &:first-child {
            margin-bottom: 4rem;
          }
          text-align: right;
          display: -webkit-box;
          height: 100%;
          overflow: hidden;
          max-height: 8.75rem;
          text-overflow: ellipsis;
          word-break: break-all;
          word-wrap: break-word;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
        }
      }
    }

    .right {
      justify-content: flex-end;
      display: flex;
      flex-direction: column;
      padding-left: 2rem;
      width: ${numberToRem(475, 1)};

      .users {
        p {
          /* font-family : NotoSans; */
        }
      }
    }

    > .empty {
      width: ${numberToRem(550, 1)};
      /* background: black; */
      height: 100%;
    }
  }

  &.open {
    visibility: visible;
    opacity: 1;
  }

  > .closeButton {
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
`;
