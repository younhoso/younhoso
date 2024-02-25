import clsx from 'clsx';
import { SideBarStyled } from './styled';
import Avatar from '../Avatar/Avatar';
import { User } from '@/model/user';

type Props = {
  user: User;
}

export default function SideBar({user: {name, image, username}} : Props) {

 return (
   <SideBarStyled className={clsx('SideBar')}>
    <div className='avatar-info'>
      {image && <Avatar image={image} className='size-large sidebar-avatar'/>}
      <div className='avatar-info-title'>
        <p className='username'>{username}</p>
        <p className='name'>{name}</p>
      </div>
    </div>
    <div className='copyright'>
      <p>@Copyright INSTANTGRAM</p>
      <p>form METAL</p>
    </div>
   </SideBarStyled>
 );
};