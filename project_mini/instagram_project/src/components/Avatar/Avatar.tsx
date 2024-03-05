import clsx from 'clsx';
import { AvatarStyled } from './styled';

type Props = {
  className?: string;
  image?: string | null;
}

export default function Avatar({className, image} : Props) {
 
 return (
   <AvatarStyled className={clsx(className, 'Avatar')}>
    <img src={image ?? undefined} alt='user profile' referrerPolicy='no-referrer' /> 
   </AvatarStyled>
 );
};