import { useEffect, useMemo, useState } from 'react';

import { useGet } from '~/apis';
import MainSlide from '~/components/templates/MainSlide';

import { CategoryInfoMoreContentStyled } from './styled';

import clsx from 'clsx';

interface CategoryInfoMoreContentProps {
  className?: string;
  id?: any;
  postData?: any;
}

const CategoryInfoMoreContent = ({
  className,
  id,
  postData,
}: CategoryInfoMoreContentProps) => {
  const [once, setOnce] = useState(false);
  const [moreData, setMoreData] = useState<any>(null);

  const { data: allData } = useGet('/post/getData', {
    qs: {
      searchQuery: {
        id: {
          $notIn: [id],
        },
      }
    }
  });
  const { data: getMoreData } = useGet('/post/getData', {
    qs: {
      searchQuery: {
        id: {
          $notIn: [id],
        },

        hashTag: {
          $contains: postData?.hashTag,
        },
      },
    },
  });

  useEffect(() => {
    setOnce(false);
  }, [id]);

  useEffect(() => {
    if ((!getMoreData?.length && !allData?.length) || once) {
      return;
    }

    const allRandom = allData?.sort(() => Math.random() - Math.random());

    const m = Array(8)
      .fill('')
      .map((x: any, key: number) => getMoreData?.[key])
      .map((x: any, key: number) => x || allRandom?.[key])
      .filter(x => x);

    setMoreData(m);

    setOnce(true);
  }, [getMoreData, allData, once]);

  return (
    <CategoryInfoMoreContentStyled
      className={clsx('CategoryInfoMoreContent', className)}
    >
      <h3 className="title">MORE CONTENT</h3>
      <div className="categoryRap">
        <MainSlide
          id={id}
          grid={4}
          data={moreData}
          // data={getMoreData?.slice(0, 8)}
          // data={m.length ? m : getMoreData?.slice(0, 8)}
          heightSize="ediNormal"
        />
      </div>
    </CategoryInfoMoreContentStyled>
  );
};

export default CategoryInfoMoreContent;
