import { useRouter } from 'next/router';

import { CategoryTitleStyled } from './styled';

import clsx from 'clsx';

interface CategoryTitleProps {
  className?: string;
  title?: string;
}

const CategoryTitle = ({ className, title }: CategoryTitleProps) => {
  return (
    <CategoryTitleStyled className={clsx('CategoryTitle', className)}>
      <h3>{title}</h3>
    </CategoryTitleStyled>
  );
};

export default CategoryTitle;
