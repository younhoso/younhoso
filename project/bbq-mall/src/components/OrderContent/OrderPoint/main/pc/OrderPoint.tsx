'use client';

import clsx from 'clsx';
import { constSelector } from 'recoil';

import Button from '@/components/Button';
import Input from '@/components/Input';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';

import { OrderPointStyled } from './styled';

export interface OrderPointProps {
  className?: string;
  point: number | undefined;
  usedPoint: number;
  onChangeUsed: (v: number) => void;
  max: number | undefined;
}

const OrderPoint = ({
  className,
  point = 0,
  usedPoint,
  onChangeUsed,
  max = 0,
}: OrderPointProps) => {
  const canUsedMax = point > max ? max : point;

  return (
    <OrderPointStyled
      label={
        <OrderContentItem label="포인트">
          보유 포인트 <span className="label-label">{point?.toLocaleString()}</span> P
        </OrderContentItem>
      }
      className={clsx('OrderPoint', className)}
    >
      <OrderContentItem label="통합 포인트" alignCenter>
        <div className="children-wrapper">
          <Input
            step={100}
            type="number"
            onChange={e => {
              let value = e.target.value.replace(/^0+(?=\d)/, '') as unknown as number;

              if (value > canUsedMax) {
                value = canUsedMax;
              } else if (value < 0) {
                value = 0;
              }

              onChangeUsed(value);
            }}
            value={usedPoint}
            onBlur={() => {
              onChangeUsed(Math.floor(usedPoint / 100) * 100);
            }}
            pattern="[0-9]+([,][0-9]{1,2})?"
            max={canUsedMax}
            onClickRemove={usedPoint ? () => onChangeUsed(0) : undefined}
          />
          <Button
            size="small"
            styleType="sub"
            onClick={() => onChangeUsed(Math.floor(canUsedMax / 100) * 100)}
          >
            전액사용
          </Button>
        </div>
        <p>100포인트 단위로 사용 가능하며, 100포인트 단위 미만 입력 시 자동 조절됩니다.</p>
      </OrderContentItem>
    </OrderPointStyled>
  );
};

export default OrderPoint;
