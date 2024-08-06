'use client';

import styled, { keyframes } from 'styled-components';

import { SpinnerProps } from './Spinner';

const rotate = keyframes`
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const SpinnerStyled = styled.div<Required<Pick<SpinnerProps, 'size'>>>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.grayada};
  position: relative;

  .white {
    position: absolute;
    background-color: white;
    width: ${props => props.size * 0.7}px;
    height: ${props => props.size * 0.7}px;
    border-radius: 50%;
    top: ${props => props.size * 0.15}px;
    left: ${props => props.size * 0.15}px;
  }

  > img {
    animation: ${rotate} 1s linear infinite;
  }
`;
