import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const SearchListStyled = styled.div`
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

  > .title {
    margin-top: 15rem;
    text-align: center;
    text-transform: uppercase;

    p {
      font-size: 2.5rem;
      font-weight: bold;

      span {
        font-size: 1.5rem;
      }
    }
  }

  padding: 2rem;
  & .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 2rem !important;

    & .item {
      > h2 {
        margin-top: 0.25rem;
        line-height: 1em;
        font-size: 2.25rem !important;
      }

      > p {
        margin-top: 0.6rem;
        word-break: break-word;
        font-size: ${numberToRem(16, 1)};
        color: #333;
      }
    }
  }
`;
