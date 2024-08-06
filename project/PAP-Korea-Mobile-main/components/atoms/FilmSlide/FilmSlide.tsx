import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { GrFormClose } from 'react-icons/gr';
import ReactPlayer from 'react-player/youtube';
import Slider from 'react-slick';
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';

import { useGet } from '~/apis';
import SlideImages from '~/components/templates/SlideImages';

import CategoryModal from '../CategoryModal';
import { FilmSlideStyled } from './styled';

import clsx from 'clsx';

interface FilmSlideProps {
  className?: string;
}

const setting = {
  swipe: false,
  fade: true,
  infinite: true,
  arrows: false,
  slidesToShow: 1,
  speed: 700,
};

const view = 2.25;

const FilmSlide = ({ className }: FilmSlideProps) => {
  const {
    data: List,
    isLoading,
    reload,
  } = useGet('/filmSlide/getData', {
    qs: {
      searchQuery: {
        mainShow: true,
      },
      options: { offset: 0, limit: 10 },
    },
  });
  const [once, setOnce] = useState(true);
  const [activeNum, setActiveNum] = useState(0);
  const [slideRotate, setSlideRotate] = useState(0);
  const [slidePress, setSlidePress] = useState(false);
  const [swiperControl, setSwiperControl] = useState<any>(null);


  const screenTest = useFullScreenHandle();
  const screenActive = useMemo(() => screenTest.active, [screenTest]);


  const sliderRef = useRef<any>(null);
  const slidePrev = useRef<any>(null);

  const textRef = useRef<any>(null);

  const ImageSlide = List?.map((x: any, i: number) => {
    return (
      <SlideImages
        onClick={() => { setSlidePress(false); screenTest.enter(); }}
        key={i}
        heightSize="full"
        src={x?.image?.url}
        alt="images"
      />
    );
  });

  useEffect(() => {
    sliderRef?.current?.slickGoTo(activeNum);
  }, [activeNum, swiperControl]);

  const clickEvent = (key: number) => {
    if (slidePress) return;
    const roundHalf = 360 / List.length;

    if (activeNum === 0 && key === List.length - 1) {
      slidePrev.current.rotate = -360;
      setSlideRotate(360);
    }

    if (key === 0 && activeNum === List.length - 1) {
      slidePrev.current.rotate = roundHalf;
      setSlideRotate(-roundHalf);
    }

    setTimeout(() => {
      textRef.current.style.transition = '0.5s all';
      slidePrev.current.rotate = key * (-360 / List.length);
      setSlideRotate(key * (360 / List.length));
      setActiveNum(key);
    }, 75);
  };

  const videoMemo = useMemo(() => {
    return (
      <FullScreen handle={screenTest}>
        {screenActive && (
          <button
            className={clsx('filmCloseButtonStyle')}
            onClick={screenTest.exit}
          >
            <GrFormClose
              fontSize="5rem"
              color="white"
              style={{ color: 'white' }}
            />
          </button>
        )}
        {screenActive && <ReactPlayer
          url={List?.[activeNum]?.videoLink}
          className="react-player"
          playing={true}
          muted={true}
          width="100%"
          height="100%"
          controls={true}
        />}
      </FullScreen>
    );
  }, [screenActive]);


  return (
    <>
      <FilmSlideStyled
        className={clsx('FilmSlide', className)}
        activeNum={activeNum}
      >
        <div className="slideImages">
          <div>
            <Slider
              ref={sliderRef}
              beforeChange={() => {
                if (once) {
                  setOnce(false);
                  return;
                }
                setSlidePress(true);
              }}
              afterChange={() => {
                setSlidePress(false);
                // swiperControl.enable();
              }}
              {...setting}
            >
              {ImageSlide}
            </Slider>
          </div>
        </div>
        <div
          className="bottomText"
          onTouchStart={e => {
            if (slidePress) return;
            slidePrev.current = {
              test: e?.targetTouches?.[0]?.pageX,
              rotate: slidePrev.current?.rotate || 0,
            };

            textRef.current.style.transition = '0s';

            // window.document.body.style.touchAction = 'none';
          }}
          onTouchMove={e => {
            if (slidePress) return;
            const now = e.targetTouches?.[0]?.pageX;
            const moveCount = now - slidePrev.current.test;
            slidePrev.current.rotate += moveCount / 8;

            if (slidePrev.current.rotate > 0) slidePrev.current.rotate = -360;
            if (slidePrev.current.rotate < -360) slidePrev.current.rotate = 0;
            if (!slidePrev.current?.loop) {
              slidePrev.current.inter = setTimeout(() => {
                setSlideRotate(-slidePrev.current.rotate);
                slidePrev.current.loop = false;
              }, 10);
            }
            slidePrev.current.loop = true;
            // setSlideRotate(slideRotate + moveCount / 10);

            slidePrev.current.test = now;
            slidePrev.current.rotate = slidePrev.current.rotate;
          }}
          onTouchEnd={e => {
            if (slidePress) return;

            clearInterval(slidePrev.current.inter);
            const now = -slidePrev.current.rotate % 360;
            const roundHalf = 360 / List.length;

            const arrays = Array(List.length)
              .fill('')
              .map((x: any, key) => {
                const nowRound = key * roundHalf;
                let min = nowRound - roundHalf / 2;

                return {
                  id: key,
                  value: nowRound,
                  min: min,
                  max: nowRound + roundHalf / 2,
                };
              });

            // const nowAngle = now > slideMaxAngle ? 360 - roundHalf / 2 : now;

            const slideMinAngle = roundHalf / 2;
            const slideMaxAngle = (List.length - 1) * roundHalf + roundHalf / 2;

            const findSlide: any = arrays.find(x => {
              let nowAngle = now;
              if (x.id === 0) {
                nowAngle = slideMaxAngle < now ? -(now - slideMaxAngle) : now;
              }
              return x.min < nowAngle && nowAngle < x.max;
            });

            if (slideMaxAngle < slideRotate) {
              slidePrev.current.rotate = -(360 - slideRotate);
              setSlideRotate(-(360 - slideRotate));
            }

            setTimeout(() => {
              textRef.current.style.transition = '0.5s all';
              slidePrev.current.rotate = findSlide.id * (-360 / List.length);
              setSlideRotate(findSlide.id * (360 / List.length));
              setActiveNum(findSlide.id);
            }, 75);
          }}
        >
          <div
            ref={textRef}
            className="circleText"
            style={{
              width: '100%',
              height: '70rem',
              transform: `rotate(${-slideRotate}deg)`,
              // transform: `rotate(${slideRotate}deg)`,
            }}
          >
            {List?.map((x: any, key: number) => {
              return (
                <div
                  className="circleTextItem"
                  key={key}
                  style={{
                    transform: `translate(-50%, 0) rotate(${key * (360 / List.length)
                      }deg)`,
                  }}
                  onClick={() => clickEvent(key)}
                >
                  <p style={{ maxWidth: ' 150px', whiteSpace: 'break-spaces' }}>
                    {x.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* {false && ( */}
          <Swiper
            // centeredSlidesBounds={true}
            slideToClickedSlide={true}
            onChange={setSwiperControl}
            onSwiper={setSwiperControl}
            onSlideChange={test => {
              if (!swiperControl) return;

              setSwiperControl(test);
              swiperControl.update();

              let ttt =
                (swiperControl.activeIndex % List.length) - Math.ceil(view);
              if (ttt < 0) {
                ttt = List.length + ttt;
              }

              setActiveNum(ttt);
            }}
            loop={true}
            slidesPerView={view}
            spaceBetween={0}
            centeredSlides={true}
            className="slide"
            speed={800}
            onProgress={e => {
              // console.log('drag', e.progress);
            }}
          >
            {List?.map((x: any, key: number) => (
              <SwiperSlide key={key}>
                <div className={clsx('textItem')}>
                  <p style={{ color: 'white' }}>{x.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* )} */}

          {videoMemo}
        </div>
      </FilmSlideStyled>
    </>
  );
};

export default FilmSlide;
