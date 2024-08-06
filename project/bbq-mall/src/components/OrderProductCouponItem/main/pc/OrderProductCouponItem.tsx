'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import {
  DISABLE3,
  DISABLE4,
  DISABLE5,
  OrderCouponProps,
} from '@/components/OrderContent/OrderCoupon/main/pc/OrderCoupon';
import { DisableInfoStyled } from '@/components/OrderContent/OrderCoupon/main/pc/styled';
import Radio from '@/components/Radio';
import { Coupon, CouponType, PaymentCoupon } from '@/types';
import { Product } from '@/types/categorymenu';

import { OrderProductCouponItemStyled } from './styled';

export interface OrderProductCouponItemProps
  extends Pick<OrderCouponProps, 'appliedCoupon' | 'couponList'> {
  className?: string;
  imageUrl: string | undefined;
  data: CouponType;
  tempApplied: Partial<PaymentCoupon>;
  setTempApplied: (v: any) => void;
  index: number;
  productNo: number;
}

export const mutlpleOptionSelected =
  '하나의 상품에서 2개 이상 옵션 선택 시, 쿠폰은 선택 옵션 금액을 합친 기준으로 하나의 쿠폰만 적용됩니다.';

const OrderProductCouponItem = ({
  className,
  imageUrl,
  data,
  appliedCoupon,
  setTempApplied,
  tempApplied,
  couponList,
  index,
  productNo,
}: OrderProductCouponItemProps) => {
  const [productCouponDisabled, setProductCouponDisabled] = useState<string | undefined>(undefined);

  const handleProductCoupon = (couponIssueNo: number) => {
    const is = couponList?.products[index].productCoupons.find(
      v => v.couponIssueNo === couponIssueNo,
    );
    setProductCouponDisabled(
      is?.cartCouponUsable === false
        ? is?.skipsAccumulation === true
          ? DISABLE4
          : DISABLE5
        : is?.skipsAccumulation === true
          ? DISABLE3
          : undefined,
    );
  };

  useEffect(() => {
    tempApplied.productCoupons?.forEach(v => {
      if (v.productNo === productNo) {
        handleProductCoupon(v.couponIssueNo);
      }
    });
  }, []);
  return (
    <OrderProductCouponItemStyled className={clsx('OrderProductCouponItem', className)}>
      <div className="info-title">
        <Image src={'https:' + imageUrl} width={72} height={72} alt="image" />
        {data.productName}
      </div>

      <Radio
        defaultValue={
          appliedCoupon?.productCoupons?.find(k => data.productNo === k.productNo)?.couponIssueNo
        }
        radioList={data.productCoupons.map(k => ({
          label: k.couponName,
          value: k.couponIssueNo,
          suffix: k.displayCouponName,
          disabled: tempApplied?.productCoupons?.some(
            j => j.couponIssueNo === k.couponIssueNo && j.productNo !== data.productNo,
          ),
        }))}
        noItem
        noItemLabel="쿠폰 적용 안함"
        onChange={e => {
          handleProductCoupon(e!);
          const changed = { productNo: data.productNo, couponIssueNo: e as number };
          if (!tempApplied?.productCoupons?.length) {
            return setTempApplied({ ...tempApplied, productCoupons: [changed] });
          }
          const existIndex = tempApplied?.productCoupons.findIndex(
            k => data.productNo === k.productNo,
          );
          if (existIndex > -1) {
            const _productionCoupons = [...tempApplied.productCoupons];
            _productionCoupons[existIndex] = changed;
            return setTempApplied({
              ...tempApplied,
              productCoupons: _productionCoupons,
            });
          }
          setTempApplied({
            ...tempApplied,
            productCoupons: [...tempApplied.productCoupons, changed],
          });
        }}
      />
      {data.optionCnt > 1 && <DisableInfoStyled>{mutlpleOptionSelected}</DisableInfoStyled>}
      {productCouponDisabled && <DisableInfoStyled>{productCouponDisabled}</DisableInfoStyled>}
    </OrderProductCouponItemStyled>
  );
};

export default OrderProductCouponItem;
