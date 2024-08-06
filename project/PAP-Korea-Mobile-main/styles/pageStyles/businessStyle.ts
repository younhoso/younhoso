import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const BusinessStyle = styled.div`
  @keyframes contactAni {
    0% {
      opacity: 0;
      transform: ${`translateY(${numberToRem(100, 1)})`};
    }

    100% {
      opacity: 1;
      transform: ${`translateY(${numberToRem(0, 1)})`};
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  background: black;
  min-height: 100vh;
  color: white;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15rem 3rem 7rem;
  overflow: hidden;
  position: relative;
  word-break: keep-all;

  & pre {
    white-space: pre-wrap;
    word-break: break-all;
    font-family: Montserrat, NotoSans;
  }

  .contactAni {
    opacity: 0;
    animation: 0.8s contactAni forwards;
    animation-fill-mode: forwards;

    &.d1 {
      animation-delay: 0.3s;
    }

    &.load {
      animation-delay: 0.7s;
    }
  }

  & .AboutBody {
    width: 100%;

    & .tar {
      text-align: right;
      right: 0;
    }

    & .content {
      font-size: 1.3rem;
      letter-spacing: 1px;
      line-height: 1.5em;
      position: relative;

      &.business {
        text-transform: uppercase;
        line-height: 1.25em;

        & .tar:not(.AboutTitle) {
          padding-bottom: 4rem;
          & .AboutTitle {
            &.tar {
              margin-top: 15rem;
            }
          }
        }
      }

      &.contact {
        align-items: center;

        & > div {
          font-family: Montserrat;
          /* font-family: mono; */

          &:first-child {
            margin-bottom: 8rem;
          }

          & .Mail {
            text-decoration: underline;
          }
        }
      }
    }
  }

  & .contacButtonDiv {
    width: 8rem;
    height: 8rem;
    cursor: pointer;
    transition: 0.2s all;
    margin-left: calc(100% - 8rem);
    margin-top: 8rem;

    &.down {
      margin-left: 0;
    }

    &:hover {
      transform: scale(0.85);
    }
  }

  & .contactButton {
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    display: flex;
    border-radius: 2000px;
    background: white;
    color: black;
    transform-origin: center;
    animation: rotate 10s infinite linear;
    transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

    &:hover {
      animation-play-state: paused;
    }

    & p {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 7rem;
      font-size: 1rem;
      font-weight: bold;
      writing-mode: vertical-rl;
      font-family: Montserrat;
      /* font-family: GmarketSans; */
    }
  }
`;
