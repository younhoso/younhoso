import styled from 'styled-components';

export const CategoryInfoContentsStyled = styled.div`
  margin-top: 8rem;
  & div {
    padding: 0 25% 0 25%;
    text-align: center;
    word-break: keep-all;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .postContent {
    &.en {
      font-style: italic;
    }

    &:not(:first-child) {
      margin-top: 8rem;
    }
    font-weight: normal;
  }

  & .filmLink {
    font-weight : bold;
    text-align: center;
    /* padding: 2rem; */
    font-size: 1.5rem;
    transition: 0.5s all;
    cursor : pointer;

    &:hover {
      opacity: .5;
    }

    & p {
      letter-spacing : -1.1px;
      display: inline;

      /* & svg {
        margin-bottom: -0.2rem;
        margin-right: 0.5rem;
      } */
    }
  }
`;
