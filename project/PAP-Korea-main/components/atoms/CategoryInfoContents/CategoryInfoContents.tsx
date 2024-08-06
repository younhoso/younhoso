import { BsFilm } from 'react-icons/bs';

import Link from 'next/link';

import { CategoryInfoContentsStyled } from './styled';

import clsx from 'clsx';

interface CategoryInfoContentsProps {
  className?: string;
  contents?: any;
  filmLink?: string;
}

const CategoryInfoContents = ({
  className,
  contents,
  filmLink,
}: CategoryInfoContentsProps) => {
  const contentHtml = contents.map((x: any, i: number) => {
    // console.log(x.split("\n").join(<><br /></>));

    return x?.trim() != '' ? (
      <div className={clsx("postContent", i === 1 && "en")} key={i}>
        <p>
          {x?.split("\n").map((v: any, kk: number) => (kk + 1) === x?.split("\n").length ? <>{v}</> : <>{v}<br /></>)}
        </p>
      </div>
    ) : null
  },
  );

  return (
    <CategoryInfoContentsStyled
      className={clsx('CategoryInfoContents', className)}
    >
      {filmLink?.trim() && (
        <div className="filmLink">
          <Link href={`/${filmLink?.trim()}`}>
            <p>
              {/* <BsFilm />
              필름 보러가기 */}
              VIEW FILM
            </p>
          </Link>
        </div>
      )}

      {contentHtml}
    </CategoryInfoContentsStyled>
  );
};

export default CategoryInfoContents;
