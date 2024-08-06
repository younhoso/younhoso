'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { OrderContentItemMobileStyled } from './styled';

export interface OrderContentItemMobileProps {
  className?: string;
  title: string;
  children: ReactNode;
}

const OrderContentItemMobile = ({ className, title, children }: OrderContentItemMobileProps) => {
  return (
    <OrderContentItemMobileStyled className={clsx('OrderContentItemMobile', className)}>
      <div>{title}</div>
      <div>{children}</div>
    </OrderContentItemMobileStyled>
  );
};

export default OrderContentItemMobile;
