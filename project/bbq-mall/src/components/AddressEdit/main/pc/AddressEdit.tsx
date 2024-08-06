'use client';

import clsx from 'clsx';

import { AddressEditStyled } from './styled';

export interface AddressEditProps {
  className?: string;
}

const AddressEdit = ({ className }: AddressEditProps) => {
  return <AddressEditStyled className={clsx('AddressEdit', className)}></AddressEditStyled>;
};

export default AddressEdit;
