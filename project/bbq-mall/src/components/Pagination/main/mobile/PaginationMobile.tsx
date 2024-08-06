'use client';

import clsx from 'clsx';

import { PaginationMobileStyled } from './styled';

export interface PaginationMobileProps {
  className?: string;
}

const PaginationMobile = ({ className }: PaginationMobileProps) => {
  return (
    <PaginationMobileStyled
      className={clsx('PaginationMobile', className)}
    ></PaginationMobileStyled>
  );
};

export default PaginationMobile;
