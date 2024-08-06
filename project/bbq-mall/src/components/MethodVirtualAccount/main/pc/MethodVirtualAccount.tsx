'use client';

import clsx from 'clsx';

import ChangeCashReceipt from '@/components/ChangeCashReceipt';
import Divider from '@/components/Divider';
import { OrderMethodProps } from '@/components/OrderContent/OrderMethod/main/pc/OrderMethod';
import Radio from '@/components/Radio';

import { MethodVirtualAccountStyled } from './styled';

export interface MethodVirtualAccountProps extends Pick<OrderMethodProps, 'onChangeValue'> {
  className?: string;
}

const MethodVirtualAccount = ({ className, onChangeValue }: MethodVirtualAccountProps) => {
  return (
    <MethodVirtualAccountStyled className={clsx('MethodVirtualAccount', className)}>
      <Radio
        radioList={[
          { label: '가상계좌', value: 'VIRTUAL_ACCOUNT' },
          { label: '가상계좌(에스크로)', value: 'ESCROW_VIRTUAL_ACCOUNT' },
        ]}
        onChange={e => onChangeValue?.({ payType: e })}
        defaultValue="VIRTUAL_ACCOUNT"
      />
      <Divider marginTop="12px" />
      <ChangeCashReceipt onChangeValue={onChangeValue} hideRadio />
    </MethodVirtualAccountStyled>
  );
};

export default MethodVirtualAccount;
