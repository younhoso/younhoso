import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// import TestVideo from `~/assets/video/pap_cover.mp4`;
import ReactPlayer from 'react-player/youtube';
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';

import { useGet } from '~/apis';
import short from '~/assets/icon/short.svg';
import Sensor from '~/components/templates/Sensor';
import { numberToRem } from '~/utils/rem';

import Img from '../Img';
import Svg from '../Svg';
import { ShortSlideStyled } from './styled';

import clsx from 'clsx';
import SwiperCore, {
  Controller,
  Pagination,
  Navigation,
  Manipulation,
} from 'swiper';

SwiperCore.use([Manipulation]);

// import VideoThumbnail from 'react-video-thumbnail-image';

interface ShortSlideProps {
  className?: string;
}

const ShortSlide = ({ className }: ShortSlideProps) => {
  let onceLoad = false;
  const slidesPerView = 5;
  const { data: getData, isLoading, reload } = useGet('/shortSlide/getData');

  const [activeNum, setActiveNum] = useState<any>(0);
  const [swiperControl, setSwiperControl] = useState<any>(null);
  swiperControl?.update();

  const slideFunction = () => {
    swiperControl.slideNext();
  };

  return (
    <>
      {!isLoading && (
        <ShortSlideStyled
          activeNum={activeNum}
          className={clsx('ShortSlide', className)}
        >
          <Sensor once>
            {({ isVisible }) => (
              <>
                <div className="title">
                  <Svg icon={short} width={numberToRem(40, 1)} color="black" />
                  <p>SHORT</p>
                </div>

                {isVisible && (
                  <Swiper
                    centeredSlidesBounds={true}
                    slideToClickedSlide={true}
                    onChange={setSwiperControl}
                    onSwiper={test => {
                      setSwiperControl(test);
                    }}
                    onSlideChange={test => {
                      if (!swiperControl) return;

                      setSwiperControl(test);
                      swiperControl.update();

                      let ttt =
                        (swiperControl.activeIndex % getData?.length) -
                        Math.ceil(slidesPerView);
                      if (ttt < 0) {
                        ttt = getData?.length + ttt;
                      }

                      setActiveNum(ttt);
                      // setActiveNum(swiperControl.activeIndex);
                    }}
                    loop={true}
                    slidesPerView={slidesPerView}
                    spaceBetween={0}
                    centeredSlides={true}
                    allowTouchMove={false}
                    className="slide"
                  >
                    {isVisible &&
                      getData &&
                      getData?.map((x: any, i: number) => (
                        <SwiperSlide key={i} className={`shortItem_${i}`}>
                          <div className={clsx('item')}>
                            <div className="video">
                              {activeNum % getData?.length === i ? (
                                <ReactPlayer
                                  controls={true}
                                  url={x.videoLink}
                                  muted={true}
                                  playing={true}
                                  width={352}
                                  height={604}
                                  onEnded={slideFunction}
                                />
                              ) : (
                                <img
                                  className="thImage"
                                  src={x?.image?.url}
                                  alt={'title'}
                                />
                              )}
                            </div>
                            <p className="category">
                              {x.categories
                                ?.map((x: any) => x.name)
                                .join(' & ')}
                            </p>
                            <h3 className="title">{x.title}</h3>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                )}
              </>
            )}
          </Sensor>
        </ShortSlideStyled>
      )}
    </>
  );
};

export default ShortSlide;
