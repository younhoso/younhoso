import styled from 'styled-components';

export const FilmLoadFormStyled = styled.div`
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
  padding: 2rem;
  margin-top: -1rem;

  & .LoadItem {
    margin: 2rem 1rem;
    width: calc(100% - 2rem);

    & > div {
      overflow: hidden;
      position: relative;

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

    & .Loadimg {
      height: 21rem;
      background: #ddd;
      animation: load1 0.5s alternate infinite;
    }

    & .LoadDate {
      margin-top: 0.5rem;
      height: 1rem;
      background: #ddd;
      animation: load1 0.5s alternate infinite;
    }

    & .LoadTitle {
      margin-top: 0.5rem;
      height: 1.8rem;
      background: #ddd;
      animation: load1 0.5s alternate infinite;
    }
  }
`;
