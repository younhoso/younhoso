'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { LabelStyled } from './styled';

export interface LabelProps {
  className?: string;
  children: ReactNode;
}

const Label = ({ className, children }: LabelProps) => {
  return <LabelStyled className={clsx('Label', className)}>{children}</LabelStyled>;
};

export default Label;
