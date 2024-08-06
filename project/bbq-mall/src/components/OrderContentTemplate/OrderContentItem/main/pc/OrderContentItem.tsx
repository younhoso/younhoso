'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { OrderContentItemStyled } from './styled';

export interface OrderContentItemProps {
  className?: string;
  label: ReactNode;
  children: ReactNode;
  alignCenter?: boolean;
  labelWidth?: string;
}

const OrderContentItem = ({
  className,
  label,
  children,
  alignCenter,
  labelWidth = '136px',
}: OrderContentItemProps) => {
  return (
    <OrderContentItemStyled
      className={clsx('OrderContentItem', className, alignCenter && 'align-center')}
      $labelWidth={labelWidth}
    >
      <div>{label}</div>
      <div>{children}</div>
    </OrderContentItemStyled>
  );
};

export default OrderContentItem;
