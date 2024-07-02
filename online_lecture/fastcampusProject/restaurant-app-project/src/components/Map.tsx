import Script from 'next/script';

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

interface MapProps {
  setMap: (v: kakao.maps.Map) => void;
}

export default function Map({ setMap }: MapProps) {
  const loadKakaoMap = () => {
    const { kakao } = window;

    kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');

      const mapOption = {
        center: new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
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
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </>
  );
}
