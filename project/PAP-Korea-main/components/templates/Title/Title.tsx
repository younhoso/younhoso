import clsx from 'clsx';

import { TitleStyled } from './styled';

interface TitleProps {
  className?: string;
  type: 'left' | 'center' | 'right';
  title: string;
  size: 'default' | "large" | "small";
}

const Title = ({ className, title, type, size }: TitleProps) => {
  return (
    <TitleStyled className={clsx('Title', className)} type={type} size={size}>
      <h2>{title}</h2>
    </TitleStyled>
  )
}

export default Title
