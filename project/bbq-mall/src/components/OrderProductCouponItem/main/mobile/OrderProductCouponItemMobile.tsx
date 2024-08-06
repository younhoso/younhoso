'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import { DisableInfoMobileStyled } from '@/components/OrderContent/OrderCoupon/main/mobile/styled';
import {
  DISABLE3,
  DISABLE4,
  DISABLE5,
} from '@/components/OrderContent/OrderCoupon/main/pc/OrderCoupon';
import Radio from '@/components/Radio';

import { OrderProductCouponItemProps, mutlpleOptionSelected } from '../pc/OrderProductCouponItem';
import { OrderProductCouponItemMobileStyled } from './styled';

const OrderProductCouponItemMobile = ({
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
    <OrderProductCouponItemMobileStyled className={clsx('OrderProductCouponItemMobile', className)}>
      <div className="info-title">
        <Image src={'https:' + imageUrl} width={72} height={72} alt="image" />
        <p>{data.productName}</p>
      </div>

      <Radio.Mobile
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
      {data.optionCnt > 1 && (
        <DisableInfoMobileStyled>{mutlpleOptionSelected}</DisableInfoMobileStyled>
      )}
      {productCouponDisabled && (
        <DisableInfoMobileStyled>{productCouponDisabled}</DisableInfoMobileStyled>
      )}
    </OrderProductCouponItemMobileStyled>
  );
};

export default OrderProductCouponItemMobile;
