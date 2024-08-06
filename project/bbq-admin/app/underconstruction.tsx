'use client';

import { Flex, Text } from '@tremor/react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function UnderConstruction({ children }: { children: React.ReactNode }) {
  const list = ['/customer/voice'];

  const pathname = usePathname();
  if (pathname && (list.includes(pathname?.split('/')[1]) || list.includes(pathname))) {
    return (
      <Flex flexDirection="col" justifyContent="center" className="bg-black/30 backdrop-blur-md">
        <Image width={122} height={80} src="/images/logo.png" alt="logo" />
        <Text className="mt-10 !text-3xl text-white">데이터 이관 작업이 진행중입니다.</Text>
        <Text className="!text-3xl text-white">
          필요한 데이터는 DX팀 김한규 주임에게 문의해주세요.
        </Text>

        {/* <Text className="mt-10 !text-2xl text-white">DX팀 김한규 사원</Text>
      <Text className="!text-2xl text-white">02-1234-5678</Text> */}
      </Flex>
    );
  }
  return children;
}
