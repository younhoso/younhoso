'use client';

import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Swiper } from 'swiper/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Pagination } from 'swiper/modules';

import checkbox from '@/assets/images/main/checkbox.svg';
import { setLocalStorageItem } from '@/utils/localStorage';

import { PopupStyled } from './styled';

export interface PopupProps {
  className?: string;
  popupList: PopupSlide[];
}

export interface PopupSlide {
  image: string;
  url: string | undefined;
}

export const hideTodayKey = 'hide';

const Popup = ({ className, popupList }: PopupProps) => {
  const router = useRouter();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  if (!show) {
    return;
  }

  return (
    <PopupStyled className={clsx('Popup', className)}>
      <div>
        <Swiper
          slidesPerView={1}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          loop
          autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
          modules={[Pagination, Autoplay]}
          pagination={{
            type: 'fraction',
          }}
        >
          {popupList.map(({ url, image }, index) => (
            <SwiperSlide key={index}>
              <div className={clsx(url && 'cursor-needed', 'image-wrapper')}>
                <div className="popup-image-wrapper">
                  <Image
                    width={800}
                    height={560}
                    alt="popup"
                    src={image}
                    onClick={() => url && router.push(url)}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="popup-bottom">
          <div
            onClick={() => {
              setShow(false);
              setLocalStorageItem(hideTodayKey, true, 24 * 60 * 60 * 1000);
            }}
          >
            <Image src={checkbox} width={20} height={20} alt="no-more" />
            오늘 그만보기
          </div>
          <p onClick={() => setShow(false)}>닫기</p>
        </div>
      </div>
    </PopupStyled>
  );
};

export default Popup;
