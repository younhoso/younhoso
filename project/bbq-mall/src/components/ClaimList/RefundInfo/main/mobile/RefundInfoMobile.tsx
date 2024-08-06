'use client';

import clsx from 'clsx';

import { RefundInfoProps, refundInfoWords } from '../pc/RefundInfo';
import { RefundInfoMobileStyled } from './styled';

const RefundInfoMobile = ({ className, data }: RefundInfoProps) => {
  return (
    <RefundInfoMobileStyled className={clsx('RefundInfoMobile', className)}>
      <div className="refund-info-title">환불정보</div>
      <div className="charge-info">
        <div>
          상품금액<span>{data.productAmtInfo.standardPrice.toLocaleString()} 원</span>
        </div>
        <div>
          할인금액
          <span className="stress">
            -{' '}
            {(
              data.productAmtInfo.immediateDiscountAmt +
              data.refundSubPayAmt +
              data.productAmtInfo.productCouponDiscountAmt +
              data.subtractionAmtInfo.cartCouponAmt
            ).toLocaleString()}{' '}
            원
          </span>
        </div>
        {!!data.productAmtInfo.immediateDiscountAmt && (
          <div className="sub">
            - 상품 할인{' '}
            <span>- {data.productAmtInfo.immediateDiscountAmt.toLocaleString()} 원</span>
          </div>
        )}
        {!!data.refundSubPayAmt && (
          <div className="sub">
            - 포인트 할인 <span>- {data.refundSubPayAmt.toLocaleString()} 원</span>
          </div>
        )}
        {!!data.productAmtInfo.productCouponDiscountAmt && (
          <div className="sub">
            - 상품 쿠폰 할인
            <span>- {data.productAmtInfo.productCouponDiscountAmt.toLocaleString()} 원</span>
          </div>
        )}
        {!!data.subtractionAmtInfo.cartCouponAmt && (
          <div className="sub">
            - 주문 쿠폰 할인
            <span>- {data.subtractionAmtInfo.cartCouponAmt.toLocaleString()} 원</span>
          </div>
        )}
        <div>
          배송비<span>{data.deliveryAmtInfo.totalAmt.toLocaleString()} 원</span>
        </div>
      </div>
      <div className="refundable-info">
        {data.additionalPayAmt ? (
          <div>
            추가결제금액
            <span className="super-stress">{data.additionalPayAmt.toLocaleString()} 원</span>
          </div>
        ) : (
          <div>
            환불예정금액
            <span className="super-stress">{data.refundMainPayAmt.toLocaleString()} 원</span>
          </div>
        )}
        {!!data.refundSubPayAmt && (
          <div className="sub">
            - 반환 예정 포인트 <span>{data.refundSubPayAmt.toLocaleString()} 원</span>
          </div>
        )}
        {!!data.productAmtInfo.productCouponDiscountAmt && (
          <div className="sub">
            - 반환 예정 상품 쿠폰{' '}
            <span>{data.productAmtInfo.productCouponDiscountAmt.toLocaleString()} 원</span>
          </div>
        )}
        {!!data.subtractionAmtInfo.cartCouponAmt && (
          <div className="sub">
            - 반환 예정 주문 쿠폰{' '}
            <span>{data.subtractionAmtInfo.cartCouponAmt.toLocaleString()} 원</span>
          </div>
        )}
      </div>
      <div className="refund-notice">
        <div>[유의사항]</div>
        {Object.entries(refundInfoWords).map(([key, value]) => (
          <p key={key}>
            <div>{key}</div>
            {value.map(v => (
              <p key={v}>{v}</p>
            ))}
          </p>
        ))}
      </div>
    </RefundInfoMobileStyled>
  );
};

export default RefundInfoMobile;
