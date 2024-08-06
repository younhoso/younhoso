import styled from 'styled-components';

export const LoadingPageStyled = styled.div`
  @keyframes open {
    0% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }

  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  visibility: hidden;
  transition: 0.4s all;
  transform: scale(1.1);

  & .svg {
    position: absolute;
    z-index: 9;
  }

  & .item {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    &.show {
      opacity: 1;
    }
  }

  &.active {
    opacity: 1;
    visibility: visible;
    animation: 0.4s open;
    transform: scale(1);

    &.end {
    }
  }
`;
