import { Button, Card, Flex, List, ListItem, Text, Title } from '@tremor/react';
import { useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

import { useModalContext } from '@/app/components/Modal';
import { ContentEntity } from '@/pages/api/family/list';

import FamilyRegister from './FamilyRegister';

export default function FamilyDetail({
  data,
  getData,
}: {
  data: ContentEntity;
  getData: () => Promise<void>;
}) {
  const [show, setShow] = useState<boolean>(true);
  const { openModal } = useModalContext();

  const LocationContainer = () => (
    <div className="bg-blue-950 p-2 relative top-[-80px] left-[0px] rounded-full">
      <Text className="text-white font-bold px-2 py-0">{data.familyName}</Text>
    </div>
  );

  return (
    <Flex>
      <Card className="w-[500px] p-0 !border-0">
        <Map
          center={{
            // 지도의 중심좌표
            lat: data.latitude,
            lng: data.longitude,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '400px',
          }}
          level={4} // 지도의 확대 레벨
        >
          <MapMarker // 마커를 생성합니다
            position={{ lat: data.latitude, lng: data.longitude }}
            image={{
              src: '/images/ic_mall_map_pin.png', // 마커이미지의 주소입니다
              size: {
                width: 56,
                height: 81,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 25,
                  y: 65,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
          <CustomOverlayMap position={{ lat: data.latitude, lng: data.longitude }} yAnchor={1}>
            {show && <LocationContainer />}
          </CustomOverlayMap>
        </Map>
      </Card>
      <Card className="!border-0 bg-white h-[400px] ">
        <Flex justifyContent="start" alignItems="end" className="mb-3">
          <Title className="!text-4xl">{data.familyName}</Title>
          {data.isNowActive ? (
            <Text className="text-emerald-500 !text-2xl ml-3">오픈</Text>
          ) : (
            <Text className="text-emerald-500 !text-2xl ml-3">미오픈</Text>
          )}
          <Button
            className="bg-white border-gray-500 text-gray-500 hover:bg-gray-200 ml-auto"
            onClick={() =>
              openModal(
                '정보수정',
                `(매장코드 ${data.branchId})`,
                <FamilyRegister branchId={data.branchId} />,
                getData,
              )
            }
          >
            정보 수정
          </Button>
        </Flex>
        <Flex className="border-y-2 border-gray-950">
          <List className="mt-1 border-r-2 border-gray-950 p-0 mt-0">
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>점주명 :</Text>
              <Text className="ml-1">{data.ownerName}</Text>
            </ListItem>
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>점주연락처 :</Text>
              <Text className="ml-1">{data.phoneNumber}</Text>
            </ListItem>
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>사업자등록번호 :</Text>
              <Text className="ml-1">{data.brn}</Text>
            </ListItem>
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>맴버십 :</Text>
              <Text className="ml-1">{data.useMembership ? '사용' : '미사용'}</Text>
            </ListItem>
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>온라인주문 :</Text>
              <Text className="ml-1">{data.isOnlineOrderAvailable ? '가능' : '불가능'}</Text>
            </ListItem>
          </List>
          <List>
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>매장연락처 :</Text>
              <Text className="ml-1">{data.tel}</Text>
            </ListItem>
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>영업시간 :</Text>
              {data.openSchedule.weekdayOpenAt && data.openSchedule.weekdayCloseAt ? (
                <Text className="ml-1 mr-5">
                  평일 {data.openSchedule.weekdayOpenAt} ~ {data.openSchedule.weekdayCloseAt}
                </Text>
              ) : (
                <Flex className="ml-2"> 평일 - </Flex>
              )}

              {data.openSchedule.weekendOpenAt && data.openSchedule.weekendCloseAt ? (
                <Text>
                  주말 {data.openSchedule.weekendOpenAt} ~ {data.openSchedule.weekendCloseAt}
                </Text>
              ) : (
                <Flex className="ml-2"> 주말 - </Flex>
              )}
            </ListItem>
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>매장코드 :</Text>
              <Text className="ml-1">{data.brandCode}</Text>
            </ListItem>
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>배달료 :</Text>
              <Text className="ml-1">{data.defaultDeliveryFee.toLocaleString()}원</Text>
            </ListItem>
            <ListItem className="justify-start p-2">
              <Text className="text-emerald-500 mr-1 font-bold">·</Text>
              <Text>주소 :</Text>
              <Text className="ml-1">{data.address}</Text>
            </ListItem>
          </List>
        </Flex>
        <Flex className="border-b-2 border-gray-950">
          <Flex flexDirection="col" className="border-r p-3">
            <Text className="self-start mb-3 !text-lg">다날</Text>
            <Text className="self-end !text-2xl">{data.isUseDanalPayment ? '사용' : '미사용'}</Text>
          </Flex>
          <Flex flexDirection="col" className="border-r p-3">
            <Text className="self-start mb-3 !text-lg">페이코</Text>
            <Text className="self-end !text-2xl">{data.isUsePaycoPayment ? '사용' : '미사용'}</Text>
          </Flex>
          <Flex flexDirection="col" className="border-r p-3">
            <Text className="self-start mb-3 !text-lg">페이코인</Text>
            <Text className="self-end !text-2xl">
              {data.isUsePayCoinPayment ? '사용' : '미사용'}
            </Text>
          </Flex>
          <Flex flexDirection="col" className="border-r p-3">
            <Text className="self-start mb-3 !text-lg">카카오페이</Text>
            <Text className="self-end !text-2xl">{data.isUseKakaoPayment ? '사용' : '미사용'}</Text>
          </Flex>
          <Flex flexDirection="col" className="border-r p-3">
            <Text className="self-start mb-3 !text-lg">네이버페이</Text>
            <Text className="self-end !text-2xl">{data.isUseNaverPayment ? '사용' : '미사용'}</Text>
          </Flex>
          <Flex flexDirection="col" className="border-r p-3">
            <Text className="self-start mb-3 !text-lg">토스페이</Text>
            <Text className="self-end !text-2xl">{data.isUseTossPayment ? '사용' : '미사용'}</Text>
          </Flex>
          <Flex flexDirection="col" className="p-3 border-r">
            <Text className="self-start mb-3 !text-lg">딹페이</Text>
            <Text className="self-end !text-2xl">{data.isUseUbPayment ? '사용' : '미사용'}</Text>
          </Flex>
          <Flex flexDirection="col" className=" p-3">
            <Text className="self-start mb-3 !text-lg">BBQ페이</Text>
            <Text className="self-end !text-2xl">{data.isUseSgPayment ? '사용' : '미사용'}</Text>
          </Flex>
        </Flex>
        {/* <div className=' pt-2 pl-2 mb-0'>
          <Title className='mb-1'>매출 정보</Title>
          <Text>총 주문건수 : 26,387건 / 월 평균 주문건수 : 562건 / 일 평균 주문건수 : 19건 (전국 256위)<br />
총 매출액 : 151,268,495원 / 월 평균 매출액 : 12,856,725원 / 일 평균 매출액 : 3,984,513원 (전국 242위)</Text>
        </div>
        <div className='pt-2 pl-2'>
          <Title className='mb-1'>영업 정보</Title>
          <Text>월 평균 비오픈일 : 2.4일 / 주문 취소율 : 2.1% / 주문 후 평균 접수 체크 시간 : 3분 25초 / 월 평균 클레임 건수 : 12.8건<br />
일 평균 영업시간 13시간 43분 / 평균 오픈시간 AM 10:48 / 평균 종료시간 PM11:48</Text>
        </div> */}
      </Card>
    </Flex>
  );
}
