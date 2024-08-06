import { createGlobalStyle } from 'styled-components';

export const GlobalStyled = createGlobalStyle`
  * {
    -webkit-text-size-adjust: 100%!important;
    outline: none;
    box-sizing: border-box;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
    margin: 0;
    padding: 0;
    -webkit-user-drag: none;
    /* scroll-behavior: smooth; */
  }

  *::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
  }
  
  *::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 10px;
  }

  a {
    cursor: pointer;
  }

  input,
  textarea {
    user-select: initial;
  }

  html {
    overflow-x: hidden;
  }

  body {
    font-weight: 500;
    margin: 0;
    padding: 0;
    width: 100vw;
    min-width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  html, body {
    font-size: 16px;
  }

  @media (max-width: 1600px) {
    html, body {
      font-size: 14px;
    }
  }

  @media (max-width: 1200px) {
    html, body {
      font-size: 12px;
    }
  }

  @media (max-width: 1000px) {
    html, body {
      font-size: 10px;
    }
  }

  @media (max-width: 400px) {
    html, body {
      font-size: 9px;
    }
  }

  @media (max-width: 340px) {
    html, body {
      font-size: 7px;
    }
  }

  button {
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    background: inherit;
    border: inherit;
    color: inherit;
  }

  ul, 
  li {
    list-style: none;
  }

  a {
    text-decoration: inherit;
    color: inherit;
  }

  .hidden {
    display: none;
  }
`;
