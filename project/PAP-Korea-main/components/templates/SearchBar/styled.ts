import styled from 'styled-components';

export const SearchBarStyled = styled.div`
  .SearchClose {
    opacity: 0;
  }

  input {
    opacity: 0;
  }

  .autocomplete {
    position: absolute;
    top: 100%;
    background: white;
    width: calc(50% - 10.5rem);
    max-height: 500px;
    padding: 1.75rem 2.5rem;
    z-index: -1;
    border-radius: 0 0 25px 25px;
    transition: 0.3s all;

    & > div {
      overflow: auto;
      transition: 0.3s all;

      max-height: calc(500px - 4rem);

      & > div {
        padding: 0.875rem 0;
        font-size: 1.1rem;
        cursor: pointer;
        color: gray;
        transition: 0.3s all;

        > span {
          font-weight: bold;
          /* color: white; */
          /* background: black; */
        }

        &:first-child {
          padding-top: 0rem;
        }
        &:last-child {
          padding-bottom: 0rem;
        }

        &:hover {
          color: black;
        }
      }
    }
  }
`;
