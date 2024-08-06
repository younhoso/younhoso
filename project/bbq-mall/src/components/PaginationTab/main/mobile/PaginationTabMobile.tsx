'use client';

import clsx from 'clsx';

import { PaginationTabMobileStyled } from './styled';

export interface PaginationTabMobileProps {
  className?: string;
}

const PaginationTabMobile = ({ className }: PaginationTabMobileProps) => {
  return (
    <PaginationTabMobileStyled
      className={clsx('PaginationTabMobile', className)}
    ></PaginationTabMobileStyled>
  );
};

export default PaginationTabMobile;
