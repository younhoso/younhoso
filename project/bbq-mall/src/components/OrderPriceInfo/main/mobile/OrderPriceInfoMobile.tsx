'use client';

import clsx from 'clsx';

import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';

import { OrderPriceInfoProps } from '../pc/OrderPriceInfo';
import { OrderPriceInfoMobileStyled } from './styled';

const OrderPriceInfoMobile = ({ className, price, discountItemList }: OrderPriceInfoProps) => {
  const { isSignIn } = useHandleIsSignIn();
  return (
    <OrderPriceInfoMobileStyled className={clsx('OrderPriceInfoMobile', className)}>
      <div className="order-price-mobile-info">
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
      <div className="order-price-mobile-total">
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
    </OrderPriceInfoMobileStyled>
  );
};

export default OrderPriceInfoMobile;
