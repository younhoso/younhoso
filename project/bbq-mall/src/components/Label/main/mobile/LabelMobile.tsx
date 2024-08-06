'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { LabelMobileStyled } from './styled';

export interface LabelMobileProps {
  className?: string;
  children: ReactNode;
}

const LabelMobile = ({ className, children }: LabelMobileProps) => {
  return (
    <LabelMobileStyled className={clsx('LabelMobile', className)}>{children}</LabelMobileStyled>
  );
};

export default LabelMobile;
