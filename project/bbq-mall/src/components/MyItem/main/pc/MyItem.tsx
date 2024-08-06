'use client';

import clsx from 'clsx';

import { MyItemStyled } from './styled';

export interface MyItemProps {
  className?: string;
}

const MyItem = ({ className }: MyItemProps) => {
  return <MyItemStyled className={clsx('MyItem', className)}></MyItemStyled>;
};

export default MyItem;
