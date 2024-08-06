'use client';

import { MagnifyingGlassIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import {
  Badge,
  Card,
  Flex,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Image from 'next/image';
import Link from 'next/link';

import CustomButton from '../components/CustomButton';
import { useModalContext } from '../components/Modal';
import { Radiobox, RadioboxGroup } from '../components/Radiobox';

interface CouponCondition {
  watitingCouponType: string;
}

export default function CouponPage() {
  const { openModal } = useModalContext();

  const [selectedValue, setSelectedValue] = useState<CouponCondition>({
    watitingCouponType: 'all',
  });

  const handleRadioChange = (key: string, value: string) => {
    setSelectedValue({
      ...selectedValue,
      [key]: value,
    });
  };

  return (
    <>
      <Flex>
        <Card className="h-[240px] flex flex-col p-3 !border-r-0">
          <div className="text-center mt-3 ml-3 self-start">
            <Text className="!text-xl font-bold">BBQ Coupon</Text>
            <Text>management</Text>
          </div>
          <Image
            className="ml-auto mr-3 mb-2"
            alt="chicken_logo"
            src="/images/ic_coupon_coupon_logo.png"
            width={140}
            height={83}
          />
          <Link href="/coupon/register" className="mx-3 mt-3">
            <CustomButton type="tertiary" className="w-full">
              <Flex className="text-gray-500">
                <PlusSmallIcon width={20} className="inline" />
                <Title className="inline">쿠폰등록</Title>
              </Flex>
            </CustomButton>
          </Link>
        </Card>
        <Card className="h-[240px] flex flex-col p-0 !border-r-0">
          <div className="text-center border-b py-3">
            <Text className="mb-2">발행 쿠폰 수</Text>
            <Flex justifyContent="center" className="mb-2">
              <Title className="!text-4xl">3,987</Title>
              <Title className="!text-2xl self-end">건</Title>
            </Flex>
            <Badge className="bg-gray-100 text-gray-900 w-[80px]" size="xs">
              리스트
            </Badge>
          </div>
          <Flex justifyContent="center" className="h-full">
            <Flex
              justifyContent="center"
              className="text-center border-r w-full h-full gap-1"
              flexDirection="col"
            >
              <div className="w-[50px] mx-auto">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: '#fe4a51',
                    textColor: '#46477a',
                    trailColor: '#dedee7',
                  })}
                  value={66}
                  text={`${66}%`}
                />
              </div>
              <Text>일반 쿠폰</Text>
              <Text className="font-bold">1,457건</Text>
            </Flex>
            <Flex
              justifyContent="center"
              className="text-center border-r w-full h-full gap-1"
              flexDirection="col"
            >
              <div className="w-[50px] mx-auto">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: '#ff6e74',
                    textColor: '#46477a',
                    trailColor: '#dedee7',
                  })}
                  value={66}
                  text={`${66}%`}
                />
              </div>
              <Text>이벤트 쿠폰</Text>
              <Text className="font-bold">1,457건</Text>
            </Flex>
            <Flex
              justifyContent="center"
              className="text-center w-full h-full gap-1"
              flexDirection="col"
            >
              <div className="w-[50px] mx-auto">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: '#ff9094',
                    textColor: '#46477a',
                    trailColor: '#dedee7',
                  })}
                  value={66}
                  text={`${66}%`}
                />
              </div>
              <Text>패밀리 쿠폰</Text>
              <Text className="font-bold">1,457건</Text>
            </Flex>
          </Flex>
        </Card>
        <Card className="h-[240px] flex flex-col p-0 !border-r-0">
          <div className="text-center border-b py-3">
            <Text className="mb-2">사용 쿠폰 수</Text>
            <Flex justifyContent="center" className="mb-2">
              <Title className="!text-4xl">3,987</Title>
              <Title className="!text-2xl self-end">건 (사용률 65%)</Title>
            </Flex>
            <Badge className="bg-gray-100 text-gray-900 w-[80px]" size="xs">
              리스트
            </Badge>
          </div>
          <Flex justifyContent="center" className="h-full">
            <Flex
              justifyContent="center"
              className="text-center border-r w-full h-full gap-1"
              flexDirection="col"
            >
              <div className="w-[50px] mx-auto">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: '#00c9b5',
                    textColor: '#46477a',
                    trailColor: '#dedee7',
                  })}
                  value={66}
                  text={`${66}%`}
                />
              </div>
              <Text>일반 쿠폰</Text>
              <Text className="font-bold">1,457건</Text>
            </Flex>
            <Flex
              justifyContent="center"
              className="text-center border-r w-full h-full gap-1"
              flexDirection="col"
            >
              <div className="w-[50px] mx-auto">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: '#17d5c2',
                    textColor: '#46477a',
                    trailColor: '#dedee7',
                  })}
                  value={66}
                  text={`${66}%`}
                />
              </div>
              <Text>이벤트 쿠폰</Text>
              <Text className="font-bold">1,457건</Text>
            </Flex>
            <Flex
              justifyContent="center"
              className="text-center w-full h-full gap-1"
              flexDirection="col"
            >
              <div className="w-[50px] mx-auto">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: '#33e1d0',
                    textColor: '#46477a',
                    trailColor: '#dedee7',
                  })}
                  value={66}
                  text={`${66}%`}
                />
              </div>
              <Text>패밀리 쿠폰</Text>
              <Text className="font-bold">1,457건</Text>
            </Flex>
          </Flex>
        </Card>
        <Card className="h-[240px] flex flex-col p-0">
          <div className="text-center border-b py-3">
            <Text className="mb-2">잔여 쿠폰 수</Text>
            <Flex justifyContent="center" className="mb-2">
              <Title className="!text-4xl">3,987</Title>
              <Title className="!text-2xl self-end">건</Title>
            </Flex>
            <Badge className="bg-gray-100 text-gray-900 w-[80px]" size="xs">
              리스트
            </Badge>
          </div>
          <Flex justifyContent="center" className="h-full">
            <Flex
              justifyContent="center"
              className="text-center border-r w-full h-full gap-1"
              flexDirection="col"
            >
              <div className="w-[50px] mx-auto">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: '#3a3b6b',
                    textColor: '#46477a',
                    trailColor: '#dedee7',
                  })}
                  value={66}
                  text={`${66}%`}
                />
              </div>
              <Text>일반 쿠폰</Text>
              <Text className="font-bold">1,457건</Text>
            </Flex>
            <Flex
              justifyContent="center"
              className="text-center border-r w-full h-full gap-1"
              flexDirection="col"
            >
              <div className="w-[50px] mx-auto">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: '#595a88',
                    textColor: '#46477a',
                    trailColor: '#dedee7',
                  })}
                  value={66}
                  text={`${66}%`}
                />
              </div>
              <Text>이벤트 쿠폰</Text>
              <Text className="font-bold">1,457건</Text>
            </Flex>
            <Flex
              justifyContent="center"
              className="text-center w-full h-full gap-1"
              flexDirection="col"
            >
              <div className="w-[50px] mx-auto">
                <CircularProgressbar
                  styles={buildStyles({
                    pathColor: '#8e93ad',
                    textColor: '#46477a',
                    trailColor: '#dedee7',
                  })}
                  value={66}
                  text={`${66}%`}
                />
              </div>
              <Text>패밀리 쿠폰</Text>
              <Text className="font-bold">1,457건</Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <div className="my-10">
        <Flex justifyContent="between" className="mb-3">
          <Title className="w-full">24시간 내 소멸 예정 쿠폰</Title>
          <Flex justifyContent="end" className="gap-3">
            <TextInput className="w-[200px]" icon={MagnifyingGlassIcon} placeholder="Search..." />
            <Select className="w-[100px] inline-block">
              <SelectItem value="1">소멸 임박 순</SelectItem>
              <SelectItem value="2">최신 순</SelectItem>
            </Select>
          </Flex>
        </Flex>
        <Table className="border-b">
          <TableHead className="bg-gray-100 border">
            <TableRow className="border">
              <TableHeaderCell>번호</TableHeaderCell>
              <TableHeaderCell>쿠폰명</TableHeaderCell>
              <TableHeaderCell>혜택</TableHeaderCell>
              <TableHeaderCell>쿠폰코드</TableHeaderCell>
              <TableHeaderCell>발행일자</TableHeaderCell>
              <TableHeaderCell>만료일자</TableHeaderCell>
              <TableHeaderCell>소유자</TableHeaderCell>
              <TableHeaderCell>쿠폰형태</TableHeaderCell>
              <TableHeaderCell>발행처</TableHeaderCell>
              <TableHeaderCell>남은시간</TableHeaderCell>
              <TableHeaderCell>중복사용여부</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array(10)
              .fill(0)
              .map((_, index) => {
                return (
                  <TableRow
                    key={index}
                    className="border hover:bg-gray-100 cursor-pointer"
                    // onClick={() => openModal('', '', <CouponDetail data={null} />)}
                  >
                    <TableCell>128</TableCell>
                    <TableCell>BBQ 일반 쿠폰명 001</TableCell>
                    <TableCell>황금올리브치킨 2,000원 할인</TableCell>
                    <TableCell>BC2023526515</TableCell>
                    <TableCell>2023.09.02</TableCell>
                    <TableCell>2023.09.02</TableCell>
                    <TableCell>홍길동</TableCell>
                    <TableCell>주문앱(일반)</TableCell>
                    <TableCell>마케팅팀</TableCell>
                    <TableCell>25분</TableCell>
                    <TableCell>가능</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* <Pagination /> */}
      </div>

      <div className="my-10">
        <Flex justifyContent="between" className="mb-3">
          <Flex justifyContent="start" className="w-full">
            <Title className="w-[200px]">발행 대기 쿠폰</Title>
            <Flex justifyContent="start" className="gap-5">
              <RadioboxGroup
                value={selectedValue.watitingCouponType}
                onChange={value => handleRadioChange('watitingCouponType', value)}
              >
                <Radiobox value={'all'} label="전체" />
                <Radiobox value={'general'} label="일반" />
                <Radiobox value={'event'} label="이벤트" />
                <Radiobox value={'family'} label="패밀리" />
              </RadioboxGroup>
            </Flex>
          </Flex>
          <Flex justifyContent="end" className="gap-3">
            <TextInput className="w-[200px]" icon={MagnifyingGlassIcon} placeholder="Search..." />
            <Select className="w-[100px] inline-block">
              <SelectItem value="1">소멸 임박 순</SelectItem>
              <SelectItem value="2">최신 순</SelectItem>
            </Select>
          </Flex>
        </Flex>
        <Table className="border-b">
          <TableHead className="bg-gray-100 border">
            <TableRow className="border">
              <TableHeaderCell>번호</TableHeaderCell>
              <TableHeaderCell>쿠폰명</TableHeaderCell>
              <TableHeaderCell>혜택</TableHeaderCell>
              <TableHeaderCell>쿠폰코드</TableHeaderCell>
              <TableHeaderCell>발행일자</TableHeaderCell>
              <TableHeaderCell>만료일자</TableHeaderCell>
              <TableHeaderCell>소유자</TableHeaderCell>
              <TableHeaderCell>쿠폰형태</TableHeaderCell>
              <TableHeaderCell>발행처</TableHeaderCell>
              <TableHeaderCell>남은시간</TableHeaderCell>
              <TableHeaderCell>중복사용여부</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array(10)
              .fill(0)
              .map((_, index) => {
                return (
                  <TableRow
                    key={index}
                    className="border hover:bg-gray-100 cursor-pointer"
                    // onClick={() => openModal('', '', <CouponDetail />)}
                  >
                    <TableCell>128</TableCell>
                    <TableCell>BBQ 일반 쿠폰명 001</TableCell>
                    <TableCell>황금올리브치킨 2,000원 할인</TableCell>
                    <TableCell>BC2023526515</TableCell>
                    <TableCell>2023.09.02</TableCell>
                    <TableCell>2023.09.02</TableCell>
                    <TableCell>홍길동</TableCell>
                    <TableCell>주문앱(일반)</TableCell>
                    <TableCell>마케팅팀</TableCell>
                    <TableCell>25분</TableCell>
                    <TableCell>가능</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* <Pagination /> */}
      </div>
    </>
  );
}
