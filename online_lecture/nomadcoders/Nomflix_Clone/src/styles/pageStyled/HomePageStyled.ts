'use client';

import { motion } from 'framer-motion';
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

export const Slider = styled.div`
  position: relative;
  top: 0;
`;

export const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  bottom: 0;
`;

export const Box = styled(motion.div)<{ 'data-bgphoto': string }>`
  height: 200px;
  font-size: 66px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(${props => props['data-bgphoto']});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const Info = styled(motion.div)`
  padding: 10px;
  color: ${props => props.theme.colors.white.lighter};
  background-color: ${props => props.theme.colors.black.lighter};
  position: absolute;
  width: 100%;
  bottom: 0;
  opacity: 0;
  h4 {
    font-size: ${props => props.theme.fontSizes.font18};
    font-weight: ${props => props.theme.fontWeight.medium};
    text-align: center;
  }
`;
