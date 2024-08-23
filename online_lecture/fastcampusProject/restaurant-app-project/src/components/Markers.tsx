import { useCallback, useEffect } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { currentStoreState, locationState, mapState } from '@/atom';
import { StoreTypeCustom } from '@/types';

interface MarkersProps {
  storeDatas: StoreTypeCustom[] | undefined;
}

export default function Markers({ storeDatas }: MarkersProps) {
  const map = useRecoilValue(mapState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const [location, setLocation] = useRecoilState(locationState);

  const loadKakaoMarkers = useCallback(() => {
    const { kakao } = window;

    if (map) {
      // 식당 데이터 마커 띄우기
      storeDatas?.map(store => {
        const imageSrc = store?.category // 마커이미지의 주소입니다
            ? `/images/markers/${store?.category}.png`
            : `/images/markers/default.png`,
          imageSize = new kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
          markerPosition = new kakao.maps.LatLng(store?.lat, store?.lng); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });

        // 마커가 지도 위에 표시되도록 설정합니다.
        marker.setMap(map);

        // 마커 커서가 오버되었을 때 마커 위에 표시할 인포윈도우 생성
        const content = `<div class="infowindow">${store?.name}</div>`; //인포윈도우에 표시될 내용

        // 커스텀 오버레이를 생성합니다.
        const customOverlay = new kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시합니다
          customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
          customOverlay.setMap(null);
        });

        // 선택한 가게 저장
        kakao.maps.event.addListener(marker, 'click', function () {
          // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
          setCurrentStore(store);
          setLocation({
            ...location,
            lat: store.lat,
            lng: store.lng,
          });
        });
      });
    }
  }, [map, storeDatas]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return <></>;
}
