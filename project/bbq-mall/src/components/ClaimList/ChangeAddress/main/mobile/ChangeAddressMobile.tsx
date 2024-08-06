'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Input from '@/components/Input';
import {
  MANUAL_TYPE,
  orderRequestList,
} from '@/components/OrderContent/OrderAddress/main/pc/OrderAddress';
import Select from '@/components/Select';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { AddAddressBody } from '@/types';
import { GUEST_TOKEN, getSessionStorageItem } from '@/utils/sessionStorage';

import { ChangeAddressProps } from '../pc/ChangeAddress';
import { ChangeAddressMobileStyled } from './styled';

const ChangeAddressMobile = ({ className, resetClaimType, data, refetch }: ChangeAddressProps) => {
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const { isSignIn } = useHandleIsSignIn();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: AddAddressBody & { deliveryMemo: string }) =>
      isSignIn
        ? customAxios(PLATFORMLIST.MOBILE_WEB).put(
            `/profile/orders/${data.orderNo}/deliveries`,
            body,
          )
        : customAxios(PLATFORMLIST.MOBILE_WEB).put(
            `/guest/orders/${data.orderNo}/deliveries`,
            body,
            {
              headers: {
                guestToken: getSessionStorageItem(GUEST_TOKEN),
              },
            },
          ),
  });
  const [orderRequest, setOrderRequest] = useState('');

  return (
    <ChangeAddressMobileStyled
      open
      hideDefaultSave
      onSave={async d => {
        if (isPending) {
          return;
        }
        let confirmWord = '';
        try {
          await mutateAsync({ ...(d as unknown as AddAddressBody), deliveryMemo: orderRequest });
          refetch();
          confirmWord = '배송지 변경이 완료되었습니다.';
        } catch (e: any) {
          confirmWord = e.response.data.message;
        } finally {
          resetClaimType();
          setConfirModalOpen({
            content: confirmWord,
            open: true,
            onOk: resetConfirmModalOpen,
          });
        }
      }}
      onClose={resetClaimType}
      className={clsx('ChangeAddress', className)}
    >
      <Select.Mobile
        placeholder="배송시 요청사항을 선택해주세요."
        optionList={orderRequestList.map(v => ({ label: v, value: v }))}
        onChange={e => {
          setOrderRequest(e!);
        }}
      />
      {orderRequest === MANUAL_TYPE && (
        <Input.Mobile
          placeholder="기타 내용을 입력해주세요 (한글 20자 이내)"
          maxLength={20}
          className="manual-type"
        />
      )}
    </ChangeAddressMobileStyled>
  );
};

export default ChangeAddressMobile;
