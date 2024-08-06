'use client';

import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';

import clsx from 'clsx';

import chicken from '@/assets/images/my/chicken-with-many-chickens.png';
import Loading from '@/components/Loading';
import ReviewableItem from '@/components/ReviewableItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { MobileMyReviewAvailablePageStyled } from '@/styles/pageStyled/mobile/mobileMyReviewAvailablePageStyled';
import { Reviewable, TotalCountWithItems } from '@/types';

const MobileMyReviewAvailable = () => {
  const { data, isPending } = useQuery({
    queryKey: ['/profile/order-options/product-reviewable'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCountWithItems<Reviewable>>(key, {
        params: {
          hasTotalCount: true,
        },
      }),
  });

  return (
    <MobileMyReviewAvailablePageStyled
      className={clsx((isPending || !data?.data.totalCount) && 'no-item')}
    >
      {isPending ? (
        <Loading.Mobile />
      ) : data?.data.totalCount ? (
        <div className="review-wrapper">
          <div className="review-item-wrapper">
            {...data?.data.items.map(v => <ReviewableItem.Mobile data={v} key={v.orderOptionNo} />)}
          </div>
        </div>
      ) : (
        <>
          작성 가능한 리뷰가 없습니다.
          <Image src={chicken} width={221} height={132} alt="no-item" unoptimized />
        </>
      )}
    </MobileMyReviewAvailablePageStyled>
  );
};

export default MobileMyReviewAvailable;
