'use client';

import { ReactNode, useEffect, useState } from 'react';

import clsx from 'clsx';

import Divider from '@/components/Divider';
import Input from '@/components/Input';
import { changedToPhoneNumberRegex } from '@/utils/changedToPhoneNumberRegex';

import { OrderBuyerProps, emailInfo } from '../pc/OrderBuyer';
import { OrderBuyerMobileStyled } from './styled';

export interface OrderBuyerMobileProps {
  className?: string;
}

const OrderBuyerMobile = ({
  className,
  contact,
  isSignIn,
  onChange,
  onChangePassword,
  hasEmail,
}: OrderBuyerProps) => {
  return (
    <OrderBuyerMobileStyled title="주문자 정보" className={clsx('OrderBuyerMobile', className)}>
      <form>
        <div className="order-buyer-item">
          <div className={clsx('order-buyer-item-label', !isSignIn && 'line-height-needed')}>
            보내는 분
          </div>
          {isSignIn ? (
            <div className="order-buyer-item-value">{contact?.ordererName}</div>
          ) : (
            <Input.Mobile
              placeholder="홍길동"
              value={contact?.ordererName ?? ''}
              onChange={e => onChange({ ordererName: e.target.value })}
            />
          )}
        </div>

        <div className="order-buyer-item">
          <div className={clsx('order-buyer-item-label', !isSignIn && 'line-height-needed')}>
            휴대폰 번호
          </div>
          {isSignIn ? (
            <div className="order-buyer-item-value">{contact?.ordererContact1}</div>
          ) : (
            <Input.Mobile
              value={contact?.ordererContact1 ?? ''}
              placeholder="010-0000-0000"
              maxLength={13}
              onPaste={e => e.preventDefault()}
              onChange={e =>
                onChange({ ordererContact1: changedToPhoneNumberRegex(e.target.value) })
              }
            />
          )}
        </div>

        <div className="order-buyer-item">
          <div
            className={clsx(
              'order-buyer-item-label',
              (!isSignIn || !hasEmail) && 'line-height-needed',
            )}
          >
            이메일
          </div>
          {isSignIn && hasEmail ? (
            <div className="order-buyer-item-value">{contact?.ordererEmail}</div>
          ) : (
            <Input.Mobile
              placeholder="bbq@bbq.com"
              value={contact?.ordererEmail ?? ''}
              onChange={e => onChange({ ordererEmail: e.target.value })}
            />
          )}
        </div>

        <div className="email-info">
          <p>{emailInfo[0]}</p>
          <p>{emailInfo[1]}</p>
        </div>
        {!isSignIn && (
          <>
            <Divider />
            <input autoComplete="username" hidden />
            <div className="order-buyer-item">
              <div className={clsx('order-buyer-item-label', 'line-height-needed')}>
                주문 비밀번호
              </div>
              <Input.Mobile
                type="password"
                autoComplete="new-password"
                onChange={e => onChangePassword({ password: e.target.value })}
              />
            </div>
            <div className="order-buyer-item">
              <div className={clsx('order-buyer-item-label', 'line-height-needed')}>
                비밀번호 확인
              </div>
              <Input.Mobile
                type="password"
                autoComplete="new-password"
                onChange={e => onChangePassword({ confirm: e.target.value })}
              />
            </div>
          </>
        )}
      </form>
    </OrderBuyerMobileStyled>
  );
};

export default OrderBuyerMobile;
