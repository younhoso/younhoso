import clsx from 'clsx';
import { SideBarStyled } from './styled';
import Avatar from '../Avatar/Avatar';

export default function SideBar() {

 return (
   <SideBarStyled className={clsx('SideBar')}>
    <>
      <div>
        {/* {image && <Avatar image={image} />}
        <p>{username}</p>
        <p>{name}</p> */}
      </div>
    </>
   </SideBarStyled>
 );
};