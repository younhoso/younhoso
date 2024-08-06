'use client';

import clsx from 'clsx';

import { SpinnerMobileStyled } from './styled';

export interface SpinnerMobileProps {
  className?: string;
}

const SpinnerMobile = ({ className }: SpinnerMobileProps) => {
  return <SpinnerMobileStyled className={clsx('SpinnerMobile', className)}></SpinnerMobileStyled>;
};

export default SpinnerMobile;
