'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import Coupon from '@/components/Coupon';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcMyCouponAvailablePageStyled } from '@/styles/pageStyled/pc/pcMyCouponAvailablePageStyled';
import { DownloadableCoupon } from '@/types';
import { calculateDayDiff } from '@/utils/calculateDayDiff';

const limit = 15;
const PcMyCouponAvailable = () => {
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const [page, setPage] = useState(1);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['/coupons/issuable'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<DownloadableCoupon[]>(key),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (couponNo: number) =>
      customAxios(PLATFORMLIST.PC).post(`/coupons/${couponNo}/download`),
  });

  if (isPending) {
    return <Loading height="440px" />;
  }

  return (
    <PcMyCouponAvailablePageStyled className={clsx((isPending || !data?.data.length) && 'no-item')}>
      {data?.data.length ? (
        <>
          <div className="coupon-wrapper">
            {data?.data.slice((page - 1) * limit, page * limit).map(v => (
              <Coupon
                key={v.couponNo}
                downloadRest={`다운로드 기간 ${calculateDayDiff(v.dateInfo.issueEndYmdt)}일 남음`}
                discountFixed={v.discountInfo.discountAmt}
                discountRate={v.discountInfo.discountRate}
                discountMax={v.discountInfo.maxDiscountAmt}
                title={v.couponName}
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
          <Pagination onChange={setPage} limit={limit} total={data.data.length} />
        </>
      ) : (
        <>다운로드 가능한 쿠폰이 없습니다.</>
      )}
    </PcMyCouponAvailablePageStyled>
  );
};

export default PcMyCouponAvailable;
