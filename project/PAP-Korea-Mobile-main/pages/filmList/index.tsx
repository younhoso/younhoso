import { useState } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import CategoryList from '~/components/atoms/CategoryList';
import CategoryTitle from '~/components/atoms/CategoryTitle';
import FilmList from '~/components/atoms/FilmList';
import FilmLoadCategory from '~/components/atoms/FilmLoadCategory';
import FilmLoadForm from '~/components/atoms/FilmLoadForm';
import NewsCategorys from '~/components/atoms/NewsCategorys';
import FilmCategoryList from '~/components/templates/FilmCategoryList';
import { CategoryStyle } from '~/styles/pageStyles/categoryStyle';

const Category: NextPage = () => {
  const router = useRouter();
  const { category }: any = router.query;
  const [filterCategory, setFilterCategory] = useState('');

  const {
    data: subDatas,
    isLoading: testL,
    reload: testPatch,
  } = useGet('/filmSlide/getData', {
    qs: {
      searchQuery:
        filterCategory === '' ? {} : { categories: { name: filterCategory } },
      sort: { date: 'DESC' },
      // category: category,
    },
  });
  const {
    data: getData,
    isLoading,
    reload,
  } = useGet(`/category/getData`, {
    qs: {
      sort: {
        createdAt: 'ASC',
      },
    },
  });

  return (
    <CategoryStyle>
      <CategoryTitle title={'Film'} />
      {/* {0 ? ( */}
      {!isLoading && !testL ? (
        <>
          <NewsCategorys data={getData} />
          <FilmCategoryList
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          {subDatas?.length ? (
            <FilmList data={subDatas} />
          ) : (
            <div className="infoText">
              <h2>COMING SOON</h2>
            </div>
          )}
        </>
      ) : (
        <>
          <FilmLoadCategory />
          <FilmLoadForm />
        </>
      )}
    </CategoryStyle>
  );
};

export default Category;
