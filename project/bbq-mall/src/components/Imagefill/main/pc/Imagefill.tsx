'use client';

import React, { ReactNode } from 'react';

import clsx from 'clsx';

import { ImagefillStyled } from './styled';

export interface ImagefillProps {
  className?: string;
  height?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Imagefill = ({ className, height, children, onClick }: ImagefillProps) => {
  return (
    <ImagefillStyled className={className} height={height} onClick={onClick}>
      {children}
    </ImagefillStyled>
  );
};

export default Imagefill;
