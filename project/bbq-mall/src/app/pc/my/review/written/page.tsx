'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import ReviewedItem from '@/components/ReviewedItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { PcMyReviewWrittenPageStyled } from '@/styles/pageStyled/pc/pcMyReviewWrittenPageStyled';
import { Reviewed, TotalCountWithItems } from '@/types';

const limit = 10;
const PcMyReviewWritten = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['/profile/product-reviews'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<Reviewed>>(key, {
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
    <PcMyReviewWrittenPageStyled className={clsx(!data?.data.totalCount && 'no-item')}>
      {data?.data.totalCount ? (
        <div className="review-wrapper">
          <div className="review-count">총 {data?.data.totalCount}개</div>
          <div className="review-item-wrapper">
            {...data?.data.items.map(v => (
              <ReviewedItem data={v} key={v.reviewNo} refetch={refetch} />
            ))}
          </div>
          <Pagination onChange={setPage} limit={limit} />
        </div>
      ) : (
        <>작성한 리뷰가 없습니다.</>
      )}
    </PcMyReviewWrittenPageStyled>
  );
};

export default PcMyReviewWritten;
