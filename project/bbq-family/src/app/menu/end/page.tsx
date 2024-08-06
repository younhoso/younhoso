'use client';

import { Badge, Flex, Select, SelectItem, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import axios from 'axios';
import ko from 'date-fns/locale/ko';
import dayjs from 'dayjs';

import { MenuDetailResponseData, OptionDetailResponseData } from '@/app/api/menu/detail/route';
import Alert from '@/app/components/Alert';
import CustomButton from '@/app/components/CustomButton';
import { getAxios } from '@/app/lib/Axios';
import { returnMenuSaleType, returnMenuType } from '@/app/utils/ChangeValueType';

registerLocale('ko', ko);

export default function MenuEnd() {
  const router = useRouter();
  const params = useSearchParams();
  const [menuDetail, setMenuDetail] = useState<MenuDetailResponseData>();
  const [optionDetail, setOptionDetail] = useState<OptionDetailResponseData>();
  const [date, setDate] = useState<any>('');
  const [hour, setHour] = useState<any>('');
  const [minute, setMinute] = useState<any>('');

  const setEndAt = async () => {
    const formattedDate = dayjs(date)
      .set('hour', hour)
      .set('minute', minute)
      .set('second', 0)
      .set('millisecond', 0)
      .format('YYYY-MM-DD HH:mm:ss');
    const menuId = params.get('menuId');
    const optionId = params.get('optionId');

    if (menuId) {
      try {
        await getAxios().patch('/api/menu', {
          menuSaleType: menuDetail?.menuSaleType,
          menuId: parseInt(menuId),
          endAt: formattedDate,
        });
      } catch (e) {
        console.log(e);
      }
    } else if (optionId) {
      try {
        await getAxios().patch('/api/option', {
          // subOptionSaleType: optionDetail?.subOptionSaleType,
          optionId: parseInt(optionId),
          endAt: formattedDate,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getMenuDetail = async () => {
    try {
      const res = await getAxios().get('/api/menu/detail', {
        params: {
          menuId: params.get('menuId'),
        },
      });
      setMenuDetail(res.data);
    } catch (e) {
      alert('접근 권한이 없습니다.');
      router.back();
    }
  };

  const getOptionDetail = async () => {
    try {
      const res = await getAxios().get('/api/menu/detail', {
        params: {
          subOptionItemId: params.get('subOptionItemId'),
        },
      });
      setOptionDetail(res.data);
    } catch (e) {
      alert('접근 권한이 없습니다.');
      router.back();
    }
  };

  useEffect(() => {
    if (params.get('menuId')) {
      getMenuDetail();
    } else if (params.get('subOptionItemId')) {
      getOptionDetail();
    } else {
      alert('접근 권한이 없습니다.');
      router.back();
    }
  }, []);

  const setEndAtMenu = async () => {
    try {
      await getAxios().patch(
        '/api/menu',
        {
          menuId: params.get('menuId'),
          endAt: null,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
    } catch (e) {
      alert('접근 권한이 없습니다.');
    }
  };
  const setEndAtOption = async () => {
    try {
      await getAxios().patch(
        '/api/option',
        {
          subOptionItemId: params.get('subOptionItemId'),
          endAt: null,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
    } catch (e) {
      alert('접근 권한이 없습니다.');
    }
  };

  return (
    <Flex className="px-5" flexDirection="col">
      <Flex justifyContent="center" className="gap-2 mb-2 border-b pb-3 py-7 relative">
        <Title className="font-bold">품절기간 변경</Title>
        <img
          alt="close"
          src={'/images/ic_modal_close.png'}
          width={40}
          height={40}
          className="cursor-pointer absolute right-[10px]"
          onClick={() => {
            router.push('/menu');
          }}
          onMouseOver={e => {
            e.currentTarget.src = '/images/ic_modal_close.png';
          }}
          onMouseOut={e => {
            e.currentTarget.src = '/images/ic_modal_close.png';
          }}
        />
      </Flex>

      {menuDetail && (
        <>
          <Flex className="gap-3 pt-5">
            <Image
              alt="dummy"
              src={menuDetail?.menuImage ? menuDetail?.menuImage : '/images/ic_chicken.png'}
              width={80}
              height={80}
              className="rounded-lg"
            />
            <Flex flexDirection="col" alignItems="start" className="gap-1">
              <Badge className="bg-[#E52143] text-white">
                {returnMenuType(menuDetail?.menuType)}
              </Badge>
              <Text>{menuDetail?.menuName}</Text>
              <Text>{menuDetail?.menuPrice.toLocaleString()}원</Text>
            </Flex>
            <Badge className="bg-[#E52143] text-white">
              {returnMenuSaleType(menuDetail.menuSaleType)}
            </Badge>
          </Flex>
          <Alert
            detail={true}
            type={menuDetail.menuSaleType}
            menuId={menuDetail.menuId}
            endAt={menuDetail.endAt}
          />
          <Flex flexDirection="col" className="border-b border-t mt-5 py-5 gap-5">
            <DatePicker
              placeholderText="날짜"
              className="w-full px-5 py-1 rounded-full outline-none"
              selected={date}
              onChange={date => setDate(date)}
              locale="ko"
              dateFormat="yyyy-MM-dd"
            />

            <Flex className="gap-5">
              <Select
                placeholder="시간"
                className="rounded"
                value={hour}
                onValueChange={value => setHour(value)}
              >
                {Array.from({ length: 24 }, (_, i) => i + 1).map(item => (
                  <SelectItem value={item.toString()} key={item}>
                    {item == 24 ? '오전' : item < 12 ? '오전' : '오후'} {item}시
                  </SelectItem>
                ))}
              </Select>
              <Text>~</Text>
              <Select
                placeholder="분"
                className="rounded"
                value={minute}
                onValueChange={value => setMinute(value)}
              >
                {Array.from({ length: 60 }, (_, i) => i + 1).map(item => (
                  <SelectItem key={item} value={(item - 1).toString()}>
                    {item - 1}분 까지
                  </SelectItem>
                ))}
              </Select>
            </Flex>
          </Flex>
          <Flex flexDirection="col" className="gap-3 mt-5">
            <CustomButton type={'primary'} className="w-full h-[56px]" onClick={setEndAt}>
              <Text className="text-white !text-lg font-normal">적용하기</Text>
            </CustomButton>
            <CustomButton
              type={'secondary'}
              className="w-full h-[56px]"
              onClick={() => router.push('/menu')}
            >
              <Text className="text-black !text-lg font-normal">취소</Text>
            </CustomButton>
          </Flex>
        </>
      )}
    </Flex>
  );
}
