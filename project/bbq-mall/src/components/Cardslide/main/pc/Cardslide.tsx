'use client';

import { ReactNode, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';

import leftArrow from '@/assets/images/components/left-arrow.svg';
import rightArrow from '@/assets/images/components/right-arrow.svg';
import ProductCard from '@/components/ProductCard';
import { CategoryNo, Product } from '@/types/categorymenu';

import { CardslideStyled } from './styled';

export interface CardslideProps {
  className?: string;
  error: unknown;
  data?: { label?: string; items?: Product[] };
  categoryData?: CategoryNo[];
  children: ReactNode;
}

const MAINPAGE = '/pc';

const Cardslide = ({ className, error, data, categoryData, children }: CardslideProps) => {
  const pathname = usePathname();
  const [swiperController, setSwiperController] = useState<any>(null);
  const [realIndex, setRealIndex] = useState(0);
  const categoryNo = categoryData?.find(v => v.label === data?.label)?.categoryNo;
  if (!data?.items || !data.items.length) {
    return null;
  }

  const dataItems = data.items.slice(0, 6);

  if (error) {
    return <div className="cardslide-error">오류가 발생했습니다</div>;
  }

  return (
    <CardslideStyled className={clsx('Cardslide', className)}>
      {children}
      {realIndex !== 0 && (
        <div
          onClick={() => swiperController?.slidePrev()}
          className={clsx('arrow-wrapper', 'absolute-left')}
        >
          <Image src={leftArrow} width={36} height={36} alt="right" />
        </div>
      )}
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        slidesPerGroupSkip={4}
        spaceBetween={16}
        grabCursor={true}
        scrollbar={true}
        pagination={{
          clickable: true,
        }}
        modules={[Scrollbar]}
        onSwiper={swiper => setSwiperController(swiper)}
        onSlideChange={v => setRealIndex(v.realIndex)}
      >
        {dataItems.map((item, idx) => (
          <SwiperSlide className="img-inner" key={idx}>
            <ProductCard item={item} />
          </SwiperSlide>
        ))}

        {pathname === MAINPAGE && (
          <SwiperSlide className="all-view-inner">
            <Link href={`/categories/${categoryNo}/promote`}>
              <div className="arrow-wrapper">
                <Image src={rightArrow} alt="Next 버튼" width={36} height={36} />
              </div>
              <p>전체보기</p>
            </Link>
          </SwiperSlide>
        )}
      </Swiper>
      {(dataItems.length ?? 0) > 3 &&
        realIndex < (dataItems.length ?? 0) - (pathname === MAINPAGE ? 3 : 4) &&
        realIndex !== 4 - 1 && (
          <div
            onClick={() => swiperController?.slideNext()}
            className={clsx('arrow-wrapper', 'absolute-right')}
          >
            <Image src={rightArrow} width={36} height={36} alt="right" />
          </div>
        )}
    </CardslideStyled>
  );
};

export default Cardslide;
