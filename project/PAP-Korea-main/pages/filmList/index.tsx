import { useState } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import CategoryTitle from '~/components/atoms/CategoryTitle';
import FilmList from '~/components/atoms/FilmList';
import FilmLoadForm from '~/components/atoms/FilmLoadForm';
import NewsCategorys from '~/components/atoms/NewsCategorys';
import FilmCategoryList from '~/components/templates/FilmCategoryList';
import { CategoryStyle } from '~/styles/pageStyles/categoryStyle';

const Category: NextPage = () => {
  const router = useRouter();
  const [filterCategory, setFilterCategory] = useState('');

  const { category }: any = router.query;

  const {
    data: subDatas,
    isLoading: testL,
    reload: testPatch,
  } = useGet('/filmSlide/getData', {
    qs: {
      searchQuery:
        filterCategory != '' ? { categories: { name: filterCategory } } : {},
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
          <NewsCategorys data={getData} />
          <FilmCategoryList
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          <FilmLoadForm />
        </>
      )}
    </CategoryStyle>
  );
};

export default Category;
