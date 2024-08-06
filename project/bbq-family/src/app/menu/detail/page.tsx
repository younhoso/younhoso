'use client';

import { Badge, Flex, Subtitle, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import axios from 'axios';

import { MenuDetailResponseData } from '@/app/api/menu/detail/route';
import Loading from '@/app/components/Loading';
import { getAxios } from '@/app/lib/Axios';
import { returnMenuType } from '@/app/utils/ChangeValueType';

export default function MenuDetail() {
  const router = useRouter();
  const params = useSearchParams();
  const [menuDetail, setMenuDetail] = useState<MenuDetailResponseData>();

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

  useEffect(() => {
    getMenuDetail();
  }, []);

  if (!menuDetail) return <></>;

  return (
    <Flex className="px-5" flexDirection="col">
      <Flex justifyContent="center" className="gap-2 mb-2 border-b pb-3 py-7 relative">
        <Title className="font-bold">메뉴 정보</Title>
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
      <Flex className="gap-3 py-5 border-b">
        <Image
          alt="dummy"
          src={menuDetail?.menuImage ? menuDetail?.menuImage : '/images/ic_chicken.png'}
          width={80}
          height={80}
          className="rounded-lg"
        />
        <Flex flexDirection="col" alignItems="start" className="gap-1">
          <Badge className="bg-[#E52143] text-white">
            {menuDetail?.menuType && returnMenuType(menuDetail?.menuType)}
          </Badge>
          <Text>{menuDetail?.menuName}</Text>
          <Text>{menuDetail?.menuPrice.toLocaleString()}원</Text>
        </Flex>
      </Flex>
      <Flex flexDirection="col" alignItems="start" className="border-b">
        <div className="mb-5">
          <Subtitle className="!text-md mt-5">설명</Subtitle>
          <Text className="!text-lg font-medium">{menuDetail?.description}</Text>
        </div>
      </Flex>
      <Flex flexDirection="col" alignItems="start" className="border-b pb-5">
        <Title className="font-bold mt-5">옵션</Title>
        {menuDetail?.subOptionInfoList.map((subOptionInfo, index) => (
          <div key={subOptionInfo.subOptionName}>
            <Subtitle className="!text-md mt-5">{subOptionInfo.subOptionName}</Subtitle>
            {subOptionInfo.subOptionItemInfoList.map((subOptionDetailInfo, index) => (
              <Text className="!text-lg font-medium" key={subOptionDetailInfo.subOptionItemId}>
                {subOptionDetailInfo.subOptionItemName} :{' '}
                {subOptionDetailInfo.subOptionItemPrice.toLocaleString()}원
              </Text>
            ))}
          </div>
        ))}
      </Flex>
      <Flex flexDirection="col" alignItems="start" className="border-b">
        <Title className="font-bold mt-5">영양성분</Title>
        <div className="mb-5">
          <Subtitle className="!text-md mt-5">프렌차이즈 본사에 문의해주세요.</Subtitle>
        </div>
      </Flex>
      <Flex flexDirection="col" alignItems="start" className="border-b">
        <Title className="font-bold mt-5">알레르기</Title>
        <div className="mb-5">
          <Subtitle className="!text-md mt-5">프렌차이즈 본사에 문의해주세요.</Subtitle>
        </div>
      </Flex>
    </Flex>
  );
}
