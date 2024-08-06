import styled from 'styled-components';

export const FilmLoadCategoryStyled = styled.div`
  @keyframes load {
    0% {
      left: -20%;
    }
    100% {
      left: 120%;
    }
  }
  @keyframes load1 {
    0% {
      background: #e3e3e3;
    }
    100% {
      background: #eee;
    }
  }
  padding: 1rem 3rem;

  padding-top: 17rem;

  & div {
    overflow: hidden;
    position: relative;
    animation: load1 0.5s alternate infinite;
    height: 1.7rem;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      height: 100%;
      width: 10%;
      background: rgba(255, 255, 255, 0.5);
      left: 0;
      box-shadow: 0px 0px 20px 20px rgba(255, 255, 255, 0.5);
      animation: load 1s infinite;
    }
  }
`;
