import type { NextPage } from 'next';

import Editorial from '~/components/atoms/Editorial';
import EventBanner from '~/components/atoms/EventBanner';
import FilmSlide from '~/components/atoms/FilmSlide';
import NewsSlide from '~/components/atoms/NewsSlide';
import ShortSlide from '~/components/atoms/ShortSlide';
import Visual from '~/components/atoms/Visual';
import { HomeStyle } from '~/styles/pageStyles/homeStyle';

const Home: NextPage = () => {
  return (
    <HomeStyle>
      <Visual theme="default" />
      <NewsSlide />
      <FilmSlide />
      <Editorial />
      <EventBanner />
      <ShortSlide />
    </HomeStyle>
  );
};

export default Home;
