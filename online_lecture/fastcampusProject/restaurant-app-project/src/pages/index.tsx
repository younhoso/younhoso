import { useState } from 'react';

import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import { StoreTypeCustom } from '@/types';
import axios from "axios";

export default function Home({ stores }: { stores: StoreTypeCustom[] }) {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [currentStore, setCurrentStore] = useState<StoreTypeCustom | null>(null);

  return (
    <>
      <Map setMap={v => setMap(v)} />
      <Markers storeDatas={stores} map={map} setCurrentStore={v => setCurrentStore(v)} />
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
