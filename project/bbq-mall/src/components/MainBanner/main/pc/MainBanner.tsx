'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import Imagefill from '@/components/Imagefill';
import { Banner } from '@/types/mainBnner';

import { MainBannerStyled } from './styled';

export interface MainBannerProps {
  className?: string;
  error: unknown;
  data: { contents: Banner[] } | undefined;
}

const MainBanner = ({ className, error, data }: MainBannerProps) => {
  const router = useRouter();
  if (error) {
    return <div className="cardslide-error">오류가 발생했습니다.</div>;
  }

  return (
    <MainBannerStyled className={clsx('MainBanner', className)}>
      <div className="main-swiper-wrapper">
        <Swiper
          slidesPerView={1}
          slidesPerGroupSkip={1}
          spaceBetween={16}
          navigation={true}
          loop
          autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
          pagination={{
            type: 'fraction',
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="my-swiper"
        >
          {data?.contents?.map(({ name, imageUrl, landingUrl }, i) => (
            <SwiperSlide className="img-inner" key={name + i}>
              <div className="swiper-image-wrapper" onClick={() => router.push(landingUrl)}>
                <Imagefill className="main-image-fill">
                  <Image
                    src={'https:' + imageUrl}
                    alt={name}
                    sizes="100vw"
                    fill
                    priority
                    unoptimized
                  />
                </Imagefill>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MainBannerStyled>
  );
};

export default MainBanner;
