'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { NodataStyled } from './styled';

export interface NodataProps {
  className?: string;
  children: ReactNode;
}

const Nodata = ({ className, children }: NodataProps) => {
  return <NodataStyled className={clsx('Nodata', className)}>{children}</NodataStyled>;
};

export default Nodata;
