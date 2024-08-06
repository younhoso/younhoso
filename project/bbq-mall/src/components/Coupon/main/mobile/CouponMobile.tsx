'use client';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';

import logo from '@/assets/images/header/logo.svg';

import { CouponProps } from '../pc/Coupon';
import { CouponMobileStyled } from './styled';

const CouponMobile = ({
  className,
  downloadRest,
  discountFixed,
  discountRate,
  title,
  discountMax,
  onClickObject,
  useEnd,
  minSalePrice,
  useDays,
  maxSalePrice,
}: CouponProps) => {
  return (
    <CouponMobileStyled className={clsx('CouponMobile', className)}>
      <div>
        <p>{downloadRest}</p>
        <p>
          {!!discountFixed && `${discountFixed.toLocaleString()}원`}
          {!!discountRate && `${discountRate}%`} 할인
        </p>
        <p>
          {title} {!!discountMax && ` 최대 ${discountMax.toLocaleString()}원 할인`}
        </p>
      </div>

      <div className="coupon-bottom">
        <div>
          <p>
            {!!useEnd && `사용 기간 ${dayjs(new Date(useEnd)).format('YYYY. MM. DD')}`}
            {!!useDays && `발급 후 ${useDays}일 동안 사용 가능`}
          </p>
          <p>
            {!!minSalePrice && `${minSalePrice.toLocaleString()}원 이상 구매 시`}
            {!!maxSalePrice && ` ,${maxSalePrice.toLocaleString()}원 이하 구매 시`}
          </p>
        </div>
        {onClickObject}
      </div>

      <Image src={logo} width={56} height={28} alt="logo" />
    </CouponMobileStyled>
  );
};

export default CouponMobile;
