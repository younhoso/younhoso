'use client';

import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import rightArrow from '@/assets/images/header/right-arrow.svg';
import OrderProductCouponItem from '@/components/OrderProductCouponItem';
import Radio from '@/components/Radio';
import WrapperModal from '@/components/WrapperModal';
import { PaymentCoupon } from '@/types';

import { DISABLE1, DISABLE2, DISABLE3, OrderCouponProps } from '../pc/OrderCoupon';
import { DisableInfoMobileStyled, OrderCouponMobileStyled } from './styled';

const OrderCouponMobile = ({
  className,
  couponList,
  onChange,
  appliedCoupon,
  products,
}: OrderCouponProps) => {
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [tempApplied, setTempApplied] = useState<Partial<PaymentCoupon>>({});
  const [orderCouponDisabled, setOrderCouponDisabled] = useState<string | undefined>(undefined);

  const appliedOrderCoupon = couponList?.cartCoupons.find(
    v => v.couponIssueNo === appliedCoupon?.cartCouponIssueNo,
  );

  const accumultated = appliedCoupon?.productCoupons?.reduce((acc, cur) => {
    const product = couponList?.products.find(v => v.productNo === cur.productNo);
    const coupon = product?.productCoupons.find(v => v.couponIssueNo === cur.couponIssueNo);

    return acc + (coupon?.couponDiscountAmt ?? 0);
  }, 0);

  const hasCartCoupon = !!couponList?.cartCoupons.length;
  const hasProductCoupon = couponList?.products.some(k => k.productCoupons.length);

  const handleOrderCoupon = (couponIssueNo: number) => {
    const is = couponList?.cartCoupons.find(v => v.couponIssueNo === couponIssueNo);
    setOrderCouponDisabled(
      is?.productCouponUsable === false
        ? is?.skipsAccumulation === true
          ? DISABLE1
          : DISABLE2
        : is?.skipsAccumulation === true
          ? DISABLE3
          : undefined,
    );
  };

  const off = () => {
    setOrderCouponDisabled(undefined);
    setOpenOrderModal(false);
  };

  return (
    <OrderCouponMobileStyled title="쿠폰" className={clsx('OrderCouponMobile', className)}>
      <div
        className={clsx('product-coupon-click', !hasCartCoupon && 'disabled')}
        onClick={() => {
          if (!hasCartCoupon) {
            return;
          }
          setOpenOrderModal(true);
          setTempApplied(appliedCoupon ?? {});
          if (appliedCoupon?.cartCouponIssueNo) {
            handleOrderCoupon(appliedCoupon?.cartCouponIssueNo);
          }
        }}
      >
        <div>주문 쿠폰 할인</div>
        {!hasCartCoupon ? (
          '쿠폰 없음'
        ) : appliedOrderCoupon ? (
          <span>{'- ' + appliedOrderCoupon.couponDiscountAmt.toLocaleString() + '원'}</span>
        ) : (
          '쿠폰 조회/ 적용'
        )}
        <Image src={rightArrow} width={16} height={16} alt="product-coupon" />
      </div>
      <div
        className={clsx('product-coupon-click', !hasProductCoupon && 'disabled')}
        onClick={() => {
          if (!hasProductCoupon) {
            return;
          }
          setOpenProductModal(true);
          setTempApplied(appliedCoupon ?? {});
        }}
      >
        <div>상품 쿠폰 할인</div>
        {!hasProductCoupon ? (
          '쿠폰 없음'
        ) : accumultated ? (
          <span>{'- ' + accumultated.toLocaleString() + '원'}</span>
        ) : (
          '쿠폰 조회/ 적용'
        )}
        <Image src={rightArrow} width={16} height={16} alt="product-coupon" />
      </div>
      <WrapperModal.Mobile
        title="주문 쿠폰 선택"
        open={openOrderModal}
        onOk={async () => {
          const isDone = await onChange?.(tempApplied);
          isDone && off();
        }}
        onClose={off}
        onCancel={off}
        onOkText="적용"
      >
        <Radio.Mobile
          noItem
          noItemLabel="쿠폰 적용 안함"
          defaultValue={appliedOrderCoupon?.couponIssueNo}
          radioList={
            couponList?.cartCoupons.map(v => ({
              label: v.couponName,
              value: v.couponIssueNo,
              suffix: v.displayCouponName,
            })) ?? []
          }
          onChange={e => {
            handleOrderCoupon(e!);
            setTempApplied({ ...tempApplied, cartCouponIssueNo: e });
          }}
        />
        {orderCouponDisabled && (
          <DisableInfoMobileStyled>{orderCouponDisabled}</DisableInfoMobileStyled>
        )}
      </WrapperModal.Mobile>
      <WrapperModal.Mobile
        title="상품 쿠폰 적용하기"
        onOkText="적용"
        open={openProductModal}
        onOk={async () => {
          const isDone = await onChange?.(tempApplied);
          isDone && setOpenProductModal(false);
        }}
        onClose={() => setOpenProductModal(false)}
        onCancel={() => setOpenProductModal(false)}
      >
        {couponList?.products.map((v, i) => {
          const thisProduct = products?.find(k => k.productNo === v.productNo);
          return (
            <OrderProductCouponItem.Mobile
              couponList={couponList}
              index={i}
              key={v.productNo}
              imageUrl={thisProduct?.imageUrl}
              data={v}
              appliedCoupon={appliedCoupon}
              tempApplied={tempApplied}
              setTempApplied={setTempApplied}
              productNo={v.productNo}
            />
          );
        })}
      </WrapperModal.Mobile>
    </OrderCouponMobileStyled>
  );
};

export default OrderCouponMobile;
