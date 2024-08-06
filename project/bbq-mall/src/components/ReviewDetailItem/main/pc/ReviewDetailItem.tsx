'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';

import arrowDown from '@/assets/images/my/down-arrow.svg';
import arrowUp from '@/assets/images/my/up-arrow.svg';
import StarRating from '@/components/StarRating';
import { Reviewed } from '@/types';

import { ReviewDetailItemStyled } from './styled';

export interface ReviewDetailItemProps {
  className?: string;
  orderBy?: string;
  data: Reviewed;
}

const ReviewDetailItem = ({ className, orderBy, data }: ReviewDetailItemProps) => {
  const [open, setOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

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
  }, [orderBy, contentRef.current]);

  return (
    <ReviewDetailItemStyled className={clsx('ReviewDetailItem', className)}>
      <div className="review-img-inner">
        <div>
          <span>{data.registerName}</span> <i className="line"></i>
          <span>{dayjs(data.registerYmdt).format('YYYY.MM.DD')}</span>
          <StarRating count={5} size={22} value={data.rate} />
          <p className="option-name">{data.orderedOption.optionValue}</p>
          <p ref={contentRef} className={clsx('content', open && 'active')}>
            {data.content}
          </p>
        </div>
        {data.fileUrls[0] && !open && (
          <div className="review-thumbnail-inner">
            <Image
              className="review-thumbnail-image"
              src={'https:' + data.fileUrls[0]}
              width={122}
              height={122}
              alt="image"
              onClick={() => setOpen(!open)}
            />
            <p className="review-thumbnail-count">{data.fileUrls.length}</p>
          </div>
        )}
      </div>

      <div className={clsx(data.fileUrls[0] && open && 'image-fileUrls')}>
        {open &&
          data.fileUrls.map(v => (
            <Image src={'https:' + v} width={240} height={240} alt="image" key={v} />
          ))}
      </div>

      {isShow && (
        <div className="change-open-button" onClick={() => setOpen(!open)}>
          {!open ? '펼치기' : '접기'}
          <div className="arrow-wrapper">
            <Image src={!open ? arrowDown : arrowUp} width={12} height={12} alt="arrow" />
          </div>
        </div>
      )}
    </ReviewDetailItemStyled>
  );
};

export default ReviewDetailItem;
