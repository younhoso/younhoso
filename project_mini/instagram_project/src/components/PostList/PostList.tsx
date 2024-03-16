'use client';

import clsx from 'clsx';
import { PostListStyled } from './styled';
import useSWR from 'swr';
import { SimplePost } from '@/model/posts';
import { GridLoader } from 'react-spinners';
import PostListCard from '../PostListCard/PostListCard';

export default function PostList() {
  const {data: posts, isLoading: loading} = useSWR<SimplePost[]>('/api/posts');

  if(loading){
    return (loading && (<div>
        <GridLoader color='red'/>
      </div>)
    )
  }

 return (
   <PostListStyled className={clsx('PostList')}>
    <ul>
      {posts && posts.map(post => (
        <li key={post.id}>
          <PostListCard post={post} />
        </li>
      ))}
    </ul>
   </PostListStyled>
 );
};