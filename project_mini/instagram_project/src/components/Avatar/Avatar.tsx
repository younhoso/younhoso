import clsx from 'clsx';
import { AvatarStyled } from './styled';

export default function Avatar({ image } : {image?: string | null}) {
 
 return (
   <AvatarStyled className={clsx('Avatar')}>
    <img src={image ?? undefined} alt='user profile' referrerPolicy='no-referrer' /> 
   </AvatarStyled>
 );
};