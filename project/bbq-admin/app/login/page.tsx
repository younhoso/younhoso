'use client';

import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Flex, Text, TextInput } from '@tremor/react';
import { signIn } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { KeyboardEvent } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

import CustomButton from '../components/CustomButton';
import { useModalContext } from '../components/Modal';
import Loading from '../loading';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const { openModal, closeModal } = useModalContext();

  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        username: idRef.current,
        password: passwordRef.current,
        redirect: false,
        callbackUrl: `${window.location.origin}/`,
      });
      if (result?.error) {
        alert(result?.error);
        setLoading(false);
      } else {
        document.body.style.overflow = 'auto';
        router.push('/');
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="absolute z-[9999] top-0 left-0 w-full h-full flex flex-col h-screen bg-[url(/images/ic_login_background.png)] bg-no-repeat bg-cover">
      <div className="flex-grow flex items-center justify-center">
        <div className="relative mt-5 max-w-md">
          <Flex className="mb-5">
            <Image width={61} height={40} src="/images/logo.png" alt="logo" />
            <Flex flexDirection="col" alignItems="start" className="ml-2">
              <Text className="!text-xl text-white !leading-none">BBQ Admin</Text>
              <Text className="text-red-500">for head office</Text>
            </Flex>
            <Flex flexDirection="col" alignItems="end">
              <Text className="!text-xl text-white !leading-none">
                {dayjs(new Date()).format('A HH:mm')}
              </Text>
              <Text className="text-white">{dayjs(new Date()).format('DD MMMM. YYYY')}</Text>
            </Flex>
          </Flex>
          <Flex
            className="w-[400px] rounded-md shadow-sm gap-3 p-5 bg-white/[.56] border-1 shadow-2xl"
            flexDirection="col"
          >
            <TextInput
              onChange={(e: any) => {
                idRef.current = e.target.value;
              }}
              onKeyDown={handleKeyDown}
              icon={UserCircleIcon}
              placeholder="아이디"
            />
            <TextInput
              onChange={(e: any) => {
                passwordRef.current = e.target.value;
              }}
              onKeyDown={handleKeyDown}
              type="password"
              icon={LockClosedIcon}
              placeholder="비밀번호"
            />
            {/* <Flex className="gap-2">
              <TextInput
                icon={PhoneIcon}
                placeholder="휴대폰 번호 (본인 인증)"
              />
              <CustomButton
                type="tertiary"
                onClick={() =>
                  openModal(
                    '',
                    '',
                    <AuthenticationCode closeModal={closeModal} />
                  )
                }
              >
                인증번호 보내기
              </CustomButton>
            </Flex>
            <ReCAPTCHA sitekey="Your client site key" onChange={onChange} /> */}
            <CustomButton type="primary" className="w-full" onClick={() => handleSubmit()}>
              로그인
            </CustomButton>
          </Flex>
        </div>
      </div>

      {/* <Flex justifyContent="center">
        <Text className="text-white">아이디 찾기</Text>
        <VerticalDivider height={10} className="mx-3" />
        <Text className="text-white">비밀번호 찾기</Text>
      </Flex> */}
      <Flex justifyContent="center" alignItems="center" className="mb-3 mt-5">
        <Image width={36} height={18} src="/images/logo-white.png" alt="logo" />
        <Text className="text-white text-center ml-3">
          © 2019 GENESIS BBQ. All rights reserved.
        </Text>
      </Flex>
    </div>
  );
}
