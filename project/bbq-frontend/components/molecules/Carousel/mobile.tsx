import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import classNames from 'classnames';
import styled from 'styled-components';
import SwiperCore from 'swiper';

import { PLANCK } from '@/constants';

import { CarouselComponentProps } from './Carousel';

export const CarouselMobile: FC<CarouselComponentProps> = props => {
  const { className, onSlideChange, children, ...rest } = props;

  const [swiper, setSwiper] = useState<SwiperCore>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onPrevButtonClick = useCallback(() => {
    if (!swiper) return;
    swiper.slidePrev();
  }, [swiper]);

  const onNextButtonClick = useCallback(() => {
    if (!swiper) return;
    swiper.slideNext();
  }, [swiper]);

  const slides = useMemo(() => {
    if (!children) return [];
    return Array.isArray(children) ? children : [children];
  }, [children]);

  return (
    <Wrapper>
      <Swiper
        className={classNames(className)}
        onSwiper={swiper => setSwiper(swiper)}
        loop={true}
        spaceBetween={0}
        slidesPerView={'auto'}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={350}
        onSlideChange={swiper => {
          const { realIndex } = swiper;
          setCurrentIndex(realIndex);
        }}
        {...rest}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`slide-${index}`}>{slide}</SwiperSlide>
        ))}
      </Swiper>
      <PrevButton onClick={onPrevButtonClick} />
      <NextButton onClick={onNextButtonClick} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
`;

const NextButton = styled.div`
  position: absolute;
  z-index: 1;
  right: ${PLANCK * 3}px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 7px;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 10px;
    height: 2px;
    background-color: black;
  }

  &::before {
    transform: translate(-40%, -4px) rotate(45deg);
  }

  &::after {
    transform: translate(-40%, 2px) rotate(135deg);
  }
`;

const PrevButton = styled(NextButton)`
  left: ${PLANCK * 3}px;
  right: auto;
  transform: translateY(-50%) scaleX(-1);
`;
