'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';

import plusRed from '@/assets/images/cart/plus-red.svg';
import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination';
import Select from '@/components/Select';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/main/pc/Table';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { CANCEL_HISTORY, ORDER_HISTORY, orderHistoryString } from '@/constant/orderHistory';
import { customAxios } from '@/libs/customAxios';
import { PcMyOrderHistoryLayoutStyled } from '@/styles/pageStyled/pc/pcMyOrderHistoryLayoutStyled';
import { TotalCountWithItems } from '@/types';
import { OrderHistory, OrderHistoryOption } from '@/types/orderHistoryRelated';

const optionList = [
  { label: '오늘', value: 0 },
  { label: '일주일', value: 7 },
  { label: '1개월', value: 30 },
  { label: '3개월', value: 90 },
  { label: '1년', value: 365 },
];

const limit = 10;
const CANCELED = 'canceled';

export default function PcMyOrderHistoryListLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const lastPath = pathname.split('/')[pathname.split('/').length - 1];
  const isCanceled = lastPath === CANCELED;
  const [startDay, setStartDay] = useState(optionList[3].value);
  const [page, setPage] = useState(1);
  const { data, isPending, refetch, isRefetching } = useQuery({
    queryKey: [`/profile/orders/${lastPath}`],
    queryFn: () =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<OrderHistory>>('/profile/orders', {
        params: {
          pageNumber: page,
          pageSize: 10,
          hasTotalCount: true,
          startYmd: dayjs().subtract(startDay, 'day').format('YYYY-MM-DD'),
          orderRequestTypes: isCanceled
            ? orderHistoryString[CANCEL_HISTORY].join(',')
            : orderHistoryString[ORDER_HISTORY].join(','),
        },
      }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [startDay, page, pathname]);

  useEffect(() => {
    setPage(1);
  }, [pathname]);

  const titleWording = isCanceled ? '취소/교환/반품' : '주문내역';

  const columns: TableColumn<
    OrderHistoryOption & Pick<OrderHistory, 'payTypeLabel'> & { index: number; length: number }
  >[] = [
    {
      label: '주문일자 / 주문번호',
      field: 'orderNo',
      noBorder: d => d.index !== d.length - 1 && true,
      render: d => (
        <>
          {d.index === 0 && (
            <div className="table-order-number">
              <h4>{dayjs(new Date(d.orderStatusDate.registerYmdt)).format('YYYY.MM.DD')}</h4>
              <div>주문번호</div>
              <button
                onClick={() =>
                  router.push(
                    '/my/order-history/detail/' +
                      d.orderNo +
                      (isCanceled ? '/canceled' : '/completed'),
                  )
                }
              >
                {d.orderNo}
              </button>
            </div>
          )}
        </>
      ),
    },
    {
      label: '상품정보',
      field: 'productName',
      width: '500px',
      render: d => {
        const isSingleOption = d.productName === d.optionValue;

        return (
          <div className="table-product-info">
            <Image src={'https:' + d.imageUrl} width={100} height={100} alt="product-image" />
            <div>
              <p onClick={() => router.push(`/categories/detail/${d.productNo}`)}>
                {d.productName}
              </p>
              <p>{'선택옵션 : ' + (isSingleOption ? '없음' : d.optionValue)}</p>
            </div>
          </div>
        );
      },
    },
    {
      label: '금액 / 수량',
      field: 'price.buyAmt',
      render: d => (
        <div className="table-order-status">
          {d.price.buyAmt.toLocaleString()}원 ({d.orderCnt}개)
        </div>
      ),
    },
    {
      label: '주문상태',
      field: 'orderStatusTypeLabel',
      render: d => (
        <div className={clsx('table-order-status', 'red-needed')}>{d.orderStatusTypeLabel}</div>
      ),
    },
  ];

  return (
    <PcMyOrderHistoryLayoutStyled>
      <PageTitle
        title={titleWording}
        description={`최대 1년간의 ${titleWording}을 확인할 수 있어요.`}
        suffix={
          <Select optionList={optionList} defaultValue={startDay} onChange={e => setStartDay(e!)} />
        }
        noBorder
      />

      <Table
        fullWidth
        loading={isPending || isRefetching}
        columns={columns}
        dataKey="orderOptionNo"
        emptyText="주문내역이 없습니다."
        datas={
          data?.data.items.flatMap(v =>
            v.orderOptions.map((k, i, d) => ({
              ...k,
              payTypeLabel: v.payTypeLabel,
              index: i,
              length: d.length,
            })),
          ) ?? []
        }
      />
      {data && !!data.data.totalCount && (
        <Pagination onChange={setPage} limit={limit} total={data.data.totalCount} />
      )}
      {!(isPending || isRefetching) && !data?.data.totalCount && (
        <Button className="go-shopping" onClick={() => router.push('/')}>
          <Image src={plusRed} width={24} height={24} alt="go-shopping" />
          쇼핑하러 가기
        </Button>
      )}
    </PcMyOrderHistoryLayoutStyled>
  );
}
