'use client';

import clsx from 'clsx';

import Input from '@/components/Input';
import Select from '@/components/Select';

import { MethodAccountProps } from '../pc/MethodAccount';
import { MethodAccountMobileStyled } from './styled';

const MethodAccountMobile = ({ className, onChangeValue, tradeBank }: MethodAccountProps) => {
  return (
    <MethodAccountMobileStyled className={clsx('MethodAccountMobile', className)}>
      <div className="change-bank">
        <Select.Mobile
          placeholder="은행을 선택해주세요"
          optionList={tradeBank?.map(v => ({
            label: v.bankName,
            value: v.bankAccount,
            suffix: v.bankAccount,
          }))}
          onChange={e => {
            const item = tradeBank?.find(v => v.bankAccount === e);
            onChangeValue?.({ bankAccountToDeposit: item });
          }}
        />
        <Input.Mobile
          placeholder="입금자명을 입력해주세요"
          onChange={e => onChangeValue?.({ remitter: e.target.value })}
        />
      </div>
      {/* <Divider marginTop="0" marginBottom="0" />
      <ChangeCashReceipt.Mobile onChangeValue={onChangeValue} /> */}
    </MethodAccountMobileStyled>
  );
};

export default MethodAccountMobile;
