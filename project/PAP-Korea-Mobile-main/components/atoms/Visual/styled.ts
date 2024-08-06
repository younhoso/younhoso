import styled from 'styled-components';

export const VisualStyled = styled.div<{ theme?: string }>`
  @keyframes left {
    0% {
      transform: translate(-54rem, -50%);
    }

    100% {
      transform: translate(-89rem, -50%);
    }
  }

  @keyframes right {
    0% {
      transform: translate(-89rem, -50%);
    }

    100% {
      transform: translate(-54rem, -50%);
    }
  }
  width: 100vw;
  text-transform: uppercase;
  background-color: black;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  padding: 10rem 7rem 0rem 7rem;
  overflow: hidden;
  color: white;
  text-align: center;

  & .transformImg {
    z-index: 1;
  }

  & .contents {
    padding: 2rem;

    & h1 {
      font-size: 2.5rem;
      line-height: 1;
    }
    & p {
      margin-top: 0.4rem;
      /* font-size: .5em; */
      font-size: 1.2rem;
      padding-bottom: 1rem;
    }
  }

  & .backText {
    font-family: Mada !important;
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(0, -50%);
    font-size: 7rem;
    white-space: nowrap;
    font-weight: bold;
    font-family: Montserrat;
    /* font-family: Mada; */
    /* animation: 4.5s right infinite linear forwards; */
    text-transform: uppercase;

    &.bt1 {
      top: 40% !important;
    }

    &.bt2 {
      top: 60% !important;
    }

    &.Top {
      /* animation: 4.5s left infinite linear forwards; */
      color: rgba(0, 0, 0, 0);
      -webkit-text-stroke: 1px white;
      z-index: 2;
      pointer-events: none;
    }
  }

  img {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;
