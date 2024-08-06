import styled from 'styled-components';

export const FooterStyled = styled.div`
  position: relative;
  z-index: 1;

  @media screen and (min-width: 2000px) {
    .Group {
      left: 50% !important;

      & > div {
        min-width: 5rem !important;
      }
    }
  }

  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* height: calc(100vh - 6rem); */
  height: 50rem;
  overflow: hidden;
  transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

  & .FTop {
    font-size: 1.25rem;
    display: flex;
    justify-content: space-between;
    padding: 2rem;

    & p {
      cursor: pointer;
    }

    & > div {
      text-align: right;
    }
  }

  & .FCenter {
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .Group {
      left: 50%;
      transform: translate(-50%);
      position: absolute;
      align-items: center;
      font-size: 4rem;
      padding-bottom: 3rem;
      transition: 0.3s all;

      & > div {
        min-width: 4rem;
        height: 2px;
        background: white;
        margin: 0 8rem;
        transition: 0.3s all;

        /* @media screen and (max-width: 1600px) {
          margin: 0 4rem;
        }

        @media screen and (max-width: 1300px) {
          margin: 0 1rem;
        } */
      }

      & p {
        width: 100%;
        cursor: pointer;
        min-width: 25rem;
        max-width: 25rem;
        transition: 0.3s all;

        &:first-child {
          /* text-align: right; */
          /* padding-right: 2rem; */
        }

        &:nth-child(2) {
          /* min-width: 28rem; */
          /* max-width: 28rem; */
        }

        &:last-child {
          /* text-align: left; */
          /* padding-left: 2rem; */
        }

        &:hover {
          letter-spacing: 5px;
        }
      }
    }
  }

  & .cpinfo {
  }

  & .FBottom {
    padding: 2.5rem;
    text-align: center;

    & .cpinfo {
      color: #767676;
      font-size: 85%;
    }

    & .TOS {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      & p {
        cursor: pointer;

        &:last-child {
          margin-left: 5rem;
        }
      }
    }
  }
`;
