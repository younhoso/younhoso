import { HTMLAttributes, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';

import { CategoryInfoVisualStyled } from './styled';

import clsx from 'clsx';

interface CategoryInfoVisualProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  data?: any;
  activeNum?: any;
  setActiveNum?: any;
  mainData?: any;
  ref?: any;
}

const CategoryInfoVisual = ({
  className,
  activeNum,
  setActiveNum,
  data,
  mainData,
}: CategoryInfoVisualProps) => {
  const [swiperControl, setSwiperControl] = useState<any>(null);
  const [scrollY, setScrollY] = useState(0);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scroll2scale = () => {
    const val = scrollY > 500 ? 500 : scrollY;

    return 0.75 + (0.25 * val) / 500;
  };

  const scroll2opacity = () => {
    const val = scrollY > 500 ? 500 : scrollY;

    return (0.85 * val) / 500;
  };

  const percent = activeNum / data?.length;

  const SliderItems = data?.map((x: any, i: number) => {
    return (
      <SwiperSlide key={i}>
        <div
          style={{ transform: `scale(${scroll2scale()})` }}
          className="slideImg"
        >
          <img src={x?.image?.url} alt={''} />
        </div>
      </SwiperSlide>
    );
  });
  const backImgHtml = data?.map((x: any, i: number) => (
    <>
      <img
        key={i}
        src={x?.image?.url}
        alt=""
        className={clsx('back', activeNum == i + 1 ? 'show' : '')}
      />
    </>
  ));

  const date = new Date(mainData?.date);

  const month = date.getMonth();
  const day = date.getDate();

  return (
    <CategoryInfoVisualStyled className={clsx('CategoryInfoVisual', className)}>
      <div className="visual">
        <div>
          <img
            className={clsx('back', activeNum == 0 ? 'show' : '')}
            src={mainData?.image?.url}
            alt={'asd'}
          />
          {backImgHtml}

          <Swiper
            slideToClickedSlide={true}
            onChange={setSwiperControl}
            onSwiper={setSwiperControl}
            onSlideChange={test => {
              if (!swiperControl) return;

              setSwiperControl(test);
              swiperControl.update();

              setActiveNum(swiperControl.activeIndex);
            }}
          >
            <SwiperSlide>
              <div
                style={{ transform: `scale(${scroll2scale()})` }}
                className="slideImg"
              >
                <img src={mainData?.image?.url} alt={''} />
              </div>
            </SwiperSlide>
            {SliderItems}
          </Swiper>
          <div className="bar">
            <p>
              {day} {monthNames?.[month]}
            </p>
            <div className="progressbar">
              <div className="now" style={{ width: `${percent * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div
          className="opacityOverlay"
          style={{ opacity: `${scroll2opacity()}` }}
        />
      </div>
    </CategoryInfoVisualStyled>
  );
};

export default CategoryInfoVisual;
