'use client';

import clsx from 'clsx';

import { MyCategoryMobileStyled } from './styled';

export interface MyCategoryMobileProps {
  className?: string;
}

const MyCategoryMobile = ({ className }: MyCategoryMobileProps) => {
  return (
    <MyCategoryMobileStyled
      className={clsx('MyCategoryMobile', className)}
    ></MyCategoryMobileStyled>
  );
};

export default MyCategoryMobile;
