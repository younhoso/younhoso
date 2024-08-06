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
import { formatPhoneNumber } from '@/app/utils/regExp';
import { CustomerListResponse } from '@/pages/api/customer/list';

interface CustomerListCondition {
  page: number;
  isActive: string;
  integratedMember: string;
  gender: string;
  smsAgreed: string;
  emailAgreed: string;
  pushAgreed: string;
  searchName: string;
}

export default function CustomerListPage() {
  const router = useRouter();
  const [data, setData] = useState<CustomerListResponse>();
  const [selectedValue, setSelectedValue] = useState<CustomerListCondition>({
    page: 1,
    isActive: 'all',
    integratedMember: 'all',
    gender: 'all',
    smsAgreed: 'all',
    emailAgreed: 'all',
    pushAgreed: 'all',
    searchName: '',
  });
  const handleValueChange = (
    key: keyof CustomerListCondition,
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
    const result = await getAxios().get('/api/customer/list', {
      params: {
        page: selectedValue.page,
        searchName: selectedValue.searchName,
        size: 20,
        isActive: selectedValue.isActive === 'all' ? null : selectedValue.isActive,
        inttegratedMember: selectedValue.integratedMember,
        gender: selectedValue.gender == 'all' ? null : selectedValue.gender,
        smsAgreed: selectedValue.smsAgreed === 'all' ? null : selectedValue.smsAgreed,
        emailAgreed: selectedValue.emailAgreed === 'all' ? null : selectedValue.emailAgreed,
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
                placeholder="아이디, 이름, 전화번호"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
              <Text className="min-w-[120px]">고객 상태</Text>
              <RadioboxGroup
                value={selectedValue.isActive}
                onChange={value => handleValueChange('isActive', value)}
              >
                <Radiobox value={'all'} label="전체" />
                <Radiobox value={'true'} label="정상" />
                <Radiobox value={'false'} label="탈퇴" />
              </RadioboxGroup>
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
              <Text className="min-w-[120px]">통합아이디 전환</Text>
              <RadioboxGroup
                value={selectedValue.integratedMember}
                onChange={value => handleValueChange('integratedMember', value)}
              >
                <Radiobox value={'all'} label="전체" />
                <Radiobox value={'true'} label="완료" />
                <Radiobox value={'false'} label="미완료" />
              </RadioboxGroup>
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
              <Text className="min-w-[120px]">성별</Text>
              <RadioboxGroup
                value={selectedValue.gender}
                onChange={value => handleValueChange('gender', value)}
              >
                <Radiobox value={'all'} label="전체" />
                <Radiobox value={'M'} label="남자" />
                <Radiobox value={'F'} label="여자" />
                <Radiobox value={'U'} label="무응답" />
              </RadioboxGroup>
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
              <Text className="min-w-[120px]">SMS 수신</Text>
              <RadioboxGroup
                value={selectedValue.smsAgreed}
                onChange={value => handleValueChange('smsAgreed', value)}
              >
                <Radiobox value="all" label="전체" />
                <Radiobox value={'Y'} label="동의" />
                <Radiobox value={'N'} label="미동의" />
              </RadioboxGroup>
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
              <Text className="min-w-[120px]">이메일 수신</Text>
              <RadioboxGroup
                value={selectedValue.emailAgreed}
                onChange={value => handleValueChange('emailAgreed', value)}
              >
                <Radiobox value="all" label="전체" />
                <Radiobox value={'Y'} label="동의" />
                <Radiobox value={'N'} label="미동의" />
              </RadioboxGroup>
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
              <Text className="min-w-[120px]">푸시알림 수신</Text>
              <RadioboxGroup
                value={selectedValue.pushAgreed}
                onChange={value => handleValueChange('pushAgreed', value)}
              >
                <Radiobox value="all" label="전체" />
                <Radiobox value={'Y'} label="동의" />
                <Radiobox value={'N'} label="미동의" />
              </RadioboxGroup>
            </Flex>
            <CustomButton type="secondary" className="mt-5 self-start" onClick={handleSearch}>
              위 조건으로 검색
            </CustomButton>
          </Flex>
        </Card>
        <div className="mt-10 pb-3">
          <Title>Total {data.totalElements.toLocaleString()}</Title>
          {/* <Flex justifyContent="between" className="mb-3 mt-10">
          <Flex justifyContent="start">
            <Text>검색조건: </Text>
            <Text className="px-3 border-r border-emerald-500 ">남자</Text>
            <Text className="px-3 border-r border-emerald-500 ">
              마케팅 수신 미동의
            </Text>
          </Flex>
          <Flex justifyContent="end" className="gap-2">
            <RadioboxGroup
              value={selectedValue.tableCheckAll}
              onChange={(value) => {
                handleValueChange('tableCheckAll', value);
                handleValueChange('tableCheck', value);
              }}
            >
              <Radiobox value={'all'} label="검색 결과 전체 선택" />
            </RadioboxGroup>
            <Select
              className="w-[300px]"
              placeholder="리스트"
              value={selectedValue.tableFilter}
              onChange={(value) => handleValueChange('tableFilter', value)}
            >
              <SelectItem value="1">1년 이상 미접속 문자 발송</SelectItem>
            </Select>
            <CustomButton type="tertiary">확인</CustomButton>
            <Text className="w-[100px] ml-3">Total 56,842</Text>
            <Select
              className="w-[120px]"
              placeholder="보기"
              value={selectedValue.tablePerPage}
              onChange={(value) => handleValueChange('tablePerPage', value)}
            >
              <SelectItem value={'20'}>20개씩 보기</SelectItem>
              <SelectItem value={'40'}>20개씩 보기</SelectItem>
            </Select>
          </Flex>
        </Flex> */}
          <Table className="border-b mt-5">
            <TableHead className="bg-gray-100 border">
              <TableRow className="border">
                {/* <TableHeaderCell>
                <RadioboxGroup
                  table={true}
                  value={selectedValue.tableCheck}
                  onChange={(value) => handleValueChange('tableCheck', value)}
                >
                  <Radiobox value={'all'} />
                </RadioboxGroup>
              </TableHeaderCell> */}
                <TableHeaderCell>번호</TableHeaderCell>
                <TableHeaderCell>고객명</TableHeaderCell>
                <TableHeaderCell>고객 상태</TableHeaderCell>
                <TableHeaderCell>아이디</TableHeaderCell>
                <TableHeaderCell>통합아이디 전환</TableHeaderCell>
                <TableHeaderCell>이메일</TableHeaderCell>
                <TableHeaderCell>성별</TableHeaderCell>
                <TableHeaderCell>SMS 수신</TableHeaderCell>
                <TableHeaderCell>이메일 수신</TableHeaderCell>
                <TableHeaderCell>푸시알림 수신</TableHeaderCell>
                <TableHeaderCell>가입일</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.content.map(item => {
                const phoneNumber = formatPhoneNumber(item.phoneNumber);
                return (
                  <TableRow
                    key={item.memberId}
                    className="border hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push(`/customer/detail?id=${item.memberId}`)}
                  >
                    <TableCell>{item.memberId}</TableCell>
                    <TableCell>
                      {item.name} ( {phoneNumber} )
                    </TableCell>
                    <TableCell>
                      {item.isActive == true ? (
                        <Text>정상</Text>
                      ) : (
                        <Text className="text-red-500">탈퇴</Text>
                      )}
                    </TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.isIntegratedMember == true ? '완료' : '미완료'}</TableCell>
                    <TableCell>{item.email ? item.email : '-'}</TableCell>
                    <TableCell>
                      {item.gender == 'M' && '남자'}
                      {item.gender == 'F' && '여자'}
                      {item.gender == 'U' && '무응답'}
                      {!item.gender && '-'}
                    </TableCell>
                    <TableCell>{item.isSmsAgreed == true ? '동의' : '미동의'}</TableCell>
                    <TableCell>{item.isEmailAgreed == true ? '동의' : '미동의'}</TableCell>
                    <TableCell>{item.isPushAgreed == true ? '동의' : '미동의'}</TableCell>
                    <TableCell>{item.joinAt}</TableCell>
                  </TableRow>
                );
              })}
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
