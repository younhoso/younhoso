'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { pick } from 'lodash';

import rightArrow from '@/assets/images/my/right-arrow.svg';
import Button from '@/components/Button';
import Table, { TableColumn } from '@/components/Table/main/pc/Table';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { MEMBER_GRADE_IMAGE_LIST } from '@/constant/memberGradeImageList';
import { myInfoPageInitialData } from '@/constant/myInfoPageRelated';
import {
  CANCEL_HISTORY,
  HISTORY_LIST,
  HistoryListElement,
  ORDER_HISTORY,
  orderHistoryItems,
  orderHistoryString,
  orderHistoryToKor,
} from '@/constant/orderHistory';
import { customAxios } from '@/libs/customAxios';
import { PcMyInfoPageStyled } from '@/styles/pageStyled/pc/pcMyInfoPageStyled';
import { MyData, OrderHistorySummary, TotalCount, TotalCountWithItems } from '@/types';
import { OrderHistory, OrderHistoryOption } from '@/types/orderHistoryRelated';

const PcMyInfo = () => {
  const router = useRouter();
  const { data: myData } = useQuery({
    queryKey: ['/profile'],
    queryFn: async ({ queryKey: [key] }) => {
      const res = await customAxios(PLATFORMLIST.PC).get<MyData>(key);
      const memberGrade = MEMBER_GRADE_IMAGE_LIST[res.data.memberGradeName];

      return { ...res, memberGrade };
    },
  });
  const [active, setActive] = useState<HistoryListElement>(ORDER_HISTORY);

  const { data: briefData } = useQuery({
    queryKey: ['/brief-info'],
    queryFn: async () => {
      const { data: point } = await customAxios(PLATFORMLIST.PC).get<{ totalAvailableAmt: number }>(
        '/profile/accumulations/summary',
      );
      const { data: coupon } = await customAxios(PLATFORMLIST.PC).get<{
        usableCouponCnt: number;
      }>('/coupons/summary', {
        params: { hasTotalCount: true },
      });
      const { data: like } = await customAxios(PLATFORMLIST.PC).get<TotalCount>(
        '/profile/like-products',
        { params: { hasTotalCount: true } },
      );

      return {
        point: { ...myInfoPageInitialData.point, value: point.totalAvailableAmt },
        coupon: { ...myInfoPageInitialData.coupon, value: coupon.usableCouponCnt },
        like: { ...myInfoPageInitialData.like, value: like.totalCount },
      };
    },
    initialData: myInfoPageInitialData,
  });

  const { data: order } = useQuery({
    queryKey: ['/profile/orders/summary/status'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<OrderHistorySummary>(key),
  });

  const { data, isPending, refetch, isRefetching } = useQuery({
    queryKey: ['/profile/orders'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<OrderHistory>>(key, {
        params: {
          page: 1,
          pageSize: 5,
          orderRequestTypes: orderHistoryString[active].join(','),
        },
      }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [active]);

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
                      (active === CANCEL_HISTORY ? '/canceled' : '/completed'),
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
    <PcMyInfoPageStyled>
      <div className="my-brief">
        <div className="brief-left">
          <Image
            src={myData?.memberGrade?.image ?? MEMBER_GRADE_IMAGE_LIST.WELCOME.image}
            width={76}
            height={84}
            unoptimized
            alt="profile-grade"
          />
          <div>
            <p>
              <span>{myData?.data.memberName}</span> 님은
            </p>
            <p>
              <span>{myData?.data.memberGradeName}</span> 등급입니다.
            </p>
          </div>
        </div>
        <div className="brief-right">
          {Object.entries(briefData).map(([key, value]) => (
            <div key={key}>
              <div onClick={() => router.push(value.linkTo)}>
                {value.label}
                <Image src={rightArrow} width={12} height={12} alt={value.label} />
              </div>
              <div>
                {value.value}
                {value.unit}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="brief-button-wrapper">
        <Button size="small" onClick={() => window.open('https://bbq.co.kr/mypage')}>
          회원정보 수정
        </Button>
        <Button size="small" onClick={() => router.push('/my/address')}>
          배송지 관리
        </Button>
      </div>

      <div className="my-order">
        <div className="order-header">
          <div>
            <span>최근 주문 내역</span>
            최근 3개월 간의 주문내역입니다
          </div>
        </div>

        <div className="order-button-wrapper">
          {HISTORY_LIST.map(v => (
            <Button
              key={v}
              onClick={() => {
                setActive(v);
              }}
              size="small"
              className={clsx(v !== active && 'no-active')}
              {...(v === active && { styleType: 'sub' })}
            >
              {v}
            </Button>
          ))}
        </div>

        <div className="order-status">
          {Object.entries(pick(order?.data, orderHistoryItems[active])).map(([key, value]) => (
            <div key={key} className={clsx(active === CANCEL_HISTORY && 'slash')}>
              <div>
                <p>{value}</p>

                <p>{orderHistoryToKor[key]}</p>
              </div>
            </div>
          ))}
        </div>
        <Table
          fullWidth
          loading={isPending || isRefetching}
          columns={columns}
          dataKey="orderOptionNo"
          emptyText="최근 3개월간의 내역이 없습니다."
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
        {!isPending && (
          <Button
            className="show-detail"
            onClick={() =>
              router.push(
                `/my/order-history/list/${active === CANCEL_HISTORY ? 'canceled' : 'all'}`,
              )
            }
          >
            자세히 보기
          </Button>
        )}
      </div>
    </PcMyInfoPageStyled>
  );
};

export default PcMyInfo;
