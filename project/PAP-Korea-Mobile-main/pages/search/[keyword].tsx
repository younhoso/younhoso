import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { useGet } from '~/apis';
import CategoryList from '~/components/atoms/CategoryList';
import CategoryTitle from '~/components/atoms/CategoryTitle';
import SearchList from '~/components/atoms/SearchList';
import SearchTitle from '~/components/templates/SearchTitle';
import { CategoryStyle } from '~/styles/pageStyles/categoryStyle';
// import { CategoryStyle } from './styled';
import { SearchStyle } from '~/styles/pageStyles/searchStyle';
import { numberToRem } from '~/utils/rem';

const About: NextPage = () => {
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
      <>
        {/* <CategoryTitle title={keyword} /> */}
        <CategoryTitle categoryData={['']} title={'SEARCH'} />
        <SearchList
          data={subDatas}
          category={keyword}
          counts={subDatas?.length}
        />
      </>

      {/* <CategoryList data={subDatas} category={category} /> */}
      {/* <CategoryBanner image={bannerImage} content="Banner Image" /> */}
      {/* <CategoryList data={List} category={category} /> */}
      {/* <CategoryBanner image={bannerImage2} content="Banner Image" /> */}
    </CategoryStyle>
  );
};

export default About;
