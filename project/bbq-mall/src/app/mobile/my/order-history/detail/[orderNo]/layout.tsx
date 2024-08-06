'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

import clsx from 'clsx';

import OrderDetail from '@/components/OrderDetail';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { MobileMyOrderhistoryDetailPageStyled } from '@/styles/pageStyled/mobile/mobileMyOrderhistoryDetailPageStyled';
import { OrderHistoryDetail } from '@/types/orderHistoryRelated';

export default function MobileOrderHistoryLayout({
  children,
  params: { orderNo },
}: {
  children: ReactNode;
  params: { orderNo: string };
}) {
  const { data, isPending, refetch } = useQuery({
    queryKey: [`/profile/orders/${orderNo}`],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<OrderHistoryDetail>(key),
  });

  return (
    <MobileMyOrderhistoryDetailPageStyled className={clsx(isPending && 'no-item')}>
      <OrderDetail.Mobile data={data?.data} isPending={isPending} refetch={refetch} />
      {children}
    </MobileMyOrderhistoryDetailPageStyled>
  );
}
