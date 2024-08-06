'use client';

import clsx from 'clsx';

import { OrderContentTemplateMobileStyled } from './styled';

export interface OrderContentTemplateMobileProps {
  className?: string;
}

const OrderContentTemplateMobile = ({ className }: OrderContentTemplateMobileProps) => {
  return (
    <OrderContentTemplateMobileStyled
      className={clsx('OrderContentTemplateMobile', className)}
    ></OrderContentTemplateMobileStyled>
  );
};

export default OrderContentTemplateMobile;
