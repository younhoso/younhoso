'use client';

import { Card, Flex, Text, Title } from '@tremor/react';

import Image from 'next/image';
import Link from 'next/link';

import CustomButton from '@/app/components/CustomButton';

export default function CustomerPushDetailPage() {
  return (
    <main className="mb-10">
      <Card className="p-0">
        <Title className="border-b p-5">푸시 상세</Title>
        <Flex className="p-5 border-b" flexDirection="col">
          <Flex justifyContent="start" className="py-3 border-b">
            <Text className="w-[150px] font-bold">쿠폰 발행자</Text>
            <Text>홍길동(마케팅팀)</Text>
          </Flex>
          <Flex justifyContent="start" className="mt-3 py-3 border-b">
            <Text className="w-[150px] font-bold self-start">대상자 조건</Text>
            <Flex flexDirection="col">
              <Text className="pb-3 border-b w-full">기간 : 2023.01.01 ~ 2023.06.30</Text>
              <Text className="py-3 border-b w-full">주문건 수 : 16건 이상</Text>
              <Text className="py-3 border-b w-full">주문금액 : 150,000원 이상</Text>
              <Text className="py-3 border-b w-full">지역 : 서울시 강남구</Text>
              <Text className="py-3 border-b w-full">성별 : 전체</Text>
              <Text className="py-3 w-full">총 대상자 수 56,800명</Text>
            </Flex>
          </Flex>
          <Flex justifyContent="start" className="mt-3 py-3">
            <Text className="w-[150px] font-bold self-start">발송 조건</Text>
            <Flex flexDirection="col">
              <Text className="pb-3 border-b w-full">발송기간 : 2023.01.01 ~ 2023.06.30</Text>
              <Text className="py-3 border-b w-full">
                총 발송 횟수(남은 발송횟수) 45,125건 (542,256건)
              </Text>
              <div className="py-3 border-b w-full">
                <Text className="inline">발송비용(총 예상비용) : </Text>
                <Text className="inline text-red-500">1,589,203원 </Text>
                <Text className="inline">(남은 발송비용 </Text>
                <Text className="inline text-emerald-500">67,548,562원</Text>
                <Text className="inline text-gray-500"> / 83,738,748원</Text>
                <Text className="inline">)</Text>
              </div>
              <div className="py-3 w-full">
                <Text className="inline">발송형태 : 자동 </Text>
                <Text className="inline text-red-500">(진행중)</Text>
              </div>
            </Flex>
          </Flex>
        </Flex>
        <div className="py-10 border-b">
          <Image
            src="/images/ic_menu_dummy_chicken.png"
            width={150}
            height={150}
            alt="dummy"
            className="mx-auto"
          />
        </div>
        <Flex className="p-5">
          <Flex justifyContent="start">
            <CustomButton type="quaternary" className="mr-5 w-[150px]">
              일시정지
            </CustomButton>
            <CustomButton type="quaternary" className="w-[150px]">
              종료
            </CustomButton>
          </Flex>
          <Link href="/customer/push/list">
            <CustomButton className="self-end w-[150px]" type="quaternary">
              목록
            </CustomButton>
          </Link>
        </Flex>
      </Card>
    </main>
  );
}
