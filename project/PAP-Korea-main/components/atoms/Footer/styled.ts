import styled from 'styled-components';

export const FooterStyled = styled.div`
  @media screen and (min-width: 2000px) {
    .Group {
      left: calc(50% - -98px) !important;
      transform: translate(-50%) !important;
      padding: 0% !important;

      & > div {
        /* min-width: 5rem !important; */
      }
    }
  }

  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* height: calc(100vh - 6rem); */
  height: 56.25rem;
  overflow: hidden;
  transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

  & .FTop {
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 3rem;

    & p {
      cursor: pointer;
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
      left: 55.5%;
      right: auto;
      transform: translate(-50%);
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.5rem;
      letter-spacing: 5px;
      transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
      /* width: 170%; */

      & > div {
        min-width: 5rem;
        height: 2px;
        background: white;
        margin: 0 8rem;
        transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

        @media screen and (max-width: 1600px) {
          margin: 0 4rem;
        }

        @media screen and (max-width: 1300px) {
          margin: 0 1rem;
        }
      }

      & p {
        cursor: pointer;
        transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);

        &:first-child {
          text-align: right;
        }

        &:nth-child(2) {
          text-align: center;
        }

        &:last-child {
          text-align: left;
        }

        &:hover {
          letter-spacing: 20px;
        }
      }
    }
  }

  & .FBottom {
    padding: 3rem;
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
