import clsx from 'clsx';
import { ActionBarStyled } from './styled';
import HeartIcon from '../ui/icons/HeartIcon';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';

type Props = {
  likes: string[];
  username: string;
  text: string;
  createdAt: string;
}

export default function ActionBar({likes, username, text, createdAt}: Props) {
 
 return (
   <ActionBarStyled className={clsx('ActionBar')}>
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
    </div>
   </ActionBarStyled>
 );
};