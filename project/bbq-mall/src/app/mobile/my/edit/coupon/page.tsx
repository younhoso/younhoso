'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import couponBanner from '@/assets/images/my/coupon-banner.png';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { couponDescriptionList } from '@/constant/couponDescriptionList';
import { handleCoupoo } from '@/hooks/useHandleWebview';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileMyEditCouponPageStyled } from '@/styles/pageStyled/mobile/mobileMyEditCouponPageStyled';
import { getLocalStorageItem, removeLocalStorageItem } from '@/utils/localStorage';

const getCoupon = () => {
  const coupon = getLocalStorageItem<string>('coupon');

  if (coupon) {
    removeLocalStorageItem('coupon');
    return coupon;
  }

  return '';
};

const MobileMyEditCoupon = () => {
  const router = useRouter();

  const [couponNumber, setCouponNumber] = useState(getCoupon());
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (number: string) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).post<Record<string, unknown>>(
        `coupons/register-code/${number}`,
      ),
  });

  const onClickRegister = async () => {
    let content = '쿠폰 등록이 완료되었습니다.';
    try {
      await mutateAsync(couponNumber);
      setCouponNumber('');
      router.replace('/my/coupon/own');
    } catch (e: any) {
      content = e.response.data.message;
    }
    setConfirModalOpen({
      open: true,
      content,
      onOk: resetConfirmModalOpen,
    });
  };

  return (
    <MobileMyEditCouponPageStyled>
      <h3>
        <p>쿠폰 등록을 위해</p>
        <p>발급된 코드를 입력해 주세요</p>
      </h3>

      <Input.Mobile
        placeholder="발급된 쿠폰번호를 입력해주세요"
        value={couponNumber}
        onChange={e => setCouponNumber(e.target.value)}
      />

      <Button
        isLoading={isPending}
        disabled={isPending || !couponNumber}
        size="small"
        styleType="sub"
        fullWidth
        onClick={onClickRegister}
      >
        쿠폰 등록
      </Button>

      <ul className="description-wrapper">
        {couponDescriptionList.map(v => (
          <li key={v}>{v}</li>
        ))}
      </ul>

      <Divider marginBottom="16px" marginTop="16px" />

      <div className="coupon-banner-wrapper">
        <Image src={couponBanner} fill alt="coupon-banner" onClick={() => handleCoupoo()} />
      </div>
    </MobileMyEditCouponPageStyled>
  );
};

export default MobileMyEditCoupon;
