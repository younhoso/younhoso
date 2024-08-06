import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const VisualStyled = styled.div<{ theme?: string }>`
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

  & pre {
    white-space: pre-wrap;
    word-break: break-all;
    font-family: Montserrat, NotoSans;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  width: 100vw;
  height: 100vh;
  background-color: black;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 4.125rem;
  overflow: hidden;
  cursor: none;
  text-transform: uppercase;

  & > .VisualLogo {
    z-index: 1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;

    &.hidden {
      display: none;
    }
  }

  .test {
    color: white;
    display: flex;
    justify-content: space-between;
    align-content: flex-end;
    margin-bottom: 5rem;

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;

      .leftShowEvent {
        animation-fill-mode: forwards;
        animation: 1s showAnimation forwards;
      }

      p {
        font-size: 1.25rem;
      }

      h2 {
        font-size: 4rem;
      }
    }

    .right {
      display: flex;
      align-items: center;
      text-align: right;
      font-size: 0.9125rem;
      /* padding-bottom: 0.8rem; */

      .rightShowEvent {
        animation-fill-mode: forwards;
        animation: 1s showAnimation forwards;
      }
    }
  }

  .goHeader {
    top: 2.5rem !important;
    left: 50% !important;
    transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
    transform: translate(-45%, -50%);
    z-index: 99;
    opacity: 1;
    visibility: visible;
    cursor: pointer;

    &.logoHide {
      opacity: 0;
      visibility: hidden;
    }
  }
`;
