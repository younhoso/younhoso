'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

import OrderDetail from '@/components/OrderDetail';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { PcMyOrderhistoryDetailPageStyled } from '@/styles/pageStyled/pc/pcMyOrderhistoryDetailPageStyled';
import { OrderHistoryDetail } from '@/types/orderHistoryRelated';

export default function PcOrderHistoryLayout({
  children,
  params: { orderNo },
}: {
  children: ReactNode;
  params: { orderNo: string };
}) {
  const { data, isPending, refetch } = useQuery({
    queryKey: [`/profile/orders/${orderNo}`],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<OrderHistoryDetail>(key),
  });

  return (
    <PcMyOrderhistoryDetailPageStyled>
      <OrderDetail data={data?.data} isPending={isPending} refetch={refetch} />
      {children}
    </PcMyOrderhistoryDetailPageStyled>
  );
}
