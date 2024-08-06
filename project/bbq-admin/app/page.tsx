'use client';

import {
  CalculatorIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  FaceSmileIcon,
  HomeIcon,
  NoSymbolIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  AreaChart,
  BarChart,
  BarList,
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Divider,
  Flex,
  Grid,
  Icon,
  Select,
  SelectItem,
  Text,
  Title,
} from '@tremor/react';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';

import Image from 'next/image';

import axios from 'axios';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import { MainDashboardResponse } from '@/pages/api/dashboard';
import { MainDashboardMemberResponse } from '@/pages/api/dashboard/member';

import ChickenIcon from '../public/icons/chicken.svg';
import CustomCard from './components/CustomCard';
import CustomCircularProgressbar from './components/CustomCircularProgressbar';
import CustomComparedText from './components/CustomComparedText';
import Loading from './components/Loading';
import { Radiobox, RadioboxGroup } from './components/Radiobox';
import VerticalDivider from './components/VerticalDivider';
import { getAxios } from './lib/Axios';

const dataFormatter = (number: number) => {
  return Intl.NumberFormat('ko').format(number).toString() + '원';
};
const dataFormatter2 = (number: number) => {
  return Intl.NumberFormat('ko').format(number).toString() + '건';
};

interface DashboardCondition {
  orderCountTable: string;
  payTable: string;
  memberTable: string;
  orderCustomMode: boolean;
  orderDate: DateRangePickerValue;
  payCustomMode: boolean;
  payDate: DateRangePickerValue;
  memberCustomMode: boolean;
  memberDate: DateRangePickerValue;
}

interface DailyPayData {
  date: string;
  매출액: number;
}

interface DailyData {
  daily: string;
  orderCount?: number;
  cancelCount?: number;
}

interface MappedData {
  daily: string;
  [key: string]: string | number;
}

function mergeData(
  orderdataArray: DailyData[],
  canceldataArray: DailyData[],
): (MappedData | null)[] {
  return orderdataArray.map(data => {
    const cancelOrder = canceldataArray.find(entry => entry.daily === data.daily);
    if (!data.daily) return null;
    return {
      daily: data.daily,
      '주문 건수': data.orderCount ?? 0,
      '주문취소 건수': cancelOrder?.cancelCount ?? 0,
    };
  });
}

