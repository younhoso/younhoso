import clsx from 'clsx';
import { PostListCardStyled } from './styled';
import { SimplePost } from '@/model/posts';
import Avatar from '../Avatar/Avatar';
import Image from 'next/image';

import FormComment from '../FormComment/FormComment';
import ActionBar from '../ActionBar/ActionBar';

type Props = {
  post: SimplePost;
  priority?: boolean;
}

export default function PostListCard({post, priority = false}: Props) {
 const {userImage, username, image, createdAt, likes, text} = post;
 return (
   <PostListCardStyled className={clsx('PostListCard rounded')}>
    <div className='flex'>
      <Avatar className='following' image={userImage} />
      <span>{username}</span>
    </div>
    <Image src={image} alt={`photo by ${username}`} width={500} height={500} priority={priority} />
    <ActionBar likes={likes} username={username} text={text} createdAt={createdAt}/>
    <FormComment />
   </PostListCardStyled>
 );
};