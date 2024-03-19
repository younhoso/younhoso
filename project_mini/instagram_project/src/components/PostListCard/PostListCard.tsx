import clsx from 'clsx';
import { PostListCardStyled } from './styled';
import { SimplePost } from '@/model/posts';
import Avatar from '../Avatar/Avatar';
import Image from 'next/image';
import HeartIcon from '../ui/icons/HeartIcon';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import SmileIcon from '../ui/icons/SmileIcon';

type Props = {
  post: SimplePost
}

export default function PostListCard({post}: Props) {
 const {userImage, username, image, createdAt, likes, text} = post;
 return (
   <PostListCardStyled className={clsx('PostListCard rounded')}>
    <div className='flex'>
      <Avatar className='following' image={userImage} />
      <span>{username}</span>
    </div>
    <Image src={image} alt={`photo by ${username}`} width={500} height={500} />
    <div className='inner-icon'>
      <HeartIcon />
      <BookmarkIcon />
    </div>
    <div className='like-icon'>
      <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
      <p>
        <span className='username'>{username}</span>
        {text}
      </p>
      <p className='created-at'>{parseDate(createdAt)}</p>
      <form action="" className='form-comment'>
        <SmileIcon />
        <input type="text" placeholder="Add a comment..." />
        <button>Post</button>
      </form>
    </div>

   </PostListCardStyled>
 );
};