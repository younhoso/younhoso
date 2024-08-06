import styled from 'styled-components';

export const CategoryTitleStyled = styled.div`
  font-size: 4rem;
  color: white;
  background: black;
  text-transform: uppercase;
  text-align: center;
  font-family: Mada;
  /* font-family : Montserrat; */
  -webkit-text-stroke: 1px white;
  position: relative;
  letter-spacing: 2px;
  position: fixed;
  background: black;
  height: 6rem;
  width: 100%;
  top: 7rem;
  z-index: 1;

  h3 {
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%);
  }

  & span {
    color: black;
    margin: 0 1rem;
    white-space: nowrap;

    &.center {
      color: white;
    }
  }
`;
