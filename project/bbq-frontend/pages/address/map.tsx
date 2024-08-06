import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Desktop, Mobile } from '@/components/functions';
import { AddressMapPageTemplate } from '@/components/templates';
import { BBQ_COMPANY_POSITION } from '@/constants';
import { stashData } from '@/utils';

type Position = {
  lat: number;
  lng: number;
};

const getAddress = async ({ lat, lng }: { lat: number; lng: number }) => {
  return new Promise<{ address: string; roadAddress?: string }>((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve({
          address: result[0].address.address_name,
          roadAddress: result[0].road_address?.address_name,
        });
      } else {
        reject(new Error(status));
      }
    });
  });
};

export default function AddressMap() {
  const router = useRouter();

  // 카카오 맵 로딩 관련
  const [kakaoMapsLoaded, setKakaoMapsLoaded] = useState<boolean>(false);
  useEffect(() => {
    kakao.maps.load(() => {
      setKakaoMapsLoaded(true);
    });
  }, []);

  const [myPosition, setMyPosition] = useState<Position | undefined>(undefined);
  const [defaultPosition, setDefaultPosition] = useState<Position>({
    lat: BBQ_COMPANY_POSITION.LATITUDE,
    lng: BBQ_COMPANY_POSITION.LONGITUDE,
  });
  const [dragging, setDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({
    lat: BBQ_COMPANY_POSITION.LATITUDE,
    lng: BBQ_COMPANY_POSITION.LONGITUDE,
  });
  const [address, setAddress] = useState<{ address: string; roadAddress?: string } | undefined>(
    undefined,
  );

  const handleMapDragStart = () => {
    setDragging(true);
  };

  const handleMapDragEnd = useCallback(async () => {
    const address = await getAddress(position);
    setAddress(address);
    setDragging(false);
  }, [position]);

  const handleMapCenterChanged = ({ lat, lng }: Position) => {
    setPosition({
      lat: lat,
      lng: lng,
    });
  };

  const handlePickAddressButtonClick = useCallback(async () => {
    if (!address) return;
    stashData('address/search', address);
    router.push({ pathname: '/address/search', query: router.query });
  }, [address, router.query]);

  // 현재 주소 저장
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setMyPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // 기본 주소 가져오기
  useEffect(() => {
    if (!kakaoMapsLoaded || !defaultPosition) return;

    getAddress(defaultPosition)
      .then(address => {
        setAddress(address);
      })
      .catch(err => {
        console.error(err);
      });
  }, [kakaoMapsLoaded, defaultPosition]);

  // 나의 위치로 가기 버튼 클릭 이벤트
  const handleGoToMyLocationButtonClick = useCallback(() => {
    if (!myPosition) return;
    /* NOTE: 값을 바꿔도 화면이 간헐적으로 이동이 안되는 현상을 tweak 해결*/
    setDefaultPosition(position);
    setTimeout(() => {
      setDefaultPosition(myPosition);
      setPosition(myPosition);
    });
  }, [position, myPosition]);

  const props = {
    dragging: dragging,
    address: address,
    position: position,
    myPosition: myPosition,
    defaultPosition: defaultPosition,
    handleMapDragStart: handleMapDragStart,
    handleMapDragEnd: handleMapDragEnd,
    handleMapCenterChanged: handleMapCenterChanged,
    handlePickAddressButtonClick: handlePickAddressButtonClick,
    handleGoToMyLocationButtonClick: handleGoToMyLocationButtonClick,
  };

  return (
    <>
      <Desktop>
        <AddressMapPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <AddressMapPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
