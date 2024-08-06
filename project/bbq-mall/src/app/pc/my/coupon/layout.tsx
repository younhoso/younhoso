'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import Input from '@/components/Input';
import PageTitle from '@/components/PageTitle';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { couponDescriptionList } from '@/constant/couponDescriptionList';
import { couponRouterList } from '@/constant/couponRoutes';
import { useGetReplacedPathname } from '@/hooks/useGetReplacedPathname';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcMyCouponLayoutStyled } from '@/styles/pageStyled/pc/pcMyCouponLayoutStyled';
import { MyCoupon, TotalCountWithItems } from '@/types';

export default function PcMyCouponLayout({ children }: { children: ReactNode }) {
  const search = useSearchParams();
  const coupon = search.get('coupon');
  const [couponNumber, setCouponNumber] = useState(coupon || '');
  const replacedPathname = useGetReplacedPathname();
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (number: string) =>
      customAxios(PLATFORMLIST.PC).post<Record<string, unknown>>(`coupons/register-code/${number}`),
  });

  const { refetch } = useQuery({
    queryKey: ['/coupons'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<MyCoupon>>(key, {
        params: {
          hasTotalCount: true,
          usable: true,
        },
      }),
    enabled: false,
  });

  useEffect(() => {
    if (coupon) {
      router.replace('/my/coupon/own');
    }
  }, []);

  return (
    <PcMyCouponLayoutStyled>
      <PageTitle title="쿠폰" />
      <h3>쿠폰 등록</h3>
      <h4>쿠폰 등록을 위해 발급된 코드를 입력해 주세요.</h4>
      <div className="coupon-registration">
        <Input
          placeholder="발급된 쿠폰번호를 입력해 주세요"
          value={couponNumber}
          onChange={e => setCouponNumber(e.target.value)}
        />
        <Button
          styleType="sub"
          size="small"
          isLoading={isPending}
          disabled={!couponNumber || isPending}
          onClick={async () => {
            let content = '쿠폰 등록이 완료되었습니다.';
            try {
              await mutateAsync(couponNumber);
              await refetch();
              setCouponNumber('');
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
          쿠폰 등록
        </Button>
      </div>
      <div className="coupon-description">
        {couponDescriptionList.map(v => (
          <p key={v}>{v}</p>
        ))}
      </div>
      <div className="coupon-button-wrapper">
        {couponRouterList.map((v, i) => (
          <Button
            key={v.label}
            size="small"
            {...(replacedPathname === v.path && { styleType: 'sub' })}
            onClick={() => router.push(v.path)}
          >
            {v.label}
          </Button>
        ))}
      </div>
      {children}
    </PcMyCouponLayoutStyled>
  );
}
