'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileOrderCheckGuestFindPageStyled } from '@/styles/pageStyled/mobile/mobileOrderCheckGuestFindPageStyled';

const MobileOrderCheckGuestFind = () => {
  const router = useRouter();
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      orderNumber: '',
    },
  });
  return (
    <>
      <Header.Mobile title="주문 비밀번호 찾기" hasCart={false} hideBorderBottom removeSticky />
      <MobileOrderCheckGuestFindPageStyled>
        <p>주문번호를 입력하시면</p>
        <p>
          <span>이메일로 임시 비밀번호를 발송</span>해드립니다.
        </p>
        <form
          onSubmit={handleSubmit(async body => {
            if (!body.orderNumber) {
              return setConfirModalOpen({
                open: true,
                content: '주문번호를 입력해주세요.',
                onOk: resetConfirmModalOpen,
              });
            }

            try {
              setIsLoading(true);
              await queryClient.fetchQuery({
                queryKey: [`/guest/orders/${body.orderNumber}/forgot-password`],
                queryFn: ({ queryKey: [key] }) =>
                  customAxios(PLATFORMLIST.MOBILE_WEB).get(key, {
                    params: { replyType: 'EMAIL' },
                  }),
              });
              setConfirModalOpen({
                open: true,
                content:
                  '임시 비밀번호가\n주문 당시 입력하신 메일로 발송되었습니다.\n 확인을 누르시면 주문번호 입력 페이지로 이동됩니다.',
                onOk: () => {
                  resetConfirmModalOpen();
                  router.push(`/order/check/guest?order-number=${body.orderNumber}`);
                },
                onCancel: resetConfirmModalOpen,
              });
            } catch (e: any) {
              setConfirModalOpen({
                open: true,
                content: e.response.data.message,
                onOk: resetConfirmModalOpen,
              });
            } finally {
              setIsLoading(false);
            }
          })}
        >
          <Input.Mobile
            placeholder="주문번호를 입력해주세요"
            {...register('orderNumber')}
            className="order-number-input"
          />
          <Button
            fullWidth
            styleType="main"
            size="small"
            disabled={isLoading}
            isLoading={isLoading}
          >
            확인
          </Button>
        </form>
      </MobileOrderCheckGuestFindPageStyled>
    </>
  );
};

export default MobileOrderCheckGuestFind;
