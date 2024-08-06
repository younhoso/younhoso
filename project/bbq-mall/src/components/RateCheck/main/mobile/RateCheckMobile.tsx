'use client';

import clsx from 'clsx';

import { RateCheckMobileStyled } from './styled';

export interface RateCheckMobileProps {
  className?: string;
}

const RateCheckMobile = ({ className }: RateCheckMobileProps) => {
  return (
    <RateCheckMobileStyled className={clsx('RateCheckMobile', className)}></RateCheckMobileStyled>
  );
};

export default RateCheckMobile;
