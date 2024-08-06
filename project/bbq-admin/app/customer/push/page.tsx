'use client';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import CustomPagination from '@/app/components/CustomPagination';
import TableRollPush from '@/app/components/TableRollPush';
import { getAxios } from '@/app/lib/Axios';
import { CustomerResponse } from '@/pages/api/customer/push';

interface PushDispatch {
  page: number;
  size: number;
}

export default function PushPage() {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<PushDispatch>({
    page: 1,
    size: 20,
  });
  const [data, setData] = useState<CustomerResponse>({
    content: [
      {
        batchType: '',
        afterDays: 0,
        appPushTitle: '',
        appPushBody: '',
        appPushDynamicUrl: '',
        isActive: 'true',
      },
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      offset: 0,
      unpaged: false,
      paged: true,
    },
    last: true,
    totalElements: 0,
    totalPages: 0,
    first: true,
    number: 0,
    size: 0,
    numberOfElements: 0,
    empty: false,
  });

  const getData = async () => {
    const result = await getAxios().get('/api/customer/push', {
      params: {
        page: selectedValue.page,
        size: selectedValue.size,
      },
    });
    setData(result.data);
  };

  const handleValueChange = (key: keyof PushDispatch, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="text-right">
        <button
          className="inline-block w-[180px] h-[48px] leading-[48px] bg-[#46477A] text-[#fff] text-center cursor-pointer"
          onClick={() => router.push(`/customer/push/manual`)}
        >
          수동 푸시 발송
        </button>
      </div>
      <Table className="border-b mt-5">
        <TableHead className="bg-gray-100 border">
          <TableRow className="border">
            <TableHeaderCell>푸시 타입</TableHeaderCell>
            <TableHeaderCell>기준 일자</TableHeaderCell>
            <TableHeaderCell>푸시 제목</TableHeaderCell>
            <TableHeaderCell>푸시 내용</TableHeaderCell>
            <TableHeaderCell>활성 상태</TableHeaderCell>
            <TableHeaderCell>관리</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.content.map(item => {
            return <TableRollPush key={item.appPushTitle} {...item} />;
          })}
        </TableBody>
      </Table>

      <CustomPagination
        activePage={selectedValue.page}
        perPage={20}
        totalItemsCount={data.totalElements}
        handlePageChange={value => handleValueChange('page', value)}
      />
    </>
  );
}
