'use client';

import { ArrowRightIcon, IdentificationIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Flex, Text, TextInput, Title } from '@tremor/react';
import { signIn } from 'next-auth/react';
import { Fragment, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Loading from '../components/Loading';

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const onChange = (value: any) => {
    console.log('Captcha value:', value);
  };
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await signIn('credentials', {
        username: idRef.current,
        password: passwordRef.current,
        redirect: false,
        callbackUrl: `${window.location.origin}/`,
      });
      if (result?.error) {
        alert('로그인에 실패하였습니다.');
        setLoading(false);
      } else {
        router.push('/');
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex flexDirection="col" className="min-h-inherit">
      <Flex justifyContent="center" flexDirection="col" className="p-5">
        <img
          alt="logo"
          src="/images/ic_sidebar_logo.png"
          width={227}
          height={48}
          className="mt-5 mb-5"
        />
        <Title className="font-bold text-3xl mt-5 mb-5">패밀리 로그인</Title>
        <TextInput
          onChange={(e: any) => {
            idRef.current = e.target.value;
          }}
          className="rounded-full mb-2"
          icon={IdentificationIcon}
          placeholder="아이디"
        />
        <TextInput
          onChange={(e: any) => {
            passwordRef.current = e.target.value;
          }}
          type="password"
          className="rounded-full"
          icon={LockClosedIcon}
          placeholder="비밀번호"
        />
        {/* <ReCAPTCHA
          className="mt-5"
          sitekey="Your client site key"
          onChange={onChange}
        /> */}
        <button
          onClick={handleSubmit}
          className="relative flex justify-center items-center text-white w-full rounded-full mt-5 py-3 shadow-lg mb-10"
          style={{
            background: 'linear-gradient(180deg, #E52143 0%, #CE1E3C 100%)',
          }}
        >
          <Text className="text-white text-2xl">로그인</Text>
          <div
            className="p-2 rounded-full absolute right-3"
            style={{ boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.2)' }}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </div>
        </button>
      </Flex>
      <Flex className="bg-[#292A56] self-stretch h-full p-5" flexDirection="col">
        <Text className="text-lg mb-1 !text-lg text-[#8E93AD]">비비큐 패밀리 사용 문의</Text>
        <Text className="text-lg mb-20 !text-xl font-bold text-[#8E93AD]">1588-9282</Text>
        <Text className="text-lg text-[#8E93AD]">Copyright 2019 © GENESIS BBQ</Text>
      </Flex>
    </Flex>
  );
}
