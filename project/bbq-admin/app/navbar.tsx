'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Bars4Icon } from '@heroicons/react/24/solid';
import { Text, Title } from '@tremor/react';
import { signOut, useSession } from 'next-auth/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

export default function Navbar() {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <div className="bg-tremer-brand-inverted shadow-sm">
      <div className="concreate w-[100%] h-[66px]"></div>
      <nav className="fixed top-0 z-[100] w-full bg-[#2a2956] border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center">
            <div className="flex items-center justify-start border-r border-gray-50">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <Bars4Icon className="w-6 h-6" />
              </button>
              <a href="/" className="flex items-center ml-2 mr-[68px]">
                <Image
                  width={61}
                  height={40}
                  src="/images/logo.png"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <div className="flex flex-col">
                  <Title className="text-white">BBQ Admin</Title>
                  <Text className="text-red-500 leading-none">for head office</Text>
                </div>
              </a>
            </div>
            <div className="ml-10 flex-1">
              {/* <Text className="inline mr-4 text-cyan-500">Notice</Text>
              <Text className="inline text-gray-500">
                2024년 상반기 쿠폰 생성시 주의사항 알림.
              </Text> */}
            </div>
            <div className="flex items-center">
              <div className="flex content-center items-center ml-3">
                <button
                  onClick={async () => {
                    await signOut({
                      redirect: false,
                    });
                    router.push('/login');
                  }}
                >
                  <Text className="text-gray-500 cursor-pointer">로그아웃</Text>
                </button>
                <Text className="mx-1 text-gray-500">•</Text>
                <Text className="text-white">{session?.adminUserInfo?.name}님</Text>
              </div>
              <ArrowPathIcon className="p-2 text-white bg-gray-600 w-[30px] rounded-lg ml-5" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
