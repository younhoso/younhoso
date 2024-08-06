'use client';

import clsx from 'clsx';

import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useAddCart } from '@/hooks/useAddCart';

import { AddCartButtonProps } from '../pc/AddCartButton';
import { AddCartButtonMobileStyled } from './styled';

const AddCartButtonMobile = ({
  className,
  body,
  children,
  styleType,
  size,
}: AddCartButtonProps) => {
  const { addCart, isLoading } = useAddCart(PLATFORMLIST.MOBILE_WEB);

  return (
    <AddCartButtonMobileStyled
      className={clsx('AddCartButtonMobile', className)}
      isLoading={isLoading}
      disabled={isLoading}
      onClick={() => addCart(body)}
      size={size}
      styleType={styleType}
    >
      {children}
    </AddCartButtonMobileStyled>
  );
};

export default AddCartButtonMobile;
