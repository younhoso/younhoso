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
  font-size: 7.5rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 0.9em;
  animation-delay: 0.7s;
  padding-bottom: 5rem;

  @media (max-width: 1600px) {
    font-size: 5rem;
  }

  @media (max-width: 1300px) {
    font-size: 3em;
  }
`;
