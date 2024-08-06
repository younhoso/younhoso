'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import ReviewableItem from '@/components/ReviewableItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { PcMyReviewAvailablePageStyled } from '@/styles/pageStyled/pc/pcMyReviewAvailablePageStyled';
import { Reviewable, TotalCountWithItems } from '@/types';

const limit = 10;
const PcMyReviewAvailable = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['/profile/order-options/product-reviewable'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<Reviewable>>(key, {
        params: {
          pageNumber: page,
          pageSize: limit,
          hasTotalCount: true,
        },
      }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  if (isPending) {
    return <Loading height="440px" />;
  }

  return (
    <PcMyReviewAvailablePageStyled className={clsx(!data?.data.totalCount && 'no-item')}>
      {data?.data.totalCount ? (
        <div className="review-wrapper">
          <div className="review-count">총 {data?.data.totalCount}개</div>
          <div className="review-item-wrapper">
            {...data?.data.items.map(v => (
              <ReviewableItem data={v} key={v.orderOptionNo} refetch={refetch} />
            ))}
          </div>
          <Pagination onChange={setPage} limit={limit} />
        </div>
      ) : (
        <>작성 가능한 리뷰가 없습니다.</>
      )}
    </PcMyReviewAvailablePageStyled>
  );
};

export default PcMyReviewAvailable;
