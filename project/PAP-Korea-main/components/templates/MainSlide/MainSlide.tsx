import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';

import Link from 'next/link';

import { newsSlideProps } from '~/components/props';
import Image from '~/components/templates/SlideImages';
import { numberToRem } from '~/utils/rem';

import Sensor from '../Sensor';
import { MainSlideStyled } from './styled';

import clsx from 'clsx';
import moment from 'moment';
import 'swiper/css/navigation';
import { StringDecoder } from 'string_decoder';
import { useEffect, useRef, useState } from 'react';

interface MainSlideProps extends newsSlideProps {
  className?: string;
  data: any;
  grid: number;
  setting?: object;
  notSensor?: boolean;
  positionType?: string;
  id?: any;
}

const Arrows = (props?: any) => {
  const { className, style, onClick } = props;

  return (
    <div className={className} onClick={onClick}>
      {props.type === 'right' ? (
        <AiOutlineRight size={numberToRem(32, 1)} color="black" />
      ) : (
        <AiOutlineLeft size={numberToRem(32, 1)} color="black" />
      )}
    </div>
  );
};

const MainSlide = ({
  className,
  data,
  grid,
  heightSize,
  setting,
  id,
  notSensor,
  positionType,
}: MainSlideProps) => {
  const slideRef = useRef<any>(null);

  const settings = {
    // dots: true,
    infinite: false,
    // fade: false,
    // speed: 500,
    // initialSlide: 0,
    slidesToShow: grid,
    centermode: true,
    slidesToScroll: 1,
    // rows: 3,
    // centerPadding: numberToRem(60, 1),
    nextArrow: <Arrows type="right" />,
    prevArrow: <Arrows type="left" />,
    // autoplay: true,
    ...setting,
  };

  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const map = data?.map((x: any, i: any) => {
    const url = `/category/${x?.categoryName
      ? x?.categoryName?.split('&')?.[0]
      : x?.categories?.[0]?.url
      }/${x?.id}${x?.type == 'news' ? `/news` : ''}`;

    return (
      <Sensor once={true} key={i}>
        {({ isVisible }) => (
          <>
            {isVisible || notSensor ? (
              <Link href={url} key={i}>
                <div className={clsx('item', isVisible && `d${i % grid}`, x.title.match(koreanRegex) && "kor")}>
                  <Image
                    heightSize={heightSize}
                    alt="newsImage"
                    src={
                      positionType === "news" ? x?.homeImageURL :
                        x?.imageURL
                          ? x?.imageURL
                          : x?.image?.url
                    }
                  />
                  <div className="testText">
                    <p>
                      {x?.categoryName
                        ? x?.categoryName
                        : x.categories
                          ?.map((x: any) => x.name)
                          .join(' & ')}{' '}
                      - {moment(x?.date).format('DD MMM YYYY')}
                    </p>
                    <h2
                      className={x?.content ? '' : 'bold'}
                    // dangerouslySetInnerHTML={{ __html: x?.title }}
                    >
                      {x?.title}
                    </h2>
                    {(positionType === "news" && x?.type == 'news') ? <p className="subTitle">{x?.subTitle}</p> : null}
                  </div>
                </div>
              </Link>
            ) : (
              <div style={{ width: '100%', height: numberToRem(400, 1) }}></div>
            )}
          </>
        )}
      </Sensor>
    );
  });

  useEffect(() => {
    if (!slideRef?.current) return;
    slideRef.current.slickGoTo(0);
  }, [id]);

  useEffect(() => {
    slideRef.current.slickGoTo(0);
  }, [data]);

  return (
    <MainSlideStyled
      grid={grid}
      heightSize={heightSize}
      className={clsx('MainSlide', className)}
    >
      <Slider ref={slideRef} {...settings}>{map}</Slider>
    </MainSlideStyled>
  );
};

export default MainSlide;
