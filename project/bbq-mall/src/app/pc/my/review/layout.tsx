'use client';

import { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import ContentTitle from '@/components/ContentTitle';
import { reviewTabItemList } from '@/constant/reviewTabItem';
import { useGetReplacedPathname } from '@/hooks/useGetReplacedPathname';
import { PcMyReviewLayoutStyled } from '@/styles/pageStyled/pc/pcMyReviewLaoutStyled';

export default function MyReviewLayout({ children }: { children: ReactNode }) {
  const replacedPathname = useGetReplacedPathname();
  const router = useRouter();
  return (
    <PcMyReviewLayoutStyled>
      <ContentTitle border={false} title="상품 리뷰">
        리뷰 작성하시고 최대 포인트 혜택을 누려보세요.
      </ContentTitle>

      <div className="review-button-wrapper">
        {reviewTabItemList.map((v, i) => (
          <Button
            key={v.label}
            size="small"
            {...(replacedPathname === v.path && { styleType: 'sub' })}
            onClick={() => router.push(v.path)}
          >
            {v.label}
          </Button>
        ))}
      </div>
      {children}
    </PcMyReviewLayoutStyled>
  );
}
