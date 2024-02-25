'use client';
import clsx from 'clsx';
import useSWR from 'swr';
import { FollowingBarStyled } from './styled';

export default function FollowingBar() {
  const {data, isLoading, error} = useSWR('/api/me');
  console.log(data)

//  4. 여기에서, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌(image, username)

 return (
   <FollowingBarStyled className={clsx('FollowingBar')}>
    <p>FollowingBar</p>
   </FollowingBarStyled>
 );
};