import React, {
  createRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { GrFormClose } from 'react-icons/gr';
import ReactPlayer from 'react-player/youtube';
import Slider from 'react-slick';

import { useGet } from '~/apis';
import FilmModal from '~/components/templates/FilmModal';
import SlideImages from '~/components/templates/SlideImages';

import CategoryModal from '../CategoryModal';
import { FilmSlideStyled } from './styled';

import clsx from 'clsx';

interface FilmSlideProps {
  className?: string;
}

const FilmSlide = ({ className }: FilmSlideProps) => {
  const [nowSlide, setNowSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [slidePress, setSlidePress] = useState<boolean>(false);
  const [rotate, setRotate] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

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

  // const windowWidth = React.useMemo(() => window?.outerWidth, []);
  // const windowHeight = React.useMemo(() => window?.outerHeight, []);

  const screenTest = useFullScreenHandle();
  const screenActive = useMemo(() => screenTest.active, [screenTest]);

  const fullRef = useRef<any>(null);

  const sliderRef = useRef<any>(null);

  const round = 360 / List?.length;

  const slideClick = (i: number) => {
    if (slidePress) {
      return;
    }

    setSlidePress(true);

    const prev = nowSlide;

    if (Math.abs(i - prev) >= Math.ceil(List.length / 4)) {
      const check = 0 <= i - prev;

      if (check) {
        setRotate(rotate => (rotate += round * (i - prev - List.length)));
      } else {
        setRotate(rotate => (rotate += round * (List.length + (i - prev))));
      }
    } else {
      setRotate(rotate => (rotate += round * (i - prev)));
    }

    sliderRef?.current?.slickGoTo(i);
    setNowSlide(i);
  };

  const ListHtml = List?.map((x: any, i: number) => {
    return (
      <div
        key={i}
        className={`${i === nowSlide ? 'active' : ''}`}
        style={{ transform: `translate(-50%, -50%) rotate(${round * i}deg)` }}
      >
        <p onClick={() => slideClick(i)}>{x.title}</p>
      </div>
    );
  });

  const ListContents = List?.map((x: any, i: number) => {
    return (
      <p key={i} className={clsx(`explanation`, i === nowSlide && 'active')}>
        {(!(x?.subTitle?.trim() === "") && !(x?.subTitle?.trim() === "-")) && (
          <>
            {x?.subTitle}
          </>
        )}
      </p>
    );
  });

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const ImageSlide = List?.map((x: any, i: number) => {
    // const round = 360 / List.length;
    return (
      <SlideImages
        onClick={() => {
          setSlidePress(false);
          screenTest.enter();
        }}
        key={i}
        heightSize="full"
        src={x?.image?.url}
        alt="images"
      />
    );
  });

  const setting = {
    // vertical: true,
    swipe: false,
    fade: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    speed: 700,
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
          url={List?.[nowSlide]?.videoLink}
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
      <FilmSlideStyled className={clsx('FilmSlide', className)}>
        <div className="RoundSlide">
          <p className="Title">FILM</p>
          <div className="list" style={{ transform: `rotate(${-rotate}deg)` }}>
            {ListHtml}
          </div>
        </div>
        {videoMemo}

        <div className="SlideContent">
          <div>
            <Slider
              afterChange={() => {
                setSlidePress(false);
              }}
              ref={sliderRef}
              {...setting}
            >
              {ImageSlide}
            </Slider>
          </div>
          <div className="explanations">{ListContents}</div>
        </div>
      </FilmSlideStyled>
    </>
  );
};

export default FilmSlide;
