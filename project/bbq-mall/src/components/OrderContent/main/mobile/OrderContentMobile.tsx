'use client';

import clsx from 'clsx';

import { OrderContentMobileStyled } from './styled';

export interface OrderContentMobileProps {
  className?: string;
}

const OrderContentMobile = ({ className }: OrderContentMobileProps) => {
  return (
    <OrderContentMobileStyled
      className={clsx('OrderContentMobile', className)}
    ></OrderContentMobileStyled>
  );
};

export default OrderContentMobile;
