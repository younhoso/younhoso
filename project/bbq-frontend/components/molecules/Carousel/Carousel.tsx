import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import classNames from 'classnames';
import styled from 'styled-components';
import SwiperCore from 'swiper';

import { PLANCK } from '@/constants';

import { CarouselMobile } from './mobile';

export interface CarouselProps {
  onSlideChange?: () => void;
}

export interface CarouselComponentProps extends CarouselProps {
  children?: ReactNode | ReactNode[];
  className?: string;
  [x: string]: any;
}

export const Carousel: FC<CarouselComponentProps> & {
  Mobile: FC<CarouselComponentProps>;
} = props => {
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
      <Bullets>
        {slides.map((_, index) => (
          <Bullet key={`slide-${index}`} active={currentIndex == index ? true : false}></Bullet>
        ))}
      </Bullets>
      <PrevButton onClick={onPrevButtonClick} />
      <NextButton onClick={onNextButtonClick} />
    </Wrapper>
  );
};
Carousel.Mobile = CarouselMobile;

const Wrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
`;

const NextButton = styled.div`
  position: absolute;
  z-index: 1;
  right: ${PLANCK * 4}px;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 14px;
    height: 3px;
    background-color: black;
  }

  &::before {
    transform: translate(-40%, -5px) rotate(45deg);
  }

  &::after {
    transform: translate(-40%, 3px) rotate(135deg);
  }
`;

const PrevButton = styled(NextButton)`
  left: ${PLANCK * 4}px;
  right: auto;
  transform: translateY(-50%) scaleX(-1);
`;

const Bullets = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${PLANCK * 4}px;
  height: ${PLANCK * 6}px;
  padding-left: ${PLANCK * 6}px;
  padding-right: ${PLANCK * 6}px;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const Bullet = styled.div<{ active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transition: all 0.2s;
  ${props =>
    props.active
      ? `background-color: #ffffff; box-shadow: 0 0 0 3px #000000;`
      : `background-color: rgba(0, 0, 0, 0.8);`}

  &:not(:nth-child(1)) {
    margin-left: ${PLANCK * 1.5}px;
  }
`;
