import { useState } from 'react';

import Map from '@/components/Map';
import Markers from '@/components/Markers';
import StoreBox from '@/components/StoreBox';
import { StoreTypeCustom } from '@/types';

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
  const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`).then(res =>
    res.json(),
  );

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
