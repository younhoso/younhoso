'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { WrapperMobileStyled } from './styled';

export interface WrapperMobileProps {
  className?: string;
  children: ReactNode | undefined;
}

const WrapperMobile = ({ className, children }: WrapperMobileProps) => {
  return (
    <WrapperMobileStyled className={clsx('WrapperMobile', className)}>
      {children}
    </WrapperMobileStyled>
  );
};

export default WrapperMobile;
