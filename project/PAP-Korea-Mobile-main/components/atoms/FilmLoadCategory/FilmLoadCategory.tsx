import { FilmLoadCategoryStyled } from './styled';

import clsx from 'clsx';

interface FilmLoadCategoryProps {
  className?: string;
}

const FilmLoadCategory = ({ className }: FilmLoadCategoryProps) => {
  return (
    <FilmLoadCategoryStyled className={clsx('FilmLoadCategory', className)}>
      <div />
    </FilmLoadCategoryStyled>
  );
};

export default FilmLoadCategory;
