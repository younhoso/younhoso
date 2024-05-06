'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';

export const HeaderStyled = styled.div`
  width: 100%;
  &.mainHeader {
    position: fixed;
  }
`;

export const Nav = styled(motion.nav)`
  width: 100%;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  display: flex;
  justify-content: space-between;
`;

export const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${props => props.theme.colors.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

export const Items = styled.ul`
  display: flex;
`;

export const Item = styled.li`
  margin-right: 20px;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${props => props.theme.colors.white.lighter};
  }
`;

export const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.red};
`;

export const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

export const navVariants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: '#000',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: '#fff',
  },
};
