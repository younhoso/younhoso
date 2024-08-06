'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  AreaChart,
  BarChart,
  Card,
  DateRangePicker,
  Divider,
  Flex,
  Grid,
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
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import CustomButton from '@/app/components/CustomButton';
import CustomComparedText from '@/app/components/CustomComparedText';
import CustomPagination from '@/app/components/CustomPagination';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import Loading from '@/app/loading';
import {
  returnEarnPointType,
  returnNumberToDate,
  returnNumberToDateString,
} from '@/app/utils/changeValueType';
import { PointHappypointDashboardResponse } from '@/pages/api/point/happypoint/dashboard';
import { PointHappypointListResponse } from '@/pages/api/point/happypoint/list';
import { getDateFromPast } from '@/utils/getDateFromPast';

interface HappypointCondition {
  searchName: string;
  earnPointType: string;
  searchDate: {
    from: Date;
    to: Date;
  };
  isCancelled: string;
  searchDateType: string;
  pointCountTable: string;
  pointCustomMode: boolean;
  pointDate: {
    from: Date;
    to: Date;
  };
}

export default function Happypoint() {
  const [selectedValue, setSelectedValue] = useState<HappypointCondition>({
    searchName: '',
    earnPointType: 'all',
    searchDate: {
      from: new Date(-1),
      to: new Date(),
    },
    searchDateType: 'all',
    isCancelled: 'all',
    pointCountTable: '7d',
    pointCustomMode: false,
    pointDate: {
      from: new Date(dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD')),
      to: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
    },
  });
  const [dashboardData, setDashboardData] = useState<PointHappypointDashboardResponse>();
  const [data, setData] = useState<PointHappypointListResponse>();
  const [page, setPage] = useState(1);

  const handlePointChange = (key: string, value: any) => {
    setSelectedValue({
      ...selectedValue,
      [key]: value,
    });
  };

  const getDashboardData = async () => {
    if (selectedValue.pointCountTable === 'custom') {
      handlePointChange('pointCustomMode', true);
    } else {
      handlePointChange('pointCustomMode', false);
      const result = await getAxios().get<PointHappypointDashboardResponse>(
        '/api/point/happypoint/dashboard',
        {
          params: {
            periodType: selectedValue.pointCountTable,
          },
        },
      );
      setDashboardData(result.data);
    }
  };

  const getData = async () => {
    const result = await getAxios().get('/api/point/happypoint/list', {
      params: {
        page: page,
        size: 20,
        searchName: selectedValue.searchName,
        earnPointType: selectedValue.earnPointType,
        isCancelled:
          selectedValue.isCancelled == 'all'
            ? ''
            : selectedValue.isCancelled === 'true'
              ? true
              : false,
        startDate: dayjs(selectedValue.searchDate.from).format('YYYY-MM-DD'),
        endDate: dayjs(selectedValue.searchDate.to).format('YYYY-MM-DD'),
      },
    });
    setData(result.data);
  };

  const handlePointSubmit = async () => {
    try {
      const result = await getAxios().get<PointHappypointDashboardResponse>(
        '/api/point/happypoint/dashboard',
        {
          params: {
            startDate: dayjs(selectedValue.pointDate.from).format('YYYY-MM-DD'),
            endDate: dayjs(selectedValue.pointDate.to).format('YYYY-MM-DD'),
          },
        },
      );

      if (result.data.pointDashboardDailyInfos != null) {
        setDashboardData(result.data);
      }
    } catch (error) {
      alert('조회기간은 1년 이내로만 가능합니다.');
    }
  };

  const handleSearch = async () => {
    await getData();
    setPage(1);
  };

  const handleValueChange = (key: keyof HappypointCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    getDashboardData();
  }, [selectedValue.pointCountTable]);

  return (
    <>
      <Grid className="gap-5" numItems={4}>
        <Card className="bg-[#F7532E] h-[140px]">
          <Flex justifyContent="center" alignItems="center" className="h-[100%]">
            <Image
              className="my-auto mx-auto"
              src={'/images/happypoint_logo.png'}
              width={140}
              height={70}
              alt="happypoint_logo"
            />
          </Flex>
        </Card>
        <Card className="h-[140px] text-center !border-b-[4px] !border-b-[#FD4A51]">
          <Flex justifyContent="center" flexDirection="col" className="gap-2">
            <Text>전체 고객 중 등록한 고객</Text>
            <Flex justifyContent="center">
              <Text className="!text-4xl">
                {dashboardData?.pointDashboardMemberInfo.allPointMemberCount.toLocaleString()}
              </Text>
              <Text className="!text-2xl self-end">명</Text>
            </Flex>

            <CustomComparedText
              className="mx-auto text-center !w-[auto] justify-center"
              direction={'row'}
              text={'전일 대비'}
              yesterday={dashboardData?.pointDashboardMemberInfo.yesterdayAllPointMemberCount}
              today={dashboardData?.pointDashboardMemberInfo.allPointMemberCount}
            />
          </Flex>
        </Card>
        <Card className="h-[140px] text-center !border-b-[4px] !border-b-[#FE8511]">
          <Flex justifyContent="center" flexDirection="col" className="gap-2">
            <Text>오늘 새로 등록한 고객</Text>
            <Flex justifyContent="center">
              <Text className="!text-4xl">
                {dashboardData?.pointDashboardMemberInfo.todayNewPointMemberCount.toLocaleString()}
              </Text>
              <Text className="!text-2xl self-end">명</Text>
            </Flex>

            <CustomComparedText
              className="mx-auto text-center !w-[auto] justify-center"
              direction={'row'}
              text={'전일 대비'}
              yesterday={dashboardData?.pointDashboardMemberInfo.yesterdayNewPointMemberCount}
              today={dashboardData?.pointDashboardMemberInfo.todayNewPointMemberCount}
            />
          </Flex>
        </Card>
        <Card className="h-[140px] text-center !border-b-[4px] !border-b-[#00C9B5]">
          <Flex justifyContent="center" flexDirection="col" className="gap-2">
            <Text>오늘 포인트 사용 건수</Text>
            <Flex justifyContent="center">
              <Text className="!text-4xl">
                {dashboardData?.pointDashboardMemberInfo.todayUsePointCount.toLocaleString()}
              </Text>
              <Text className="!text-2xl self-end">건</Text>
            </Flex>

            <CustomComparedText
              className="mx-auto text-center !w-[auto] justify-center"
              direction={'row'}
              text={'전일 대비'}
              yesterday={dashboardData?.pointDashboardMemberInfo.yesterdayTodayUsePointCount}
              today={dashboardData?.pointDashboardMemberInfo.todayUsePointCount}
            />
          </Flex>
        </Card>
      </Grid>
      <Card className="mt-5 p-0">
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
            <Text>
              {dayjs()
                .subtract(parseInt(selectedValue.pointCountTable), 'day')
                .format('YYYY-MM-DD')}{' '}
              ~ {dayjs().format('YYYY-MM-DD')}
            </Text>
            <Title className="!text-2xl">
              최근 {returnNumberToDate(selectedValue.pointCountTable)}
            </Title>
          </Flex>
          <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5 border-r">
            <Text>총 사용 포인트</Text>
            <Flex justifyContent="start">
              <Title className="!text-3xl">
                {dashboardData?.pointDashboardStateInfo.totalUsePoint.toLocaleString()}
              </Title>

              <Text className="!text-2xl ml-1">P</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5 border-r">
            <Text>일 평균 사용 포인트</Text>
            <Flex justifyContent="start">
              <Title className="!text-3xl">
                {dashboardData?.pointDashboardStateInfo.avgUseDailyPoint.toLocaleString()}
              </Title>
              <Text className="!text-2xl ml-1">P</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5 border-r">
            <Text>일 평균 적립 포인트</Text>
            <Flex justifyContent="start">
              <Title className="!text-3xl">
                {dashboardData?.pointDashboardStateInfo.avgSaveDailyPoint.toLocaleString()}
              </Title>

              <Text className="!text-2xl ml-1">P</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="col" alignItems="start" className="gap-3 pl-5">
            <Text>최대 사용 | {dashboardData?.pointDashboardStateInfo.maxUsePointDate}</Text>
            <Flex justifyContent="start">
              <Title className="!text-3xl">
                {dashboardData?.pointDashboardStateInfo.maxUsePoint.toLocaleString()}
              </Title>
              <Text className="!text-2xl ml-1">P</Text>
            </Flex>
          </Flex>
        </Grid>
        <Flex flexDirection="col">
          <Flex justifyContent="end" className="gap-5 p-5">
            {selectedValue.pointCustomMode && (
              <>
                {
                  <>
                    <DateRangePicker
                      className="w-[260px]"
                      value={selectedValue.pointDate}
                      onValueChange={value => handleValueChange('pointDate', value)}
                      enableClear={true}
                      enableSelect={false}
                      locale={ko}
                      placeholder="기간 선택"
                    />
                    <button
                      className="w-[100px] mx-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      onClick={handlePointSubmit}
                    >
                      조회
                    </button>
                  </>
                }
              </>
            )}
            <Select
              className="w-[140px] min-w-[80px]"
              value={selectedValue.pointCountTable}
              onChange={value => handlePointChange('pointCountTable', value)}
            >
              <SelectItem value={'7d'}>일주일</SelectItem>
              <SelectItem value={'1m'}>한달</SelectItem>
              <SelectItem value={'1y'}>일년</SelectItem>
              <SelectItem value={'custom'}>기간설정</SelectItem>
            </Select>
          </Flex>
          {dashboardData?.pointDashboardDailyInfos != null && (
            <BarChart
              yAxisWidth={70}
              valueFormatter={value => value.toLocaleString() + 'P'}
              className="h-72 mt-4 px-5"
              data={dashboardData.pointDashboardDailyInfos.map(item => {
                return {
                  date: dayjs(item.daily).format('YYYY-MM-DD'),
                  '사용 포인트': item.usePoint,
                  '적립 포인트': item.savePoint,
                };
              })}
              index="date"
              categories={['사용 포인트', '적립 포인트']}
              colors={['orange', 'gray']}
            />
          )}
        </Flex>
      </Card>
      <Card className="mt-5">
        <Flex flexDirection="col">
          <Flex>
            <TextInput
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              onChange={e => handleValueChange('searchName', e.target.value)}
              className="w-[900px] self-start"
              icon={MagnifyingGlassIcon}
              placeholder="주문번호, 주문자명, 패밀리점명"
            />
          </Flex>
          <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
            <Text className="w-[80px]">기간설정</Text>
            <DateRangePicker
              placeholder="기간 설정"
              className="w-[300px]"
              value={{
                from: selectedValue.searchDate.from,
                to: selectedValue.searchDate.to,
              }}
              onValueChange={value => {
                handleValueChange('searchDate', value);
                handleValueChange('searchDateType', 'all');
              }}
              enableSelect={false}
              locale={ko}
            />
            <RadioboxGroup
              value={selectedValue.searchDateType}
              onChange={value => {
                handleValueChange('searchDateType', value);
                handleValueChange(
                  'searchDate',
                  getDateFromPast({
                    type: value.split('_')[0],
                    value: parseInt(value.split('_')[1]),
                  }),
                );
              }}
            >
              <Radiobox value="all" label="전체" />
              <Radiobox value="d_0" label="오늘" />
              <Radiobox value="w_1" label="일주일" />
              <Radiobox value="m_1" label="한달" />
              <Radiobox value="m_6" label="6개월" />
              <Radiobox value="y_1" label="1년" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent="start" className="gap-10 mt-3 border-b pb-3">
            <Text className="w-[80px]">사용 상태</Text>
            <RadioboxGroup
              value={selectedValue.isCancelled}
              onChange={value => handleValueChange('isCancelled', value)}
            >
              <Radiobox value="all" label="전체" />
              <Radiobox value="false" label="사용" />
              <Radiobox value="true" label="취소" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent="start" className="gap-10 mt-3 border-b pb-3">
            <Text className="w-[80px]">적립 타입</Text>
            <RadioboxGroup
              value={selectedValue.earnPointType}
              onChange={value => handleValueChange('earnPointType', value)}
            >
              <Radiobox value="all" label="전체" />
              <Radiobox value="BBQ" label="비비큐포인트" />
              <Radiobox value="HPC" label="해피포인트" />
            </RadioboxGroup>
          </Flex>
          <CustomButton type="secondary" className="mt-5 self-start" onClick={handleSearch}>
            위 조건으로 검색
          </CustomButton>
        </Flex>
        <Divider />
        <Text className="mt-5 mb-5 !text-lg">Total {data?.totalElements.toLocaleString()}</Text>
        <Table className="border-b">
          <TableHead className="bg-gray-100 border">
            <TableRow className="border">
              <TableHeaderCell>주문번호</TableHeaderCell>
              <TableHeaderCell>주문자명</TableHeaderCell>
              <TableHeaderCell>패밀리점명</TableHeaderCell>
              <TableHeaderCell>사용 상태</TableHeaderCell>
              <TableHeaderCell>사용일</TableHeaderCell>
              <TableHeaderCell>포인트 사용</TableHeaderCell>
              <TableHeaderCell>포인트 적립</TableHeaderCell>
              <TableHeaderCell>적립 타입</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.content &&
              data.content.map(data => {
                return (
                  <TableRow className="border hover:bg-gray-100 cursor-pointer" key={data.orderId}>
                    <TableCell>{data.orderId}</TableCell>
                    <TableCell>{data.memberName}</TableCell>
                    <TableCell>{data.familyName}</TableCell>
                    <TableCell>
                      {data.isCancelled === false ? (
                        '사용'
                      ) : (
                        <Text className="text-red-500">취소</Text>
                      )}
                    </TableCell>
                    <TableCell>{data.createdAt}</TableCell>
                    <TableCell>
                      <Text className="text-red-500">-{data.txPoint}P</Text>
                    </TableCell>
                    <TableCell>
                      <Text className="text-emerald-500">+{data.earnPoint}P</Text>
                    </TableCell>
                    <TableCell>{returnEarnPointType(data.earnPointType)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <CustomPagination
          activePage={page}
          perPage={20}
          totalItemsCount={data?.totalElements}
          handlePageChange={value => setPage(value)}
        />
      </Card>
    </>
  );
}
