'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileOrderCheckGuestPageStyled } from '@/styles/pageStyled/mobile/mobileOrderCheckGuestPageStyled';
import { GUEST_TOKEN, setSessionStorageItem } from '@/utils/sessionStorage';

const MobileOrderCheckGuest = () => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const searchParam = useSearchParams();
  const router = useRouter();
  const { handleSubmit, register } = useForm<{ orderNumber: string; password: string }>({
    defaultValues: {
      orderNumber: searchParam.get('order-number') ?? '',
      password: '',
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: { orderNumber: string; password: string }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).post<{ guestToken: string }>(
        `/guest/orders/${body.orderNumber}`,
        {
          password: body.password,
          orderRequestType: 'ALL',
        },
      ),
  });
  return (
    <>
      <Header.Mobile title="비회원 주문조회" hasCart={false} hideBorderBottom removeSticky />
      <MobileOrderCheckGuestPageStyled
        onSubmit={handleSubmit(async body => {
          try {
            const res = await mutateAsync(body);
            setSessionStorageItem(GUEST_TOKEN, res.data.guestToken);

            router.push(`/order/check/guest/detail/${body.orderNumber}`);
          } catch (e: any) {
            setConfirmModalOpen({
              content: e.response.data.message,
              open: true,
              onOk: resetOpenConfirm,
            });
          }
        })}
      >
        <Input.Mobile
          className="margin-needed"
          placeholder="주문번호를 입력해주세요"
          {...register('orderNumber', { required: true })}
          name="orderNumber"
          autoComplete="username"
        />
        <Input.Mobile
          placeholder="비밀번호"
          autoComplete="current-password"
          className="order-password"
          {...register('password', { required: true })}
        />
        <div className="find-password-wrapper">
          <button onClick={() => router.push('/order/check/guest/find')} type="button">
            주문 비밀번호를 잊으셨나요?
          </button>
        </div>
        <Button styleType="main" size="small" disabled={isPending} isLoading={isPending}>
          주문조회
        </Button>
        <p>Copyright 2024 © GENESIS BBQ</p>
      </MobileOrderCheckGuestPageStyled>
    </>
  );
};

export default MobileOrderCheckGuest;
