import clsx from 'clsx';
import { ColorButtonStyled } from './styled';

type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorButton({text, onClick}: Props) {
 
 return (
    <ColorButtonStyled onClick={onClick} className={clsx('ColorButton')}>
      {text}
    </ColorButtonStyled>
 );
};