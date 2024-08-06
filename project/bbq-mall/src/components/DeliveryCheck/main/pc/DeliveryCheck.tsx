'use client';

import { useEffect } from 'react';

import clsx from 'clsx';

import { OrderOption } from '@/types/orderHistoryRelated';

import { DeliveryCheckStyled } from './styled';

export interface DeliveryCheckProps {
  className?: string;
  resetClaimType: () => void;
  activeOrderOption: OrderOption;
}

const DeliveryCheck = ({ className, activeOrderOption, resetClaimType }: DeliveryCheckProps) => {
  useEffect(() => {
    window.open(activeOrderOption.delivery.retrieveInvoiceUrl);
    resetClaimType();
  }, []);

  return <DeliveryCheckStyled className={clsx('DeliveryCheck', className)}></DeliveryCheckStyled>;
};

export default DeliveryCheck;
