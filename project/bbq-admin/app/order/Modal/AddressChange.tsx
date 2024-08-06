import { Card, Flex, Select, SelectItem, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';

interface AddressChangeCondition {
  address: string;
  roadAddress: string;
  show: boolean;
  position: {
    lat: number;
    lng: number;
  };
  checkList: string[];
}

export default function AddressChange() {
  const [selectedValue, setSelectedValue] = useState<AddressChangeCondition>({
    address: '',
    roadAddress: '',
    show: true,
    position: {
      lat: 33.450701,
      lng: 126.570667,
    },
    checkList: [],
  });

  const getLocationName = async (lat: number, lng: number) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const result = await new Promise((resolve, reject) => {
      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve(result[0]);
        } else {
          reject(status);
        }
      });
    });
    setSelectedValue({
      ...selectedValue,
      address: (result as any).address.address_name,
      roadAddress: (result as any).road_address?.address_name,
    });
  };

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setSelectedValue({
          ...selectedValue,
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    } else {
      alert('현재 위치를 가져올 수 없습니다.');
    }
  };

  useEffect(() => {
    getLocationName(selectedValue.position.lat, selectedValue.position.lng);
    setSelectedValue({
      ...selectedValue,
      show: true,
    });
  }, [selectedValue.position]);

  useEffect(() => {
    setCurrentLocation();
  }, []);

  const LocationContainer = () => (
    <div className="bg-blue-950 p-2 relative top-[120px] rounded-full">
      <Text className="text-white font-bold px-2 py-0">
        {selectedValue.roadAddress ? selectedValue.roadAddress : selectedValue.address}
      </Text>
    </div>
  );
  return (
    <Flex className="w-[80vw]">
      <Card className="border-0 p-0">
        <Map
          center={{
            // 지도의 중심좌표
            lat: selectedValue.position.lat,
            lng: selectedValue.position.lng,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '600px',
          }}
          level={4} // 지도의 확대 레벨
        >
          <MapMarker // 마커를 생성합니다
            position={{
              lat: selectedValue.position.lat,
              lng: selectedValue.position.lng,
            }}
            image={{
              src: '/images/ic_order_map_pin_1.png', // 마커이미지의 주소입니다
              size: {
                width: 40,
                height: 43,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 15,
                  y: -30,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
          <CustomOverlayMap
            position={{
              lat: selectedValue.position.lat,
              lng: selectedValue.position.lng,
            }}
            yAnchor={1}
          >
            {selectedValue.show && <LocationContainer />}
          </CustomOverlayMap>
        </Map>
      </Card>
      <Card className="!border-0 bg-tremor-background-muted">
        <Title>주문자 주소</Title>
        <Text>서울 특별시 송파구 중대로 128 3f 우리B/D 306호</Text>

        <Title className="mt-10">패밀리 리스트</Title>
        <Flex justifyContent="start" className="gap-2 mb-5">
          <Text>반경</Text>
          <Select className="w-[100px]">
            <SelectItem value="1">1KM</SelectItem>
            <SelectItem value="2">2KM</SelectItem>
            <SelectItem value="3">3KM</SelectItem>
            <SelectItem value="4">4KM</SelectItem>
          </Select>
          <Text>이내</Text>
          <Select className="w-[100px]">
            <SelectItem value="1">거리순</SelectItem>
          </Select>
          <Text>으로 정렬</Text>
          <Text className="ml-auto">Total 12</Text>
        </Flex>
        <Flex flexDirection="col" className="gap-2 overflow-scroll h-[380px]">
          {Array(9)
            .fill(0)
            .map((_, index) => {
              return (
                <Card className="p-2" key={index}>
                  <Flex className="gap-2">
                    <CheckboxGroup
                      value={selectedValue.checkList}
                      onChange={value => {
                        setSelectedValue({
                          ...selectedValue,
                          checkList: value,
                        });
                      }}
                    >
                      <Checkbox label="" value={index.toString()} />
                    </CheckboxGroup>
                    <Text className="font-bold">01</Text>
                    <Text>송파우리패밀리점</Text>
                    <Text>280m</Text>
                    <Text>02-1234-5678</Text>
                    <Text className="ml-auto">[자세히]</Text>
                  </Flex>
                </Card>
              );
            })}
        </Flex>
      </Card>
    </Flex>
  );
}
