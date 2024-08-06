'use client';

import clsx from 'clsx';

import { DetailCategory } from '@/types';

import { CategoryStyled } from './styled';

export interface CategoryProps {
  className?: string;
  error: unknown;
  data: DetailCategory | undefined;
}

const Category = ({ className, error, data }: CategoryProps) => {
  if (error) {
    return <div>오류가 발생했습니다</div>;
  }

  return (
    <CategoryStyled className={clsx('Category', className)}>
      {data &&
        data.multiLevelCategories.map((item, idx) => (
          <div dangerouslySetInnerHTML={{ __html: item.content }} key={idx} />
        ))}
    </CategoryStyled>
  );
};

export default Category;
