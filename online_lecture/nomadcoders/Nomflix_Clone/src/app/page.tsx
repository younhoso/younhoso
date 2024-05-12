'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import axios from 'axios';
import { AnimatePresence } from 'framer-motion';

import {
  Banner,
  Box,
  HomePageStyled,
  Overview,
  Row,
  Slider,
  Title,
} from '@/styles/pageStyled/HomePageStyled';
import { WrapperStyled } from '@/styles/pageStyled/WrapperStyled';
import { MoviesResponseData } from '@/types/MovieType';
import { makeImagePath } from '@/utils/makeImagePath';

const offset = 6;

export default function HomePage() {
  const { data: movie, isPending: movieLoading } = useQuery<MoviesResponseData>({
    queryKey: ['/api/main'],
    queryFn: () => axios.get('/api/main'),
  });
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = movie?.data.results.length! - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const toggleLeaving = () => setLeaving(prev => !prev);

  if (movieLoading) {
    return <div>로딩중...</div>;
  }

  const rowVariants = {
    hidden: {
      x: window.outerWidth + 5,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 5,
    },
  };

  return (
    <HomePageStyled>
      <Banner
        data-bgphoto={makeImagePath(movie?.data.results[0].backdrop_path || '')}
        onClick={incraseIndex}
      >
        <Title>{movie?.data.results[0].title}</Title>
        <Overview>{movie?.data.results[0].overview}</Overview>
      </Banner>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
          >
            {movie?.data.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map(data => {
                return (
                  <Box key={data.id} data-bgphoto={makeImagePath(data.backdrop_path, 'w500')} />
                );
              })}
          </Row>
        </AnimatePresence>
      </Slider>
      <WrapperStyled></WrapperStyled>
    </HomePageStyled>
  );
}
