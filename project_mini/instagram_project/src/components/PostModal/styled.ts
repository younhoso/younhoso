"use client";

import styled from "styled-components";

export const PostModalStyled = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: flex;
    top: 40px;
    right: 40px;
    padding: 8px;
    position: absolute;
    color: #fff;
    font-size: 30px;
    z-index: 10;
  }

  .contents {
    background-color: #fff;
    width: 60%;
  }
`;
