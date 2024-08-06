'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  DateRangePickerValue,
  Flex,
  ProgressBar,
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

import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import 'rc-slider/assets/index.css';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import VerticalDivider from '@/app/components/VerticalDivider';
import { getAxios } from '@/app/lib/Axios';
import { returnCouponCategory, returnCouponStatus } from '@/app/utils/changeValueType';
import { createExcelDownloadUrl } from '@/app/utils/createExcelDownloadUrl';
import { CouponDashboardResponse } from '@/pages/api/coupon/dashboard';
import { CouponMembershipResponse } from '@/pages/api/coupon/membership';

import CouponDetail from '../Modal/CouponDetail';

export interface CouponListCondition {
  searchName: string;
  status: string[];
  couponCategory: string[];
  isActive: string;
  extinctionImminent: string[];
  publishDateRange: DateRangePickerValue;
  expireDateRange: DateRangePickerValue;
}

export default function CouponListPage() {
  const router = useRouter();
  const { openModal } = useModalContext();

  const [dashboardData, setDashboardData] = useState<CouponDashboardResponse>();
  const [data, setData] = useState<CouponMembershipResponse>();
  const [page, setPage] = useState(1);

  const [selectedValue, setSelectedValue] = useState<CouponListCondition>({
    searchName: '',
    status: ['DOING'],
    couponCategory: ['all'],
    isActive: 'all',
    extinctionImminent: [],
    publishDateRange: {
      from: new Date(+0),
      to: new Date(),
    },
    expireDateRange: {
      from: new Date(+0),
      to: new Date(),
    },
  });

  const initSelectedParams = (selectedValue: CouponListCondition) => {
    const baseParams = {
      params: {
        searchName: selectedValue.searchName,
        status: selectedValue.status[0] === 'all' ? '' : selectedValue.status.join(','),
        couponCategory:
          selectedValue.couponCategory[0] === 'all' ? '' : selectedValue.couponCategory.join(','),
        isActive:
          selectedValue.isActive === 'all' ? '' : selectedValue.isActive == 'true' ? true : false,
      },
    };

    return baseParams;
  };

  const handleValueChange = (
    key: keyof CouponListCondition,
    value: string | object | number[] | number,
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const getDashboardData = async () => {
    const result = await getAxios().get('/api/coupon/dashboard', {
      params: {
        startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      },
    });
    setDashboardData(result.data);
  };

  const getData = async () => {
    const result = await getAxios().get('/api/coupon/membership', {
      params: {
        page: page,
        searchName: selectedValue.searchName,
        status: selectedValue.status[0] === 'all' ? '' : selectedValue.status.join(','),
        couponCategory:
          selectedValue.couponCategory[0] === 'all' ? '' : selectedValue.couponCategory.join(','),
        isActive:
          selectedValue.isActive === 'all' ? '' : selectedValue.isActive == 'true' ? true : false,
      },
    });
    setData(result.data);
  };

  useEffect(() => {
    getDashboardData();
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const handleSearch = async () => {
    await getData();
    setPage(1);
  };

  if (dashboardData && data) {
    return (
      <>
        <Card className="p-0 mb-10">
          <Flex alignItems="stretch" className="gap-5">
            <Flex className="border-r gap-3 p-0 w-[50%]" justifyContent="center">
              <Text className="!text-2xl">오늘 발급된 쿠폰</Text>
              <VerticalDivider height={30} />
              <Text className="!text-2xl font-bold">
                {dashboardData?.totalCouponCount.toLocaleString()}건
              </Text>
            </Flex>
            <Flex className="p-3">
              <Flex flexDirection="col" alignItems="start" className="gap-1">
                <Text>쿠폰 사용 비율</Text>
                <ProgressBar
                  value={(dashboardData?.usedCouponCount / dashboardData?.totalCouponCount) * 100}
                />
                <Flex justifyContent={'between'}>
                  <Flex justifyContent="start" className="gap-1">
                    <Text>오늘 사용 쿠폰</Text>
                    <Text className="!text-lg">
                      {dashboardData?.usedCouponCount}건 (
                      {(
                        (dashboardData?.usedCouponCount / dashboardData?.totalCouponCount) *
                        100
                      ).toFixed(1)}
                      %)
                    </Text>
                  </Flex>

                  <Flex justifyContent="end" className="gap-1">
                    <Text>오늘 미사용 쿠폰</Text>
                    <Text className="!text-lg">
                      {dashboardData?.notUsedCouponCount}건 (
                      {(
                        (dashboardData?.notUsedCouponCount / dashboardData?.totalCouponCount) *
                        100
                      ).toFixed(1)}
                      %)
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <CustomButton
                type="tertiary"
                className="ml-10"
                onClick={() => router.push('/coupon/register')}
              >
                + 주문앱 쿠폰 등록
              </CustomButton>
            </Flex>
          </Flex>
        </Card>
        <Card>
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
                placeholder="쿠폰명, 쿠폰설명, 발급자"
              />
            </Flex>
            <Flex justifyContent="start" className="border-b gap-10 mt-5 pb-5">
              <Text className="w-[80px]">쿠폰 종류</Text>
              <CheckboxGroup
                value={selectedValue.couponCategory}
                onChange={value => handleValueChange('couponCategory', value)}
                className="gap-5"
              >
                <Checkbox value={'all'} label="전체" />
                <Checkbox value={'MEMBERSHIP_GRADE'} label="멤버십등급" />
                <Checkbox value={'NEW_MEMBER_JOINED'} label="신규가입" />
                <Checkbox value={'BIRTH'} label="생일축하" />
                <Checkbox value={'MARKETING_AGREEMENT'} label="마케팅 동의" />
                <Checkbox value={'DEFAULT'} label="일반" />
              </CheckboxGroup>
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-5">
              <Text className="w-[80px]">쿠폰 상태</Text>
              <CheckboxGroup
                value={selectedValue.status}
                onChange={value => handleValueChange('status', value)}
                className="gap-5"
              >
                <Checkbox value={'all'} label="전체" />
                <Checkbox value={'WAITING'} label="대기중" />
                <Checkbox value={'DOING'} label="발행중" />
                <Checkbox value={'DONE'} label="발행종료" />
              </CheckboxGroup>
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5">
              <Text className="w-[80px]">활성 상태</Text>
              <RadioboxGroup
                value={selectedValue.isActive}
                onChange={value => handleValueChange('isActive', value)}
              >
                <Radiobox value={'all'} label="전체" />
                <Radiobox value={'true'} label="활성화" />
                <Radiobox value={'false'} label="비활성화" />
              </RadioboxGroup>
            </Flex>

            <CustomButton type="secondary" className="mt-5 self-start" onClick={handleSearch}>
              위 조건으로 검색
            </CustomButton>
          </Flex>
        </Card>
        <div>
          <div className="flex justify-between items-center mt-[30px] mb-[20px]">
            <Title className="w-full">Total {data?.totalElements}</Title>
            <CustomButton
              className="w-[138px] h-[40px] !bg-[#46477A] !text-[#fff]"
              onClick={() => {
                window.open(
                  `/api/coupon/excel?${createExcelDownloadUrl(selectedValue, initSelectedParams)}`,
                  '_blank',
                );
              }}
              type="secondary"
            >
              엑셀 다운로드
            </CustomButton>
          </div>
          <Table className="border-b">
            <TableHead className="bg-gray-100 border">
              <TableRow className="border">
                <TableHeaderCell>번호</TableHeaderCell>
                <TableHeaderCell>쿠폰종류</TableHeaderCell>
                <TableHeaderCell>쿠폰명</TableHeaderCell>
                <TableHeaderCell>쿠폰상태</TableHeaderCell>
                <TableHeaderCell>활성상태</TableHeaderCell>
                <TableHeaderCell>발행시작</TableHeaderCell>
                <TableHeaderCell>발행종료</TableHeaderCell>
                <TableHeaderCell>발행수량</TableHeaderCell>
                <TableHeaderCell>사용건수</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.content.map(item => {
                return (
                  <TableRow
                    key={item.id}
                    className="border hover:bg-gray-100 cursor-pointer"
                    onClick={() => openModal('', '', <CouponDetail id={item.id} />)}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{returnCouponCategory(item.couponCategory)}</TableCell>
                    <TableCell>{item.couponName}</TableCell>
                    <TableCell>{returnCouponStatus(item.status)}</TableCell>
                    <TableCell>
                      {item.isActive == true ? (
                        <Text className="text-emerald-500">활성화</Text>
                      ) : (
                        <Text className="text-red-500">비활성화</Text>
                      )}
                    </TableCell>
                    <TableCell>{item.offerStartsAt}</TableCell>
                    <TableCell>{item.offerEndsAt}</TableCell>
                    <TableCell>{item.offerCount.toLocaleString()}</TableCell>
                    <TableCell>{item.usedCount.toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <CustomPagination
            activePage={page}
            perPage={20}
            totalItemsCount={data.totalElements}
            handlePageChange={value => setPage(value)}
          />
        </div>
      </>
    );
  }
}
