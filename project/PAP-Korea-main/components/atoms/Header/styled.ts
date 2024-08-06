import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const HeaderStyled = styled.div`
  @keyframes open1 {
    0% {
      top: 0%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    40%,
    60% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    100% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  @keyframes open2 {
    0%,
    39% {
      opacity: 1;
    }
    40%,
    100% {
      opacity: 0;
    }
  }

  @keyframes open3 {
    0% {
      top: 100%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    40%,
    60% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    100% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  @keyframes close1 {
    0% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      background-color: black;
    }

    40%,
    60% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: black;
    }

    100% {
      top: 0%;
      transform: translate(-50%, -50%);
      background-color: white;
      left: 50%;
    }
  }

  @keyframes close2 {
    0%,
    39% {
      opacity: 0;
    }
    40%,
    100% {
      opacity: 1;
    }
  }

  @keyframes close3 {
    0% {
      background-color: black;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    40%,
    60% {
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      background-color: black;
    }

    100% {
      transform: translate(-50%, -50%);
      background-color: white;
      top: 100%;
      left: 50%;
    }
  }

  @keyframes hover1 {
    0% {
      width: 0%;
      left: 0%;
    }

    100% {
      width: 100%;
    }
  }

  @keyframes hover2 {
    0% {
      width: 100%;
      left: 0%;
    }

    100% {
      left: 100%;
      width: 0%;
    }
  }
  padding: 0 1.75rem;
  position: fixed;
  height: 5rem;
  width: 100%;
  z-index: 2;
  transition: 0.3s background, 0.3s opacity, 0.3s visibility;
  background: black;

  &.importantBlack {
    background: black !important;
  }

  &.transparent {
    background: transparent;
  }

  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
    visibility: visible;
    opacity: 1;

    &.hide {
      opacity: 0;
      visibility: hidden;
    }

    &.SearchOn {
      transform: scale(1.1);
      opacity: 0;
      visibility: hidden;
    }

    & .menu {
      position: relative;
      width: 2.7rem;
      height: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      z-index: 999999;
      cursor: pointer;

      & > div {
        position: absolute;
        width: 100%;
        height: 4px;
        background: white;
        border-radius: 25px;

        &:nth-child(1) {
          transform-origin: center;
          top: 0;
        }

        &:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }

        &:nth-child(3) {
          transform-origin: center;
          bottom: 0;
        }
      }
    }

    & .search {
      cursor: pointer;
    }

    & > div {
      cursor: pointer;
    }
  }

  & .searchBar {
    top: 0;
    left: 0;
    padding: 1rem 4.125rem;
    background: black;
    opacity: 0;
    transform: scale(0.8);
    visibility: hidden;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

    &.SearchOn {
      transform: scale(1);
      opacity: 1;
      visibility: visible;
      z-index: 9999999;
    }

    & > form {
      padding: 0.5rem 1rem;
      width: calc(50% - 6rem);
      display: flex;
      align-items: center;
      height: 100%;
      background: white;
      border-radius: 25px;

      & > input {
        width: 100%;
        margin: 0 1rem;
        height: 100%;
        background: none;
        border: none;
        font-size: 1.25rem;
        color: black;
        text-transform: uppercase;
        /* border-bottom: 1px solid white; */
      }
    }

    & .SearchClose {
      width: 2rem;
      height: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      cursor: pointer;
      position: relative;

      div {
        width: 100%;
        height: 4px;
        background: black;
        border-radius: 25px;
        position: absolute;
        top: 50%;
        left: 50%;

        &:first-child {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        &:last-child {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
  }

  & .searchBackground {
    position: fixed;
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

    &.SearchOn {
      opacity: 1;
      visibility: visible;
    }
  }

  .openMenu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: white;
    z-index: 999999;
    visibility: hidden;
    transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
    padding: 7rem 4.125rem 4.125rem 4.125rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    & .left,
    & .right {
      text-transform: uppercase;
      font-weight: bold;
      font-family: Montserrat;
      /* font-family: Mada; */
      transition: 0.5s all cubic-bezier(0.42, 0, 0.3, 1.7);
      opacity: 0;

      & .list {
        & div {
          display: flex;

          p {
            position: relative;
            display: table;
            padding-left: 0.3rem;
          }
        }
      }
    }

    & .left {
      font-weight: 500;
      font-size: 3rem;
      letter-spacing: 2.5px;
      transform: translate(-20%, 0);

      & p {
        transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
        padding-right: 0.3rem;
      }
    }

    & .right {
      font-size: 5rem;
      letter-spacing: 5px;
      transform: translate(20%, 0);

      & .list {
        & div {
          justify-content: flex-end;
        }
      }

      & p {
        &:before {
          content: '';
          transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
          position: absolute;
          animation: hover2 0.3s;
          top: 0;
          left: 100%;
          background: black;
          width: 0%;
          height: 100%;
          z-index: -1;
        }
      }
    }

    @media (max-width: 1300px) {
      .right {
        font-size: 4.5rem;
      }
    }

    @media (max-width: 1920px) {
      .right {
        font-size: 5rem;
      }
    }
  }

  &.close {
    & .menu {
      div {
        &:first-child {
          animation: 0.5s close1;
        }
        &:nth-child(2) {
          animation: 0.5s close2;
        }
        &:nth-child(3) {
          animation: 0.5s close3;
        }
      }
    }
  }

  &.open {
    & .menu {
      div {
        background: black;

        &:first-child {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          animation: 0.5s open1;
        }
        &:nth-child(2) {
          opacity: 0;
          animation: 0.5s open2;
        }
        &:nth-child(3) {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          animation: 0.5s open3;
        }
      }
    }

    & .openMenu {
      visibility: visible;
      opacity: 1;

      & .left,
      & .right {
        transform: translate(0%);
        opacity: 1;
      }

      & .left {
        p:hover {
          letter-spacing: 10px;
        }
      }

      & .right {
        p:hover {
          color: white;

          &:before {
            left: 0%;
            animation: hover1 0.3s;
            width: 100%;
          }
        }
      }
    }
  }
  .IconsMenus {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    .snsList {
      display: flex;
      visibility: hidden;
      overflow: hidden;
      transform: translate(-50%, 0%);
      margin-left: 2rem;
      transition: 0.5s all cubic-bezier(0.8, -0.25, 0.25, 1.8);
      opacity: 0;

      .Img {
        width: ${numberToRem(45, 1)};
        height: ${numberToRem(45, 1)};
        border-radius: ${numberToRem(8, 1)};
        margin-left: 1rem;
      }

      &.open {
        transform: translate(0, 0%);
        opacity: 1;
        visibility: visible;
      }
    }

    .menuListsBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid black;
      border-radius: 1000rem;
      width: ${numberToRem(55, 1)};
      height: ${numberToRem(55, 1)};
      cursor: pointer;
      transition: 0.5s all cubic-bezier(0.8, -0.25, 0.25, 1.8);
      z-index: 10;
      background: white;

      &.open {
        transform: rotate(90deg);
      }

      > div {
        background: black;
        width: ${numberToRem(5, 1)};
        border-radius: 1000rem;
        height: ${numberToRem(5, 1)};

        &:not(:last-child) {
          margin-right: ${numberToRem(6, 1)};
        }
      }
    }
  }
`;
