'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import Checkbox from '@/components/Checkbox';
import { useHandleCheckbox } from '@/hooks/useHandleCheckbox';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';

import { OrderTermsProps, _termCheckList } from '../pc/OrderTerms';
import { OrderTermsMobileStyled } from './styled';

const OrderTermsMobile = ({ className, onChangeCheckAll }: OrderTermsProps) => {
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
    <OrderTermsMobileStyled className={clsx('OrderTermsMobile', className)}>
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
    </OrderTermsMobileStyled>
  );
};

export default OrderTermsMobile;
