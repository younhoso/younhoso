import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

const FilmStyled = styled.div`
  & .toastui-editor-contents {
    max-width: 1200px;
    margin: 5rem auto;
  }

  > .wrap {
    max-width: ${props => props.theme.rap};
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  > .title {
    padding: 2rem;
    padding-top: 6rem;
    line-height: 1.7em;

    h2 {
      font-size: 2rem;
    }

    p {
      margin-top: 0.4rem;
      font-size: 1.2rem;
    }
  }

  > .video {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-bottom: 9rem;

    max-width: ${numberToRem(1400, 1)};
    height: ${numberToRem(400, 1)};
  }

  > .emptyTop {
    height: ${numberToRem(112, 1)};
  }

  > .content {
    padding: 0 3rem;
    padding-bottom: 10rem;
  }

  .en {
    font-style: italic;
  }

  > .credit {
    display: flex;
    justify-content: flex-start;
    padding: 0 2rem 10rem 2rem;

    .item {
      font-size: 1.5rem;
      display: flex;
      justify-content: flex-start;
      grid-gap: 0.4rem;
      white-space: nowrap;
      margin-bottom: 1rem;

      & > p {
        min-width: 12rem;
        max-width: 12rem;
        word-break: keep-all;
        text-align: left;
        white-space: normal;
      }

      > .sub {
        display: flex;
        flex-wrap: wrap;
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
    padding: 0 1rem;
    font-size: 1rem;
  }
`;

export default FilmStyled;
