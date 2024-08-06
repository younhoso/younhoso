'use client';

import clsx from 'clsx';

import { ClaimPrice } from '@/types';

import { RefundInfoStyled } from './styled';

export interface RefundInfoProps {
  className?: string;
  data: ClaimPrice;
}
export const refundInfoWords = {
  '최초 배송비': [
    '부분 결제 취소 시 추가 배송비가 발생할 수 있으며, 이 때 추가 배송비를 결제해주셔야만 결제취소 처리완료가 가능합니다.',
  ],
  '추가 배송비가 발생하는 경우,': [
    "① '묶음 배송비' 상품의 배송비 무료(금액별 차등) 조건을 충족하여 배송비 무료",
    '② 부분 결제취소로 배송비 무료 조건을 불충족하는 경우 추가 배송비 부과',
    '③ 추가 배송비는 카드 또는 적립금으로 결제 가능',
  ],
};

const RefundInfo = ({ className, data }: RefundInfoProps) => {
  return (
    <RefundInfoStyled className={clsx('RefundInfo', className)}>
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
    </RefundInfoStyled>
  );
};

export default RefundInfo;
