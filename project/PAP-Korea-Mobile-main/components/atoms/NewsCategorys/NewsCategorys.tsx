import { NewsCategorysStyled } from './styled';

import clsx from 'clsx';

interface NewsCategorysProps {
  className?: string;
  data: any;
}

const NewsCategorys = ({ className }: NewsCategorysProps) => {
  return (
    <NewsCategorysStyled
      className={clsx('NewsCategorys', className)}
    ></NewsCategorysStyled>
  );
};

export default NewsCategorys;
