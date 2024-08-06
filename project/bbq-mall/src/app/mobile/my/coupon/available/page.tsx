'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import Image from 'next/image';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import cryingChicken from '@/assets/images/my/crying-chicken.png';
import Button from '@/components/Button';
import Coupon from '@/components/Coupon';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileMyCouponAvailablePageStyled } from '@/styles/pageStyled/mobile/mobileMyCouponAvailablePageStyled';
import { DownloadableCoupon } from '@/types';
import { calculateDayDiff } from '@/utils/calculateDayDiff';

const MobileMyCouponAvailable = () => {
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['/coupons/issuable'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<DownloadableCoupon[]>(key),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (couponNo: number) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).post(`/coupons/${couponNo}/download`),
  });

  return (
    <MobileMyCouponAvailablePageStyled
      className={clsx((isPending || !data?.data.length) && 'no-item')}
    >
      {isPending ? (
        <Loading.Mobile />
      ) : data?.data.length ? (
        <div className="coupon-wrapper">
          {data?.data.map(v => (
            <Coupon.Mobile
              key={v.couponNo}
              downloadRest={`다운로드 기간 ${calculateDayDiff(v.dateInfo.issueEndYmdt)}일 남음`}
              discountFixed={v.discountInfo.discountAmt}
              discountRate={v.discountInfo.discountRate}
              discountMax={v.discountInfo.maxDiscountAmt}
              title={v.couponName}
              useDays={v.useConstraint.useDays}
              useEnd={v.useConstraint.useEndYmdt}
              minSalePrice={v.useConstraint.minSalePrice}
              maxSalePrice={v.useConstraint.maxSalePrice}
              onClickObject={
                <Button
                  className="download-button"
                  disabled={!v.downloadable}
                  styleType="main"
                  size="micro"
                  onClick={async () => {
                    let content = '다운로드가 완료되었습니다.';
                    try {
                      await mutateAsync(v.couponNo);
                      await refetch();
                    } catch (e: any) {
                      content = e.response.data.message;
                    }
                    setConfirModalOpen({
                      open: true,
                      content,
                      onOk: resetConfirmModalOpen,
                    });
                  }}
                >
                  {v.downloadable ? '다운로드' : '다운완료'}
                </Button>
              }
            />
          ))}
        </div>
      ) : (
        <>
          <p>다운로드 가능한 쿠폰이 없습니다.</p>
          <Image src={cryingChicken} width={221} height={132} alt="no-item" />
        </>
      )}
    </MobileMyCouponAvailablePageStyled>
  );
};

export default MobileMyCouponAvailable;
