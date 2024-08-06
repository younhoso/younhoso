'use client';

import { useEffect } from 'react';

import clsx from 'clsx';

import { DeliveryCheckProps } from '../pc/DeliveryCheck';
import { DeliveryCheckMobileStyled } from './styled';

const DeliveryCheckMobile = ({
  className,
  activeOrderOption,
  resetClaimType,
}: DeliveryCheckProps) => {
  useEffect(() => {
    window.open(activeOrderOption.delivery.retrieveInvoiceUrl);
    resetClaimType();
  }, []);
  return (
    <DeliveryCheckMobileStyled
      className={clsx('DeliveryCheckMobile', className)}
    ></DeliveryCheckMobileStyled>
  );
};

export default DeliveryCheckMobile;
