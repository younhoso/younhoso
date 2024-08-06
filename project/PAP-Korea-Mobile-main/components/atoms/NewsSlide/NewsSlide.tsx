import { useGet } from '~/apis';
import MainSlide from '~/components/templates/MainSlide';

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

  const first = isLoading ? [] : getData?.slice(0, 1);

  return (
    <NewsSlideStyled className={clsx('NewsSlide', className)}>
      {!isLoading && (
        <>
          <MainSlide
            className="topItem newsTop ani"
            grid={1.05}
            data={first}
            heightSize="newsSlide"
            positionType="news"
          />
          <MainSlide
            heightSize="newsSlideBottom"
            center
            auto
            grid={1.4}
            data={getData?.slice(1)}
            className="ani"
            positionType="news"
          />
        </>
      )}
    </NewsSlideStyled>
  );
};

export default NewsSlide;
