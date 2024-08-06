'use client';

import clsx from 'clsx';

import { ToTopStyled } from './styled';

export interface ToTopProps {
  className?: string;
}

const ToTop = ({ className }: ToTopProps) => {
  return <ToTopStyled className={clsx('ToTop', className)}></ToTopStyled>;
};

export default ToTop;
