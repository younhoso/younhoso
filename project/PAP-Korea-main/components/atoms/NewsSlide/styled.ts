import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const NewsSlideStyled = styled.div`
  margin-top: ${numberToRem(100, 1)};
  margin-bottom: ${numberToRem(200, 1)};

  position: relative;
  display: flex;
  justify-content: center;

  > .MainSlide {
    max-width: ${props => `calc(${props.theme.rap} + ${numberToRem(100, 1)})`};
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
