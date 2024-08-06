'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { ApiResponse } from '@/pages/api/content/popup';
import PopupTableRollCell from '@/app/components/PopupTableRollCell';

export interface OrderListCondition {
  page: number;
  size: number;
  isActive: string;
  dateRange: DateRangePickerValue;
}

const initialHeaderCells = [
  { label: '번호' },
  { label: '메인배너 이미지' },
  { label: '활성 상태' },
  { label: '시작일시' },
  { label: '종료일시' },
  { label: '작성일자' },
  { label: '관리' },
];

export default function PopupPage() {
  const router = useRouter();
  const [data, setData] = useState<ApiResponse>();

  const [page, setPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState<OrderListCondition>({
    page: page,
    size: 10,
    isActive: '',
    dateRange: {
      from: new Date(dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD')),
      to: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
    },
  });

  const getData = async () => {
    const result = await getAxios().get('/api/content/popup', {
      params: {
        page: selectedValue.page,
        size: selectedValue.size,
        isActive: selectedValue.isActive,
        startDate: dayjs(selectedValue.dateRange.from).format('YYYY-MM-DD'),
        endDate: dayjs(selectedValue.dateRange.to).format('YYYY-MM-DD'),
      },
    });
    setData(result.data);
  };

  const handleSearch = async () => {
    await getData();
    setPage(1);
  };

  const handleValueChange = (
    key: keyof OrderListCondition,
    value: string | object | number[] | number,
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    getData();
  }, [selectedValue.page]);

  return (
    <>
      <Card>
        <Flex flexDirection="col">
          <Flex justifyContent="start" className="gap-10 border-b pb-3">
            <Text className="w-[80px]">기간 조회</Text>
            <DateRangePicker
              placeholder="기간 설정"
              className="w-[260px]"
              value={{
                from: selectedValue.dateRange.from,
                to: selectedValue.dateRange.to,
              }}
              onValueChange={value => {
                handleValueChange('dateRange', value);
              }}
              enableSelect={false}
              locale={ko}
            />
          </Flex>

          <Flex justifyContent="start" className="gap-10 border-b mt-5 pb-3">
            <Text className="w-[80px]">활성 상태</Text>
            <RadioboxGroup
              value={selectedValue.isActive}
              onChange={value => handleValueChange('isActive', value)}
            >
              <Radiobox value={''} label="전체" />
              <Radiobox value={'true'} label="활성화" />
              <Radiobox value={'false'} label="비활성화" />
            </RadioboxGroup>
          </Flex>

          <CustomButton type="secondary" className="mt-5 self-start" onClick={handleSearch}>
            위 조건으로 검색
          </CustomButton>
        </Flex>
      </Card>

      <Flex className="h-[100px]" alignItems="center">
        <Text className="!text-[18px] !text-[#46477A]">
          Total
          <span className="!text-[20px] !text-[#46477A] ml-2">
            {data?.totalElements.toLocaleString()}
          </span>
        </Text>
        <button
          className="w-[200px] h-[48px] text-[#fff] bg-[#00C9B5]"
          onClick={() => router.push('/content/popup/register')}
        >
          + 팝업 등록
        </button>
      </Flex>

      <Table className="border-b">
        <TableHead className="bg-gray-100 border">
          <TableRow className="border">
            {initialHeaderCells.map(({ label }) => (
              <TableHeaderCell
                key={label}
              >
                {label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.content &&
            data?.content.map(item => {
              return <PopupTableRollCell key={item.id} {...item} />;
            })}
        </TableBody>
      </Table>

      <CustomPagination
        activePage={selectedValue.page}
        perPage={10}
        totalItemsCount={data?.totalElements}
        handlePageChange={value => handleValueChange('page', value)}
      />
    </>
  );
}
