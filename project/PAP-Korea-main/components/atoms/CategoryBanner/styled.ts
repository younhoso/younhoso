import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const CategoryBannerStyled = styled.div`
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
  width: 100%;
  height: ${numberToRem(900, 1)};
  background: black;

  position: relative;

  animation: 0.7s showAnimation forwards;
  animation-fill-mode: forwards;

  img {
    opacity: 0.7;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    p {
      font-size: ${numberToRem(60, 1)};
      font-weight: bold;
      color: white;
    }
  }
`;
