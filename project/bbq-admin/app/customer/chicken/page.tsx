'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
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
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'rc-slider/assets/index.css';

import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import VerticalDivider from '@/app/components/VerticalDivider';
import { getAxios } from '@/app/lib/Axios';
import Loading from '@/app/loading';
import { CustomerChickenListResponse } from '@/pages/api/customer/chicken/list';
import { CustomerListResponse } from '@/pages/api/customer/list';

interface CustomerChickenListCondition {
  page: number;
  date: DateRangePickerValue;
  searchName: string;
}

export default function CustomerChickenListPage() {
  const router = useRouter();
  const [data, setData] = useState<CustomerChickenListResponse>();
  const [selectedValue, setSelectedValue] = useState<CustomerChickenListCondition>({
    page: 1,
    date: {
      from: new Date(dayjs('2023-09-01').toDate()),
      to: new Date(),
    },
    searchName: '',
  });
  const handleValueChange = (
    key: keyof CustomerChickenListCondition,
    value: string | object | number[] | number | DateRangePickerValue,
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const getData = async () => {
    const result = await getAxios().get('/api/customer/chicken/list', {
      params: {
        page: selectedValue.page,
        searchName: selectedValue.searchName,
        size: 20,
        startDate: dayjs(selectedValue.date.from).format('YYYY-MM-DD'),
        endDate: dayjs(selectedValue.date.to).format('YYYY-MM-DD'),
      },
    });
    setData(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [selectedValue.page]);

  const handleSearch = async () => {
    await getData();
    handleValueChange('page', 1);
  };

  if (data) {
    return (
      <>
        <Card>
          <Flex flexDirection="col">
            <Flex>
              <TextInput
                onValueChange={value => handleValueChange('searchName', value)}
                className="w-[900px] self-start"
                icon={MagnifyingGlassIcon}
                placeholder="제목, 내용, 고객명, 고객 전화번호"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-3 border-b pb-3">
              <Text className="min-w-[50px]">기간설정</Text>
              <DateRangePicker
                className="w-[300px]"
                value={selectedValue.date}
                onValueChange={value => handleValueChange('date', value)}
                enableSelect={false}
                locale={ko}
                placeholder="기간 설정"
              />
            </Flex>
            <CustomButton type="secondary" className="mt-5 self-start" onClick={handleSearch}>
              위 조건으로 검색
            </CustomButton>
          </Flex>
        </Card>
        <div className="mt-10 pb-3">
          <Title>Total {data.totalElements.toLocaleString()}</Title>
          <Table className="border-b mt-5">
            <TableHead className="bg-gray-100 border">
              <TableRow className="border">
                <TableHeaderCell className="px-10">번호</TableHeaderCell>
                <TableHeaderCell className="w-full">제목</TableHeaderCell>
                <TableHeaderCell className="px-10">고객명</TableHeaderCell>
                <TableHeaderCell>휴대폰 번호</TableHeaderCell>
                <TableHeaderCell>이메일</TableHeaderCell>
                <TableHeaderCell>작성일자</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.content.map(item => (
                <TableRow
                  key={item.id}
                  className="border hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push(`/customer/chicken/detail?id=${item.id}`)}
                >
                  <TableCell className="px-10">{item.id}</TableCell>
                  <TableCell className="!text-left">
                    <Flex justifyContent="start" className="gap-2">
                      <Text>{item.title}</Text>
                      {item.contentFileUrl1 && (
                        <Image src={'/images/attach.png'} alt="attach" width={15} height={15} />
                      )}
                    </Flex>
                  </TableCell>
                  <TableCell className="px-10">{item.name}</TableCell>
                  <TableCell>
                    {item.phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <CustomPagination
            activePage={selectedValue.page}
            perPage={20}
            totalItemsCount={data.totalElements}
            handlePageChange={value => handleValueChange('page', value)}
          />
        </div>
      </>
    );
  }
}
