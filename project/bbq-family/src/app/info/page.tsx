'use client';

import {
  ArrowLeftIcon,
  CalendarIcon,
  CameraIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { PencilIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import {
  Button,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Select,
  SelectItem,
  Subtitle,
  Text,
  Title,
} from '@tremor/react';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import { time } from 'console';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import { MallInfoResponse } from '../api/info/route';
import { Checkbox, CheckboxGroup } from '../components/Checkbox';
import CustomButton from '../components/CustomButton';
import Divider from '../components/Divider';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { useModalContext } from '../components/Modal';
import { Radiobox, RadioboxGroup } from '../components/Radiobox';
import { getAxios } from '../lib/Axios';
import { returnDayOfWeek, returnWeekType } from '../utils/ChangeValueType';

type timeSelectedValueType = {
  weekdayOpenAt?: string;
  weekdayCloseAt?: string;
  weekendOpenAt?: string;
  weekendCloseAt?: string;
  weekendIncluded?: string;
};

type tempSelectedValueType = {
  closeScheduleInfoList?: {
    weekType?: string;
    dayOfWeek?: string;
  }[];
  tempCloseDateRange?: DateRangePickerValue;
  holidayIncluded?: string[];
};

export default function Info() {
  const [modified, setModified] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { openModal, closeModal } = useModalContext();
  const [status, setStatus] = useState(false);
  const [mallData, setMallData] = useState<MallInfoResponse>(null);
  const router = useRouter();
  const [type, setType] = useState<'time' | 'temp' | 'none'>('none');
  const [tempMallData, setTempMallData] = useState<timeSelectedValueType & tempSelectedValueType>();
  const initalCloseScheduleInfo = {
    weekType: '',
    dayOfWeek: '',
  };

  const [timeSelectedValue, setTimeSelectedValue] = useState<timeSelectedValueType>({
    weekendIncluded: 'Y',
    weekdayOpenAt: '',
    weekdayCloseAt: '',
    weekendOpenAt: '',
    weekendCloseAt: '',
  });

  const [tempSelectedValue, setTempSelectedValue] = useState<tempSelectedValueType>({
    closeScheduleInfoList: [],
    tempCloseDateRange: undefined,
    holidayIncluded: ['N'],
  });

  const getData = async () => {
    const mallData = await getAxios().get('/api/info');
    setMallData(mallData.data);

    setTempMallData({
      weekdayOpenAt: mallData.data.openSchedule.weekdayOpenAt,
      weekdayCloseAt: mallData.data.openSchedule.weekdayCloseAt,
      weekendOpenAt: mallData.data.openSchedule.weekendOpenAt,
      weekendCloseAt: mallData.data.openSchedule.weekendCloseAt,
      weekendIncluded: 'N',
      closeScheduleInfoList: JSON.parse(JSON.stringify(mallData.data.closeScheduleList)),
      tempCloseDateRange: mallData.data.tempCloseSchedule.startDate
        ? {
            from: new Date(mallData.data.tempCloseSchedule.startDate),
            to: new Date(mallData.data.tempCloseSchedule.endDate),
          }
        : undefined,
      holidayIncluded: ['N'],
    });
    setTimeSelectedValue({
      weekdayOpenAt: mallData.data.openSchedule.weekdayOpenAt,
      weekdayCloseAt: mallData.data.openSchedule.weekdayCloseAt,
      weekendOpenAt: mallData.data.openSchedule.weekendOpenAt,
      weekendCloseAt: mallData.data.openSchedule.weekendCloseAt,
      weekendIncluded: 'N',
    });
    setTempSelectedValue({
      closeScheduleInfoList: mallData.data.closeScheduleList,
      tempCloseDateRange: mallData.data.tempCloseSchedule.startDate
        ? {
            from: new Date(mallData.data.tempCloseSchedule.startDate),
            to: new Date(mallData.data.tempCloseSchedule.endDate),
          }
        : undefined,
      holidayIncluded: ['N'],
    });
    setStatus(mallData.data.isOpen);
  };

  useEffect(() => {
    getData();
  }, []);

  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      formData.append('familyImage', e.target.files[0]);
      const res = await axios.post('/api/info/image', formData);
      if (res.status === 200) {
        getData();
      }
    }
  };

  const saveTime = () => {
    if (timeSelectedValue.weekendIncluded == 'Y') {
      setTempMallData({
        ...tempMallData,
        weekdayOpenAt: timeSelectedValue.weekdayOpenAt,
        weekdayCloseAt: timeSelectedValue.weekdayCloseAt,
        weekendOpenAt: timeSelectedValue.weekdayOpenAt,
        weekendCloseAt: timeSelectedValue.weekdayCloseAt,
        weekendIncluded: 'Y',
      });
    } else {
      setTempMallData({
        ...tempMallData,
        weekdayOpenAt: timeSelectedValue.weekdayOpenAt,
        weekdayCloseAt: timeSelectedValue.weekdayCloseAt,
        weekendOpenAt: timeSelectedValue.weekendOpenAt,
        weekendCloseAt: timeSelectedValue.weekendCloseAt,
        weekendIncluded: 'N',
      });
    }
    setType('none');
  };

  const quitTime = () => {
    setTimeSelectedValue({
      weekdayOpenAt: tempMallData?.weekdayOpenAt,
      weekdayCloseAt: tempMallData?.weekdayCloseAt,
      weekendOpenAt: tempMallData?.weekendOpenAt,
      weekendCloseAt: tempMallData?.weekendCloseAt,
      weekendIncluded: tempMallData?.weekendIncluded,
    });
    setType('none');
  };

  const saveSchedule = () => {
    setTempMallData({
      ...tempMallData,
      closeScheduleInfoList: JSON.parse(JSON.stringify(tempSelectedValue.closeScheduleInfoList)),
      tempCloseDateRange: tempSelectedValue.tempCloseDateRange,
      holidayIncluded: tempSelectedValue.holidayIncluded,
    });
    setType('none');
  };

  const quitSchedule = () => {
    setTempSelectedValue({
      closeScheduleInfoList: JSON.parse(JSON.stringify(tempMallData?.closeScheduleInfoList)),
      tempCloseDateRange: tempMallData?.tempCloseDateRange,
      holidayIncluded: tempMallData?.holidayIncluded,
    });
    setType('none');
  };

  const saveMallData = async () => {
    const res = await getAxios().post('/api/info', {
      openSchedule: {
        weekdayOpenAt: tempMallData?.weekdayOpenAt,
        weekdayCloseAt: tempMallData?.weekdayCloseAt,
        weekendOpenAt: tempMallData?.weekendOpenAt,
        weekendCloseAt: tempMallData?.weekendCloseAt,
      },
      closeScheduleInfoList: tempMallData?.closeScheduleInfoList || [],
      tempCloseSchedule: tempMallData?.tempCloseDateRange
        ? {
            startDate: dayjs(tempMallData?.tempCloseDateRange.from).format('YYYY-MM-DD'),
            endDate: dayjs(tempMallData?.tempCloseDateRange.to).format('YYYY-MM-DD'),
          }
        : {
            startDate: null,
            endDate: null,
          },
    });
    if (res.status === 200) {
      alert('저장 되었습니다');
      getData();
    }
  };

  if (!mallData) return <Loading />;

  if (type === 'time')
    return (
      <Flex flexDirection="col">
        <Flex className="p-5 py-7 bg-[#E52143] relative" justifyContent="center">
          <div
            onClick={quitTime}
            className="rounded-full p-2 absolute left-[20px] cursor-pointer"
            style={{
              boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.15)',
              background: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <ArrowLeftIcon className="text-white" width={20} />
          </div>
          <Title className="text-white mx-auto text-xl">영업시간</Title>
        </Flex>
        <Flex className="p-5" flexDirection="col">
          <Flex justifyContent="start" className="gap-5">
            <RadioboxGroup
              value={timeSelectedValue.weekendIncluded || 'Y'}
              onChange={value => {
                setTimeSelectedValue({
                  ...timeSelectedValue,
                  weekendIncluded: value,
                });
              }}
            >
              <Radiobox value="Y" label={'주말 포함'} />
              <Radiobox value="N" label={'주말 별도'} />
            </RadioboxGroup>
          </Flex>
          <Flex flexDirection="col" alignItems="start">
            <Text className="my-3">
              {timeSelectedValue.weekendIncluded == 'Y' ? '매일' : '평일 (월~목)'}
            </Text>
            <Flex className="gap-5">
              <Select
                placeholder="시간 선택"
                value={timeSelectedValue.weekdayOpenAt}
                onValueChange={value =>
                  setTimeSelectedValue({
                    ...timeSelectedValue,
                    weekdayOpenAt: value,
                  })
                }
              >
                {Array.from(Array(48).keys()).map((item, index) => (
                  <SelectItem
                    key={index}
                    value={
                      item > 10
                        ? `${Math.floor(item / 2)}:${item % 2 == 0 ? '00' : '30'}`
                        : item % 2 == 0
                          ? `0${item / 2}:00`
                          : `0${Math.floor(item / 2)}:30`
                    }
                  >
                    {item > 10
                      ? `${Math.floor(item / 2)}:${item % 2 == 0 ? '00' : '30'}`
                      : item % 2 == 0
                        ? `0${item / 2}:00`
                        : `0${Math.floor(item / 2)}:30`}
                  </SelectItem>
                ))}
              </Select>{' '}
              ~
              <Select
                placeholder="시간 선택"
                value={timeSelectedValue.weekdayCloseAt}
                onValueChange={value =>
                  setTimeSelectedValue({
                    ...timeSelectedValue,
                    weekdayCloseAt: value,
                  })
                }
              >
                {Array.from(Array(48).keys()).map((item, index) => (
                  <SelectItem
                    key={index}
                    value={
                      item > 10
                        ? `${Math.floor(item / 2)}:${item % 2 == 0 ? '00' : '30'}`
                        : item % 2 == 0
                          ? `0${item / 2}:00`
                          : `0${Math.floor(item / 2)}:30`
                    }
                  >
                    {item > 10
                      ? `${Math.floor(item / 2)}:${item % 2 == 0 ? '00' : '30'}`
                      : item % 2 == 0
                        ? `0${item / 2}:00`
                        : `0${Math.floor(item / 2)}:30`}
                  </SelectItem>
                ))}
              </Select>
            </Flex>
          </Flex>
          {timeSelectedValue.weekendIncluded == 'N' && (
            <Flex flexDirection="col" alignItems="start">
              <Text className="my-3">주말 (금~일)</Text>
              <Flex className="gap-5">
                <Select
                  placeholder="시간 선택"
                  value={timeSelectedValue.weekendOpenAt}
                  onValueChange={value =>
                    setTimeSelectedValue({
                      ...timeSelectedValue,
                      weekendOpenAt: value,
                    })
                  }
                >
                  {Array.from(Array(48).keys()).map((item, index) => (
                    <SelectItem
                      key={index}
                      value={
                        item > 10
                          ? `${Math.floor(item / 2)}:${item % 2 == 0 ? '00' : '30'}`
                          : item % 2 == 0
                            ? `0${item / 2}:00`
                            : `0${Math.floor(item / 2)}:30`
                      }
                    >
                      {item > 10
                        ? `${Math.floor(item / 2)}:${item % 2 == 0 ? '00' : '30'}`
                        : item % 2 == 0
                          ? `0${item / 2}:00`
                          : `0${Math.floor(item / 2)}:30`}
                    </SelectItem>
                  ))}
                </Select>{' '}
                ~
                <Select
                  placeholder="시간 선택"
                  value={timeSelectedValue.weekendCloseAt}
                  onValueChange={value =>
                    setTimeSelectedValue({
                      ...timeSelectedValue,
                      weekendCloseAt: value,
                    })
                  }
                >
                  {Array.from(Array(48).keys()).map((item, index) => (
                    <SelectItem
                      key={index}
                      value={
                        item > 10
                          ? `${Math.floor(item / 2)}:${item % 2 == 0 ? '00' : '30'}`
                          : item % 2 == 0
                            ? `0${item / 2}:00`
                            : `0${Math.floor(item / 2)}:30`
                      }
                    >
                      {item > 10
                        ? `${Math.floor(item / 2)}:${item % 2 == 0 ? '00' : '30'}`
                        : item % 2 == 0
                          ? `0${item / 2}:00`
                          : `0${Math.floor(item / 2)}:30`}
                    </SelectItem>
                  ))}
                </Select>
              </Flex>
            </Flex>
          )}
          <div className="bg-[#B6B8C84D] h-[1px] opacity-30 border-[#B6B8C8] border-t-[1px] w-full my-6" />
          <CustomButton type="primary" className="w-full" onClick={saveTime}>
            적용하기
          </CustomButton>
          <CustomButton type="secondary" className="w-full mt-3" onClick={quitTime}>
            취소
          </CustomButton>
        </Flex>
      </Flex>
    );
  if (type === 'temp')
    return (
      <Flex flexDirection="col">
        <Flex className="p-5 py-7 bg-[#E52143] relative" justifyContent="center">
          <div
            onClick={quitSchedule}
            className="rounded-full p-2 absolute left-[20px] cursor-pointer"
            style={{
              boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.15)',
              background: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <ArrowLeftIcon className="text-white" width={20} />
          </div>
          <Title className="text-white mx-auto text-xl">휴무일</Title>
        </Flex>
        <Flex flexDirection="col" alignItems="start" className="p-5">
          <CheckboxGroup
            value={tempSelectedValue.holidayIncluded || []}
            onChange={value => {
              setTempSelectedValue({
                ...tempSelectedValue,
                holidayIncluded: value,
              });
            }}
          >
            <Checkbox value="Y" label={'공휴일 포함'} />
          </CheckboxGroup>
          <Flex flexDirection="col" alignItems="start" className="mt-3">
            <Text>정기 휴무</Text>

            {tempSelectedValue.closeScheduleInfoList &&
              tempSelectedValue.closeScheduleInfoList.map((item, index) => (
                <Flex className="gap-3 mt-3" key={index}>
                  <Select
                    className="min-w-[100px]"
                    placeholder="주차 선택"
                    value={item.weekType}
                    onValueChange={value => {
                      const temp = tempSelectedValue.closeScheduleInfoList;
                      if (temp) {
                        temp[index].weekType = value;
                        setTempSelectedValue({
                          ...tempSelectedValue,
                          closeScheduleInfoList: temp,
                        });
                      }
                    }}
                  >
                    <SelectItem value="FIRST_WEEK">첫째 주</SelectItem>
                    <SelectItem value="SECOND_WEEK">둘째 주</SelectItem>
                    <SelectItem value="THIRD_WEEK">셋째 주</SelectItem>
                    <SelectItem value="FOURTH_WEEK">넷째 주</SelectItem>
                    <SelectItem value="FIFTH_WEEK">다섯째 주</SelectItem>
                    <SelectItem value="EVERY_WEEK">매주</SelectItem>
                  </Select>
                  <Select
                    className="min-w-[100px]"
                    placeholder="요일 선택"
                    value={item.dayOfWeek}
                    onValueChange={value => {
                      const temp = tempSelectedValue.closeScheduleInfoList;
                      if (temp) {
                        temp[index].dayOfWeek = value;
                        setTempSelectedValue({
                          ...tempSelectedValue,
                          closeScheduleInfoList: temp,
                        });
                      }
                    }}
                  >
                    <SelectItem value="MONDAY">월요일</SelectItem>
                    <SelectItem value="TUESDAY">화요일</SelectItem>
                    <SelectItem value="WEDNESDAY">수요일</SelectItem>
                    <SelectItem value="THURSDAY">목요일</SelectItem>
                    <SelectItem value="FRIDAY">금요일</SelectItem>
                    <SelectItem value="SATURDAY">토요일</SelectItem>
                    <SelectItem value="SUNDAY">일요일</SelectItem>
                  </Select>
                  <CustomButton
                    onClick={() => {
                      const temp = tempSelectedValue.closeScheduleInfoList;
                      if (temp) {
                        temp.splice(index, 1);
                        setTempSelectedValue({
                          ...tempSelectedValue,
                          closeScheduleInfoList: temp,
                        });
                      }
                    }}
                    type="delete"
                  >
                    삭제
                  </CustomButton>
                </Flex>
              ))}
            <CustomButton
              type="secondary"
              className="w-full mt-3"
              onClick={() => {
                if (tempSelectedValue.closeScheduleInfoList) {
                  setTempSelectedValue({
                    ...tempSelectedValue,
                    closeScheduleInfoList: [
                      ...tempSelectedValue.closeScheduleInfoList,
                      initalCloseScheduleInfo,
                    ],
                  });
                }
              }}
            >
              <Flex>
                <PlusCircleIcon width={20} />
                <Text>정기 휴무 추가</Text>
              </Flex>
            </CustomButton>
          </Flex>
          <div className="bg-[#B6B8C84D] h-[1px] opacity-30 border-[#B6B8C8] border-t-[1px] w-full my-6" />
          <Flex flexDirection="col" alignItems="start">
            <Text>임시 휴무</Text>
            {tempSelectedValue.tempCloseDateRange ? (
              <Flex className="gap-5 mt-3">
                <DateRangePicker
                  value={tempSelectedValue.tempCloseDateRange}
                  onValueChange={value =>
                    setTempSelectedValue({
                      ...tempSelectedValue,
                      tempCloseDateRange: value,
                    })
                  }
                  enableSelect={false}
                  locale={ko}
                  placeholder="기간 선택"
                />
                <CustomButton
                  type="delete"
                  onClick={() => {
                    setTempSelectedValue({
                      ...tempSelectedValue,
                      tempCloseDateRange: undefined,
                    });
                  }}
                >
                  삭제
                </CustomButton>
              </Flex>
            ) : (
              <CustomButton
                type="secondary"
                className="w-full mt-3"
                onClick={() => {
                  setTempSelectedValue({
                    ...tempSelectedValue,
                    tempCloseDateRange: {
                      from: new Date(),
                      to: new Date(),
                    },
                  });
                }}
              >
                <Flex>
                  <PlusCircleIcon width={20} />
                  <Text>임시 휴무 추가</Text>
                </Flex>
              </CustomButton>
            )}
          </Flex>

          <div className="bg-[#B6B8C84D] h-[1px] opacity-30 border-[#B6B8C8] border-t-[1px] w-full my-6" />
          <CustomButton type="primary" className="w-full" onClick={saveSchedule}>
            적용하기
          </CustomButton>
          <CustomButton type="secondary" className="w-full mt-3" onClick={quitSchedule}>
            취소
          </CustomButton>
        </Flex>
      </Flex>
    );
  if (type === 'none')
    return (
      <Flex flexDirection="col">
        <Flex className="p-5 py-7 bg-[#E52143] relative" justifyContent="center">
          <div
            onClick={() => router.push('/')}
            className="rounded-full p-2 absolute left-[20px] cursor-pointer"
            style={{
              boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.15)',
              background: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <ArrowLeftIcon className="text-white" width={20} />
          </div>
          <Title className="text-white mx-auto text-xl">패밀리 정보 관리</Title>
        </Flex>
        <div className="relative cursor-pointer" onClick={() => fileRef?.current?.click()}>
          <input
            type="file"
            accept="image/png"
            onChange={changeImage}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            ref={fileRef}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <CameraIcon className="text-[#FFFFFF] mx-auto" width={108} />
            <Text className="text-[#00C9B5] text-center">
              권장사이즈 1,000 x 1,000 픽셀
              <br />( 1:1 비율 정사각형 )
            </Text>
          </div>
          <div
            className="w-[100%] h-[500px] absolute"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          ></div>
          <Image
            className="w-[500px] h-[500px]"
            alt="bg"
            src={mallData?.familyImageUrl ? mallData.familyImageUrl : `/images/ic_mall_main_bg.png`}
            width={425}
            height={425}
          />
        </div>
        <Flex className="pt-5 px-5" flexDirection="col">
          <Flex className="border-b pb-3" flexDirection="col">
            <Flex justifyContent="start" className="gap-3">
              <ClockIcon width={20} />
              <Title className="text-black">영업 시간</Title>
              <Flex className="w-[auto] ml-auto cursor-pointer">
                <PencilIcon className="text-red-500" width={15} />
                <button
                  onClick={() => {
                    setType('time');
                  }}
                >
                  <Text className="text-red-500 ml-1">수정하기</Text>
                </button>
              </Flex>
            </Flex>
            <div className="pl-[35px] self-start w-full">
              <Flex justifyContent="between">
                <Text className="text-black">평일(월~목)</Text>
                <Text className="text-black">
                  {tempMallData?.weekdayOpenAt} ~ {tempMallData?.weekdayCloseAt}
                </Text>
              </Flex>
              <Flex>
                <Text className="text-black">주말(금~일)</Text>
                <Text className="text-black">
                  {tempMallData?.weekendOpenAt} ~ {tempMallData?.weekendCloseAt}
                </Text>
              </Flex>
            </div>
          </Flex>
          <Flex className="border-b pb-3 pt-3" flexDirection="col">
            <Flex justifyContent="start" className="gap-3">
              <CalendarIcon width={20} />
              <Title className="text-black">휴무일</Title>
              <Flex className="w-[auto] ml-auto cursor-pointer">
                <PencilIcon className="text-red-500" width={15} />
                <button onClick={() => setType('temp')}>
                  <Text className="text-red-500 ml-1">수정하기</Text>
                </button>
              </Flex>
            </Flex>
            <div className="pl-[35px] self-start w-full">
              {tempMallData?.closeScheduleInfoList &&
                tempMallData?.closeScheduleInfoList.map((closeSchedule, index) => (
                  <Flex justifyContent="between" key={index}>
                    <Text className="text-black">{index === 0 && '정기휴무'}</Text>
                    <Text className="text-black">
                      {closeSchedule.weekType && returnWeekType(closeSchedule.weekType)}{' '}
                      {closeSchedule.dayOfWeek && returnDayOfWeek(closeSchedule.dayOfWeek)}
                    </Text>
                  </Flex>
                ))}
              <Flex>
                <Text className="text-black">임시 휴무</Text>

                {tempMallData?.tempCloseDateRange ? (
                  <Text>
                    {dayjs(tempMallData.tempCloseDateRange.from).format('YYYY-MM-DD')} ~{' '}
                    {dayjs(tempMallData.tempCloseDateRange.to).format('YYYY-MM-DD')}
                  </Text>
                ) : (
                  <Text>설정 안함</Text>
                )}
              </Flex>
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
              <Text className="text-[#8E93AD]">
                정보 변경이 필요한 경우 담당 BM에게 문의해주세요 *
              </Text>
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
              <Text className="text-[#8E93AD]">
                정보 변경이 필요한 경우 담당 BM에게 문의해주세요 *
              </Text>
            </div>
          </Flex>
        </Flex>
        <div className="p-5 w-full">
          <CustomButton type="primary" className="w-full" onClick={saveMallData}>
            저장
          </CustomButton>
        </div>

        <Flex justifyContent="end" className="mr-10 mt-5">
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
