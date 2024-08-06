import styled from 'styled-components';

export const CategoryInfoVisualStyled = styled.div`
  text-transform: uppercase;

  & .visual {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    display: flex;
    height: 60rem;
    align-items: center;
    background: black;
    width: 100%;

    & .opacityOverlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      z-index: 1;
      pointer-events: none;
    }

    & img {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;

      &.back {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(10px);
        opacity: 0;
        transition: 0.3s all;
        transform: scale(1.1);

        &.show {
          opacity: 0.5;
        }
      }
    }

    & .slideImg {
      transform: scale(0.75);
      width: 100%;
      height: 100%;
      position: absolute;
    }

    & .slick-slider {
      height: 5rem;
    }

    & > div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      & .swiper {
        height: 100%;
        width: 100%;
      }

      & .bar {
        position: absolute;
        z-index: 3;
        width: 100%;
        transform: scale(0.75);
        bottom: 3rem;
        font-size: 1.75rem;
        font-weight: bold;
        font-family: Montserrat;
        /* font-family: Mada; */
        color: white;

        p {
          transform: translateY(-1rem);
        }

        & .progressbar {
          background: #a89e9e;
          height: 5px;
          border-radius: 25px;
          overflow: hidden;
          margin-top: 0.2rem;

          & .now {
            height: 100%;
            border-radius: 25px;
            background: white;
            transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
          }
        }
      }
    }
  }
`;
