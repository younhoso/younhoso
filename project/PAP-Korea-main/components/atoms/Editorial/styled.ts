import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const EditorialStyled = styled.div`
  padding-top: ${numberToRem(100, 1)};
  padding-bottom: ${numberToRem(200, 1)};

  > .editorialSlide {
    display: flex;
    justify-content: center;
    margin-top: 4rem;

    &.bottom {
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

      .slick-slide {
        /* &:nth-child(odd) {
          transform: ${`translateY(${numberToRem(-20, 1)})`};
        }

        &:nth-child(even) {
          transform: ${`translateY(${numberToRem(20, 1)})`};
        } */
      }
    }
  }

  .MainSlide {
    max-width: ${props => `calc(${props.theme.rap} + ${numberToRem(100, 1)})`};
    width: 100%;
  }
`;
