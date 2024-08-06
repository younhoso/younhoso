'use client';

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
  Text,
  Title,
} from '@tremor/react';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-circular-progressbar/dist/styles.css';

import Image from 'next/image';

import { isAxiosError } from 'axios';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import {
  CustomerDashboardInfo,
  CustomerDashboardResponse,
  CustomerDashboardStateInfo,
  MembershipInfo,
} from '@/pages/api/customer/dashboard';

import ComparedText from '../components/ComparedText';
import CustomCircularProgressbar from '../components/CustomCircularProgressbar';
import CustomComparedText from '../components/CustomComparedText';
import { Radiobox, RadioboxGroup } from '../components/Radiobox';
import VerticalDivider from '../components/VerticalDivider';
import { getAxios } from '../lib/Axios';
import Loading from '../loading';
import { returnNumberToDate, returnNumberToDateString } from '../utils/changeValueType';
import { circleGraphStyle } from '../utils/circleGraphStyle';
import { pipeline } from '../utils/pipeline';

interface FetchDataParams {
  startDate: string;
  endDate: string;
}

interface FetchPeriodTypeParams {
  periodType: string;
}

interface ChartDataType {
  date: string;
  신규가입: number;
}

export interface CorrectedMembershipData {
  lastMonthMember: number;
  thisMonthMember: number;
  membershipName: string;
}

interface CorrectedReport {
  thisMonthTotalMember: number;
  lastMonthTotalMember: number;
  data: CorrectedMembershipData[];
}

