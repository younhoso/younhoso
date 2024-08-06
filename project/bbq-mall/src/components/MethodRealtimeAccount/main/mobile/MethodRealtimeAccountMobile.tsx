'use client';

import clsx from 'clsx';

import ChangeCashReceipt from '@/components/ChangeCashReceipt';
import Divider from '@/components/Divider';
import Radio from '@/components/Radio';

import { MethodRealtimeAccountProps } from '../pc/MethodRealtimeAccount';
import { MethodRealtimeAccountMobileStyled } from './styled';

const MethodRealtimeAccountMobile = ({ className, onChangeValue }: MethodRealtimeAccountProps) => {
  return (
    <MethodRealtimeAccountMobileStyled className={clsx('MethodRealtimeAccountMobile', className)}>
      <div className="realtime-radio-wrapper">
        <Radio.Mobile
          radioList={[
            { label: '실시간계좌이체', value: 'REALTIME_ACCOUNT_TRANSFER' },
            { label: '실시간계좌이체(에스크로)', value: 'ESCROW_REALTIME_ACCOUNT_TRANSFER' },
          ]}
          onChange={e => onChangeValue?.({ payType: e })}
          defaultValue="REALTIME_ACCOUNT_TRANSFER"
        />
      </div>
      <Divider marginTop="0" marginBottom="0" />
      <ChangeCashReceipt.Mobile onChangeValue={onChangeValue} hideRadio />
    </MethodRealtimeAccountMobileStyled>
  );
};

export default MethodRealtimeAccountMobile;
