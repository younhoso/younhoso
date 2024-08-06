'use client';

import React, { ReactNode } from 'react';

import { WrapperStyled } from './styled';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return <WrapperStyled>{children}</WrapperStyled>;
};

export default Wrapper;
