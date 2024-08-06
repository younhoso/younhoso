'use client';

import { AreaChart, BarChart, Card, Flex, Grid, Text, Title } from '@tremor/react';
import 'react-circular-progressbar/dist/styles.css';

import Image from 'next/image';

import ComparedText from '../components/ComparedText';
import VerticalDivider from '../components/VerticalDivider';

export default function CustomerPage() {
  const chartdata = [
    {
      name: '20대',
      'Number of threatened species': 2488,
    },
    {
      name: '30대',
      'Number of threatened species': 1445,
    },
    {
      name: '40대',
      'Number of threatened species': 743,
    },
    {
      name: '50대',
      'Number of threatened species': 2488,
    },
    {
      name: '60대',
      'Number of threatened species': 1445,
    },
    {
      name: '70대',
      'Number of threatened species': 743,
    },
  ];
  const chartdata2 = [
    {
      date: 'Jan 22',
      SemiAnalysis: 2890,
      'The Pragmatic Engineer': 2338,
    },
    {
      date: 'Feb 22',
      SemiAnalysis: 2756,
      'The Pragmatic Engineer': 2103,
    },
    {
      date: 'Mar 22',
      SemiAnalysis: 3322,
      'The Pragmatic Engineer': 2194,
    },
    {
      date: 'Apr 22',
      SemiAnalysis: 3470,
      'The Pragmatic Engineer': 2108,
    },
    {
      date: 'May 22',
      SemiAnalysis: 3475,
      'The Pragmatic Engineer': 1812,
    },
    {
      date: 'Jun 22',
      SemiAnalysis: 3129,
      'The Pragmatic Engineer': 1726,
    },
  ];
  return (
    <>
      <Grid numItemsSm={4} numItemsMd={4} numItemsLg={4}>
        <Card className="flex flex-col p-0 gap-3 !border-r-0">
          <Flex className="pt-5 pl-3">
            <div className="text-center mt-3 ml-3 w-auto self-start">
              <Text className="!text-xl font-bold whitespace-pre">BBQ Member</Text>
              <Text>management</Text>
            </div>
            <Image
              className="ml-auto px-5 pt-5 self-end"
              alt="chicken_logo"
              src="/images/ic_customer_logo.png"
              width={181}
              height={107}
            />
          </Flex>
        </Card>
        <Card className="flex flex-col p-0 !border-r-0">
          <Flex className="text-center h-full" flexDirection="col" justifyContent="center">
            <Text className="mb-2">전체 사용자</Text>
            <Flex justifyContent="center" className="mb-2">
              <Title className="!text-4xl">2,126,987</Title>
              <Title className="!text-2xl self-end">명</Title>
            </Flex>
            <ComparedText
              up={true}
              text="전일 동시대비"
              value="1.8%"
              direction="row"
              className="w-auto"
            />
          </Flex>
        </Card>
        <Card className="flex flex-col p-0 !border-r-0">
          <Flex className="text-center h-full" flexDirection="col" justifyContent="center">
            <Text className="mb-2">최근 한 달간 신규 사용자</Text>
            <Flex justifyContent="center" className="mb-2">
              <Title className="!text-4xl">1,569</Title>
              <Title className="!text-2xl self-end">명</Title>
            </Flex>
            <ComparedText
              up={true}
              text="전일 동시대비"
              value="1.8%"
              direction="row"
              className="w-auto"
            />
          </Flex>
        </Card>
        <Card className="flex flex-col p-0 !border-r-0">
          <Flex className="text-center h-full " flexDirection="col" justifyContent="center">
            <Text className="mb-2">최근 한 달간 사용자 증가율</Text>
            <Flex justifyContent="center" className="mb-2">
              <Title className="!text-4xl">-0.5</Title>
              <Title className="!text-2xl self-end">%</Title>
            </Flex>
          </Flex>
        </Card>
      </Grid>
      <Card className="mt-5 p-0">
        <Title className="pt-5 pl-5">전체 사용자</Title>
        <Flex>
          <Flex
            className="mt-5 border-r pb-5 mb-3 pl-5 gap-3 gap-3"
            flexDirection="col"
            justifyContent="start"
            alignItems="start"
          >
            <Text>총 회원수</Text>
            <Flex justifyContent="start">
              <Title className="!text-4xl">2,126,987</Title>
              <Text className="!text-2xl self-end">명</Text>
              <ComparedText
                up={true}
                text="전일 동시대비"
                value="1.8%"
                direction="row"
                className="w-auto ml-5 self-end"
              />
            </Flex>
          </Flex>
          <Flex
            className="mt-5 border-r ml-5 pb-5 mb-3 gap-3"
            flexDirection="col"
            justifyContent="start"
            alignItems="start"
          >
            <Text>최근 1년간 1회 이상 사용한 사용자 수</Text>
            <Flex justifyContent="start">
              <Title className="!text-4xl">2,126,987</Title>
              <Text className="!text-2xl self-end">명</Text>

              <Text className="!text-2xl self-end ml-2">(12.54%)</Text>
            </Flex>
          </Flex>

          <Flex
            className="mt-5 ml-5 pb-5 mb-3 gap-3"
            flexDirection="col"
            justifyContent="start"
            alignItems="start"
          >
            <Text>1일 평균 사용자 수</Text>
            <Flex justifyContent="start">
              <Title className="!text-4xl">2,126,987</Title>
              <Text className="!text-2xl self-end">명</Text>
              <ComparedText
                up={true}
                text="전일 동시대비"
                value="1.8%"
                direction="row"
                className="w-auto ml-5 self-end"
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="bg-gray-100 p-5 border-y">
          <Flex
            flexDirection="col"
            justifyContent="start"
            alignItems="start"
            className="border-r mr-5 pr-5"
          >
            <Text>1:1문의</Text>
            <Flex justifyContent="start" alignItems="center" className="gap-1 w-auto">
              <Text>총</Text>
              <Text className="font-bold !text-lg">268</Text>
              <Text>건</Text>
              <VerticalDivider height={10} className="mx-1" />
              <Text className="whitespace-pre">주문앱</Text>
              <Text className="font-bold !text-lg">268</Text>
              <Text>건</Text>
              <VerticalDivider height={10} className="mx-1" />
              <Text className="whitespace-pre">자사몰</Text>
              <Text className="font-bold !text-lg">268</Text>
              <Text>건</Text>
            </Flex>
          </Flex>
          <Flex
            flexDirection="col"
            justifyContent="start"
            alignItems="start"
            className="border-r mr-5 pr-5"
          >
            <Text>휴면계정 사용자</Text>
            <Flex justifyContent="start" alignItems="center" className="gap-1">
              <Text>총</Text>
              <Text className="font-bold !text-lg">926,546</Text>
              <Text>명</Text>
              <Text>(43.21%)</Text>
            </Flex>
          </Flex>
          <Flex
            flexDirection="col"
            justifyContent="start"
            alignItems="start"
            className="border-r mr-5 pr-5"
          >
            <Text>마케팅 수신 미동의 사용자</Text>
            <Flex justifyContent="start" alignItems="center" className="gap-1">
              <Text>총</Text>
              <Text className="font-bold !text-lg">926,546</Text>
              <Text>명</Text>
              <Text>(43.21%)</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="col" justifyContent="start" alignItems="start" className="pr-5">
            <Text>푸쉬 수신률</Text>
            <Flex justifyContent="start" alignItems="center" className="gap-1">
              <Text>총</Text>
              <Text className="font-bold !text-lg">926,546</Text>
              <Text>명</Text>
              <Text>(43.21%)</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="p-3">
          <Flex
            flexDirection="col"
            justifyContent="center"
            alignItems="start"
            className="border-r mr-5 h-[150px]"
          >
            <Flex>
              <Flex flexDirection="col" className="border-r">
                <Title className="!text-4xl">남</Title>
                <Title className="!text-4xl">48.21%</Title>
                <Text>948,652명</Text>
              </Flex>
              <Flex flexDirection="col">
                <Title className="!text-4xl">여</Title>
                <Title className="!text-4xl">48.21%</Title>
                <Text>948,652명</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            flexDirection="col"
            justifyContent="center"
            alignItems="start"
            className="border-r mr-5 h-[150px]"
          >
            <Flex>
              <Flex flexDirection="col" className="border-r">
                <Image
                  alt="membership"
                  src="/images/ic_customer_membership_egg.png"
                  width={50}
                  height={50}
                />
                <Text>에그</Text>
                <Title>32.15%</Title>
                <Text>615,326명</Text>
              </Flex>
              <Flex flexDirection="col" className="border-r">
                <Image
                  alt="membership"
                  src="/images/ic_customer_membership_oly.png"
                  width={50}
                  height={50}
                />
                <Text>올리</Text>
                <Title>32.15%</Title>
                <Text>615,326명</Text>
              </Flex>
              <Flex flexDirection="col" className="border-r">
                <Image
                  alt="membership"
                  src="/images/ic_customer_membership_chiki.png"
                  width={50}
                  height={50}
                />
                <Text>치키</Text>
                <Title>32.15%</Title>
                <Text>615,326명</Text>
              </Flex>
              <Flex flexDirection="col">
                <Image
                  alt="membership"
                  src="/images/ic_customer_membership_chipak.png"
                  width={50}
                  height={50}
                />
                <Text>치빡이</Text>
                <Title>32.15%</Title>
                <Text>615,326명</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex flexDirection="col" justifyContent="start" alignItems="start">
            <Flex flexDirection="col">
              <Title className="self-start">사용자 평균 연령: 38.54세</Title>
              <BarChart
                className="mt-2 h-[150px]"
                data={chartdata}
                index="name"
                categories={['Number of threatened species']}
                colors={['emerald']}
                yAxisWidth={48}
              />
            </Flex>
          </Flex>
        </Flex>
      </Card>
      <Card className="mb-5 mt-5">
        <Title>신규 사용자</Title>
        <Flex className="border-b py-5">
          <Flex justifyContent="start" flexDirection="col" className="border-r mr-5">
            <Flex justifyContent="start">
              <Text>최근 24시간</Text>
              <VerticalDivider height={15} className="mx-2" />
              <Text>신규 사용자 수</Text>
            </Flex>
            <Flex justifyContent="start">
              <Title className="!text-4xl">256</Title>
              <Title className="!text-2xl self-end">명</Title>
              <ComparedText
                up={true}
                text="전일 동시대비"
                value="1.8%"
                direction="row"
                className="w-auto ml-5 self-end"
              />
            </Flex>
          </Flex>
          <Flex justifyContent="start" flexDirection="col" className="border-r mr-5">
            <Flex justifyContent="start">
              <Text>일 평균</Text>
              <VerticalDivider height={15} className="mx-2" />
              <Text>신규 사용자 수</Text>
            </Flex>
            <Flex justifyContent="start">
              <Title className="!text-4xl">256</Title>
              <Title className="!text-2xl self-end">명</Title>
              <ComparedText
                up={true}
                text="전일 동시대비"
                value="1.8%"
                direction="row"
                className="w-auto ml-5 self-end"
              />
            </Flex>
          </Flex>
          <Flex justifyContent="start" flexDirection="col">
            <Flex justifyContent="start">
              <Text>월 평균</Text>
              <VerticalDivider height={15} className="mx-2" />
              <Text>신규 사용자 수</Text>
            </Flex>
            <Flex justifyContent="start">
              <Title className="!text-4xl">256</Title>
              <Title className="!text-2xl self-end">명</Title>
              <ComparedText
                up={true}
                text="전일 동시대비"
                value="1.8%"
                direction="row"
                className="w-auto ml-5 self-end"
              />
            </Flex>
          </Flex>
        </Flex>
        <AreaChart
          className="h-72 mt-10"
          data={chartdata2}
          index="date"
          categories={['SemiAnalysis', 'The Pragmatic Engineer']}
          colors={['indigo', 'cyan']}
        />
      </Card>
    </>
  );
}
