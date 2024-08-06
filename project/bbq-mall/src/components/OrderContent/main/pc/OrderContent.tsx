'use client';

import clsx from 'clsx';

import { OrderContentStyled } from './styled';

export interface OrderContentProps {
  className?: string;
}

const OrderContent = ({ className }: OrderContentProps) => {
  return <OrderContentStyled className={clsx('OrderContent', className)}></OrderContentStyled>;
};

export default OrderContent;
