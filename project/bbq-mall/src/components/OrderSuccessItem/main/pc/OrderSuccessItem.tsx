'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { OrderSuccessItemStyled } from './styled';

export interface OrderSuccessItemProps {
  className?: string;
  label: ReactNode;
  children: ReactNode;
}

const OrderSuccessItem = ({ className, label, children }: OrderSuccessItemProps) => {
  return (
    <OrderSuccessItemStyled className={clsx('OrderSuccessItem', className)}>
      <div className="success-label">{label}</div>
      <div className="success-children">{children}</div>
    </OrderSuccessItemStyled>
  );
};

export default OrderSuccessItem;
