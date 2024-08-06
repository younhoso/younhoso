import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import CategoryInfoVisual from '~/components/atoms/CategoryInfoVisual';
import { CategoryInfoStyle } from '~/styles/pageStyles/categoryInfoStyle';
import WysiwygViewer from '~/utils/viewer/WysiwygViewer';

import clsx from 'clsx';

const CategoryInfo: NextPage = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data: getData, isLoading } = useGet('/newspaper/getData', {
    qs: {
      searchQuery: {
        id: id,
      },
    },
  });

  const newsData = isLoading ? [] : getData?.[0];

  // useEffect(() => {
  //   const q: any = document?.querySelector("html");
  //   isLoading ? q.style.overflow = "hidden" : q.style.overflow = "auto"
  // }, [isLoading]);

  return (
    <CategoryInfoStyle>
      <CategoryInfoVisual
        img={newsData?.image?.url}
        color="white"
        title={newsData?.title}
        subtitle={newsData?.subTitle}
        newsSize={'2rem'}
      />

      {!isLoading && getData && (
        <WysiwygViewer initialValue={newsData?.content} />
      )}

      <div style={{ height: '25rem' }}></div>

      <div className={clsx('blur', isLoading && 'show')}>
        <div className="loadSpin" />
      </div>
    </CategoryInfoStyle>
  );
};

export default CategoryInfo;
