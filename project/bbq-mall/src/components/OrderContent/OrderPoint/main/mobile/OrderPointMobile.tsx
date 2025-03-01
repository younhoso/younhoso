'use client';

import clsx from 'clsx';

import Button from '@/components/Button';
import Input from '@/components/Input';

import { OrderPointProps } from '../pc/OrderPoint';
import { OrderPointMobileStyled } from './styled';

const OrderPointMobile = ({
  className,
  point = 0,
  usedPoint,
  onChangeUsed,
  max = 0,
}: OrderPointProps) => {
  const canUsedMax = point > max ? max : point;

  return (
    <OrderPointMobileStyled
      title={
        <div className="order-point-header">
          <div>포인트</div>
          <div>
            보유 포인트 <span>{point?.toLocaleString()}</span> P
          </div>
        </div>
      }
      className={clsx('OrderPointMobile', className)}
    >
      <div className="order-point-children-wrapper">
        <Input.Mobile
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
          pattern="[0-9]+([,][0-9]{1,2})?"
          max={canUsedMax}
          onBlur={() => {
            onChangeUsed(Math.floor(usedPoint / 100) * 100);
          }}
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
      <p>100포인트 단위로 사용 가능하며,</p>
      <p>100포인트 단위 미만 입력 시 자동 조절됩니다.</p>
    </OrderPointMobileStyled>
  );
};

export default OrderPointMobile;
