'use client';

import clsx from 'clsx';

import Loading from '@/components/Loading';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { CartPrice } from '@/types';

import { OrderPriceInfoStyled } from './styled';

export type PickedCartPrice = Pick<
  CartPrice,
  'standardAmt' | 'discountAmt' | 'totalDeliveryAmt' | 'totalAmt'
>;

export interface OrderPriceInfoProps {
  className?: string;
  price: PickedCartPrice | undefined;
  discountItemList?: { label: string; value: number }[];
}

export const orderInfoToKor = {
  standardAmt: '상품금액',
  discountAmt: '할인금액',
  totalDeliveryAmt: '배송비',
};

const OrderPriceInfo = ({ className, price, discountItemList }: OrderPriceInfoProps) => {
  const { isSignIn } = useHandleIsSignIn();
  return (
    <OrderPriceInfoStyled className={clsx('OrderPriceInfo', className)}>
      <div className="order-price-title">결제금액</div>
      <div className="order-price-info">
        <div>
          <div>상품금액</div>
          <div>{price?.standardAmt.toLocaleString() ?? 0} 원</div>
        </div>
        <div className="discount-info">
          <div>할인금액</div>
          <div>
            {price?.discountAmt ? <span>{'- ' + price.discountAmt.toLocaleString()}</span> : 0} 원
          </div>
        </div>
        {!!discountItemList?.length &&
          discountItemList.map(v => (
            <div key={v.label} className="discount-detail">
              <div>{v.label}</div>
              <div>- {v.value.toLocaleString()} 원</div>
            </div>
          ))}
        <div>
          <div>배송비</div>
          <div>{price?.totalDeliveryAmt.toLocaleString() ?? 0} 원</div>
        </div>
      </div>
      <div className="order-price-total">
        최종결제금액
        <div>
          <span>{price?.totalAmt.toLocaleString() ?? 0}</span> 원
        </div>
      </div>
      {isSignIn && (
        <div className="accumulation-info">
          <p>적립예정 포인트: 결제금액 2%</p>
          <p>*일부품목 제외</p>
        </div>
      )}
    </OrderPriceInfoStyled>
  );
};

export default OrderPriceInfo;