export default function IndexPage() {
  const [data, setData] = useState<MainDashboardResponse>();
  const [dailyPayData, setDailyPaydata] = useState<DailyPayData[]>();
  const [dailyOrderData, setDailyOrderData] = useState<(MappedData | null)[]>();
  const [memberData, setMemberData] = useState<MainDashboardMemberResponse>();

  const [selectedValue, setSelectedValue] = useState<DashboardCondition>({
    orderCountTable: '7d',
    payTable: '7d',
    memberTable: '7d',
    orderCustomMode: false,
    orderDate: {
      from: new Date(dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD')),
      to: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
    },
    payCustomMode: false,
    payDate: {
      from: new Date(dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD')),
      to: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
    },
    memberCustomMode: false,
    memberDate: {
      from: new Date(dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD')),
      to: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
    },
  });

  const handleValueChange = (key: string, value: any) => {
    setSelectedValue({
      ...selectedValue,
      [key]: value,
    });
  };

  const getData = async () => {
    const res = await getAxios().get('/api/dashboard');
    setData(res.data);
  };

  const getDailyPaydata = async () => {
    if (selectedValue.payTable === 'custom') {
      handleValueChange('payCustomMode', true);
    } else {
      handleValueChange('payCustomMode', false);
      const res = await getAxios().get(`/api/dashboard/daily-pay`, {
        params: {
          periodType: selectedValue.payTable,
        },
      });
      const payData = res.data.map((data: { daily: string; payAmount: number }) => {
        return {
          date: data.daily,
          매출액: data.payAmount,
        };
      });
      setDailyPaydata(payData);
    }
  };

  const handlePaySubmit = async () => {
    try {
      const res = await getAxios().get(`/api/dashboard/daily-pay`, {
        params: {
          startDate: dayjs(selectedValue.payDate.from).format('YYYY-MM-DD'),
          endDate: dayjs(selectedValue.payDate.to).format('YYYY-MM-DD'),
        },
      });
      const payData = res.data.map((data: { daily: string; payAmount: number }) => {
        return {
          date: data.daily,
          매출액: data.payAmount,
        };
      });
      setDailyPaydata(payData);
    } catch (error) {
      alert('조회기간은 1년 이내로만 가능합니다.');
    }
  };

  const getDailyOrderData = async () => {
    if (selectedValue.orderCountTable === 'custom') {
      handleValueChange('orderCustomMode', true);
    } else {
      handleValueChange('orderCustomMode', false);
      const res = await getAxios().get(`/api/dashboard/daily-order`, {
        params: {
          periodType: selectedValue.orderCountTable,
        },
      });

      const totalData = mergeData(
        res.data.dailyOrderCountInfoList,
        res.data.dailyCancelCountInfoList,
      );
      setDailyOrderData(totalData);
    }
  };

  const handleOrderSubmit = async () => {
    try {
      const res = await getAxios().get(`/api/dashboard/daily-order`, {
        params: {
          startDate: dayjs(selectedValue.orderDate.from).format('YYYY-MM-DD'),
          endDate: dayjs(selectedValue.orderDate.to).format('YYYY-MM-DD'),
        },
      });

      const orderData = mergeData(
        res.data.dailyOrderCountInfoList,
        res.data.dailyCancelCountInfoList,
      );
      setDailyOrderData(orderData);
    } catch (error) {
      alert('조회기간은 1년 이내로만 가능합니다.');
    }
  };

  const getMemberData = async () => {
    if (selectedValue.memberTable === 'custom') {
      handleValueChange('memberCustomMode', true);
    } else {
      handleValueChange('memberCustomMode', false);
      const res = await getAxios().get(`/api/dashboard/member`, {
        params: {
          periodType: selectedValue.memberTable,
        },
      });
      const memberData = res.data.dailyMemberCountInfos.map(
        (data: { daily: string; memberCount: number }) => {
          return {
            date: data.daily,
            신규가입: data.memberCount,
          };
        },
      );
      setMemberData({
        memberCountInfo: res.data.memberCountInfo,
        dailyMemberCountInfos: [...memberData],
        memberPoint: res.data.memberPoint,
      });
    }
  };

  const handleMemberSubmit = async () => {
    try {
      const res = await getAxios().get(`/api/dashboard/member`, {
        params: {
          startDate: dayjs(selectedValue.memberDate.from).format('YYYY-MM-DD'),
          endDate: dayjs(selectedValue.memberDate.to).format('YYYY-MM-DD'),
        },
      });
      const memberData = res.data.dailyMemberCountInfos.map(
        (data: { daily: string; memberCount: number }) => {
          return {
            date: data.daily,
            신규가입: data.memberCount,
          };
        },
      );
      setMemberData({
        memberCountInfo: res.data.memberCountInfo,
        dailyMemberCountInfos: [...memberData],
        memberPoint: res.data.memberPoint,
      });
    } catch (error) {
      alert('조회기간은 1년 이내로만 가능합니다.');
    }
  };

  useEffect(() => {
    getData();
    getDailyPaydata();
    getDailyOrderData();
    getMemberData();
  }, []);

  useEffect(() => {
    getDailyOrderData();
  }, [selectedValue.orderCountTable]);

  useEffect(() => {
    getDailyPaydata();
  }, [selectedValue.payTable]);

  useEffect(() => {
    getMemberData();
  }, [selectedValue.memberTable]);

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <main className="pb-10">
      <Grid numItemsSm={3} numItemsLg={3} className="gap-6">
        <CustomCard
          color={'#fe8511'}
          className="p-0 bg-[length:30%] bg-no-repeat bg-[position:top_1.5rem_right]"
        >
          <Flex flexDirection={'col'} className="h-full">
            <Flex justifyContent="start" className="p-5">
              <CalculatorIcon
                className="mr-3 rounded-lg text-[#fe8511] bg-[#fcf4eb] p-2"
                width={30}
              />
              <Title>매출액</Title>
            </Flex>
            <Flex justifyContent="start" className="px-5 mb-5">
              <Title className="!text-4xl inline ">
                {data?.orderAndPayInfo.totalPayAmount.toLocaleString()}
              </Title>
              <Text className="inline text-xl self-end">원</Text>
              {data && (
                <CustomComparedText
                  className="ml-5"
                  yesterday={data.orderAndPayInfo.yesterdayTotalPayAmount}
                  today={data.orderAndPayInfo.totalPayAmount}
                />
              )}
            </Flex>
            <div className="px-5 w-full">
              <Divider className="m-0 !bg-[#dcdde2] h-[1px]" />
            </div>
            <Flex className="px-3 backdrop-blur-sm bg-[rgba(255,255,255,0.7)] flex-1">
              <Flex justifyContent="center" className="py-2">
                <div className="w-[60px]">
                  {data && (
                    <CustomCircularProgressbar
                      total={data.orderAndPayInfo.totalPayAmount}
                      value={data.orderAndPayInfo.orderDeliveryPayAmount}
                      style={{
                        pathColor: '#fe8511',
                        textColor: '#46477a',
                        trailColor: '#dedee7',
                      }}
                    />
                  )}
                </div>
                <div className="ml-2">
                  <Text>배달 주문</Text>
                  <Text className="font-bold">
                    {data?.orderAndPayInfo.orderDeliveryPayAmount.toLocaleString()}원
                  </Text>
                </div>
              </Flex>
              <Flex justifyContent="center">
                <div className="w-[60px]">
                  {data && (
                    <CustomCircularProgressbar
                      total={data.orderAndPayInfo.totalPayAmount}
                      value={data.orderAndPayInfo.orderTakeoutPayAmount}
                      style={{
                        pathColor: '#fe8511',
                        textColor: '#46477a',
                        trailColor: '#dedee7',
                      }}
                    />
                  )}
                </div>
                <div className="ml-2">
                  <Text>포장 주문</Text>
                  <Text className="font-bold">
                    {data?.orderAndPayInfo.orderTakeoutPayAmount.toLocaleString()}원
                  </Text>
                </div>
              </Flex>
            </Flex>
          </Flex>
        </CustomCard>
        <CustomCard color={'#18CCA8'} className="p-0 bg-[length:37%] bg-no-repeat bg-right-bottom">
          <Flex flexDirection={'col'} className="h-full">
            <Flex justifyContent="start" className="p-5">
              <DocumentTextIcon
                className="mr-3 rounded-lg text-[#18CCA8] bg-[#E6FFE6] p-2"
                width={30}
              />
              <Title>주문 건수</Title>
            </Flex>
            <Flex justifyContent="start" className="px-5 mb-5">
              <Title className="!text-4xl inline ">
                {data?.orderAndPayInfo.totalOrderCount.toLocaleString()}
              </Title>
              <Text className="inline text-xl self-end">건</Text>
              {data && (
                <CustomComparedText
                  className="ml-5"
                  yesterday={data.orderAndPayInfo.yesterdayTotalOrderCount}
                  today={data.orderAndPayInfo.totalOrderCount}
                />
              )}
            </Flex>
            <div className="px-5 w-full">
              <Divider className="m-0 !bg-[#dcdde2] h-[1px]" />
            </div>
            <Flex className="px-3 backdrop-blur-sm bg-[rgba(255,255,255,0.7)] flex-1">
              <Flex justifyContent="center">
                <div className="w-[60px]">
                  {data && (
                    <CustomCircularProgressbar
                      total={data.orderAndPayInfo.totalOrderCount}
                      value={data.orderAndPayInfo.orderDeliveryCount}
                      style={{
                        pathColor: '#18CCA8',
                        textColor: '#46477a',
                        trailColor: '#dedee7',
                      }}
                    />
                  )}
                </div>

                <div className="ml-2">
                  <Text>배달 주문</Text>
                  <Text className="font-bold">
                    {data?.orderAndPayInfo.orderDeliveryCount.toLocaleString()}건
                  </Text>
                </div>
              </Flex>
              <Flex justifyContent="center">
                <div className="w-[60px]">
                  {data && (
                    <CustomCircularProgressbar
                      total={data.orderAndPayInfo.totalOrderCount}
                      value={data.orderAndPayInfo.orderTakeoutCount}
                      style={{
                        pathColor: '#18CCA8',
                        textColor: '#46477a',
                        trailColor: '#dedee7',
                      }}
                    />
                  )}
                </div>
                <div className="ml-2">
                  <Text>포장 주문</Text>
                  <Text className="font-bold">{data?.orderAndPayInfo.orderTakeoutCount}건</Text>
                </div>
              </Flex>
            </Flex>
          </Flex>
        </CustomCard>
        <CustomCard color={'#f43f5e'} className="p-0 bg-[length:37%] bg-no-repeat bg-right-bottom">
          <Flex flexDirection={'col'} className="h-full">
            <Flex justifyContent="start" className="p-5">
              <NoSymbolIcon
                className="mr-3 rounded-lg text-[#f43f5e] bg-[#fff1f3] p-2"
                width={30}
              />
              <Title>주문 취소 건수</Title>
            </Flex>
            <Flex justifyContent="start" className="px-5 mb-5">
              <Title className="!text-4xl inline ">
                {data?.orderAndPayInfo.totalOrderCancelCount}
              </Title>
              <Text className="inline text-xl self-end">건</Text>
              {data && (
                <CustomComparedText
                  className="ml-5"
                  yesterday={data.orderAndPayInfo.yesterdayTotalOrderCancelCount}
                  today={data.orderAndPayInfo.totalOrderCancelCount}
                />
              )}
            </Flex>
            <div className="px-5 w-full">
              <Divider className="m-0 !bg-[#dcdde2] h-[1px]" />
            </div>
            <Flex className="px-3 backdrop-blur-sm bg-[rgba(255,255,255,0.7)] flex-1">
              <Flex justifyContent="center">
                <div className="w-[60px]">
                  {data && (
                    <CustomCircularProgressbar
                      total={data.orderAndPayInfo.totalOrderCancelCount}
                      value={data.orderAndPayInfo.orderDeliveryCancelCount}
                      style={{
                        pathColor: '#f43f5e',
                        textColor: '#46477a',
                        trailColor: '#dedee7',
                      }}
                    />
                  )}
                </div>

                <div className="ml-2">
                  <Text>배달 주문</Text>
                  <Text className="font-bold">
                    {data?.orderAndPayInfo.orderDeliveryCancelCount.toLocaleString()}건
                  </Text>
                </div>
              </Flex>
              <Flex justifyContent="center">
                <div className="w-[60px]">
                  {data && (
                    <CustomCircularProgressbar
                      total={data.orderAndPayInfo.totalOrderCancelCount}
                      value={data.orderAndPayInfo.orderTakeoutCancelCount}
                      style={{
                        pathColor: '#f43f5e',
                        textColor: '#46477a',
                        trailColor: '#dedee7',
                      }}
                    />
                  )}
                </div>
                <div className="ml-2">
                  <Text>포장 주문</Text>
                  <Text className="font-bold">
                    {data?.orderAndPayInfo.orderTakeoutCancelCount}건
                  </Text>
                </div>
              </Flex>
            </Flex>
          </Flex>
        </CustomCard>
      </Grid>
      <Grid numItemsSm={5} numItemsLg={5} className="gap-6 mt-5">
        <CustomCard color={'#8e93ad'}>
          <Flex flexDirection={'col'}>
            <Flex justifyContent="start">
              <ChickenIcon className="mr-3 rounded-lg text-[#8e93ad] bg-[#eff1f9] p-2" width={30} />
              <Title>메뉴 수</Title>
            </Flex>
            <Flex justifyContent="start" alignItems="end" className="mt-2">
              <Title className="!text-4xl inline">
                {data?.totalCountInfo.menuTotalCount.toLocaleString()}
              </Title>
              <Text className="inline text-xl self-end">건</Text>
            </Flex>
          </Flex>
        </CustomCard>
        <CustomCard color={'#8e93ad'}>
          <Flex flexDirection={'col'}>
            <Flex justifyContent="start">
              <HomeIcon className="mr-3 rounded-lg text-[#8e93ad] bg-[#eff1f9] p-2" width={30} />
              <Title>패밀리 수</Title>
            </Flex>
            <Flex justifyContent="start" alignItems="end" className="mt-2">
              <Title className="!text-4xl inline">
                {data?.totalCountInfo.totalFamilyCount.toLocaleString()}
              </Title>
              <Text className="inline text-xl self-end">개소</Text>
            </Flex>
          </Flex>
        </CustomCard>
        <CustomCard color={'#1581e2'}>
          <Flex flexDirection={'col'}>
            <Flex justifyContent="start">
              <UserCircleIcon
                className="mr-3 rounded-lg text-[##1581e2] bg-[#e6f3ff] p-2"
                width={30}
              />
              <Title>회원 수</Title>
            </Flex>
            <Flex justifyContent="start" alignItems="end" className="mt-2">
              <Title className="!text-4xl inline">
                {memberData?.memberCountInfo.totalMemberCount.toLocaleString()}
              </Title>
              <Text className="inline text-xl self-end">명</Text>

              {memberData && (
                <CustomComparedText
                  className="ml-5"
                  yesterday={memberData?.memberCountInfo.yesterdayTotalMemberCount}
                  today={memberData?.memberCountInfo.totalMemberCount}
                />
              )}
            </Flex>
          </Flex>
        </CustomCard>
        <CustomCard color={'#2E8B57'}>
          <Flex flexDirection={'col'}>
            <Flex justifyContent="start">
              <ClipboardDocumentListIcon
                className="mr-3 rounded-lg text-[#2E8B57] bg-[#E1FFE1] p-2"
                width={30}
              />
              <Title>쿠폰 발행 수</Title>
            </Flex>
            <Flex justifyContent="start" alignItems="end" className="mt-2">
              <Title className="!text-4xl inline">
                {data?.totalCountInfo.totalCouponCount.toLocaleString()}
              </Title>
              <Text className="inline text-xl self-end">건</Text>
              {data && (
                <CustomComparedText
                  className="ml-5"
                  yesterday={data.totalCountInfo.yesterdayTotalCouponCount}
                  today={data.totalCountInfo.totalCouponCount}
                />
              )}
            </Flex>
          </Flex>
        </CustomCard>
        <CustomCard color={'#844eee'}>
          <Flex flexDirection={'col'}>
            <Flex justifyContent="start">
              <CurrencyDollarIcon
                className="mr-3 rounded-lg text-[#844eee] bg-[#f4efff] p-2"
                width={30}
              />
              <Title>전체 보유 포인트</Title>
            </Flex>
            <Flex justifyContent="start" alignItems="end" className="mt-2">
              <Title className="!text-4xl inline">
                {memberData?.memberPoint.totalPoint.toLocaleString()}
              </Title>
              <Text className="inline text-xl self-end">P</Text>
            </Flex>
          </Flex>
        </CustomCard>
      </Grid>
      <Card className="mt-5">
        <Flex flexDirection={'col'}>
          <Flex>
            <Flex justifyContent="start">
              <Icon size="sm" icon={CalculatorIcon} className="mb-[1px] mr-1 text-[#fe8511]" />
              <Title>매출액</Title>
            </Flex>
            <Flex justifyContent="end" className="gap-5">
              {selectedValue.payCustomMode && (
                <>
                  {
                    <>
                      <DateRangePicker
                        className="w-[260px]"
                        value={selectedValue.payDate}
                        onValueChange={value => handleValueChange('payDate', value)}
                        enableClear={true}
                        enableSelect={false}
                        locale={ko}
                        placeholder="기간 선택"
                      />
                      <button
                        className="w-[100px] mx-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handlePaySubmit}
                      >
                        조회
                      </button>
                    </>
                  }
                </>
              )}
              <Select
                className="w-[140px] min-w-[80px]"
                value={selectedValue.payTable}
                onChange={value => handleValueChange('payTable', value)}
              >
                <SelectItem value={'7d'}>일주일</SelectItem>
                <SelectItem value={'1m'}>한달</SelectItem>
                <SelectItem value={'1y'}>일년</SelectItem>
                <SelectItem value={'custom'}>기간설정</SelectItem>
              </Select>
            </Flex>
          </Flex>
          {dailyPayData && (
            <BarChart
              yAxisWidth={100}
              className="h-72 mt-4"
              data={dailyPayData}
              index="date"
              categories={['매출액']}
              colors={['orange']}
              valueFormatter={dataFormatter}
            />
          )}
        </Flex>
      </Card>
      <Card className="mt-5">
        <Flex flexDirection={'col'}>
          <Flex>
            <Flex justifyContent="start">
              <Icon size="sm" icon={DocumentTextIcon} className="mr-1 text-[#00c9b5]" />
              <Title>주문 건수/ 주문취소 건수</Title>
            </Flex>
            <Flex justifyContent="end" className="gap-5">
              {selectedValue.orderCustomMode && (
                <>
                  {
                    <>
                      <DateRangePicker
                        className="w-[260px]"
                        value={selectedValue.orderDate}
                        onValueChange={value => handleValueChange('orderDate', value)}
                        enableClear={true}
                        enableSelect={false}
                        locale={ko}
                        placeholder="기간 선택"
                      />
                      <button
                        className="w-[100px] mx-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handleOrderSubmit}
                      >
                        조회
                      </button>
                    </>
                  }
                </>
              )}
              <Select
                className="w-[140px] min-w-[80px]"
                value={selectedValue.orderCountTable}
                onChange={value => handleValueChange('orderCountTable', String(value))}
              >
                <SelectItem value={'7d'}>일주일</SelectItem>
                <SelectItem value={'1m'}>한달</SelectItem>
                <SelectItem value={'1y'}>일년</SelectItem>
                <SelectItem value={'custom'}>기간설정</SelectItem>
              </Select>
            </Flex>
          </Flex>
          {dailyOrderData && (
            <BarChart
              className="h-72 mt-4"
              data={dailyOrderData}
              index="daily"
              categories={['주문 건수', '주문취소 건수']}
              colors={['emerald', 'rose']}
              valueFormatter={dataFormatter2}
            />
          )}
        </Flex>
      </Card>
      <Card className="mt-5">
        <Flex flexDirection={'col'}>
          <Flex>
            <Flex justifyContent="start">
              <Icon size="sm" icon={UserCircleIcon} className="mb-[1px] mr-1 text-[#1A84E3]" />
              <Title>신규가입자 수</Title>
            </Flex>
            <Flex justifyContent="end" className="gap-5">
              {selectedValue.memberCustomMode && (
                <>
                  {
                    <>
                      <DateRangePicker
                        className="w-[260px]"
                        value={selectedValue.memberDate}
                        onValueChange={value => handleValueChange('memberDate', value)}
                        enableClear={true}
                        enableSelect={false}
                        locale={ko}
                        placeholder="기간 선택"
                      />
                      <button
                        className="w-[100px] mx-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handleMemberSubmit}
                      >
                        조회
                      </button>
                    </>
                  }
                </>
              )}
              <Select
                className="w-[140px] min-w-[80px]"
                value={selectedValue.memberTable}
                onChange={value => handleValueChange('memberTable', value)}
              >
                <SelectItem value={'7d'}>일주일</SelectItem>
                <SelectItem value={'1m'}>한달</SelectItem>
                <SelectItem value={'1y'}>일년</SelectItem>
                <SelectItem value={'custom'}>기간설정</SelectItem>
              </Select>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="gap-5">
          <Flex flexDirection="col">
            {memberData && memberData.dailyMemberCountInfos && (
              <BarChart
                className="h-72 mt-4"
                data={memberData.dailyMemberCountInfos}
                index="date"
                categories={['신규가입']}
                colors={['blue']}
                valueFormatter={number => {
                  return Intl.NumberFormat('ko').format(number).toString() + '명';
                }}
              />
            )}
          </Flex>
        </Flex>
      </Card>
    </main>
  );
}
