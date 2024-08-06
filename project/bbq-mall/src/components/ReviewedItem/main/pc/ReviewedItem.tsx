'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';

import noImage from '@/assets/images/components/no-image.png';
import arrowDown from '@/assets/images/my/down-arrow.svg';
import starActvie from '@/assets/images/my/star-active.svg';
import starInactive from '@/assets/images/my/star-inactive.svg';
import arrowUp from '@/assets/images/my/up-arrow.svg';
import Button from '@/components/Button';
import ReviewWriteModal from '@/components/ReviewWriteModal';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { CreateReview, ModifyReview, Reviewed } from '@/types';

import { ReviewedItemStyled } from './styled';

export interface ReviewedItemProps {
  className?: string;
  data: Reviewed;
  refetch?: () => Promise<unknown>;
}

const ReviewedItem = ({ className, data, refetch }: ReviewedItemProps) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalopen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { mutateAsync } = useMutation({
    mutationFn: (body: CreateReview | ModifyReview) =>
      customAxios(PLATFORMLIST.PC).put(
        `/products/${data.productNo}/product-reviews/${data.reviewNo}`,
        body,
      ),
  });

  useEffect(() => {
    if (contentRef.current !== null) {
      const height = contentRef.current.offsetHeight;
      const scrollHeight = contentRef.current.scrollHeight;
      if (height >= 69 && height < scrollHeight) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    }
  }, []);

  return (
    <>
      <ReviewedItemStyled className={clsx('ReviewedItem', className)}>
        <div className="review-item-info">
          <div className="review-image-wrapper">
            <Image
              src={data.fileUrls.length ? 'https:' + data.fileUrls[0] : noImage}
              width={84}
              height={84}
              alt="image"
              unoptimized
            />
            <div>{data.fileUrls.length}</div>
          </div>
          <div className="review-item-detail">
            <p>{data.productName}</p>
            <div>
              <div>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Image
                      src={i < data.rate ? starActvie : starInactive}
                      width={18}
                      height={20}
                      alt="star"
                      key={i}
                    />
                  ))}
              </div>
              <div>
                <span>{dayjs(new Date(data.registerYmdt)).format('YYYY.MM.DD')} 작성</span>
                {data.updateYmdt && (
                  <span>{dayjs(new Date(data.updateYmdt)).format('YYYY.MM.DD')} 수정</span>
                )}
              </div>
            </div>
          </div>
          <Button size="small" styleType="sub" onClick={() => setModalopen(true)}>
            리뷰 수정
          </Button>
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
      </ReviewedItemStyled>
      {modalOpen && (
        <ReviewWriteModal
          productData={data}
          open={modalOpen}
          onClose={() => setModalopen(false)}
          mutate={mutateAsync}
          reviewData={data}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ReviewedItem;
