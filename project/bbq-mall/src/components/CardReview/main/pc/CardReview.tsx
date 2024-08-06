'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation } from 'swiper/modules';

import leftArrow from '@/assets/images/components/left-arrow.svg';
import rightArrow from '@/assets/images/components/right-arrow.svg';
import reviewIcon from '@/assets/images/main/reviewIcon.svg';
import thumbnail from '@/assets/images/main/thumbnail.svg';
import StarRating from '@/components/StarRating';
import { Item, ReviewData } from '@/types/mainProduct';

import { CardReviewStyled } from './styled';

export interface CardReviewProps {
  className?: string;
  error?: unknown;
  data: ReviewData;
}

const CardReview = ({ className, error, data }: CardReviewProps) => {
  const router = useRouter();

  const [swiperController, setSwiperController] = useState<any>(null);
  const [realIndex, setRealIndex] = useState(0);

  if (error) {
    return <div className="cardslide-error">오류가 발생했습니다</div>;
  }

  if (!data.items.length) {
    return;
  }

  return (
    <CardReviewStyled className={clsx('CardReview', className)}>
      <div className="card-review-wrapper">
        {data.items.length > 5 && (
          <div
            onClick={() => swiperController?.slidePrev()}
            className={clsx('arrow-wrapper', 'absolute-left')}
          >
            <Image src={leftArrow} width={36} height={36} alt="right" />
          </div>
        )}
        <Swiper
          slidesPerView={5}
          slidesPerGroupSkip={5}
          centeredSlides={false}
          grabCursor={true}
          loop
          onSwiper={swiper => setSwiperController(swiper)}
          onSlideChange={v => setRealIndex(v.realIndex)}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay]}
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
                      <StarRating count={rate} size={24} value={rate} />
                      <p>{registerName}</p>
                      <p>{dayjs(registerYmdt).format('YYYY.MM.DD')}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ),
            )}
        </Swiper>

        {data.items.length > 5 && (
          <div
            onClick={() => swiperController?.slideNext()}
            className={clsx('arrow-wrapper', 'absolute-right')}
          >
            <Image src={rightArrow} width={36} height={36} alt="right" />
          </div>
        )}
      </div>
    </CardReviewStyled>
  );
};

export default CardReview;
