import styled from 'styled-components';

export const AboutLeftItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  left: 6rem;

  & .more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 25px;
    border: 1px solid white;
    transition: 0.5s all cubic-bezier(0.8, -0.25, 0.25, 1.8);
    cursor: pointer;
    z-index: 999;
    background: black;

    & > div {
      margin: 0 0.15rem;
      width: 3px;
      height: 3px;
      background: white;
      border-radius: 25px;
    }

    &.open {
      transform: rotate(-90deg);
    }
  }

  & .businessMenus {
    transform: translate(0%, -20%);
    opacity: 0;
    transition: 0.5s all cubic-bezier(0.8, -0.25, 0.25, 1.8);

    visibility: hidden;

    &.open {
      transform: translate(0, 0%);
      opacity: 1;
      visibility: visible;
    }

    & p {
      opacity: 0.3;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
      text-transform: uppercase;
      font-size: 1.5rem;
      margin: 2rem 0;
      transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

      &:hover {
        opacity: 0.7;
      }

      &.active {
        opacity: 1;
      }
    }
  }
`;
