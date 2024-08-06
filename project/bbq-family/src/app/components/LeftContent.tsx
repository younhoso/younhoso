'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import axios from 'axios';

export function LeftContent(random: any) {
  const { data: session, status } = useSession();
  const [familyName, setFamilyName] = useState('');

  const getFamilyName = async () => {
    const mallData = await axios.get('/api/info');
    setFamilyName(mallData.data.familyName);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getFamilyName();
    } else if (status == 'unauthenticated') {
      setFamilyName('');
    }
    console.log('status', status);
  }, [status]);

  if (status === 'loading') return <></>;

  if (status === 'authenticated' && !familyName) return <></>;

  return (
    <div className="w-[100%] hidden lg:block">
      <img alt="logo" src="/images/ic_sidebar_logo.png" width={227} height={48} />
      {familyName ? (
        <h1 className="text-4xl font-bold mt-5">
          안녕하세요. {familyName} 님 👋 <br />
          오늘 하루도 화이팅!
        </h1>
      ) : (
        <h1 className="text-4xl font-bold mt-5">
          Best of the Best Quality!
          <br />
          당신의 행복을 키우는 BBQ
        </h1>
      )}

      <h1 className="text-[#8E93AD] text-3xl font-medium mt-10">비비큐패밀리 사용문의</h1>
      <h1 className="text-4xl font-bold mt-2 mb-10">1588-9282</h1>
      <Image
        alt="img-chibbak"
        src={`https://bbq-static.dyun.kr:8888/admin/family/chibbak_${random.random}.png`}
        width={465}
        height={370}
        className="pointer-events-none"
      />
    </div>
  );
}
