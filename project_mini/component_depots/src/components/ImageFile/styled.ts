'use client';

import styled from 'styled-components';

export const ImageFileStyled = styled.div`
  input {
    visibility: hidden;
    position: absolute;
  }
  .label {
    width: 240px;
    height: 160px;
    border-radius: 20px;
    overflow: hidden;
    display: block;
    border: 1px dashed ${props => props.theme.colors.gray4e4};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
