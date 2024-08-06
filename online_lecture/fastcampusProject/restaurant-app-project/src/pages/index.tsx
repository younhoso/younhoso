import { useState } from 'react';

import axios from 'axios';

import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import { StoreTypeCustom } from '@/types';

export default function Home({ stores }: { stores: StoreTypeCustom[] }) {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [currentStore, setCurrentStore] = useState<StoreTypeCustom | null>(null);
  console.log('Stores:', stores); // 데이터가 제대로 전달되는지 확인하는 로그

  return (
    <>
      <Map setMap={v => setMap(v)} />
      <Markers map={map} storeDatas={stores} setCurrentStore={v => setCurrentStore(v)} />
      <StoreBox store={currentStore} setStore={v => setCurrentStore(v)} />
    </>
  );
}

export async function getStaticProps() {
  const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  if (!res.statusText) {
    console.error(`Failed to fetch stores: ${res.status} ${res.statusText}`);
    return {
      props: { stores: [] },
    };
  }

  try {
    const stores = await res.data;
    return {
      props: { stores },
      revalidate: 60 * 60,
    };
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      props: { stores: [] },
    };
  }
}
