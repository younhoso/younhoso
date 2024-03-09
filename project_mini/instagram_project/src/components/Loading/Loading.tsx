import clsx from 'clsx';
import { LoadingStyled } from './styled';
import { PropagateLoader } from 'react-spinners';

export default function Loading() {
 
 return (
   <LoadingStyled className={clsx('Loading')}>
      <PropagateLoader className={clsx('loading')} size={8} color='red' />
   </LoadingStyled>
 );
};