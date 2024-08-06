'use client';

import { useQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';

import rightArrow from '@/assets/images/components/right-arrow-999.svg';
import chicken from '@/assets/images/my/givebbqchicken.png';
import Divider from '@/components/Divider';
import Loading from '@/components/Loading';
import OrderHistoryItem from '@/components/OrderHistoryItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { CANCEL_HISTORY, ORDER_HISTORY, orderHistoryString } from '@/constant/orderHistory';
import { customAxios } from '@/libs/customAxios';
import { MobileMyOrderHistoryListLayoutStyled } from '@/styles/pageStyled/mobile/mobileMyOrderHistoryListLayoutStyled';
import { TotalCountWithItems } from '@/types';
import { OrderHistory } from '@/types/orderHistoryRelated';

const CANCELED = 'canceled';
export default function MobileMyOrderHistoryListLayout() {
  const pathname = usePathname();
  const lastPath = pathname.split('/')[pathname.split('/').length - 1];
  const isCanceled = lastPath === CANCELED;
  const router = useRouter();

  const { data, isPending, refetch, isRefetching } = useQuery({
    queryKey: [`/profile/orders/${lastPath}`],
    queryFn: () =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCountWithItems<OrderHistory>>(
        '/profile/orders',
        {
          params: {
            orderRequestTypes: isCanceled
              ? orderHistoryString[CANCEL_HISTORY].join(',')
              : orderHistoryString[ORDER_HISTORY].join(','),
          },
        },
      ),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [pathname]);

  return (
    <MobileMyOrderHistoryListLayoutStyled
      className={clsx((isPending || isRefetching || !data?.data.items.length) && 'no-item')}
    >
      {isPending || isRefetching ? (
        <Loading.Mobile />
      ) : data?.data.items.length ? (
        data.data.items.map(v => (
          <Fragment key={v.orderNo}>
            <div className="order-number-by">
              <div
                className="order-number-header"
                onClick={() =>
                  router.push(
                    `/my/order-history/detail/${v.orderNo}/${isCanceled ? 'canceled' : 'completed'}`,
                  )
                }
              >
                <div>{dayjs(v.orderYmdt).format('YY/MM/DD')}</div>

                <Image src={rightArrow} width={16} height={16} alt="go-detail" />
              </div>
              {v.orderOptions.map(k => (
                <OrderHistoryItem.Mobile key={k.orderOptionNo} data={k} />
              ))}
            </div>
            <Divider.Mobile />
          </Fragment>
        ))
      ) : (
        <>
          <p>주문내역이 없습니다.</p>
          <Image src={chicken} width={221} height={132} alt="image" />
        </>
      )}
    </MobileMyOrderHistoryListLayoutStyled>
  );
}
