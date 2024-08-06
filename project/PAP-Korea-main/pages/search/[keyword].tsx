import { useMemo } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import CategoryBanner from '~/components/atoms/CategoryBanner';
import CategoryList from '~/components/atoms/CategoryList';
import CategoryTitle from '~/components/atoms/CategoryTitle';
import SearchTitle from '~/components/templates/SearchTitle';
import { CategoryStyle } from '~/styles/pageStyles/categoryStyle';

const Category: NextPage = () => {
  const router = useRouter();
  const { keyword }: any = router.query;

  const {
    data: subDatas,
    isLoading: testL,
    reload: testPatch,
  } = useGet('/post/getsearchData', {
    qs: {
      category: keyword,
    },
  });

  return (
    <CategoryStyle>
      <SearchTitle title={keyword} counts={subDatas?.length} />
      <CategoryList data={subDatas} category={keyword} />

      {/* <CategoryList data={subDatas} category={category} /> */}
      {/* <CategoryBanner image={bannerImage} content="Banner Image" /> */}
      {/* <CategoryList data={List} category={category} /> */}
      {/* <CategoryBanner image={bannerImage2} content="Banner Image" /> */}
    </CategoryStyle>
  );
};

export default Category;
