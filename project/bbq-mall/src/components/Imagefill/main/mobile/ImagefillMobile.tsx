'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { ImagefillMobileStyled } from './styled';

export interface ImagefillMobileProps {
  className?: string;
  height?: string;
  children: ReactNode;
  onClick?: () => void;
}

const ImagefillMobile = ({ height, className, children, onClick }: ImagefillMobileProps) => {
  return (
    <ImagefillMobileStyled
      className={clsx('ImagefillMobile', className)}
      height={height}
      onClick={onClick}
    >
      {children}
    </ImagefillMobileStyled>
  );
};

export default ImagefillMobile;
