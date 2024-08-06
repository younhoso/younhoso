import styled from 'styled-components';

export const FilmCategoryListStyled = styled.div`
  .categoryFilterlist {
    display: flex;
    justify-content: center;
    padding: 1rem 3rem;
    grid-gap: 0.6rem;

    &:hover {
      p {
        opacity: 0.4;
      }
    }

    p {
      cursor: pointer;
      font-size: 1.4rem;
      transition: 0.2s transform, 0.4s opacity;

      &:hover {
        opacity: 1;
        font-weight: bold;
      }

      &.active {
        font-weight: bold;
      }
    }
  }
`;
