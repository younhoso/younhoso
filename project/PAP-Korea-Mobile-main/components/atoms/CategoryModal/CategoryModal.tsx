import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { VscArrowRight } from 'react-icons/vsc';
import { Swiper, SwiperSlide } from 'swiper/react';

import SlideImages from '~/components/templates/SlideImages';

import { CategoryModalStyled } from './styled';

import clsx from 'clsx';

interface CategoryModalProps {
  className?: string;
  open: any;
  onToggle: Function;
  data?: any;
}

const CategoryModal = ({
  className,
  open,
  onToggle,
  data,
}: CategoryModalProps) => {
  const [slideKey, setSlideKey] = useState<any>(0);

  return (
    open && (
      <CategoryModalStyled
        className={clsx('CategoryModal', open && 'open', className)}
      >
        <button className="closeButton" onClick={() => onToggle()}>
          <GrFormClose
            fontSize="5rem"
            color="white"
            style={{ color: 'white' }}
          />
        </button>

        <div className="slideImages">
          <Swiper
            speed={1125}
            className="slide"
            centeredSlides={true}
            onSlideChange={event => {
              setSlideKey(event.activeIndex);
            }}
            slideToClickedSlide={true}
            // touchAngle={800}
            preventClicks={true}
            slidesPerView={'auto'}
            spaceBetween={500}
            slidesPerGroup={1}
            loopFillGroupWithBlank={true}
          >
            {data.map((x: any, key: number) => (
              <SwiperSlide key={key}>
                <SlideImages heightSize="full" src={x.img} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="contentLists">
          {data.map((x: any, key: number) => (
            <div
              key={key}
              className={clsx(
                'content',
                key === slideKey && 'show',
                key !== slideKey && 'out',
              )}
            >
              <div className="left">
                <div className="top">
                  <h2>{x.title}</h2>
                  <p>{x.subTitle}</p>
                </div>
                <div className="bottom">
                  <p>{x.description}</p>
                </div>
              </div>
              <div className="empty"></div>
              <div className="right">{x?.content}</div>
            </div>
          ))}
        </div>
      </CategoryModalStyled>
    )
  );
};

export default CategoryModal;
