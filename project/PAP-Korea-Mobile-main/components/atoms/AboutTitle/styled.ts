import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const AboutTitleStyled = styled.div`
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

  animation: 1s showAnimation forwards;
  animation-fill-mode: forwards;
  opacity: 0;
  font-size: 3.25rem;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 0.9em;
  animation-delay: 0.7s;
  padding-bottom: 7rem;
`;
