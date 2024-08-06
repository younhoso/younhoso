import styled from 'styled-components';

export const CategoryInfoContentsStyled = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap');
  position: relative;
  z-index: 1;
  padding: 0 2rem 16rem 2rem;
  -webkit-text-size-adjust: 100%;

  .en {
    font-style: italic;
  }

  .postContent {
  }

  & > div {
    padding: 2rem 0;
    font-size: 1.75rem !important;
    word-break: keep-all;
    font-weight: bold;
    letter-spacing: 2px;
  }

  & .title {
    font-family: Nunito, 'NotoSans';
    /* padding-left: 2rem; */
    text-transform: uppercase;
    /* margin-top: 1rem; */
    font-weight: bold;
    line-height: 0.9;
    -webkit-text-stroke: 3px black;
    margin-bottom: 6rem;

    /* & .titleText {
      width: 100%;
      letter-spacing: 3px;
      font-size: 5rem;
    } */

    & .titleContent {
      font-size: 3rem;
      font-weight: 500;
    }

    & .subTitle {
      letter-spacing: 1.5px;
      -webkit-text-stroke: 1px black;
      font-size: 1rem;
      margin-top: 1rem;
      font-weight: 400;
    }
  }

  &.korTitle {
    .title {
      line-height: 1;

      & .titleContent {
        -webkit-text-stroke: 0px black;
        font-weight: 700;
      }
    }
  }

  & .content {
    font-weight: normal;

    > .postContent {
      &:first-child {
        margin-bottom: 6rem;
      }
    }

    & > div {
      /* padding: 1rem 0; */
      font-size: 1.3rem;
    }
  }

  & .sponserContent {
    display: flex;
    font-size: 1.5rem;
    padding: 0.5rem 0;

    p {
      display: block;
      min-width: 11rem;
      max-width: 11rem;
    }

    div {
      display: flex;
      flex-wrap: wrap;
    }
  }

  & .filmLink {
    font-weight: bold;
    text-align: center;
    padding: 2rem;
    font-size: 1.5rem;
    transition: 0.5s all;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }

    & p {
      letter-spacing: -1.1px;
      display: inline;

      & svg {
        margin-bottom: -0.2rem;
        margin-right: 0.5rem;
      }
    }
  }
`;
