'use client';

import clsx from 'clsx';

import { AddressModifyModalMobileStyled } from './styled';

export interface AddressModifyModalMobileProps {
  className?: string;
}

const AddressModifyModalMobile = ({ className }: AddressModifyModalMobileProps) => {
  return (
    <AddressModifyModalMobileStyled
      className={clsx('AddressModifyModalMobile', className)}
    ></AddressModifyModalMobileStyled>
  );
};

export default AddressModifyModalMobile;
