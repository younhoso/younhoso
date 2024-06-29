import { ProfileUser } from '@/model/user';
import { UserCardStyled } from './styled';
import Link from 'next/link';
import Avatar from '../Avatar/Avatar';

type UserCardProps = {
  user: ProfileUser
}

export default function UserCard({user: {name, username, image, following, followers}}: UserCardProps) {
 
 return (
   <Link href={`/user/${username}`} className={'UserCard'}>
    <Avatar image={image} />
    <div>
      <p>{username}</p>
      <p>{name}</p>
      <p>{`${followers} followers ${following} following`}</p>
    </div>
   </Link>
 );
};