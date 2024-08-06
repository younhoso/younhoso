'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { ButtonProps } from '@/components/Button';
import { CartMutateBody } from '@/components/ProductOptionPayInfo/main/pc/ProductOptionPayInfo';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useAddCart } from '@/hooks/useAddCart';

import { AddCartButtonStyled } from './styled';

export interface AddCartButtonProps extends Pick<ButtonProps, 'styleType' | 'size'> {
  className?: string;
  body: CartMutateBody[];
  children: ReactNode;
}

const AddCartButton = ({ className, body, children, styleType, size }: AddCartButtonProps) => {
  const { addCart, isLoading } = useAddCart(PLATFORMLIST.PC);
  return (
    <AddCartButtonStyled
      isLoading={isLoading}
      disabled={isLoading}
      className={clsx('AddCartButton', className)}
      onClick={() => addCart(body)}
      size={size}
      styleType={styleType}
    >
      {children}
    </AddCartButtonStyled>
  );
};

export default AddCartButton;
