'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { NodataMobileStyled } from './styled';

export interface NodataMobileProps {
  className?: string;
  children: ReactNode;
}

const NodataMobile = ({ className, children }: NodataMobileProps) => {
  return (
    <NodataMobileStyled className={clsx('NodataMobile', className)}>{children}</NodataMobileStyled>
  );
};

export default NodataMobile;
