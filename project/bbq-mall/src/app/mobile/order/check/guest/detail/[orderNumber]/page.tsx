'use client';

import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Loading from '@/components/Loading';
import OrderDetail from '@/components/OrderDetail';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileOrderCheckGuestDetailPageStyled } from '@/styles/pageStyled/mobile/mobileOrderCheckGuestDetailPageStyled';
import { OrderHistoryDetail } from '@/types/orderHistoryRelated';
import {
  GUEST_TOKEN,
  getSessionStorageItem,
  removeSessionStorageItem,
} from '@/utils/sessionStorage';

const MobileOrderCheckGuestDetail = ({
  params: { orderNumber },
}: {
  params: { orderNumber: string };
}) => {
  const router = useRouter();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const guestToken = getSessionStorageItem<string>(GUEST_TOKEN);
  const { data, error, isPending, refetch } = useQuery({
    queryKey: [`/guest/orders/${orderNumber}` + guestToken],
    queryFn: () =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<OrderHistoryDetail>(`/guest/orders/${orderNumber}`, {
        headers: { guestToken },
      }),
  });

  if (error) {
    setConfirmModalOpen({
      content: (error as any).response.data.message,
      open: true,
      onOk: () => {
        removeSessionStorageItem(GUEST_TOKEN);
        resetOpenConfirm();
        router.replace('/');
      },
    });
    return <Loading.Mobile />;
  }
  return (
    <MobileOrderCheckGuestDetailPageStyled>
      <OrderDetail.Mobile data={data?.data} isPending={isPending} refetch={refetch} />
    </MobileOrderCheckGuestDetailPageStyled>
  );
};

export default MobileOrderCheckGuestDetail;
