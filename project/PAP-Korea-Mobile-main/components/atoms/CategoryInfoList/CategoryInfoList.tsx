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
  const ListHtml = List.map((x: any, i: number) => (
    <div className="item" key={i} onClick={() => onToggle()}>
      <Img src={x.img} alt={''} />
      <div className="content">{x.content}</div>
    </div>
  ));

  return (
    <CategoryInfoListStyled className={clsx('CategoryInfoList', className)}>
      {ListHtml}
    </CategoryInfoListStyled>
  );
};

export default CategoryInfoList;
