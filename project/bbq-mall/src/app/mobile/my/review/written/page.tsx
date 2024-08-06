'use client';

import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';

import clsx from 'clsx';

import chicken from '@/assets/images/my/chicken-with-many-chickens.png';
import Loading from '@/components/Loading';
import ReviewedItem from '@/components/ReviewedItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { MobileMyReviewWrittenPageStyled } from '@/styles/pageStyled/mobile/mobileMyReviewWrittenPageStyled';
import { Reviewed, TotalCountWithItems } from '@/types';

const MobileMyReviewWritten = () => {
  const { data, isPending } = useQuery({
    queryKey: ['/profile/product-reviews'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCountWithItems<Reviewed>>(key, {
        params: {
          hasTotalCount: true,
        },
      }),
  });

  return (
    <MobileMyReviewWrittenPageStyled
      className={clsx((isPending || !data?.data.totalCount) && 'no-item')}
    >
      {isPending ? (
        <Loading.Mobile />
      ) : data?.data.totalCount ? (
        <div className="review-wrapper">
          <div className="review-item-wrapper">
            {...data?.data.items.map(v => <ReviewedItem.Mobile data={v} key={v.reviewNo} />)}
          </div>
        </div>
      ) : (
        <>
          작성한 리뷰가 없습니다.
          <Image src={chicken} width={221} height={132} alt="no-item" unoptimized />
        </>
      )}
    </MobileMyReviewWrittenPageStyled>
  );
};

export default MobileMyReviewWritten;
