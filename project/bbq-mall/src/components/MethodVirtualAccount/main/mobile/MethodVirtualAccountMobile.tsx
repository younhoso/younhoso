'use client';

import clsx from 'clsx';

import ChangeCashReceipt from '@/components/ChangeCashReceipt';
import Divider from '@/components/Divider';
import Radio from '@/components/Radio';

import { MethodVirtualAccountProps } from '../pc/MethodVirtualAccount';
import { MethodVirtualAccountMobileStyled } from './styled';

const MethodVirtualAccountMobile = ({ className, onChangeValue }: MethodVirtualAccountProps) => {
  return (
    <MethodVirtualAccountMobileStyled className={clsx('MethodVirtualAccountMobile', className)}>
      <div className="virtual-radio-wrapper">
        <Radio.Mobile
          radioList={[
            { label: '가상계좌', value: 'VIRTUAL_ACCOUNT' },
            { label: '가상계좌(에스크로)', value: 'ESCROW_VIRTUAL_ACCOUNT' },
          ]}
          onChange={e => onChangeValue?.({ payType: e })}
          defaultValue="VIRTUAL_ACCOUNT"
        />
      </div>
      <Divider marginTop="0" marginBottom="0" />
      <ChangeCashReceipt.Mobile onChangeValue={onChangeValue} hideRadio />
    </MethodVirtualAccountMobileStyled>
  );
};

export default MethodVirtualAccountMobile;
