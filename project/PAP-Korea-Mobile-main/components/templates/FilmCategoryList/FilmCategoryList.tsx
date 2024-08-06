import clsx from 'clsx';

import { FilmCategoryListStyled } from './styled';
import { useGet } from '~/apis';

interface FilmCategoryListProps {
  className?: string;
  setFilterCategory: any;
  filterCategory: string;
}

const FilmCategoryList = ({ className, filterCategory, setFilterCategory }: FilmCategoryListProps) => {
  const {
    data: categoryGetData,
    isLoading: testL,
    reload: testPatch,
  } = useGet('/category/getData', {
    qs: {
      sort: { createdAt: 'DESC' },
      // category: category,
    },
  });

  const categoryData = categoryGetData;

  return (
    <FilmCategoryListStyled className={clsx('FilmCategoryList', className)}>
      <div className="categoryFilterlist">
        <p className={clsx(filterCategory === "" && "active")} onClick={() => setFilterCategory("")}>
          All
        </p>
        {["Editorial", "Art", "Beauty", "Fashion"]?.map((x: any, key: number) => {
          return <p key={key}
            className={clsx(filterCategory === x && "active")}
            onClick={() => setFilterCategory(x)}>
            {x}
          </p>
        })}
      </div>

    </FilmCategoryListStyled>
  )
}

export default FilmCategoryList
