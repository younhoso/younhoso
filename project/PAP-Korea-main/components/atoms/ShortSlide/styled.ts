import styled from 'styled-components';

interface shortSlideProps {
  activeNum: number;
}

export const ShortSlideStyled = styled.div<shortSlideProps>`
  text-transform: uppercase;
  padding: 12rem 0;

  & > .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.125rem;
    font-weight: bold;
    margin-bottom: 3rem;

    p {
      margin-left: 0.625rem;
    }
  }

  & .slide {
    height: 43rem;

    & .swiper-wrapper {
      & .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(0.9);
        transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

        /* img { */
        opacity: 0.6;
        /* } */

        &.swiper-slide-active {
          opacity: 1;
          /* img { */
          /* } */
        }

        & .item {
        }

        & .video {
          /* pointer-events: none; */

          background: black;
          position: relative;
          max-width: 21.125rem;
          overflow: hidden;
          max-height: 37.5rem;
          width: 21.125rem;
          height: 37.5rem;

          video {
            width: 100%;
            height: 100%;
          }

          > div:not(.thImage) {
            left: 50%;
            transform: translateX(-50%);
          }

          & img {
            /* filter: grayscale(1); */
            z-index: 1;
            max-width: 22rem;
            max-height: 37.5rem;
            height: 100%;
            position: absolute;
            width: 22rem;
            top: 0;
            left: 0;
            object-fit: cover;
            cursor: pointer;
          }

          & div:not(.Img) {
            position: relative;

            & iframe {
              height: 37.5rem;
              position: relative;
            }
          }
        }

        & .category {
          font-size: 0.75rem;
          margin-top: 0.7rem;
        }

        & .title {
          font-size: 1.5rem;
        }
      }
    }

    .item {
      transform: scale(1) !important;
      transition: 0.2s all;
    }

    /* ${props => `
      .shortItem_${props.activeNum - 1} {
        transform: scale(.85)!important;
      }

      .shortItem_${props.activeNum + 1} {
        transform: scale(.85)!important;
      }
    `} */

    & .swiper-slide-active {
      transform: scale(1) !important;
      .video {
        border-radius: 20px;

        .Img {
          display: none;
        }
      }
    }
  }
`;
