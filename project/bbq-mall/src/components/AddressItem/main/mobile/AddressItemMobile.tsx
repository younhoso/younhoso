'use client';

import Image from 'next/image';

import clsx from 'clsx';

import pencil from '@/assets/images/my/pencil.svg';
import { YES } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import Checkbox from '@/components/Checkbox';
import { Address } from '@/types';

import { AddressItemMobileStyled } from './styled';

export interface AddressItemMobileProps {
  className?: string;
  onClickCheckbox: (e: boolean) => void;
  data: Address;
  onClickModify?: () => void;
  checked?: boolean;
}

const AddressItemMobile = ({
  className,
  onClickCheckbox,
  data,
  onClickModify,
  checked,
}: AddressItemMobileProps) => {
  return (
    <AddressItemMobileStyled className={clsx('AddressItemMobile', className)}>
      <Checkbox
        checked={checked ?? data.defaultYn === YES}
        onChange={e => onClickCheckbox(e.target.checked)}
      />
      <div className="address-content">
        <p>{data.receiverAddress}</p>
        <p>{data.receiverDetailAddress}</p>
        <p className="contact">
          {data.receiverName} | {data.receiverContact1}
        </p>
      </div>
      {onClickModify && (
        <Image
          onClick={onClickModify}
          className="modify-icon"
          src={pencil}
          width={26}
          height={26}
          alt="modify"
        />
      )}
    </AddressItemMobileStyled>
  );
};

export default AddressItemMobile;
