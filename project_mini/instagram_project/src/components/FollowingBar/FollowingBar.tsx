'use client';
import clsx from 'clsx';
import useSWR from 'swr';
import { FollowingBarStyled } from './styled';
import { DetailUser } from '@/model/user';
import { PropagateLoader } from 'react-spinners';
import Link from 'next/link';
import Avatar from '../Avatar/Avatar';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function FollowingBar() {
  const {data, isLoading: loading, error} = useSWR<DetailUser>('/api/me');
  const users = data?.following;

  if(loading){
    return <PropagateLoader size={8} color='red' />
  }

 return (
   <FollowingBarStyled className={clsx('FollowingBar')}>
    { 
      (!users || users.length === 0) && <p className='no-data'>{`You don't have following`}</p>
    }
    {
      users && users.length > 0 &&
         <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={8}
          navigation
        >
          {users.map(({image, username}) => (
            <SwiperSlide key={username}>
              <Link href={`/user/${username}`}>
                <Avatar className='following' image={image} />
                <p className='ellipsis'>{username}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
    }
   </FollowingBarStyled>
 );
};