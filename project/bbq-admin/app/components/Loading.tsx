'use client';

import { styled } from 'styled-components';

export default async function Loading() {
  return (
    <Dimmer>
      <Loader />
    </Dimmer>
  );
}

const Dimmer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const Loader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 11;
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
