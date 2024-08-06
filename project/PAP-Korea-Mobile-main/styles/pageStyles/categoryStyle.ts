import styled from 'styled-components';

export const CategoryStyle = styled.div`
  @media (max-width: 500px) {
  }
  > .CategoryTitle {
    /* padding-top: 15rem; */
    padding-bottom: 1rem;
  }

  .CategoryList {
    &:nth-child(2) {
      .list {
        padding-top: 15rem;
      }
    }
  }

  &.searchPadding {
   .CategoryList {
      &:nth-child(2) {
        .list {
          padding-top: 7rem;
        }
      }
    }
  }

  .comming {
    padding-top: 0!important;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
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
