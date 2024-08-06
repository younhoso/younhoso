'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';

import arrowDown from '@/assets/images/my/down-arrow.svg';
import arrowUp from '@/assets/images/my/up-arrow.svg';
import Imagefill from '@/components/Imagefill';
import StarRating from '@/components/StarRating';
import { Reviewed } from '@/types';

import { ReviewDetailItemMobileStyled } from './styled';

export interface ReviewDetailItemMobileProps {
  className?: string;
  orderBy?: string;
  data: Reviewed;
}

const ReviewDetailItemMobile = ({ className, orderBy, data }: ReviewDetailItemMobileProps) => {
  const [open, setOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

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
  }, [orderBy, contentRef.current]);

  return (
    <ReviewDetailItemMobileStyled className={clsx('ReviewDetailItemMobile', className)}>
      <div className="review-img-inner">
        <div>
          <span>{data.registerName}</span> <i className="line"></i>
          <span>{dayjs(data.registerYmdt).format('YYYY.MM.DD')}</span>
          <StarRating count={5} size={20} value={data.rate} />
          <p className="option-name">{data.orderedOption.optionValue}</p>
          <div className="review-content-inner">
            <p ref={contentRef} className={clsx('content', open && 'active')}>
              {data.content}
            </p>
            {data.fileUrls[0] && !open && (
              <div className="review-thumbnail-inner">
                <Image
                  src={'https:' + data.fileUrls[0]}
                  width={72}
                  height={72}
                  alt="image"
                  onClick={() => setOpen(!open)}
                />
                <p className="review-thumbnail-count">{data.fileUrls.length}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={clsx(data.fileUrls[0] && open && 'image-fileUrls')}>
        {open &&
          data.fileUrls.map(v => (
            <Imagefill.Mobile key={v}>
              <Image src={'https:' + v} alt="image" fill sizes="100vw" priority />
            </Imagefill.Mobile>
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
    </ReviewDetailItemMobileStyled>
  );
};

export default ReviewDetailItemMobile;
