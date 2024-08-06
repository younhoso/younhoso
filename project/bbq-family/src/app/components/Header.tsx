'use client';

import { Flex } from '@tremor/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  return (
    <header className="bg-[#CE1E3C]">
      <Flex className="max-w-[1200px] mx-auto  md:justify-center sm:justify-center">
        <p className="w-[100%] text-[rgba(255,255,255,0.4)] text-[18px] hidden lg:block">
          BBQ는 이름처럼 최고의 원재료만을 사용하여 맛은 물론고객의 건강까지 생각합니다.
        </p>
        <Image
          className="cursor-pointer"
          draggable={false}
          onClick={() => router.push('/')}
          alt="header"
          src="/images/ic_header.png"
          width={425}
          height={75}
        />
      </Flex>
    </header>
  );
}
