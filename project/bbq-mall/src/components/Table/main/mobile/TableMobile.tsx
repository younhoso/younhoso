'use client';

import clsx from 'clsx';

import { TableMobileStyled } from './styled';

export interface TableMobileProps {
  className?: string;
}

const TableMobile = ({ className }: TableMobileProps) => {
  return <TableMobileStyled className={clsx('TableMobile', className)}></TableMobileStyled>;
};

export default TableMobile;
