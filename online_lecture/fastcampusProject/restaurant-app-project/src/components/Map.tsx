import Script from 'next/script';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { locationState, mapState } from '@/atom';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    const { kakao } = window;

    kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');

      const mapOption = {
        center: new kakao.maps.LatLng(lat ?? location.lat, lng ?? location.lng), //지도의 중심좌표.
        level: zoom ?? location.zoom, //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성 및 객체 리턴
      setMap(map);
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </>
  );
}
