'use client';

import clsx from 'clsx';

import { DetailCategory } from '@/types';

import { CategoryMobileStyled } from './styled';

export interface CategoryMobileProps {
  className?: string;
  error: unknown;
  data: DetailCategory | undefined;
}

const CategoryMobile = ({ className, error, data }: CategoryMobileProps) => {
  if (error) {
    return <div>오류가 발생했습니다</div>;
  }

  return (
    <CategoryMobileStyled className={clsx('CategoryMobile', className)}>
      {data &&
        data.multiLevelCategories.map((item, idx) => (
          <div dangerouslySetInnerHTML={{ __html: item.content }} key={idx} />
        ))}
    </CategoryMobileStyled>
  );
};

export default CategoryMobile;
