'use client';

import { CalendarIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Button, Flex, Subtitle, Text, Title } from '@tremor/react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { MallInfoResponse } from './api/info/route';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { useModalContext } from './components/Modal';
import { getAxios } from './lib/Axios';
import { returnDayOfWeek, returnWeekType } from './utils/ChangeValueType';

export default function Home() {
  const { openModal } = useModalContext();
  const [status, setStatus] = useState(false);
  const [mallData, setMallData] = useState<MallInfoResponse>(null);
  const router = useRouter();

  const changeStatus = (type: boolean) => {
    if (type === status) return;

    openModal(
      '상태변경',
      <Text className="text-lg text-black">
        영업 상태를
        <br />
        변경하시겠습니까?
      </Text>,
      () => changeOpenStatus(!status),
    );
  };

  const getData = async () => {
    const mallData = await getAxios().get('/api/info');
    setMallData(mallData.data);
    setStatus(mallData.data.isOpen);
  };

  const changeOpenStatus = async (openStatus: boolean) => {
    try {
      if (openStatus) {
        await getAxios().patch('/api/info', {
          openType: 'OPEN',
        });
      } else {
        await getAxios().patch('/api/info', {
          openType: 'CLOSE',
        });
      }

      setStatus(!status);
    } catch (e) {
      alert('영업 상태 변경에 실패했습니다.');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!mallData) return <Loading />;

  return (
    <Flex flexDirection="col">
      <Flex flexDirection="col" justifyContent="center" className="bg-[#E52143] h-[200px]">
        <Text className="text-white !text-lg">세상에서 가장 맛있는 치킨!</Text>
        <Title className="text-white !text-2xl eclipse">BBQ치킨 {mallData?.familyName}점</Title>
        <div
          className="rounded-full p-1 mt-5"
          style={{
            boxShadow: '0px 0.5px 4px 0px #00000033 inset',
            backgroundColor: 'rgba(206, 30, 60, 1)',
          }}
        >
          <button
            className={`${
              !!status
                ? 'bg-white rounded-full mr-2 px-3 py-1 text-[#E52143] font-bold'
                : 'text-white text-opacity-30 ml-2'
            }`}
            onClick={() => changeStatus(true)}
          >
            영업중
          </button>
          <button
            onClick={() => changeStatus(false)}
            className={`${
              !status
                ? 'bg-white ml-2 rounded-full px-3 py-1 text-[#E52143] font-bold'
                : 'text-white text-opacity-30 mr-2'
            }`}
          >
            준비중
          </button>
        </div>
      </Flex>

      <img
        alt="bg"
        src={mallData?.familyImageUrl ? mallData.familyImageUrl : `/images/ic_mall_main_bg.png`}
        className="w-[425px] h-[425px]"
        width={425}
        height={425}
      />
      <Flex className="w-full px-5 gap-5">
        <Button
          onClick={() => router.push('/menu')}
          className="flex-1 !rounded-xl h-[94px] relative bottom-[40px] text-white border-none bg-gradient-to-b from-[#E52143] to-[#CE1E3C]"
        >
          {/* <div className='max-w-xs text-sm z-20 rounded-tremor-default bg-tremor-background-emphasis text-white px-2.5 py-1' tabIndex={-1} id={":r0:"} role={"tooltip"} style={{
            pointerEvents: 'none',
            position: 'absolute',
            top: '-33px',
            left: '86.7695px'
          }}>정보 관리는 관리자에 문의해주세요</div> */}
          <Flex className="gap-1" flexDirection="col">
            <Image src="/images/ic_chicken.png" width={46} height={40} alt="chicken_icon" />
            <Text className="!text-xl text-white">메뉴 관리</Text>
          </Flex>
        </Button>
        <Button
          onClick={() => router.push('/info')}
          className="flex-1 !rounded-xl h-[94px] relative bottom-[40px] text-white border-none bg-gradient-to-b from-[#E52143] to-[#CE1E3C]"
        >
          <Flex className="gap-1" flexDirection="col">
            <Image src="/images/ic_document.png" width={32} height={32} alt="document_icon" />
            <Text className="!text-xl text-white">정보 관리</Text>
          </Flex>
        </Button>
      </Flex>
      <Flex className="relative bottom-[20px] px-5" flexDirection="col">
        <Flex className="border-b pb-3" flexDirection="col">
          <Flex justifyContent="start" className="gap-3">
            <ClockIcon width={20} />
            <Title className="text-black">영업 시간</Title>
          </Flex>
          <div className="pl-[35px] self-start w-full">
            <Flex justifyContent="between">
              <Text className="text-black">평일(월~목)</Text>
              <Text className="text-black">
                {mallData?.openSchedule.weekdayOpenAt} ~ {mallData?.openSchedule.weekdayCloseAt}
              </Text>
            </Flex>
            <Flex>
              <Text className="text-black">주말(금~일)</Text>
              <Text className="text-black">
                {mallData?.openSchedule.weekendOpenAt} ~ {mallData?.openSchedule.weekendCloseAt}
              </Text>
            </Flex>
          </div>
        </Flex>
        <Flex className="border-b pb-3 pt-3" flexDirection="col">
          <Flex justifyContent="start" className="gap-3">
            <CalendarIcon width={20} />
            <Title className="text-black">휴무일</Title>
          </Flex>
          <div className="pl-[35px] self-start w-full">
            {mallData?.closeScheduleList.map((closeSchedule, index) => (
              <Flex justifyContent="between" key={index}>
                <Text className="text-black">{index === 0 && '정기휴무'}</Text>
                <Text className="text-black">
                  {returnWeekType(closeSchedule.weekType)}{' '}
                  {returnDayOfWeek(closeSchedule.dayOfWeek)}
                </Text>
              </Flex>
            ))}
            {mallData?.tempCloseSchedule ? (
              <Flex>
                <Text className="text-black">임시 휴무</Text>
                <Text>
                  {mallData.tempCloseSchedule.startDate} ~ {mallData.tempCloseSchedule.endDate}
                </Text>
              </Flex>
            ) : (
              <Flex>
                <Text className="text-black">임시 휴무</Text>
                <Text>설정안함</Text>
              </Flex>
            )}
          </div>
        </Flex>
        <Flex className="border-b pb-3 pt-3" flexDirection="col">
          <Flex justifyContent="start" className="gap-3">
            <MapPinIcon width={20} />
            <Title className="text-black">주소</Title>
          </Flex>
          <div className="pl-[35px] self-start w-full">
            <Flex justifyContent="between">
              <Text className="text-black">{mallData?.address}</Text>
            </Flex>
          </div>
        </Flex>
        <Flex className="border-b pb-3 pt-3" flexDirection="col">
          <Flex justifyContent="start" className="gap-3">
            <PhoneIcon width={20} />
            <Title className="text-black">전화번호</Title>
          </Flex>
          <div className="pl-[35px] self-start w-full">
            <Flex justifyContent="between">
              <Text className="text-black">{mallData?.tel}</Text>
            </Flex>
          </div>
        </Flex>
      </Flex>

      <Flex justifyContent="end" className="mr-10">
        <button
          onClick={async () => {
            await signOut({
              redirect: false,
            });
            router.push('/signin');
          }}
        >
          <Subtitle className="underline ">로그아웃</Subtitle>
        </button>
      </Flex>
      <Footer />
    </Flex>
  );
}
