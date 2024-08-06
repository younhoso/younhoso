import styled from 'styled-components';

export const CategoryStyle = styled.div`
  @media (max-width: 500px) {
  }

  .comming {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
  }

  > .CategoryTitle {
    padding-bottom: 1rem;
  }

  > .FilmList {
    /* padding-top: 8rem; */
  }

  > .infoText {
    text-align : center;
    padding: 20rem 0;

    h2 {
      font-size: 3rem;
    }
  }
`;
