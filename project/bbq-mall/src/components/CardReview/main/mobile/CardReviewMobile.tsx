'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Pagination } from 'swiper/modules';

import reviewIcon from '@/assets/images/main/reviewIcon.svg';
import thumbnail from '@/assets/images/main/thumbnail.svg';
import StarRating from '@/components/StarRating';
import { Item, ReviewData } from '@/types/mainProduct';

import { CardReviewMobileStyled } from './styled';

export interface CardReviewMobileProps {
  className?: string;
  error?: unknown;
  data: ReviewData;
}

const CardReviewMobile = ({ className, error, data }: CardReviewMobileProps) => {
  const router = useRouter();
  if (error) {
    return <div className="cardslide-error">오류가 발생했습니다</div>;
  }

  if (!data.items.length) {
    return;
  }

  return (
    <CardReviewMobileStyled className={clsx('CardReviewMobile', className)}>
      <Swiper
        slidesPerView={'auto'}
        centeredSlides={false}
        spaceBetween={10}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        loop
        modules={[Pagination]}
        className="cardReview-swiper"
      >
        {data &&
          data.items.map(
            (
              { rate, content, fileUrls, registerName, registerYmdt, productNo }: Item,
              idx: number,
            ) => (
              <SwiperSlide className="img-inner" key={idx}>
                <div
                  className="cardReview-inner"
                  onClick={() => router.push('/categories/detail/' + productNo)}
                >
                  <Image
                    src={fileUrls[0] ? 'https:' + fileUrls[0] : thumbnail}
                    width={64}
                    height={64}
                    alt="star 리뷰 이미지"
                  />
                  <div className="cardReview-description-inner">
                    <Image src={reviewIcon} width={20} height={20} alt="star" />
                    <p className="cart-review-content">{content}</p>
                    <StarRating count={rate} size={16} value={rate} />
                    <p>{registerName}</p>
                    <p>{dayjs(registerYmdt).format('YYYY.MM.DD')}</p>
                  </div>
                </div>
              </SwiperSlide>
            ),
          )}
      </Swiper>
    </CardReviewMobileStyled>
  );
};

export default CardReviewMobile;
