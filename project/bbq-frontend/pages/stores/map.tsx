import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { BranchAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { StoreMapPageTemplate } from '@/components/templates';
import { BBQ_COMPANY_POSITION } from '@/constants';
import { useAuth } from '@/hooks';
import { District } from '@/types';
import { deserializeCartForMap } from '@/utils';

type Position = {
  lat: number;
  lng: number;
};

export default function StoreMapPage() {
  const router = useRouter();

  const { defaultAddress } = useAuth();

  // (비회원을 위해서) 배달, 주소 없음 -> 주소 검색 페이지로 이동
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof defaultAddress === 'undefined' || defaultAddress) return;
    if (`${router.query.for}`.toLowerCase().trim().split('|').includes('delivery')) {
      router.replace(`/address/permission?redirect_to=${encodeURIComponent(router.asPath)}`);
    }
  }, [defaultAddress, router.asPath, router.query, router.isReady]);

  // 카카오 맵 로딩 관련
  const [kakaoMapsLoaded, setKakaoMapsLoaded] = useState<boolean>(false);
  useEffect(() => {
    kakao.maps.load(() => {
      setKakaoMapsLoaded(true);
    });
  }, []);

  // 쿼리 파라미터 가져오기
  const queryDefaultPosition = useMemo<Position | undefined>(() => {
    return router.query.p
      ? {
          lat: Number(`${`${router.query.p}`.split(',')[0]}`),
          lng: Number(`${`${router.query.p}`.split(',')[1]}`),
        }
      : undefined;
  }, [router.query, router.isReady]);
  const queryFor = useMemo(() => {
    return decodeURIComponent(
      router.query.for ? `${router.query.for}` : encodeURIComponent('takeout'),
    );
  }, [router.query, router.isReady]);
  const queryCart = useMemo(() => {
    return router.query.cart ? decodeURIComponent(`${router.query.cart}`) : undefined;
  }, [router.query, router.isReady]);
  const queryRedirectTo = useMemo(() => {
    return decodeURIComponent(
      router.query.redirect_to
        ? `${router.query.redirect_to}`
        : encodeURIComponent(`/categories/1`),
    );
  }, [router.query, router.isReady]);

  // states
  const [searchText, setSearchText] = useState<string>('');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [districts, setDistricts] = useState<District[]>([]);
  const [myPosition, setMyPosition] = useState<Position | undefined>(undefined);
  const [defaultPosition, setDefaultPosition] = useState<Position | undefined>(undefined);
  const [position, setPosition] = useState<Position | undefined>(undefined);
  const [userPosition, setUserPosition] = useState<Position | undefined>(undefined);
  const [tempDefaultPosition, setTempDefaultPosition] = useState<Position | undefined>(undefined);
  undefined;
  const [dragging, setDragging] = useState<boolean>(false);
  const [address, setAddress] = useState<{ address: string; roadAddress?: string } | undefined>(
    undefined,
  );
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>();

  // 사용자의 기본 주소를 기반으로 노출
  useEffect(() => {
    if (position) return; // 이미 한번 데이터를 받았으면 종료
    if (typeof defaultAddress === 'undefined') return; // 로딩이 안됐으면 종료
    if (!router.isReady) return; // router가 준비되지 않았으면 종료

    if (defaultAddress || queryDefaultPosition) {
      const _position: Position = {
        lat: queryDefaultPosition?.lat ?? defaultAddress?.latitude!,
        lng: queryDefaultPosition?.lng ?? defaultAddress?.longitude!,
      };
      setDefaultPosition(_position);
      setPosition(_position);
      setUserPosition(_position);
    } else {
      const _position: Position = {
        lat: BBQ_COMPANY_POSITION.LATITUDE,
        lng: BBQ_COMPANY_POSITION.LONGITUDE,
      };
      setDefaultPosition(_position);
      setPosition(_position);
      setUserPosition(_position);
    }
  }, [router.isReady, defaultAddress, queryDefaultPosition, position]);

  // fetch api
  const fetch = useCallback(
    ({ position, userPosition }: { position: Position; userPosition: Position }) => {
      return new Promise<District[]>(async (resolve, reject) => {
        const forValues = queryFor ? queryFor.split('|') : [];
        const cartRequestList = queryCart ? deserializeCartForMap(queryCart) : undefined;

        // 1. 포장 -> 전부다 가져오기
        if (!forValues || !cartRequestList || forValues.includes('takeout')) {
          BranchAPI.District.getList({
            latitude: position.lat,
            longitude: position.lng,
            searchType: 'NEARBY',
          })
            .then(res => {
              resolve(sortDistricts(res.familyInfoForDistrictInfoList));
            })
            .catch(err => {
              reject(err);
            });
        }
        // 2. 배달만 가져오기
        else if (forValues.includes('change-delivery')) {
          BranchAPI.District.getDeliveryList({
            latitude: userPosition.lat,
            longitude: userPosition.lng,
            searchType: 'NEARBY',
            cartRequestList: cartRequestList,
          })
            .then(res => {
              resolve(sortDistricts(res.familyInfoForDistrictInfoList));
            })
            .catch(err => {
              reject(err);
            });
        }
        // 3. 포장만 가져오기
        else if (forValues.includes('change-takeout')) {
          BranchAPI.District.getTakeoutList({
            latitude: userPosition.lat,
            longitude: userPosition.lng,
            searchType: 'NEARBY',
            cartRequestList: cartRequestList,
          })
            .then(res => {
              resolve(sortDistricts(res.familyInfoForDistrictInfoList));
            })
            .catch(err => {
              reject(err);
            });
        } else {
          // reject(new Error("for parameter error"));
          resolve([]);
        }
      });
    },
    [queryFor, queryCart],
  );

  const handleSearch = useCallback(async () => {
    if (!searchText || !searchText.trim().length) return;
    const firstPosition =
      (await searchKeyword(`${searchText.trim()} bbq`)) ??
      (await searchKeyword(`${searchText.trim()}`));
    if (firstPosition) {
      setTempDefaultPosition(firstPosition);
      setDefaultPosition(firstPosition);
      setPosition(firstPosition);
    }
  }, [searchText]);

  const handleOnlyAvailableChecked = useCallback(() => {
    setOnlyAvailable(!onlyAvailable);
  }, [onlyAvailable]);

  const handleMapDragStart = () => {
    setDragging(true);
  };

  const handleMapDragEnd = useCallback(async () => {
    if (!position) return;
    if (!userPosition) return;

    // NOTE: 스토어를 클릭해서 일시적으로 맵의 포지션을 설정한것을 원래대로 되돌린다.
    if (tempDefaultPosition) {
      setTempDefaultPosition(undefined);
    }
    setDefaultPosition(position);

    /*try { // NOTE: 어차피 defaultPositio을 세팅하면 address set이 되기때문에 필요없음.
      const address = await getAddress(position);
      setAddress(address);
    } catch (err) {
      console.error(err);
    }*/
    setDragging(false);

    fetch({ position, userPosition })
      .then(districts => {
        setDistricts(districts);
      })
      .catch(err => {
        console.error(err);
      });
  }, [position, userPosition, queryFor, queryCart]);

  const handleMapCenterChanged = ({ lat, lng }: Position) => {
    setPosition({
      lat: lat,
      lng: lng,
    });
  };

  // 스토어 카드 클릭
  const handleStoreCardClick = ({ district }: { district: District }) => {
    setTempDefaultPosition(position);
    /* NOTE: 값을 바꿔도 화면이 간헐적으로 이동이 안되는 현상을 tweak 해결*/
    setTimeout(() => {
      setTempDefaultPosition({
        lat: district.latitude,
        lng: district.longitude,
      });
      setSelectedBranchId(district.branchId);
    });
  };

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

  // 기본 매장 목록 가져오기
  useEffect(() => {
    if (!defaultPosition) return;
    if (!userPosition) return;

    fetch({ position: defaultPosition, userPosition: userPosition })
      .then(districts => {
        setDistricts(districts);
      })
      .catch(err => {
        console.error(err);
      });
  }, [defaultPosition, userPosition, queryFor, queryCart]);

  // 현재 위치 저장
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

  // 기본 위치로 초기 조회
  /*
  useEffect(() => {
    fetch({ position })
      .then((districts) => {
        setDistricts(districts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [queryFor, queryCart]);
  */

  if (!defaultPosition || !position) return null;

  const props = {
    queryFor: queryFor,
    queryRedirectTo: queryRedirectTo,
    handleSearch: handleSearch,
    onlyAvailable: onlyAvailable,
    handleOnlyAvailableChecked: handleOnlyAvailableChecked,
    districts: districts,
    searchText: searchText,
    setSearchText: setSearchText,
    dragging: dragging,
    address: address,
    position: position,
    myPosition: myPosition,
    tempDefaultPosition: tempDefaultPosition,
    defaultPosition: defaultPosition,
    handleMapDragStart: handleMapDragStart,
    handleMapDragEnd: handleMapDragEnd,
    handleMapCenterChanged: handleMapCenterChanged,
    handleGoToMyLocationButtonClick: handleGoToMyLocationButtonClick,
    handleStoreCardClick: handleStoreCardClick,
    selectedBranchId: selectedBranchId,
    setSelectedBranchId: setSelectedBranchId,
  };

  return (
    <>
      <Desktop>
        <StoreMapPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <StoreMapPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}

const sortDistricts = (districts: District[]): District[] => {
  return [...districts].sort((a, b) => {
    if (a.availableType === 'AVAILABLE' && b.availableType !== 'AVAILABLE') return -1;
    if (a.availableType !== 'AVAILABLE' && b.availableType == 'AVAILABLE') return 1;

    return a.distance - b.distance;
  });
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
        reject(status ? new Error(status) : new Error('unknown error'));
      }
    });
  });
};

const searchKeyword = async (keyword: string) => {
  return new Promise<Position | undefined>((resolve, reject) => {
    const places = new kakao.maps.services.Places();

    places.keywordSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        if (result && result.length > 0) {
          resolve({
            lng: Number(result[0].x),
            lat: Number(result[0].y),
          });
        } else {
          resolve(undefined);
        }
      } else {
        resolve(undefined);
      }
    });
  });
};
