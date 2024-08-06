'use client';

import clsx from 'clsx';

import { OrderSuccessItemMobileStyled } from './styled';

export interface OrderSuccessItemMobileProps {
  className?: string;
}

const OrderSuccessItemMobile = ({ className }: OrderSuccessItemMobileProps) => {
  return (
    <OrderSuccessItemMobileStyled
      className={clsx('OrderSuccessItemMobile', className)}
    ></OrderSuccessItemMobileStyled>
  );
};

export default OrderSuccessItemMobile;
