'use client';

import { CalculatorIcon } from '@heroicons/react/24/outline';
import {
  AreaChart,
  BarChart,
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Grid,
  Select,
  SelectItem,
  Subtitle,
  Text,
  Title,
} from '@tremor/react';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';

import Image from 'next/image';

import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import { OrderDashboardResponse } from '@/pages/api/order/dashboard';

import CustomCircularProgressbar from '../components/CustomCircularProgressbar';
import CustomComparedText from '../components/CustomComparedText';
import VerticalDivider from '../components/VerticalDivider';
import { getAxios } from '../lib/Axios';
import { returnNumberToDate } from '../utils/changeValueType';

export default function OrderPage() {
  const [data, setData] = useState<OrderDashboardResponse>();
  const [selectedValue, setSelectedValue] = useState({
    orderCountTable: '7d',
    orderCustomMode: false,
    orderDate: {
      from: new Date(dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD')),
      to: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
    },
    startDate: '',
    endDate: '',
  });

  const [chartData, setChartData] = useState<
    {
      date: string;
      매출: number;
    }[]
  >();

  const handleValueChange = (key: string, value: any) => {
    setSelectedValue({
      ...selectedValue,
      [key]: value,
    });
  };

  const calculateDate = (dateForm: string) => {
    switch (dateForm) {
      case '7d':
        selectedValue.startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
        selectedValue.endDate = dayjs().format('YYYY-MM-DD');
        handleValueChange(selectedValue.startDate, selectedValue.startDate);
        handleValueChange(selectedValue.endDate, selectedValue.endDate);
        break;
      case '1m':
        selectedValue.startDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
        selectedValue.endDate = dayjs().format('YYYY-MM-DD');
        handleValueChange(selectedValue.startDate, selectedValue.startDate);
        handleValueChange(selectedValue.endDate, selectedValue.endDate);
        break;
      case '1y':
        selectedValue.startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD');
        selectedValue.endDate = dayjs().format('YYYY-MM-DD');
        handleValueChange(selectedValue.startDate, selectedValue.startDate);
        handleValueChange(selectedValue.endDate, selectedValue.endDate);
        break;
      case 'custom':
        selectedValue.startDate = dayjs(selectedValue.orderDate.from).format('YYYY-MM-DD');
        selectedValue.endDate = dayjs(selectedValue.orderDate.to).format('YYYY-MM-DD');
        break;
      default:
        alert('올바른 입력이 아닙니다. 7d, 1m, 1y 또는 custom 중 하나를 입력해주세요.');
    }
  };

  const getData = async () => {
    if (selectedValue.orderCountTable === 'custom') {
      handleValueChange('orderCustomMode', true);
    } else {
      const result = await getAxios().get<OrderDashboardResponse>('/api/order/dashboard', {
        params: {
          periodType: selectedValue.orderCountTable,
        },
      });
      calculateDate(selectedValue.orderCountTable);
      setData(result.data);
      handleValueChange('orderCustomMode', false);
      if (result.data.orderDashboardDailyInfos != null) {
        const chartData = result.data.orderDashboardDailyInfos.map(item => {
          return {
            date: item.dailyDate,
            매출: item.dailyPayAmount,
          };
        });
        setChartData(chartData);
      }
    }
  };

  const handleOrderSubmit = async () => {
    try {
      const result = await getAxios().get<OrderDashboardResponse>(`/api/order/dashboard`, {
        params: {
          startDate: dayjs(selectedValue.orderDate.from).format('YYYY-MM-DD'),
          endDate: dayjs(selectedValue.orderDate.to).format('YYYY-MM-DD'),
        },
      });

      if (result.data.orderDashboardDailyInfos != null) {
        const chartData = result.data.orderDashboardDailyInfos.map(item => {
          return {
            date: item.dailyDate,
            매출: item.dailyPayAmount,
          };
        });
        calculateDate('custom');
        setData(result.data);
        setChartData(chartData);
      }
    } catch (error) {
      alert('조회기간은 1년 이내로만 가능합니다.');
    }
  };

  useEffect(() => {
    getData();
  }, [selectedValue.orderCountTable]);

  if (data) {
    return (
      <main>
        <Grid numItemsSm={3} numItemsMd={3} numItemsLg={3} className="gap-3">
          <Card className="p-0 h-[180px]">
            <Flex className="h-full">
              <Flex
                justifyContent="center"
                flexDirection="col"
                className="text-center w-auto gap-5 w-full border-r"
              >
                <Title>전체주문</Title>
                <Flex justifyContent="center" className="gap-1">
                  <Title className="self-end">총</Title>
                  <Title className="!text-4xl">
                    {data?.orderDashboardDetailInfo.totalOrderCount}
                  </Title>
                  <Title className="self-end">건</Title>
                </Flex>

                <CustomComparedText
                  direction="row"
                  today={data.orderDashboardDetailInfo.totalOrderCount}
                  yesterday={data.orderDashboardDetailInfo.yesterdayTotalOrderCount}
                  className="w-auto"
                />
              </Flex>
              <Flex className="pt-3 gap-5" flexDirection="col">
                <Flex className="mx-auto w-[130px]">
                  <div className="w-[100px]">
                    {data?.orderDashboardDetailInfo.appOrderCount != null &&
                      data?.orderDashboardDetailInfo.totalOrderCount != null && (
                        <CustomCircularProgressbar
                          total={data?.orderDashboardDetailInfo.totalOrderCount}
                          value={data?.orderDashboardDetailInfo.appOrderCount}
                          style={{
                            pathColor: '#fe4a51',
                            textColor: '#46477a',
                            trailColor: '#dedee7',
                          }}
                        />
                      )}
                  </div>
                  <Flex alignItems="start" flexDirection="col" className="ml-3">
                    <Subtitle className="!text-xs">App</Subtitle>
                    <Title className="!text-sm">
                      {data?.orderDashboardDetailInfo.appOrderCount?.toLocaleString()}건
                    </Title>
                  </Flex>
                </Flex>
                <Flex className="mx-auto w-[130px]">
                  <div className="w-[100px]">
                    {data?.orderDashboardDetailInfo.webOrderCount != null &&
                      data?.orderDashboardDetailInfo.totalOrderCount != null && (
                        <CustomCircularProgressbar
                          total={data?.orderDashboardDetailInfo.totalOrderCount}
                          value={data?.orderDashboardDetailInfo.webOrderCount}
                          style={{
                            pathColor: '#00c9b5',
                            textColor: '#46477a',
                            trailColor: '#dedee7',
                          }}
                        />
                      )}
                  </div>
                  <Flex alignItems="start" flexDirection="col" className="ml-3">
                    <Subtitle className="!text-xs">Web</Subtitle>
                    <Title className="!text-sm">
                      {data?.orderDashboardDetailInfo.webOrderCount?.toLocaleString()}건
                    </Title>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Card>
          <Card className="p-0 h-[180px]">
            <Flex className="gap-5 h-full">
              <Flex
                justifyContent="center"
                flexDirection="col"
                className="text-center w-auto gap-5 w-full border-r"
              >
                <Title>금일 주문별 평균 단가</Title>
                <Flex justifyContent="center">
                  <Title className="!text-4xl">
                    {data?.orderDashboardDetailInfo.avgOrderAmount?.toLocaleString()}
                  </Title>
                  <Title className="self-end">원</Title>
                </Flex>

                {data && (
                  <CustomComparedText
                    direction={'row'}
                    className="w-auto flex-row-reverse"
                    today={data.orderDashboardDetailInfo.avgOrderAmount}
                    yesterday={data.orderDashboardDetailInfo.yesterdayAvgOrderAmount}
                  />
                )}
              </Flex>
              <Flex className="pt-3 " flexDirection="col">
                <Flex className="border-b gap-3 pb-3">
                  <Image
                    alt="menu phone"
                    src={'/images/ic_menu_list_phone.png'}
                    width={50}
                    height={50}
                  />
                  <Flex className="mx-auto w-full" flexDirection="col" alignItems="start">
                    <Subtitle className="!text-xs">App 주문 평균 단가</Subtitle>
                    <Title className="!text-sm">
                      {data?.orderDashboardDetailInfo.appAvgOrderAmount?.toLocaleString()}원
                    </Title>
                  </Flex>
                </Flex>
                <Flex className="pt-3 gap-3">
                  <Image
                    alt="menu web"
                    src={'/images/ic_menu_list_web.png'}
                    width={50}
                    height={50}
                  />
                  <Flex className="mx-auto w-full" flexDirection="col" alignItems="start">
                    <Subtitle className="!text-xs">Web 주문 평균 단가</Subtitle>
                    <Title className="!text-sm">
                      {data?.orderDashboardDetailInfo.webAvgOrderAmount?.toLocaleString()}원
                    </Title>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Card>
          <Card className="p-0 flex justify-center h-[180px]">
            <Flex
              justifyContent="center"
              flexDirection="col"
              alignItems="center"
              className="text-center w-auto gap-0 pb-5"
            >
              <Title className="mb-full absolute top-[30px]">주문 취소</Title>
              <Flex justifyContent="center">
                <Title className="!text-4xl mt-10">
                  {data?.orderDashboardDetailInfo.cancelCount?.toLocaleString()}
                </Title>
                <Title className="self-end">건</Title>
              </Flex>
            </Flex>
          </Card>
        </Grid>
        <Card className="mt-5 p-0">
          <Flex justifyContent="start" className="p-5 pb-0">
            <CalculatorIcon width={30} />
            <Title className="ml-1">매출액</Title>
          </Flex>
          <Flex className="border-b p-5">
            <Flex className=" w-[50%]">
              <Flex flexDirection="col" className="gap-3" alignItems="start">
                <Title>오늘 전체 매출액</Title>
                <Flex justifyContent="start">
                  <Title className="!text-4xl">
                    {data?.orderDashboardDetailInfo.totalTodayPayAmount?.toLocaleString()}
                  </Title>
                  <Title className="self-end !text-3xl">원</Title>
                </Flex>
                {data && (
                  <CustomComparedText
                    direction={'row'}
                    className="w-auto"
                    today={data.orderDashboardDetailInfo.totalTodayPayAmount}
                    yesterday={data.orderDashboardDetailInfo.yesterdayTotalTodayPayAmount}
                  />
                )}
              </Flex>
              <Image
                alt="images"
                src="/images/ic_dashboard_revenue_bg.png"
                width={190}
                height={80}
              />
            </Flex>
            <Flex className="w-[50%] border-l relative bottom-[30px]">
              <Flex className="mx-auto w-full ml-3">
                <div className="w-[120px]">
                  {data && (
                    <CustomCircularProgressbar
                      total={data?.orderDashboardDetailInfo.totalTodayPayAmount}
                      value={data?.orderDashboardDetailInfo.appTodayPayAmount}
                      style={{
                        pathColor: '#fe4a51',
                        textColor: '#46477a',
                        trailColor: '#dedee7',
                      }}
                    />
                  )}
                </div>
                <Flex alignItems="start" flexDirection="col" className="ml-3 w-full">
                  <Title>App</Title>
                  <Flex justifyContent="start">
                    <Title className="!text-2xl">
                      {data?.orderDashboardDetailInfo.appTodayPayAmount?.toLocaleString()}
                    </Title>
                    <Title className="self-end !text-1xl">원</Title>
                  </Flex>
                  {data && (
                    <CustomComparedText
                      direction={'row'}
                      className="w-auto"
                      today={data?.orderDashboardDetailInfo.appTodayPayAmount}
                      yesterday={data?.orderDashboardDetailInfo.yesterdayAppTodayPayAmount}
                    />
                  )}
                </Flex>
              </Flex>
              <VerticalDivider height={100} className="mx-3" />
              <Flex className="w-full">
                <div className="w-[120px]">
                  {data && (
                    <CustomCircularProgressbar
                      total={data?.orderDashboardDetailInfo.totalTodayPayAmount}
                      value={data?.orderDashboardDetailInfo.webTodayPayAmount}
                      style={{
                        pathColor: '#00c9b5',
                        textColor: '#46477a',
                        trailColor: '#dedee7',
                      }}
                    />
                  )}
                </div>
                <Flex alignItems="start" flexDirection="col" className="ml-3">
                  <Title>Web</Title>
                  <Flex justifyContent="start">
                    <Title className="!text-2xl">
                      {data?.orderDashboardDetailInfo.webTodayPayAmount?.toLocaleString()}
                    </Title>
                    <Title className="self-end !text-1xl">원</Title>
                  </Flex>
                  {data && (
                    <CustomComparedText
                      direction="row"
                      className="w-auto"
                      today={data?.orderDashboardDetailInfo.webTodayPayAmount}
                      yesterday={data?.orderDashboardDetailInfo.yesterdayWebTodayPayAmount}
                    />
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Grid
            numItemsSm={5}
            numItemsMd={5}
            numItemsLg={5}
            style={{
              background:
                'repeating-linear-gradient(-45deg, #f0f0f4, #f0f0f4 5px, white 5px, white 10px)',
            }}
            className="p-5"
          >
            <Flex flexDirection="col" alignItems="start" className="gap-3 border-r">
              <Text>{`${selectedValue.startDate} ~ ${selectedValue.endDate}`}</Text>
              <Title className="!text-2xl">
                {selectedValue.orderCustomMode
                  ? '기간 설정'
                  : `최근 ${returnNumberToDate(selectedValue.orderCountTable)}`}
              </Title>
            </Flex>
            <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5 border-r">
              <Text>총매출</Text>
              <Title className="!text-2xl">
                {data?.orderDashboardWeeklyInfo.totalWeekPayAmount?.toLocaleString()}원
              </Title>
            </Flex>
            <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5 border-r">
              <Text>주문별 평균 단가</Text>
              <Title className="!text-2xl">
                {parseFloat(
                  data?.orderDashboardWeeklyInfo.avgWeekPayAmount.toFixed(0),
                )?.toLocaleString()}
                원
              </Title>
            </Flex>
            <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5 border-r">
              <Text>최고 매출 | {data?.orderMaxMinDailyInfo.maxDate}</Text>
              <Title className="!text-2xl text-red-500">
                {data?.orderMaxMinDailyInfo.maxWeekPayAmount?.toLocaleString()}원
              </Title>
            </Flex>
            <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5">
              <Text>최저 매출 | {data.orderMaxMinDailyInfo.minDate}</Text>
              <Title className="!text-2xl text-emerald-500">
                {data?.orderMaxMinDailyInfo.minWeekPayAmount?.toLocaleString()}원
              </Title>
            </Flex>
          </Grid>
          <Flex flexDirection="col">
            <Flex justifyContent="end" className="mt-5 mr-7">
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
                onChange={value => handleValueChange('orderCountTable', value)}
              >
                <SelectItem value={'7d'}>일주일</SelectItem>
                <SelectItem value={'1m'}>한달</SelectItem>
                <SelectItem value={'1y'}>일년</SelectItem>
                <SelectItem value={'custom'}>기간설정</SelectItem>
              </Select>
            </Flex>
          </Flex>
          {chartData != null && (
            <BarChart
              yAxisWidth={100}
              valueFormatter={value => value.toLocaleString() + '원'}
              className="h-72 mt-4 px-5"
              data={chartData}
              index="date"
              categories={['매출']}
              colors={['red']}
            />
          )}
        </Card>
      </main>
    );
  }
}
