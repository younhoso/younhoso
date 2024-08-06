import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import axios from 'axios';

import Loader from '@/components/Loader';
import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import { StoreTypeCustom } from '@/types';

export default function Home() {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [currentStore, setCurrentStore] = useState<StoreTypeCustom | null>(null);

  const {
    data: stores,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const { data } = await axios.get<StoreTypeCustom[] | undefined>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stores`,
      );
      return data || [];
    },
  });

  if (isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <div>데이터를 불러오는데 오류가 생겼습니다.</div>;
  }

  return (
    <>
      <Map setMap={v => setMap(v)} />
      <Markers map={map} storeDatas={stores} setCurrentStore={v => setCurrentStore(v)} />
      <StoreBox store={currentStore} setStore={v => setCurrentStore(v)} />
    </>
  );
}
