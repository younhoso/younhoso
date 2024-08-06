'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';

import Imagefill from '@/components/Imagefill';
import { Banner } from '@/types/mainBnner';

import { MainBannerMobileStyled } from './styled';

export interface MainBannerMobileProps {
  className?: string;
  error: unknown;
  data: { contents: Banner[] } | undefined;
}

const MainBannerMobile = ({ className, error, data }: MainBannerMobileProps) => {
  const router = useRouter();
  if (error) {
    return <div className="cardslide-error">오류가 발생했습니다.</div>;
  }

  return (
    <MainBannerMobileStyled className={clsx('MainBannerMobile', className)}>
      <div className="main-swiper-wrapper">
        <Swiper
          slidesPerView={1}
          slidesPerGroupSkip={1}
          spaceBetween={16}
          pagination={{
            type: 'fraction',
          }}
          autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
          loop
          modules={[Pagination, Autoplay]}
          className="custom-swiper"
        >
          {data?.contents?.map(({ name, imageUrl, landingUrl }, i) => (
            <SwiperSlide className="img-inner" key={name + i}>
              <div className="swiper-image-wrapper" onClick={() => router.push(landingUrl)}>
                <Imagefill.Mobile className="main-image-fill">
                  <Image
                    src={'https:' + imageUrl}
                    alt={name}
                    fill
                    sizes="100vw"
                    priority
                    unoptimized
                  />
                </Imagefill.Mobile>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MainBannerMobileStyled>
  );
};

export default MainBannerMobile;
