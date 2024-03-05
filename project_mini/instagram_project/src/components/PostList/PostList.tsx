'use client';

import clsx from 'clsx';
import { PostListStyled } from './styled';
import useSWR from 'swr';
import { SimplePost } from '@/model/posts';

export default function PostList() {
 const {data: posts, isLoading: loading} = useSWR<SimplePost[]>('/api/posts');

 return (
   <PostListStyled className={clsx('PostList')}>
    <ul>
      {posts && posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
   </PostListStyled>
 );
};