import { ReactNode } from 'react';

import { RapStyled } from './styled';

import clsx from 'clsx';

interface RapProps {
  className?: string;
  children: ReactNode;
}

const Rap = ({ className, children }: RapProps) => {
  return <RapStyled className={clsx('Rap', className)}>{children}</RapStyled>;
};

export default Rap;
