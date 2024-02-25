import clsx from 'clsx';
import { AvatarStyled } from './styled';

export default function Avatar({className, image } : {className?: string ; image?: string | null}) {
 
 return (
   <AvatarStyled className={clsx(className, 'Avatar')}>
    <img src={image ?? undefined} alt='user profile' referrerPolicy='no-referrer' /> 
   </AvatarStyled>
 );
};