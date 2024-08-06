'use client';

import clsx from 'clsx';

import { HelpItemStyled } from './styled';

export interface HelpItemProps {
  className?: string;
}

const HelpItem = ({ className }: HelpItemProps) => {
  return <HelpItemStyled className={clsx('HelpItem', className)}></HelpItemStyled>;
};

export default HelpItem;
