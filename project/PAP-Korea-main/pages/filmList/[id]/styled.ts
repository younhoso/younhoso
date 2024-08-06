import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

const FilmStyled = styled.div`
  @media (max-width: 500px) {
  }

  & .toastui-editor-contents {
    max-width: 1200px;
    margin: 5rem auto;
  }

  & .headerBG {
    padding: 0 1.75rem;
    position: fixed;
    height: 5rem;
    background: black;
    width: 100%;
  }

  > .wrap {
    max-width: ${props => props.theme.rap};
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  > .title {
    /* padding: 2rem; */
    padding-top: 6rem;
    padding-bottom: 2.5rem;
    line-height: 1.7em;

    h2 {
      font-size: 2.5rem;
    }

    p {
      /* font-weight: bold; */
      margin-top: 0.4rem;
    }
  }

  > .video {
    margin-bottom: 9rem;
    max-width: ${numberToRem(1400, 1)};
    height: ${numberToRem(580, 1)};
  }

  > .emptyTop {
    height: ${numberToRem(80, 1)};
  }

  > .content {
    padding-bottom: 8rem;
  }

  .en {
    font-style: italic;
  }

  > .credit {
    padding-bottom: 10rem;
    display: flex;
    justify-content: center;

    .item {
      display: flex;
      justify-content: center;
      grid-gap: 0.4rem;
      > .sub {
        display: flex;
        grid-gap: 0.4rem;
        a {
          color: orange;
          text-decoration: underline;
        }
      }
    }
  }

  & pre {
    white-space: pre-wrap;
    word-break: break-all;
    font-family: Montserrat, NotoSans;
  }
`;

export default FilmStyled;
