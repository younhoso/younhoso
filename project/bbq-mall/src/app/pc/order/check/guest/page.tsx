'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcOrderCheckGuestPageStyled } from '@/styles/pageStyled/pc/pcOrderCheckGuestPageStyled';
import { GUEST_TOKEN, setSessionStorageItem } from '@/utils/sessionStorage';

const PcOrderCheckGuest = () => {
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
      customAxios(PLATFORMLIST.PC).post<{ guestToken: string }>(
        `/guest/orders/${body.orderNumber}`,
        {
          password: body.password,
          orderRequestType: 'ALL',
        },
      ),
  });

  return (
    <PcOrderCheckGuestPageStyled
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
      <h2>비회원 주문조회</h2>
      <Input
        placeholder="주문번호를 입력해주세요."
        {...register('orderNumber', { required: true })}
        name="orderNumber"
        autoComplete="username"
      />
      <Input
        placeholder="비밀번호를 입력해주세요."
        autoComplete="current-password"
        className="order-password"
        {...register('password', { required: true })}
      />
      <div className="find-password-wrapper">
        <button onClick={() => router.push('/order/check/guest/find')} type="button">
          주문 비밀번호를 잊으셨나요?
        </button>
      </div>

      <Button styleType="main" disabled={isPending} isLoading={isPending}>
        주문조회
      </Button>
    </PcOrderCheckGuestPageStyled>
  );
};

export default PcOrderCheckGuest;
