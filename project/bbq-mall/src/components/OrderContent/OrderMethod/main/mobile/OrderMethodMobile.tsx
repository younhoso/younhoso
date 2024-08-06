'use client';

import { ReactNode, useMemo, useState } from 'react';

import clsx from 'clsx';
import { isEqual } from 'lodash';

import Button from '@/components/Button';
import MethodAccount from '@/components/MethodAccount';
import MethodRealtimeAccount from '@/components/MethodRealtimeAccount';
import MethodSimple from '@/components/MethodSimple';
import MethodVirtualAccount from '@/components/MethodVirtualAccount';
import { PayType } from '@/types';
import { ArrayElement } from '@/types/arrayElement';

import { ExtractedPayType, OrderMethodProps, hsaItemKeys } from '../pc/OrderMethod';
import { OrderMethodMobileStyled } from './styled';

const OrderMethodMobile = ({
  className,
  types,
  onChange,
  onChangeValue,
  tradeBank,
}: OrderMethodProps) => {
  const [active, setActive] = useState<PayType>(types[0]);
  const methodBy = useMemo(
    () => ({
      ACCOUNT: <MethodAccount.Mobile onChangeValue={onChangeValue} tradeBank={tradeBank} />,
      REALTIME_ACCOUNT_TRANSFER: <MethodRealtimeAccount.Mobile onChangeValue={onChangeValue} />,
      VIRTUAL_ACCOUNT: <MethodVirtualAccount.Mobile onChangeValue={onChangeValue} />,
      KAKAO_PAY: <MethodSimple.Mobile onChangeValue={onChangeValue} />,
    }),
    [onChangeValue, tradeBank],
  ) as Record<ArrayElement<typeof hsaItemKeys>, ReactNode>;

  const hasItem = hsaItemKeys.includes(active.payType as ExtractedPayType);

  return (
    <OrderMethodMobileStyled title="결제수단" className={clsx('OrderMethodMobile', className)}>
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
      {hasItem && methodBy[active.payType as ExtractedPayType]}
    </OrderMethodMobileStyled>
  );
};

export default OrderMethodMobile;
