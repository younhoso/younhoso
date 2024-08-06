'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import Checkbox from '@/components/Checkbox';
import { useHandleCheckbox } from '@/hooks/useHandleCheckbox';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import {
  handle개인정보수집및이용,
  handle개인정보제공동의,
  handle이용약관,
} from '@/hooks/useHandleWebview';

import { OrderTermsStyled } from './styled';

export interface OrderTermsProps {
  className?: string;
  onChangeCheckAll?: (v: boolean) => void;
}

export const _termCheckList = [
  { label: '(필수) 쇼핑몰 이용 약관', value: 1, onClick: handle이용약관, user: false },
  {
    label: '(필수) 개인정보 수집 및 이용',
    value: 2,
    onClick: handle개인정보수집및이용,
    user: false,
  },
  {
    label: '(필수) 개인정보 제3자 제공 동의',
    value: 3,
    onClick: handle개인정보제공동의,
    user: true,
  },
];

const OrderTerms = ({ className, onChangeCheckAll }: OrderTermsProps) => {
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const [termCheckList, setTermCheckList] = useState<typeof _termCheckList>([]);
  const { indeterminate, checkAll, onClickCheckAll, onChangeCheckbox, checkedList } =
    useHandleCheckbox(termCheckList);

  useEffect(() => {
    onChangeCheckAll?.(checkAll);
  }, [checkAll]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    setTermCheckList(isSignIn ? _termCheckList.filter(v => v.user) : _termCheckList);
  }, [isLoading, isSignIn]);

  return (
    <OrderTermsStyled className={clsx('OrderTerms', className)}>
      <div className="order-terms-header">
        <Checkbox
          label="주문 정보를 모두 확인하였으며, 약관 전체에 동의합니다."
          indeterminate={indeterminate}
          onChange={onClickCheckAll}
          checked={checkAll}
        />
      </div>
      <div className="order-terms-body">
        {termCheckList.map(v => (
          <div key={v.value}>
            <Checkbox
              onChange={() => onChangeCheckbox(v.value)}
              checked={checkedList.includes(v.value)}
              label={v.label}
            />
            <div className="checkbox-show" onClick={v.onClick}>
              보기
            </div>
          </div>
        ))}
      </div>
    </OrderTermsStyled>
  );
};

export default OrderTerms;
