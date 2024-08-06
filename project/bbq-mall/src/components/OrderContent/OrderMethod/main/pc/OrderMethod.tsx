'use client';

import { ReactNode, useMemo, useState } from 'react';

import axios from 'axios';
import clsx from 'clsx';
import { isEqual } from 'lodash';

import Button from '@/components/Button';
import MethodAccount from '@/components/MethodAccount';
import MethodRealtimeAccount from '@/components/MethodRealtimeAccount';
import MethodSimple from '@/components/MethodSimple';
import MethodVirtualAccount from '@/components/MethodVirtualAccount';
import OrderContentTemplate from '@/components/OrderContentTemplate';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';
import { OrderSheet, PayType, PaymentBody } from '@/types';
import { ArrayElement } from '@/types/arrayElement';

import { OrderMethodStyled } from './styled';

export interface OrderMethodProps {
  className?: string;
  types: PayType[];
  onChange?: (v: PayType['payType']) => void;
  onChangeValue?: (v: Partial<PaymentBody>) => void;
  tradeBank: OrderSheet['tradeBankAccountInfos'];
}

export type ExtractedPayType = Extract<
  PayType['payType'],
  'ACCOUNT' | 'REALTIME_ACCOUNT_TRANSFER' | 'VIRTUAL_ACCOUNT' | 'KAKAO_PAY'
>;
export const hsaItemKeys: ExtractedPayType[] = [
  'ACCOUNT',
  'REALTIME_ACCOUNT_TRANSFER',
  'VIRTUAL_ACCOUNT',
  'KAKAO_PAY',
];

const OrderMethod = ({
  className,
  types,
  onChange,
  onChangeValue,
  tradeBank,
}: OrderMethodProps) => {
  const [active, setActive] = useState<PayType>(types[0]);

  const methodBy = useMemo(
    () => ({
      ACCOUNT: <MethodAccount onChangeValue={onChangeValue} tradeBank={tradeBank} />,
      REALTIME_ACCOUNT_TRANSFER: <MethodRealtimeAccount onChangeValue={onChangeValue} />,
      VIRTUAL_ACCOUNT: <MethodVirtualAccount onChangeValue={onChangeValue} />,
      KAKAO_PAY: <MethodSimple onChangeValue={onChangeValue} />,
    }),
    [onChangeValue, tradeBank],
  ) as Record<ArrayElement<typeof hsaItemKeys>, ReactNode>;

  const hasItem = hsaItemKeys.includes(active.payType as ExtractedPayType);

  return (
    <OrderMethodStyled className={clsx('OrderMethod', className)}>
      <OrderContentTemplate label="결제수단" className={clsx(hasItem && 'no-border-bottom')}>
        <OrderContentItem label="결제수단 선택" alignCenter>
          <div className="order-method-children">
            {[
              ...types.filter(
                v => !v.payType.includes('ESCROW') && !['KAKAO_PAY', 'PAYCO'].includes(v.payType),
              ),
              {
                payType: 'KAKAO_PAY' as const,
                payTypeLabel: '간편결제',
                pgTypes: 'KAKAO_PAY' as const,
              },
            ].map(v => (
              <Button
                size="small"
                key={v.payType}
                onClick={() => {
                  setActive(v);
                  onChange?.(v.payType);
                }}
                {...(isEqual(active, v) && { styleType: 'sub' })}
              >
                {v.payTypeLabel}
              </Button>
            ))}
          </div>
        </OrderContentItem>
      </OrderContentTemplate>
      {hasItem && methodBy[active.payType as ExtractedPayType]}
    </OrderMethodStyled>
  );
};

export default OrderMethod;
