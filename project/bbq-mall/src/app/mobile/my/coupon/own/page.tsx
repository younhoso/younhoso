'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';

import rightArrow from '@/assets/images/header/right-arrow.svg';
import cryingChicken from '@/assets/images/my/crying-chicken.png';
import Coupon from '@/components/Coupon';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { MobileMyCouponOwnPageStyled } from '@/styles/pageStyled/mobile/mobileMyCouponOwnPageStyled';
import { MyCoupon, TotalCountWithItems } from '@/types';
import { calculateDayDiff } from '@/utils/calculateDayDiff';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage';

const MobileMyCouponOwn = () => {
  const [couponModalData, setCouponModalData] = useState<MyCoupon | undefined>(undefined);

  const search = useSearchParams();
  const coupon = search.get('coupon');
  const router = useRouter();

  useEffect(() => {
    if (coupon) {
      setLocalStorageItem('coupon', coupon);
      router.replace('/my/coupon/own');
      return;
    }

    const couponLocalstorage = getLocalStorageItem('coupon');
    if (couponLocalstorage) {
      router.push('/my/edit/coupon');
    }
  }, [coupon]);

  const { data, isPending } = useQuery({
    queryKey: ['/coupons'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCountWithItems<MyCoupon>>(key, {
        params: {
          hasTotalCount: true,
          usable: true,
        },
      }),
  });

  return (
    <MobileMyCouponOwnPageStyled
      className={clsx((isPending || !data?.data.totalCount) && 'no-item')}
    >
      {isPending ? (
        <Loading.Mobile />
      ) : data?.data.totalCount ? (
        <div className="coupon-wrapper">
          {data?.data.items.map(v => (
            <Coupon.Mobile
              key={v.couponIssueNo}
              downloadRest={`${calculateDayDiff(v.useEndYmdt)}일 남음`}
              discountFixed={v.discountAmt}
              discountRate={v.discountRate}
              discountMax={v.maxDiscountAmt}
              title={v.couponName}
              useEnd={v.useEndYmdt}
              minSalePrice={v.minSalePrice}
              maxSalePrice={v.maxSalePrice}
              onClickObject={
                <div className="right-arrow-wrpper">
                  <Image
                    src={rightArrow}
                    width={16}
                    height={16}
                    alt="right-arrow"
                    onClick={() => setCouponModalData(v)}
                  />
                </div>
              }
            />
          ))}
          <Modal.Mobile
            title="쿠폰 정보"
            onClose={() => setCouponModalData(undefined)}
            onOk={() => setCouponModalData(undefined)}
            open={!!couponModalData}
          >
            <div className="coupon-modal-brief">
              <div>
                <p>
                  {!!couponModalData?.discountAmt &&
                    `${couponModalData?.discountAmt.toLocaleString()}원`}
                  {!!couponModalData?.discountRate && `${couponModalData?.discountRate}%`} 할인
                </p>
                <p>
                  {couponModalData?.couponName}{' '}
                  {!!couponModalData?.maxDiscountAmt &&
                    ` 최대 ${couponModalData?.maxDiscountAmt.toLocaleString()}원 할인`}
                </p>
              </div>
              <div>
                <p>
                  사용 기간{' '}
                  {dayjs(new Date(couponModalData?.useEndYmdt ?? 0)).format('YYYY. MM. DD')}
                </p>
                <p>
                  {!!couponModalData?.minSalePrice &&
                    `${couponModalData?.minSalePrice.toLocaleString()}원 이상 구매 시`}
                  {!!couponModalData?.maxSalePrice &&
                    ` ,${couponModalData?.maxSalePrice.toLocaleString()}원 이하 구매 시`}
                </p>
              </div>
            </div>
            {couponModalData?.reason && (
              <div className="coupon-modal-description">
                <h4>쿠폰 정보</h4>
                {couponModalData.reason
                  .split('\n')
                  .filter(v => v)
                  .map(v => (
                    <li key={v}>{v}</li>
                  ))}
              </div>
            )}
          </Modal.Mobile>
        </div>
      ) : (
        <>
          <p>보유한 쿠폰이 없습니다.</p>
          <Image src={cryingChicken} width={221} height={132} alt="no-item" />
        </>
      )}
    </MobileMyCouponOwnPageStyled>
  );
};

export default MobileMyCouponOwn;
