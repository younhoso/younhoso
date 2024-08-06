'use client';

import clsx from 'clsx';

import Input from '@/components/Input';
import { OrderMethodProps } from '@/components/OrderContent/OrderMethod/main/pc/OrderMethod';
import Select from '@/components/Select';

import { MethodAccountStyled } from './styled';

export interface MethodAccountProps extends Pick<OrderMethodProps, 'onChangeValue' | 'tradeBank'> {
  className?: string;
}

const MethodAccount = ({ className, onChangeValue, tradeBank }: MethodAccountProps) => {
  return (
    <MethodAccountStyled className={clsx('MethodAccount', className)}>
      <div className="change-bank">
        <Select
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
        <Input
          placeholder="입금자명을 입력해주세요"
          onChange={e => onChangeValue?.({ remitter: e.target.value })}
        />
      </div>
      {/* <Divider marginTop="25px" />
      <ChangeCashReceipt onChangeValue={onChangeValue} /> */}
    </MethodAccountStyled>
  );
};

export default MethodAccount;
