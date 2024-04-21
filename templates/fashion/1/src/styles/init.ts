import { memo } from 'react';

import { createGlobalStyle } from 'styled-components';

export const InitGlobalStyled = memo(createGlobalStyle`
 * {
  box-sizing: border-box;
  letter-spacing: -0.02em;
 }

 h1, h2, h3, h4, h5, h6{
  margin:0;
 }

  html,
  body {
    height:100%;
    padding: 0;
    margin: 0;
  }

  p {
    margin:0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  textarea{
    font-family: inherit;
  }

  input,
  button {
    margin:0; 
    padding:0; 
    font-family: inherit;
    border: 0; 
    outline: none;
  }
  
  button{
    background-color: transparent;
  }

  ul,
  li,
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a,
  button {
    &:hover {
      outline:none;
      box-shadow: none;
      text-decoration:none; 
    }
    &:active {
      outline:none;
      box-shadow: none;
      text-decoration:none; 
    }
    &:focus { 
      outline:none;
      box-shadow: none;
      text-decoration:none; 
    }
  }
`);
