'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { Autoplay, Pagination } from 'swiper/modules';

import checkboxMobile from '@/assets/images/main/checkbox-mobile.svg';
import { setLocalStorageItem } from '@/utils/localStorage';

import { PopupProps, hideTodayKey } from '../pc/Popup';
import { PopupMobileStyled } from './styled';

const PopupMobile = ({ className, popupList }: PopupProps) => {
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
    <PopupMobileStyled className={clsx('PopupMobile', className)}>
      <div>
        <Swiper
          slidesPerView={1}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          loop
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay]}
          pagination={{
            type: 'fraction',
          }}
        >
          {popupList.map(({ image, url }, index) => (
            <SwiperSlide key={index}>
              <div className="popup-image-wrapper">
                <Image
                  fill
                  sizes="100vw"
                  alt="popup"
                  src={image}
                  onClick={() => url && router.push(url)}
                />
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
            <Image src={checkboxMobile} width={20} height={20} alt="no-more" />
            오늘 그만보기
          </div>
          <p onClick={() => setShow(false)}>닫기</p>
        </div>
      </div>
    </PopupMobileStyled>
  );
};

export default PopupMobile;
