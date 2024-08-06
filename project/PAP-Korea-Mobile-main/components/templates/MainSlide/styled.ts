import { newsSlideProps, heightObjectNumbers } from '~/components/props';
import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

interface slideCssProps extends newsSlideProps {
  grid: number;
}

export const MainSlideStyled = styled.div<slideCssProps>`
  @keyframes showAnimation {
    0% {
      opacity: 0;
      transform: ${`translateY(${numberToRem(100, 1)})`};
    }
    100% {
      opacity: 1;
      transform: ${`translateY(${numberToRem(0, 1)})`};
    }
  }

  @keyframes showHover {
    0%,
    20% {
      transform: scale(1);
    }

    40% {
      transform: scale(0.98);
    }

    100% {
      transform: scale(1.03);
    }
  }

  @keyframes outHover {
    0%,
    20% {
      transform: scale(1.03);
    }

    40% {
      transform: scale(0.98);
    }

    100% {
      transform: scale(1);
    }
  }

  &.newsTop {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  text-transform:uppercase;

  .slick-disabled {
    opacity: 0.4;
  }

  .slick-next {
    top: ${props =>
    numberToRem(heightObjectNumbers[props.heightSize] / 2 + 16, 1)};
    transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
    right: -2.5rem;

    &:not(.slick-disabled):hover {
      transform: scale(1.2) translateY(-50%);
    }
  }

  .slick-prev {
    top: ${props =>
    numberToRem(heightObjectNumbers[props.heightSize] / 2 + 16, 1)};
    transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
    left: -2.5rem;

    &:not(.slick-disabled):hover {
      transform: scale(1.2) translateY(-50%);
    }
  }

  .slick-next:before,
  .slick-prev:before {
    display: none;
  }

  .slick-track {
    > div {
      padding: ${numberToRem(15, 1)};
    }
  }

  &.ani {
    .item {
      opacity: 0;
      animation-fill-mode: forwards;
      animation: 0.7s showAnimation forwards;

      &.d1 {
        animation-delay: 0.3s;
      }

      &.d2 {
        animation-delay: 0.6s;
      }

      &.d3 {
        animation-delay: 0.9s;
      }

      &.d4 {
        animation-delay: 1.2s;
      }
      &.d5 {
        animation-delay: 1.5s;
      }
    }
  }

  .item {
    width: 100%;
    cursor: pointer;
    .Image {
      /* transition: transform 0.4s ease-in-out; */
      /* animation-name: outHover; */
      /* animation-duration: 0.3s; */
      /* transition: 0.25s all; */
    }

    &:hover {
      .Image {
        /* transform : scale(0.96); */

        /* animation-name: showHover;
        animation-duration: 0.3s;
        animation-fill-mode : forwards; */
        /* transform: scale(1.03); */
      }
    }

    > .testText {
      margin-top: ${numberToRem(16, 1)};

      > h2 {
        margin-top: .25rem;
        font-size: ${numberToRem(36, 1)}!important;
        line-height: 1.1em;

        &.bold {
          line-height: 1em;
          font-size: ${numberToRem(60, 1)};
        }
      }

      > p {
        word-break: break-word;
        font-size: ${numberToRem(16, 1)};
        color: #333;
      }
      
      .subTitle {
        margin-top: .4rem!important;
        display: -webkit-box;
        overflow: hidden;
        text-overflow : ellipsis;
        word-break: break-all;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

    }
    &.kor {
      > .testText {
        > h2 {
          margin-top: .5rem;
          font-size: 1.7rem!important;
          line-height: 1.15em;
        }
      }
    }
    

  }

 
`;
