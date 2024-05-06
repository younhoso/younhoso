'use client';

import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

import { Banner, HomePageStyled, Overview, Title } from '@/styles/pageStyled/HomePageStyled';
import { WrapperStyled } from '@/styles/pageStyled/WrapperStyled';
import { MoviesResponseData } from '@/types/MovieType';
import { makeImagePath } from '@/utils/makeImagePath';

export default function HomePage() {
  const { data: movie, isPending: movieLoading } = useQuery<MoviesResponseData>({
    queryKey: ['/api/main'],
    queryFn: () => axios.get('/api/main'),
  });

  if (movieLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <HomePageStyled>
      <Banner data-bgphoto={makeImagePath(movie?.data.results[0].backdrop_path || '')}>
        <Title>{movie?.data.results[0].title}</Title>
        <Overview>{movie?.data.results[0].overview}</Overview>
      </Banner>
      <WrapperStyled></WrapperStyled>
    </HomePageStyled>
  );
}
