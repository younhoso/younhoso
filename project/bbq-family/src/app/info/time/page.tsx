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
import { PencilIcon } from '@heroicons/react/24/solid';
import { Button, Flex, Subtitle, Text, Title } from '@tremor/react';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import axios from 'axios';

import Footer from '@/app/components/Footer';

export default function Info() {
  const router = useRouter();
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

      <Footer />
    </Flex>
  );
}
