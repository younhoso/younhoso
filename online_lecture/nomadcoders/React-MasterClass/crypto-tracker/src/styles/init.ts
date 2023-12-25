import { memo } from "react";

import { createGlobalStyle } from "styled-components";

export const InitGlobalStyled = memo(createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
 * {
  box-sizing: border-box;
 }

 h1, h2, h3, h4, h5, h5{
  margin:0;
 }

  html,
  body {
    height:100%;
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
    background-color:${(props) => props.theme.colors.bgColor};
  }

  p {
    margin:0;
  }

  a {
    text-decoration: none;
  }

  input,
  button {
    margin:0; 
    padding:0; 
    font-family: 'Source Sans Pro', sans-serif;
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
