'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  Flex,
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

import { useRouter, useSearchParams } from 'next/navigation';

import axios, { isAxiosError } from 'axios';
import 'rc-slider/assets/index.css';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import Loading from '@/app/loading';
import { changeCityNameToKorean, returnAuthorities } from '@/app/utils/changeValueType';
import { ADDRESS } from '@/constants/ADDRESS';
import { AdminListResponse } from '@/pages/api/admin';
import { AdminResponse } from '@/pages/api/admin/[...id]';
import { AllAllowIpResponse } from '@/pages/api/admin/all-allow-ip';
import { FamilyListResponse } from '@/pages/api/family/list';

export default function AdminDetailPage() {
  const router = useRouter();

  const [data, setData] = useState<AdminResponse>();
  const searchParams = useSearchParams();

  const getData = async () => {
    try {
      if (!searchParams || !searchParams.get('id') == null) {
        alert('잘못된 접근입니다.');
        router.back();
      }
      const id = searchParams && searchParams.get('id');
      const res = await getAxios().get(`/api/admin/${id}`);
      setData(res.data);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    return (
      <>
        <Card className="p-0 my-5">
          <Flex justifyContent="between" className="p-5 border-b">
            <Title className="">관리자 기본 정보</Title>
            <CustomButton
              type="secondary"
              className="w-[100px]"
              onClick={() => {
                router.push(`/admin/register?id=${data.id}`);
              }}
            >
              수정
            </CustomButton>
          </Flex>
          <div className="p-5">
            <Flex flexDirection="col">
              <Flex justifyContent="start" className="border-b pb-5">
                <Text className="w-32">관리자</Text>
                <Text className="font-bold">{data.name}</Text>
              </Flex>
              <Flex justifyContent="start" className="border-b py-5">
                <Text className="w-32">사번</Text>
                <Text className="font-bold">{data.empId}</Text>
              </Flex>
              <Flex justifyContent="start" className="border-b py-5">
                <Text className="w-32">아이디</Text>
                <Text className="font-bold">{data.userId}</Text>
              </Flex>
              <Flex justifyContent="start" className="border-b py-5">
                <Text className="w-32">사용여부</Text>
                <Text className="font-bold">
                  {data.isDeleted ? (
                    <Text className="text-red-500">삭제</Text>
                  ) : data.isUsed ? (
                    '사용'
                  ) : (
                    '미사용'
                  )}
                </Text>
              </Flex>
              <Flex justifyContent="start" className="border-b py-5">
                <Text className="w-32">관리자 기능</Text>
                <Text className="font-bold">
                  <Flex className="gap-5">
                    {data.authorities.map(data => {
                      return (
                        <Text className="border-r pr-5" key={data.authority}>
                          {returnAuthorities(data.authority)}
                        </Text>
                      );
                    })}
                  </Flex>
                </Text>
              </Flex>
            </Flex>
          </div>
        </Card>

        <Card className="p-0">
          <Title className="p-5 border-b">허용 IP 주소</Title>
          <div className="p-5">
            <Table className="border-b">
              <TableHead className="bg-gray-100 border">
                <TableRow className="border">
                  <TableHeaderCell>IP 주소</TableHeaderCell>
                  <TableHeaderCell>IP 주소 설명</TableHeaderCell>
                  <TableHeaderCell>사용 여부</TableHeaderCell>
                  <TableHeaderCell>사용 가능 시작</TableHeaderCell>
                  <TableHeaderCell>사용 가능 종료</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.allowIps.map((item, index) => {
                  return (
                    <TableRow
                      className="border hover:bg-gray-100 cursor-pointer"
                      onClick={() => {}}
                      key={index}
                    >
                      <TableCell>{item.allowIp}</TableCell>
                      <TableCell>{item.allowIpDesc}</TableCell>
                      <TableCell>{item.isUsed ? '사용' : '미사용'}</TableCell>
                      <TableCell>{item.startDate}</TableCell>
                      <TableCell>{item.endDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </>
    );
  }
}
