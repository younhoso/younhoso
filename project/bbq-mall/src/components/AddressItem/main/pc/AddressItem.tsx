'use client';

import clsx from 'clsx';

import { AddressItemStyled } from './styled';

export interface AddressItemProps {
  className?: string;
}

const AddressItem = ({ className }: AddressItemProps) => {
  return <AddressItemStyled className={clsx('AddressItem', className)}></AddressItemStyled>;
};

export default AddressItem;
