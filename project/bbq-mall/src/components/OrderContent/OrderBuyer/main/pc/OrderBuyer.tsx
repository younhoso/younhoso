'use client';

import clsx from 'clsx';

import Divider from '@/components/Divider';
import Input from '@/components/Input';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';
import { OrderSheet } from '@/types';
import { changedToPhoneNumberRegex } from '@/utils/changedToPhoneNumberRegex';

import { OrderBuyerStyled } from './styled';

export interface OrderBuyerProps {
  className?: string;
  contact: OrderSheet['ordererContact'] | undefined;
  isSignIn?: boolean;
  onChange: (v: Partial<OrderSheet['ordererContact']>) => void;
  onChangePassword: (v: Partial<{ password: string; confirm: string }>) => void;
  hasEmail: boolean;
}

export const emailInfo = [
  '이메일을 통해 주문처리과정을 보내드립니다.',
  '정보변경은 마이페이지 > 내정보 메뉴에서 수정 가능합니다.',
];

const OrderBuyer = ({
  className,
  contact,
  isSignIn,
  onChange,
  onChangePassword,
  hasEmail,
}: OrderBuyerProps) => {
  return (
    <OrderBuyerStyled label="주문자 정보" className={clsx('OrderBuyer', className)}>
      <OrderContentItem label="보내는 분" alignCenter={!isSignIn}>
        {isSignIn ? (
          contact?.ordererName
        ) : (
          <Input
            placeholder="홍길동"
            value={contact?.ordererName ?? ''}
            onChange={e => onChange({ ordererName: e.target.value })}
          />
        )}
      </OrderContentItem>
      <OrderContentItem label="휴대폰 번호" alignCenter={!isSignIn}>
        {isSignIn ? (
          contact?.ordererContact1
        ) : (
          <Input
            value={contact?.ordererContact1 ?? ''}
            placeholder="010-0000-0000"
            maxLength={13}
            onPaste={e => e.preventDefault()}
            onChange={e => onChange({ ordererContact1: changedToPhoneNumberRegex(e.target.value) })}
          />
        )}
      </OrderContentItem>
      <OrderContentItem
        label="이메일"
        className="content-email"
        alignCenter={!isSignIn || !hasEmail}
      >
        {isSignIn && hasEmail ? (
          contact?.ordererEmail
        ) : (
          <Input
            placeholder="bbq@bbq.com"
            value={contact?.ordererEmail ?? ''}
            onChange={e => onChange({ ordererEmail: e.target.value })}
          />
        )}
        <p>{emailInfo[0]}</p>
        <p>{emailInfo[1]}</p>
      </OrderContentItem>
      {!isSignIn && (
        <form>
          <Divider />
          <input autoComplete="username" hidden />
          <OrderContentItem label="주문 비밀번호" alignCenter>
            <Input
              type="password"
              autoComplete="new-password"
              onChange={e => onChangePassword({ password: e.target.value })}
            />
          </OrderContentItem>
          <OrderContentItem label="주문 비밀번호 확인" alignCenter>
            <Input
              type="password"
              autoComplete="new-password"
              onChange={e => onChangePassword({ confirm: e.target.value })}
            />
          </OrderContentItem>
        </form>
      )}
    </OrderBuyerStyled>
  );
};

export default OrderBuyer;
