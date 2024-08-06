'use client';

import clsx from 'clsx';

import ChangeCashReceipt from '@/components/ChangeCashReceipt';
import Divider from '@/components/Divider';
import { OrderMethodProps } from '@/components/OrderContent/OrderMethod/main/pc/OrderMethod';
import Radio from '@/components/Radio';

import { MethodRealtimeAccountStyled } from './styled';

export interface MethodRealtimeAccountProps extends Pick<OrderMethodProps, 'onChangeValue'> {
  className?: string;
}

const MethodRealtimeAccount = ({ className, onChangeValue }: MethodRealtimeAccountProps) => {
  return (
    <MethodRealtimeAccountStyled className={clsx('MethodRealtimeAccount', className)}>
      <Radio
        radioList={[
          { label: '실시간계좌이체', value: 'REALTIME_ACCOUNT_TRANSFER' },
          { label: '실시간계좌이체(에스크로)', value: 'ESCROW_REALTIME_ACCOUNT_TRANSFER' },
        ]}
        onChange={e => onChangeValue?.({ payType: e })}
        defaultValue="REALTIME_ACCOUNT_TRANSFER"
      />
      <Divider marginTop="12px" />
      <ChangeCashReceipt onChangeValue={onChangeValue} hideRadio />
    </MethodRealtimeAccountStyled>
  );
};

export default MethodRealtimeAccount;
