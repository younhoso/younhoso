'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { OrderContentTemplateStyled } from './styled';

export interface OrderContentTemplateProps {
  className?: string;
  label: ReactNode;
  children: ReactNode;
}

const OrderContentTemplate = ({ className, label, children }: OrderContentTemplateProps) => {
  return (
    <OrderContentTemplateStyled className={clsx('OrderContentTemplate', className)}>
      <div className="order-content-template-header">{label}</div>
      <div className="order-content-template-body">{children}</div>
    </OrderContentTemplateStyled>
  );
};

export default OrderContentTemplate;
