import { SearchTitleStyled } from './styled';

import clsx from 'clsx';

interface SearchTitleProps {
  className?: string;
  title: string;
  counts?: number;
}

const SearchTitle = ({ className, title, counts }: SearchTitleProps) => {
  console.log(
    title
      ?.split(',')
      .map((x: string) => `#${x.trim()}`)
      .join(' '),
  );
  return (
    <SearchTitleStyled className={clsx('SearchTitle', className)}>
      {/* <h3>hashTag</h3> */}

      <h3>
        {title
          ?.split(',')
          .map((x: string) => `${x.trim()}`)
          .join(' ')}
      </h3>
      <p>{counts ? counts : 0} ARTICLES FOUND</p>
    </SearchTitleStyled>
  );
};

export default SearchTitle;
