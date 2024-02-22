import clsx from 'clsx';
import { PostListStyled } from './styled';

export default function PostList() {
 
 return (
   <PostListStyled className={clsx('PostList')}>
    <p>PostList</p>
   </PostListStyled>
 );
};