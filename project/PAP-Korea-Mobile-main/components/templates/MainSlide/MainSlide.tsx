import { useEffect, useRef } from 'react';
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
import { Autoplay } from 'swiper';
import 'swiper/css/navigation';

interface MainSlideProps extends newsSlideProps {
  className?: string;
  data: any;
  grid: number;
  auto?: boolean;
  center?: boolean;
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
  auto,
  center,
  notSensor,
  id,
  positionType,
}: MainSlideProps) => {
  const slideRef = useRef<any>(null);

  // let autoSetTimeout: any = null;

  // const settings = {
  //   // dots: true,
  //   infinite: false,
  //   // fade: false,
  //   // speed: 500,
  //   // initialSlide: 0,
  //   slidesToShow: grid,
  //   pauseOnFocus: true,
  //   pauseOnHover: true,
  //   centermode: true,
  //   speed: 700,
  //   slidesToScroll: 1,
  //   autoplay: auto || false,
  //   autoplaySpeed: 4000,
  //   loop: true,
  //   centerMode: center || false,
  //   // rows: 3,
  //   // centerPadding: numberToRem(60, 1),
  //   nextArrow: <Arrows type="right" />,
  //   prevArrow: <Arrows type="left" />,

  //   arrows: false,

  //   beforeChange: (slider: any) => {
  //     console.log('시작', slider);
  //     clearTimeout(autoSetTimeout);
  //   },

  //   onSwipe: () => {
  //     console.log('테스트');
  //   },

  //   afterChange: (slider: any) => {
  //     if (!auto) return;

  //     autoSetTimeout = setTimeout(() => {
  //       if (!slideRef?.current) return;
  //       slideRef.current.slickGoTo(0);
  //     }, 4000);
  //   },
  //   // autoplay: true,
  //   ...setting,
  // };
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const map = data?.map((x: any, i: any) => {
    const url = `/category/${
      x?.categoryName
        ? x?.categoryName?.split('&')?.[0]
        : x?.categories?.[0]?.url
    }/${x?.id}${x?.type == 'news' ? `/news` : ''}`;

    return (
      <SwiperSlide key={i}>
        <Link href={url} key={i}>
          <div
            className={clsx('item', x.title.match(koreanRegex) && 'kor')}
            key={i}
            onTouchStart={() => {}}
          >
            <Image
              heightSize={heightSize}
              alt="newsImage"
              src={
                positionType === 'news'
                  ? x?.homeImageURL
                  : x?.imageURL
                  ? x?.imageURL
                  : x?.image?.url
              }
            />
            <div className="testText">
              <p>
                {x?.categoryName
                  ? x?.categoryName
                  : x.categories?.map((x: any) => x.name).join(' & ')}{' '}
                - {moment(x?.date).format('DD MMM YYYY')}
              </p>
              <h2
                className={x?.content ? '' : 'bold'}
                dangerouslySetInnerHTML={{ __html: x.title }}
              />
              {positionType === 'news' && x?.type == 'news' ? (
                <p className="subTitle">{x?.subTitle}</p>
              ) : null}
            </div>
          </div>
        </Link>
      </SwiperSlide>
    );

    // return (
    //   <Sensor once={true} key={i}>
    //     {({ isVisible }) => (
    //       <>
    //         <Link href={url} key={i}>
    //           <div
    //             className={clsx(
    //               'item',
    //               isVisible && `d${i % grid}`,
    //               x.title.match(koreanRegex) && 'kor',
    //             )}
    //             key={i}
    //             onTouchStart={() => {}}
    //           >
    //             <Image
    //               heightSize={heightSize}
    //               alt="newsImage"
    //               src={
    //                 positionType === 'news'
    //                   ? x?.homeImageURL
    //                   : x?.imageURL
    //                   ? x?.imageURL
    //                   : x?.image?.url
    //               }
    //             />
    //             <div className="testText">
    //               <p>
    //                 {x?.categoryName
    //                   ? x?.categoryName
    //                   : x.categories?.map((x: any) => x.name).join(' & ')}{' '}
    //                 - {moment(x?.date).format('DD MMM YYYY')}
    //               </p>
    //               <h2
    //                 className={x?.content ? '' : 'bold'}
    //                 dangerouslySetInnerHTML={{ __html: x.title }}
    //               />
    //               {positionType === 'news' && x?.type == 'news' ? (
    //                 <p className="subTitle">{x?.subTitle}</p>
    //               ) : null}
    //             </div>
    //           </div>
    //         </Link>
    //       </>
    //     )}
    //   </Sensor>
    // );
  });

  // useEffect(() => {
  //   if (!slideRef?.current) return;
  //   slideRef.current.slickGoTo(0);
  // }, [id]);

  // useEffect(() => {
  //   slideRef.current.slickGoTo(0);
  // }, [data]);

  return (
    <MainSlideStyled
      grid={grid}
      heightSize={heightSize}
      className={clsx('MainSlide', className)}
    >
      {/* <Slider ref={slideRef} {...settings}>
        {map}
      </Slider> */}
      <Swiper
        slidesPerView={grid}
        speed={700}
        spaceBetween={15}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {map}
      </Swiper>
    </MainSlideStyled>
  );
};

export default MainSlide;
