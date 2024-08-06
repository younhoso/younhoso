import Img from '../Img';
import { CategoryInfoListStyled } from './styled';

import clsx from 'clsx';

interface CategoryInfoListProps {
  className?: string;
  List?: any;
  onToggle: Function;
}

const CategoryInfoList = ({
  className,
  List,
  onToggle,
}: CategoryInfoListProps) => {
  const ListHtml = List?.map((x: any, i: number) => (
    <div className="item" key={i} onClick={() => onToggle(i, true)}>
      <img src={x?.image?.url} alt={''} />
      <div className="content">
        <div>
          {x?.credit?.map((y: any, i: number) => (
            <div className="group" key={i}>
              <p>{y?.name}</p>
              <div className="item">
                {y?.sub?.map((z: any, i: number) => (
                  <span key={i}>&nbsp;@{z.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  return (
    <CategoryInfoListStyled className={clsx('CategoryInfoList', className)}>
      {ListHtml}
    </CategoryInfoListStyled>
  );
};

export default CategoryInfoList;
