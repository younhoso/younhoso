import styled from 'styled-components';

export const EventBannerStyled = styled.div`
  @keyframes showText {
    0% {
      opacity: 0;
      transform: translate(0%, 100%);
    }
    100% {
      opacity: 1;
      transform: translate(0%);
    }
  }
  overflow: hidden;
  width: 100vw;
  height: 56.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Montserrat;
  /* font-family: Mada; */
  color: white;
  position: relative;

  & h2 {
    font-size: 3.5rem;
    letter-spacing: 3px;
    z-index: 1;
  }

  & p {
    font-family: Montserrat;
    /* font-family: NotoSans; */
    font-size: 1.25rem;
    z-index: 1;
  }

  & .background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    left: 0;
    top: 0;
    background: black;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & .contentInfo {
    &.ani {
      opacity: 0;
      animation-fill-mode: forwards;
      animation: showText 1.5s forwards;
    }
  }
`;
