'use client';

import clsx from 'clsx';

import { AddressListMobileStyled } from './styled';

export interface AddressListMobileProps {
  className?: string;
}

const AddressListMobile = ({ className }: AddressListMobileProps) => {
  return (
    <AddressListMobileStyled
      className={clsx('AddressListMobile', className)}
    ></AddressListMobileStyled>
  );
};

export default AddressListMobile;
