'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { GUEST_TOKEN, getSessionStorageItem } from '@/utils/sessionStorage';

import { ConfirmOrderProps } from '../pc/ConfirmOrder';
import { ConfirmOrderMobileStyled } from './styled';

const ConfirmOrderMobile = ({
  className,
  resetClaimType,
  refetch,
  activeOrderOption,
}: ConfirmOrderProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { isSignIn } = useHandleIsSignIn();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      customAxios(PLATFORMLIST.PC).put(
        `/${isSignIn ? 'profile' : 'guest'}/order-options/${
          activeOrderOption.orderOptionNo
        }/confirm`,
        undefined,
        {
          headers: {
            ...(!isSignIn && { guestToken: getSessionStorageItem(GUEST_TOKEN) }),
          },
        },
      ),
  });

  useEffect(() => {
    setConfirmModalOpen({
      open: true,
      content: '정말 구매 확정 하시겠습니까?',
      onOk: async () => {
        if (isPending) {
          return;
        }
        try {
          await mutateAsync();
          await refetch();
          resetOpenConfirm();
          resetClaimType();
          setConfirmModalOpen({
            content: '구매 확정되었습니다.',
            open: true,
            onOk: resetOpenConfirm,
          });
        } catch (e: any) {
          setConfirmModalOpen({
            content: e.response.data.message,
            open: true,
            onOk: () => {
              resetOpenConfirm();
              resetClaimType();
            },
          });
        }
      },
      onCancel: () => {
        resetOpenConfirm();
        resetClaimType();
      },
    });
  }, []);
  return (
    <ConfirmOrderMobileStyled
      className={clsx('ConfirmOrderMobile', className)}
    ></ConfirmOrderMobileStyled>
  );
};

export default ConfirmOrderMobile;
