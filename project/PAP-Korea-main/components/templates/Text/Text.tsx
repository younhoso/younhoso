import clsx from 'clsx';

import { TextStyled } from './styled';

interface TextProps {
  text: string;
  className?: string;
}

const Text = ({ className, text }: TextProps) => {
  return (
    <TextStyled className={clsx('Text', className)}>
      {text}
    </TextStyled>
  )
}

export default Text
