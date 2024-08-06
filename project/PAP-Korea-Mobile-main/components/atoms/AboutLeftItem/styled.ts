import styled from 'styled-components';

export const AboutLeftItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-direction: column; */
  position: fixed;
  bottom: 0;
  padding: 1rem 2rem;
  left: 0;
  width: 100%;
  z-index: 3;
  background: transparent;
  transition: 0.5s all;

  &.open {
    background: black;
  }

  & .more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: 25px;
    border: 1px solid white;
    transition: 0.5s all cubic-bezier(0.8, -0.25, 0.25, 1.8);
    cursor: pointer;
    z-index: 999;
    background: black;
    transform: rotate(-90deg);

    & > div {
      margin: 0 0.15rem;
      width: 3px;
      height: 3px;
      background: white;
      border-radius: 25px;
    }

    &.open {
      transform: rotate(0);
    }
  }

  & .businessMenus {
    margin-left: 3.5rem;
    display: flex;
    transform: translate(-20%, 0%);
    opacity: 0;
    transition: 0.5s all cubic-bezier(0.8, -0.25, 0.25, 1.8);
    background: black;
    visibility: hidden;
    flex-direction: row-reverse;

    &.open {
      transform: translate(0, 0%);
      opacity: 1;
      visibility: visible;
    }

    & p {
      opacity: 0.3;
      /* writing-mode: vertical-lr; */
      /* transform: rotate(180deg); */
      text-transform: uppercase;
      font-size: 1.75rem;
      margin: 2rem 0.75rem;
      transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
      -webkit-text-stroke: 1px white;

      &:hover {
        opacity: 0.7;
      }

      &.active {
        opacity: 1;
      }
    }
  }
`;
