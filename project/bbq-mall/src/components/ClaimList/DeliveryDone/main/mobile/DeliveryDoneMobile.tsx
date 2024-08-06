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

import { DeliveryDoneProps } from '../pc/DeliveryDone';
import { DeliveryDoneMobileStyled } from './styled';

const DeliveryDoneMobile = ({
  className,
  resetClaimType,
  refetch,
  activeOrderOption,
}: DeliveryDoneProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { isSignIn } = useHandleIsSignIn();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      customAxios(PLATFORMLIST.MOBILE_WEB).put(
        `/${isSignIn ? 'profile' : 'guest'}/order-options/${
          activeOrderOption.orderOptionNo
        }/delivery-done`,
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
      content: '정말 수취 확인 하시겠습니까?',
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
            content: '수취확인되었습니다.',
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
    <DeliveryDoneMobileStyled
      className={clsx('DeliveryDoneMobile', className)}
    ></DeliveryDoneMobileStyled>
  );
};

export default DeliveryDoneMobile;