export default function CustomerPage() {
  const [data, setData] = useState<CustomerDashboardResponse>();
  const [memberData, setMemberData] = useState<CorrectedReport>();
  const [stateInfoData, setStateInfoData] = useState<CustomerDashboardInfo>();
  const [selectedValue, setSelectedValue] = useState({
    customerCountTable: '7d',
    customerCustomMode: false,
    customerDate: {
      from: dayjs().subtract(7, 'day').toDate(),
      to: dayjs().toDate(),
    },
    startDate: '',
    endDate: '',
  });

  const [chartData, setChartData] = useState<ChartDataType[]>();

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
        selectedValue.startDate = dayjs(selectedValue.customerDate.from).format('YYYY-MM-DD');
        selectedValue.endDate = dayjs(selectedValue.customerDate.to).format('YYYY-MM-DD');
        break;
      default:
        alert('올바른 입력이 아닙니다. 7d, 1m, 1y 또는 custom 중 하나를 입력해주세요.');
    }
  };

  const fetchData = async (params: FetchDataParams | FetchPeriodTypeParams) => {
    try {
      const result = await getAxios().get<CustomerDashboardResponse>(`/api/customer/dashboard`, {
        params,
      });

      if (result.data.customerDashboardDailyInfos != null) {
        const chartData = result.data.customerDashboardDailyInfos.map(item => ({
          date: item.daily,
          신규가입: item.memberCount,
        }));

        calculateDate(selectedValue.customerCountTable);

        setData(result.data);
        // setMemberData(pipeline(result.data.customerMembershipInfos));
        setChartData(chartData);
      }
    } catch (error) {
      alert('조회기간은 1년 이내로만 가능합니다.');
    }
  };

  const fetchDataMembershipInfo = async () => {
    try {
      const result = await getAxios().get<MembershipInfo[]>(`/api/customer/membershipInfos`);

      setMemberData(pipeline(result.data));
    } catch (error) {
      alert('멤버십 등급별 회원수 데이터 불러오는데 문제가 있습니다.');
    }
  };

  const fetchDataStateInfo = async () => {
    try {
      const result = await getAxios().get<CustomerDashboardInfo>(`/api/customer/info`);

      setStateInfoData(result.data);
    } catch (error) {
      alert('기간별 데이터 불러오는데 문제가 있습니다.');
    }
  };

  const getData = async () => {
    if (selectedValue.customerCountTable === 'custom') {
      handleValueChange('customerCustomMode', true);
    } else {
      const params = { periodType: selectedValue.customerCountTable };
      await fetchData(params);
      handleValueChange('customerCustomMode', false);
    }
  };

  const handleCustomerSubmit = async () => {
    const { customerDate } = selectedValue;
    const params = {
      startDate: dayjs(customerDate.from).format('YYYY-MM-DD'),
      endDate: dayjs(customerDate.to).format('YYYY-MM-DD'),
    };
    await fetchData(params);
  };

  useEffect(() => {
    getData();
  }, [selectedValue.customerCountTable]);

  useEffect(() => {
    fetchDataMembershipInfo();
    fetchDataStateInfo();
  }, []);

  if (data) {
    return (
      <>
        <Flex className="min-w-[1560px] gap-5">
          <Card className="flex flex-row w-3/4 gap-5 items-center h-[200px]">
            <Flex
              className="text-center h-full border-r py-3 w-[250px]"
              flexDirection="col"
              justifyContent="center"
            >
              <Text className="mb-2">전체 가입자</Text>
              <Flex justifyContent="center" className="mb-2">
                <Title className="!text-4xl">
                  {stateInfoData?.totalMemberCount.toLocaleString()}
                </Title>
                <Title className="!text-2xl self-end">명</Title>
              </Flex>
              <CustomComparedText
                direction={'row'}
                yesterday={stateInfoData?.yesterdayTotalMemberCount}
                today={stateInfoData?.totalMemberCount}
                text="전일 대비"
              />
            </Flex>
            <Flex className="w-3/4 gap-5">
              <Flex>
                <div className="w-[180px]">
                  <CustomCircularProgressbar
                    style={{
                      pathColor: '#00C9B5',
                      textColor: '#46477A',
                      trailColor: '#dedee7',
                    }}
                    total={stateInfoData?.totalMemberCount ?? 0}
                    value={stateInfoData?.maleMemberCount ?? 0}
                  />
                </div>
                <Flex
                  flexDirection="col"
                  justifyContent="start"
                  alignItems="start"
                  className="ml-3"
                >
                  <Text>남자</Text>
                  <Flex justifyContent="start">
                    <Text className="!text-3xl">
                      {stateInfoData?.maleMemberCount.toLocaleString()}
                    </Text>
                    <Text className="!text-xl self-end">명</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex>
                <div className="w-[180px]">
                  <CustomCircularProgressbar
                    style={{
                      pathColor: '#FD4A51',
                      textColor: '#46477A',
                      trailColor: '#dedee7',
                    }}
                    total={stateInfoData?.totalMemberCount ?? 0}
                    value={stateInfoData?.femaleMemberCount ?? 0}
                  />
                </div>
                <Flex
                  flexDirection="col"
                  justifyContent="start"
                  alignItems="start"
                  className="ml-3"
                >
                  <Text>여자</Text>
                  <Flex justifyContent="start">
                    <Text className="!text-3xl">
                      {stateInfoData?.femaleMemberCount.toLocaleString()}
                    </Text>
                    <Text className="!text-xl self-end">명</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex>
                <div className="w-[180px]">
                  <CustomCircularProgressbar
                    style={{
                      pathColor: '#777777',
                      textColor: '#46477A',
                      trailColor: '#dedee7',
                    }}
                    total={stateInfoData?.totalMemberCount ?? 0}
                    value={stateInfoData?.unknownMemberCount ?? 0}
                  />
                </div>
                <Flex
                  flexDirection="col"
                  justifyContent="start"
                  alignItems="start"
                  className="ml-3"
                >
                  <Text>무응답</Text>
                  <Flex justifyContent="start">
                    <Text className="!text-3xl">
                      {stateInfoData?.unknownMemberCount.toLocaleString()}
                    </Text>
                    <Text className="!text-xl self-end">명</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Card>

          <Card className="w-1/4 h-[200px]">
            <Flex className="text-center h-full py-3" flexDirection="col" justifyContent="center">
              <Text className="mb-2">최근 한달 신규 가입자</Text>
              <Flex justifyContent="center" className="mb-2">
                <Title className="!text-4xl">
                  {stateInfoData?.recentMonthMemberCount.toLocaleString()}
                </Title>
                <Title className="!text-2xl self-end">명</Title>
              </Flex>
              <CustomComparedText
                text="전월 대비"
                direction={'row'}
                yesterday={stateInfoData?.priorTwoMonthMemberCount}
                today={stateInfoData?.recentMonthMemberCount}
              />
            </Flex>
          </Card>
        </Flex>
        <Flex className="min-w-[1560px] mt-[20px]">
          <Card className="flex flex-row w-full gap-5 items-center h-[200px]">
            <Flex
              className="relative text-center h-full border-r py-3 w-[250px]"
              flexDirection="col"
            >
              <Text className="w-full text-left mb-2 !text-[18px]">멤버십 등급별 회원수</Text>

              <div className="absolute bottom-[-20px] right-[20px]">
                <Image src="/images/ic_customer.png" width={130} height={115} alt="치빡이" />
              </div>
            </Flex>
            <Flex className="w-3/4">
              {memberData?.data.map((v, i) => {
                const style = circleGraphStyle(v);
                return (
                  <Flex key={i}>
                    <div className="w-[180px] gap-[1px]">
                      <CustomCircularProgressbar
                        style={style}
                        total={memberData.thisMonthTotalMember}
                        value={v.thisMonthMember}
                      />
                    </div>
                    <Flex
                      flexDirection="col"
                      justifyContent="start"
                      alignItems="start"
                      className="ml-3"
                    >
                      <Text className="text-[16px]">{v.membershipName}</Text>
                      <Flex justifyContent="start">
                        <Text className="!text-3xl">{v.thisMonthMember.toLocaleString()}</Text>
                        <Text className="!text-xl self-end">명</Text>
                      </Flex>

                      <CustomComparedText
                        className="justify-normal"
                        text="전월 대비"
                        direction={'row'}
                        yesterday={v.lastMonthMember}
                        today={v.thisMonthMember}
                      />
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Card>
        </Flex>

        <Card className="min-w-[1560px] mt-5 p-0">
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
                {selectedValue.customerCustomMode
                  ? '기간 설정'
                  : `최근 ${returnNumberToDate(selectedValue.customerCountTable)}`}
              </Title>
            </Flex>
            <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5 border-r">
              <Text>기간별 총 가입자</Text>
              <Flex justifyContent="start">
                <Title className="!text-3xl">
                  {data.customerDashboardStateInfo.totalMember.toLocaleString()}
                </Title>

                <Text className="!text-2xl ml-1">명</Text>
              </Flex>
            </Flex>
            <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5 border-r">
              <Text>기간별 평균 가입자</Text>
              <Flex justifyContent="start">
                <Title className="!text-3xl">
                  {data.customerDashboardStateInfo.avgMember.toLocaleString()}
                </Title>
                <Text className="!text-2xl ml-1">명</Text>
              </Flex>
            </Flex>
            <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5 border-r">
              <Text>기간별 최대 가입자 | {data.customerDashboardStateInfo.maxMemberDate}</Text>
              <Flex justifyContent="start">
                <Title className="!text-3xl">
                  {data.customerDashboardStateInfo.maxMember.toLocaleString()}
                </Title>
                <Text className="!text-2xl ml-1">명</Text>
              </Flex>
            </Flex>
            <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5">
              <Text>기간별 최소 가입자 | {data.customerDashboardStateInfo.minMemberDate}</Text>
              <Flex justifyContent="start">
                <Title className="!text-3xl">
                  {data.customerDashboardStateInfo.minMember.toLocaleString()}
                </Title>
                <Text className="!text-2xl ml-1">명</Text>
              </Flex>
            </Flex>
          </Grid>
          <Flex flexDirection="col">
            <Flex justifyContent="end" className="gap-5 p-5">
              {selectedValue.customerCustomMode && (
                <>
                  {
                    <>
                      <DateRangePicker
                        className="w-[260px]"
                        value={selectedValue.customerDate}
                        onValueChange={value => handleValueChange('customerDate', value)}
                        enableClear={true}
                        enableSelect={false}
                        locale={ko}
                        placeholder="기간 선택"
                      />
                      <button
                        className="w-[100px] mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handleCustomerSubmit}
                      >
                        조회
                      </button>
                    </>
                  }
                </>
              )}
              <Select
                className="w-[140px] min-w-[80px]"
                value={selectedValue.customerCountTable}
                onChange={value => handleValueChange('customerCountTable', value)}
              >
                <SelectItem value={'7d'}>일주일</SelectItem>
                <SelectItem value={'1m'}>한달</SelectItem>
                <SelectItem value={'1y'}>일년</SelectItem>
                <SelectItem value={'custom'}>기간설정</SelectItem>
              </Select>
            </Flex>
            {chartData != null && (
              <BarChart
                yAxisWidth={70}
                valueFormatter={value => value.toLocaleString()}
                className="h-72 mt-4 px-5"
                data={chartData}
                index="date"
                categories={['신규가입']}
                colors={['red']}
              />
            )}
          </Flex>
        </Card>
      </>
    );
  }
}
