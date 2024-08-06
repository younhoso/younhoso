import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const NewsSlideStyled = styled.div`
  margin-top: ${numberToRem(100, 1)};
  margin-bottom: ${numberToRem(200, 1)};

  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  > .MainSlide {
    max-width: 100vw;
  }

  .topItem {
    .swiper {
      padding-bottom: 3rem;
    }

    .testText {
      p:first-child {
        /* margin-top: 1rem; */
      }
    }
  }

  /* .slick-next,
  .slick-prev {
    opacity: 0;
    visibility: hidden;
  }

  &:hover {
    .slick-next,
    .slick-prev {
      opacity: 1;
      visibility: visible;
      &.slick-disabled {
        opacity: 0.4;
      }
    }
  } */

  &.slick-disabled {
    opacity: 0.4;
  }
`;
