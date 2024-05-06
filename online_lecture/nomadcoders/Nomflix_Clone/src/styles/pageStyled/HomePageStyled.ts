'use client';

import styled from 'styled-components';

export const HomePageStyled = styled.div`
  .title-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: ${props => props.theme.fontSizes.font60};
    color: ${props => props.theme.colors.black};
    p {
      font-size: ${props => props.theme.fontSizes.font16};
    }
  }
`;

export const Banner = styled.div<{ 'data-bgphoto': string }>`
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props => props['data-bgphoto']});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 34px;
  color: #fff;
  margin-bottom: 20px;
`;

export const Overview = styled.p`
  width: 50%;
  font-size: 18px;
  color: #fff;
`;
