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
    width: 80%;
    max-height: 250px;
    padding: 1.75rem 2.5rem;
    z-index: -1;
    border-radius: 0 0 25px 25px;
    transition: 0.3s all;
    font-size: 1.5rem;

    & > div {
      overflow: auto;
      transition: 0.3s all;

      max-height: calc(250px - 4rem);

      & > div {
        padding: 0.5rem 0;
        cursor: pointer;
        color: gray;
        transition: 0.3s all;
        /* font-weight: bold; */

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
