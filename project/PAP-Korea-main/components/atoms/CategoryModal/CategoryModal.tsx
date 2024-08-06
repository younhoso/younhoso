import React, { useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { VscArrowRight } from 'react-icons/vsc';
import { Swiper, SwiperSlide } from 'swiper/react';

import SlideImages from '~/components/templates/SlideImages';
import { numberToRem } from '~/utils/rem';

import { CategoryModalStyled } from './styled';

import clsx from 'clsx';

interface CategoryModalProps {
  className?: string;
  open: any;
  onToggle: Function;
  data?: any;
  titleData?: any;
  openNumber: number;

  openOnce: boolean;
  setOpenOnce: any;
}

const CategoryModal = ({
  openNumber,
  className,
  open,
  onToggle,
  data,
  titleData,
  openOnce,
  setOpenOnce,
}: CategoryModalProps) => {
  const [responsive, setResponsive] = useState<number>(500);

  const [slideKey, setSlideKey] = useState<any>(0);
  const [swiper, setSwiper] = useState<any>(null);
  swiper?.update();

  useEffect(() => {
    if (!swiper || !openOnce) return;
    swiper.slideTo(openNumber);

    setOpenOnce(false);
  }, [swiper || null]);

  useEffect(() => {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 1700) {
      setResponsive(450);
    }

    if (innerWidth <= 1480) {
      setResponsive(400);
    }

    if (innerWidth <= 1120) {
      setResponsive(250);
    }
  }, []);

  return (
    open && (
      <CategoryModalStyled
        className={clsx('CategoryModal', open && 'open', className)}
      >
        <button
          className="closeButton"
          onClick={() => {
            setOpenOnce(true);
            onToggle(0, false);
          }}
        >
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
            onChange={setSwiper}
            onSwiper={event => {
              setSwiper(event);
            }}
            onSlideChange={event => {
              if (!swiper) return;

              setSwiper(event);
              swiper.update();

              setSlideKey(event.activeIndex);
            }}
            slideToClickedSlide={true}
            // touchAngle={800}
            preventClicks={true}
            slidesPerView={'auto'}
            spaceBetween={responsive}
            slidesPerGroup={1}
            loopFillGroupWithBlank={true}
          >
            {data.map((x: any, key: number) => (
              <SwiperSlide key={key}>
                <SlideImages heightSize="full" src={x.image.url} />
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
              <div
                className="left"
                style={{ width: numberToRem(responsive, 1) }}
              >
                <div className="top">
                  <h2>{titleData?.title}</h2>
                  <p>{titleData?.subTitle}</p>
                </div>
                <div className="bottom">
                  <pre>{titleData?.contentKR}</pre>
                  {/* <pre>{titleData?.contentEN}</pre> */}
                </div>
              </div>
              <div className="empty"></div>
              <div
                className="right"
                style={{
                  width: numberToRem(responsive, 1),
                  paddingRight: '2rem',
                }}
              >
                {x?.credit?.map((x: any, i: number) => (
                  <div key={i}>
                    <p>{x?.name}</p>
                    <div>
                      {x?.sub?.map((y: any, i: number) => (
                        <a
                          href={y.url}
                          target="_blank"
                          rel="noreferrer"
                          key={i}
                        >
                          &nbsp;@{y.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CategoryModalStyled>
    )
  );
};

export default CategoryModal;
