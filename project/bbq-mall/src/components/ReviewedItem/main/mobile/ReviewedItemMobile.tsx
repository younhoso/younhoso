'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';

import noImage from '@/assets/images/components/no-image.png';
import arrowDown from '@/assets/images/my/down-arrow.svg';
import starActvie from '@/assets/images/my/star-active.svg';
import starInactive from '@/assets/images/my/star-inactive.svg';
import arrowUp from '@/assets/images/my/up-arrow.svg';
import Button from '@/components/Button';
import { Reviewed } from '@/types';

import { ReviewedItemMobileStyled } from './styled';

export interface ReviewedItemMobileProps {
  className?: string;
  data: Reviewed;
}

const ReviewedItemMobile = ({ className, data }: ReviewedItemMobileProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (contentRef.current !== null) {
      const height = contentRef.current.offsetHeight;
      const scrollHeight = contentRef.current.scrollHeight;
      if (height >= 60 && height < scrollHeight) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    }
  }, []);

  return (
    <ReviewedItemMobileStyled className={clsx('ReviewedItemMobile', className)}>
      <div className="review-item-info">
        <div className="review-image-wrapper">
          <Image
            src={data.fileUrls.length ? 'https:' + data.fileUrls[0] : noImage}
            width={72}
            height={72}
            alt="image"
          />
          <div>{data.fileUrls.length}</div>
        </div>
        <div className="review-item-detail">
          <p>{data.productName}</p>
          <div className="rate-list">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Image
                  src={i < data.rate ? starActvie : starInactive}
                  width={18}
                  height={17}
                  alt="star"
                  key={i}
                />
              ))}
          </div>
          <div className="modif-ydate-wrapper">
            <span>{dayjs(new Date(data.registerYmdt)).format('YYYY.MM.DD')} 작성</span>
            {data.updateYmdt && (
              <span>{dayjs(new Date(data.updateYmdt)).format('YYYY.MM.DD')} 수정</span>
            )}
          </div>
        </div>
      </div>
      <div ref={contentRef} className={clsx('review-item-content', !open && 'closed')}>
        {data.content}
      </div>

      {isShow && (
        <div className="change-open-button" onClick={() => setOpen(!open)}>
          {!open ? '펼치기' : '접기'}
          <div className="arrow-wrapper">
            <Image src={!open ? arrowDown : arrowUp} width={12} height={12} alt="arrow" />
          </div>
        </div>
      )}
      <Button
        size="small"
        styleType="sub"
        onClick={() => router.push(`/my/edit/review/${data.productNo}?review=${data.reviewNo}`)}
      >
        리뷰 수정
      </Button>
    </ReviewedItemMobileStyled>
  );
};

export default ReviewedItemMobile;
