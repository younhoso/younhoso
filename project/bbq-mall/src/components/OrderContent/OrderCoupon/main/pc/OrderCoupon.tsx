'use client';

import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import rightArrow from '@/assets/images/header/right-arrow.svg';
import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import Modal from '@/components/Modal';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';
import OrderProductCouponItem from '@/components/OrderProductCouponItem';
import Radio from '@/components/Radio';
import { CouponDivided, PaymentCoupon } from '@/types';

import { DisableInfoStyled, OrderCouponStyled } from './styled';

export interface OrderCouponProps {
  className?: string;
  couponList: CouponDivided | undefined;
  onChange?: (v: Partial<PaymentCoupon>) => Promise<boolean>;
  appliedCoupon: Partial<PaymentCoupon> | undefined;
  products: CartProductData[] | undefined;
}

export const DISABLE1 = '본 쿠폰 적용 시 상품 쿠폰 사용 및 포인트 적립이 불가합니다.';
export const DISABLE4 = '본 쿠폰 적용 시 주문 쿠폰 사용 및 포인트 적립이 불가합니다.';
export const DISABLE2 = '본 쿠폰 적용 시 상품 쿠폰 사용이 불가합니다.';
export const DISABLE5 = '본 쿠폰 적용 시 주문 쿠폰 사용이 불가합니다.';
export const DISABLE3 = '본 쿠폰 적용 시 포인트 적립이 불가합니다.';

const OrderCoupon = ({
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
    <>
      <OrderCouponStyled label="쿠폰" className={clsx('OrderCoupon', className)}>
        <OrderContentItem label="주문 쿠폰 할인" alignCenter>
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
            {!hasCartCoupon ? (
              '적용 가능한 쿠폰이 존재하지 않습니다.'
            ) : appliedOrderCoupon ? (
              <span>{'- ' + appliedOrderCoupon.couponDiscountAmt.toLocaleString() + '원'}</span>
            ) : (
              '쿠폰 조회/ 적용'
            )}
            <Image src={rightArrow} width={16} height={16} alt="product-coupon" />
          </div>
        </OrderContentItem>
        <OrderContentItem label="상품 쿠폰 할인" alignCenter>
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
            {!hasProductCoupon ? (
              '적용 가능한 쿠폰이 존재하지 않습니다.'
            ) : accumultated ? (
              <span>{'- ' + accumultated.toLocaleString() + '원'}</span>
            ) : (
              '쿠폰 조회/ 적용'
            )}
            <Image src={rightArrow} width={16} height={16} alt="product-coupon" />
          </div>
        </OrderContentItem>
      </OrderCouponStyled>
      <Modal
        title="주문 쿠폰 적용하기"
        onOkText="적용"
        open={openOrderModal}
        onClose={off}
        onCancel={off}
        onOk={async () => {
          const isDone = await onChange?.(tempApplied);
          isDone && off();
        }}
        closeOnClickOutside={false}
        width="710px"
        noMarginInHeader
        hidePaddingTop
      >
        <Radio
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
        {orderCouponDisabled && <DisableInfoStyled>{orderCouponDisabled}</DisableInfoStyled>}
      </Modal>
      <Modal
        title="상품 쿠폰 적용하기"
        hidePaddingTop
        onOkText="적용"
        open={openProductModal}
        closeOnClickOutside={false}
        onClose={() => setOpenProductModal(false)}
        onCancel={() => setOpenProductModal(false)}
        onOk={async () => {
          const isDone = await onChange?.(tempApplied);
          isDone && setOpenProductModal(false);
        }}
        noMarginInHeader
      >
        {couponList?.products.map((v, i) => {
          const thisProduct = products?.find(k => k.productNo === v.productNo);
          return (
            <OrderProductCouponItem
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
      </Modal>
    </>
  );
};

export default OrderCoupon;
