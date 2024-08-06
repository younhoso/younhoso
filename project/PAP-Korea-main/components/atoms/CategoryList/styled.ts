import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const CategoryListStyled = styled.div`
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

  padding: 2rem;

  & .list {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    & .item {

      .categoryAndDate {
        font-weight: normal;
        font-size: ${numberToRem(14, 1)};
        
      }
    }
  }
`;
