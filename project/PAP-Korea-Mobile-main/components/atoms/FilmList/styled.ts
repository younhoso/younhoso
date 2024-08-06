import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const FilmListStyled = styled.div`
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
    align-items: center;
    flex-wrap: wrap;

    & .item {
    }
  }
`;
