import Link from 'next/link';

import { useGet } from '~/apis';
import MainSlide from '~/components/templates/MainSlide';
import Image from '~/components/templates/SlideImages';

import { NewsSlideStyled } from './styled';

import clsx from 'clsx';

interface NewsSlideProps {
  className?: string;
}

const NewsSlide = ({ className }: NewsSlideProps) => {
  const {
    data: getData,
    isLoading: isLoading,
    reload: testPatch,
  } = useGet('/post/getSubData', {
    qs: {
      limit: 10,
      // category: "Art",
    },
  });

  return (
    <>
      {!isLoading && (
        <NewsSlideStyled className={clsx('NewsSlide', className)}>
          <MainSlide
            grid={3}
            data={getData}
            heightSize="newsSlide"
            className="ani"
            positionType="news"
          />
        </NewsSlideStyled>
      )}
    </>
  );
};

export default NewsSlide;
