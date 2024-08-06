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
  padding: 15rem 6rem 0 40%;
  overflow: hidden;
  position: relative;

  & pre {
    white-space: pre-wrap;
    word-break: break-all;
    font-family: Montserrat, NotoSans;
  }

  .contentGroup {
    max-width: 80%;
  }

  .contactAni {
    & > pre,
    & > .content {
      opacity: 0;
    }

    & .show {
      animation: 0.8s contactAni forwards;
      animation-fill-mode: forwards;
    }

    &.d1 {
      & .show {
        animation-delay: 0.3s;
      }
    }

    &.load {
      & .show {
        animation-delay: 0.7s;
      }
    }
  }

  .contactAniOri {
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
      margin-top: 8rem;
      font-size: 1.25rem;
      letter-spacing: 2px;
      line-height: 1.5em;
      position: relative;

      @media (max-width: 1600px) {
        font-size: 1rem;
        margin-top: 5rem;
      }

      @media (max-width: 1300px) {
        font-size: 0.5rem;
      }

      &.business {
        text-transform: uppercase;
        line-height: 1.25em;
        margin-top: 0rem;

        & .AboutTitle {
          margin-bottom: 8rem;

          @media (max-width: 1600px) {
            margin-bottom: 5rem;
          }
        }

        & .tar:not(.AboutTitle) {
          padding-bottom: ${numberToRem(512, 1)};
          & .AboutTitle {
            margin-top: 8rem;

            &.tar {
              margin-top: ${numberToRem(400, 1)};
              /* margin-top: 25rem; */
            }
          }
        }
      }

      &.about,
      &.business {
        & .scroll1 {
          opacity: 1;
          visibility: visible;
          transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
          position: absolute;

          &.up {
            transform: translateY(-30%);
            opacity: 0;
            visibility: hidden;
          }
        }

        & .scroll2 {
          opacity: 1;
          visibility: visible;
          transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
          position: absolute;

          &.down {
            transform: translateY(30%);
            opacity: 0;
            visibility: hidden;
          }

          &.title2 {
            text-align: right;
          }
        }
      }

      &.contact {
        display: flex;
        align-items: center;

        & > div {
          font-family: Montserrat;
          /* font-family: mono; */

          &:first-child {
            margin-right: 10rem;
          }

          & .Mail {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .bcontents {
    margin-bottom: 5rem;
  }

  & .contacButtonDiv {
    width: 6.25rem;
    height: 6.25rem;
    cursor: pointer;
    transition: 0.2s all;
    float: right;
    margin-top: -6rem;

    &.FROMButton {
      margin-top: -1rem;
    }

    &:hover {
      transform: scale(0.85);
    }

    &.down {
      float: left;
      margin-top: -2.5rem;
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
      width: 5rem;
      font-size: 0.75rem;
      font-weight: bold;
      writing-mode: vertical-rl;
      font-family: Montserrat;
      /* font-family: GmarketSans; */
    }
  }
`;
