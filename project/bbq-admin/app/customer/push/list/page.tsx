'use client';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
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
import { useState } from 'react';

import Link from 'next/link';

import { ko } from 'date-fns/locale';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import VerticalDivider from '@/app/components/VerticalDivider';

interface CustomerPushListCondition {
  dateRange: DateRangePickerValue;
  orderCount: string;
  orderPrice: string;
  locationSi: string;
  locationDong: string;
  gender: string;
  sendTarget: string;
  sendTargetCheck: string[];
  sendTargetCount: number | number[];
  totalCost: number | number[];
  tableCheckAll: string[];
  tableCheck: string[];
  tableFilter: string;
  tablePerPage: string;
}

export default function CustomorPushList() {
  const [selectedValue, setSelectedValue] = useState<CustomerPushListCondition>({
    dateRange: {},
    orderCount: '',
    orderPrice: '',
    locationSi: '',
    locationDong: '',
    gender: '',
    sendTarget: '',
    sendTargetCheck: [],
    sendTargetCount: [600, 545860],
    totalCost: [36900, 157900],
    tableCheckAll: [],
    tableCheck: [],
    tableFilter: '',
    tablePerPage: '',
  });
  const handleValueChange = (key: keyof CustomerPushListCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  return (
    <main className="mb-10">
      <Card className="p-0">
        <Flex justifyContent="start" className="border-b p-5">
          <Link href="/customer/push">
            <Title>푸시 등록</Title>
          </Link>
          <VerticalDivider height={20} className="mx-3" />
          <Link href="/customer/push/list">
            <Title className="font-bold">푸시 리스트</Title>
          </Link>
        </Flex>
        <Flex className="p-5 px-8 border-b" flexDirection="col">
          <Flex className="mb-3 border-b pb-3" justifyContent="start">
            <Text className="w-[150px]">기간설정</Text>
            <DateRangePicker
              className="w-[300px]"
              value={selectedValue.dateRange}
              onValueChange={value => handleValueChange('dateRange', value)}
              enableSelect={false}
              locale={ko}
              placeholder="기간 선택"
            />
          </Flex>
          <Flex className="mb-3 border-b pb-3" justifyContent="start">
            <Text className="w-[150px]">주문건</Text>
            <TextInput
              placeholder="건수"
              className="w-[150px] mr-3"
              value={selectedValue.orderCount}
              onChange={e => handleValueChange('orderCount', e.target.value)}
            />
            <Text>건 이상 주문자</Text>
          </Flex>
          <Flex className="mb-3 border-b pb-3" justifyContent="start">
            <Text className="w-[150px]">주문금액</Text>
            <TextInput
              placeholder="주문금액"
              className="w-[150px] mr-3"
              value={selectedValue.orderPrice}
              onChange={e => handleValueChange('orderPrice', e.target.value)}
            />
            <Text>건 이상 주문자</Text>
          </Flex>
          <Flex className="mb-3 border-b pb-3" justifyContent="start">
            <Text className="w-[150px]">지역</Text>
            <Select
              className="w-[150px]"
              placeholder="시/도"
              value={selectedValue.locationSi}
              onChange={value => handleValueChange('locationSi', value)}
            >
              <SelectItem value="1">전체</SelectItem>
              <SelectItem value="2">서울</SelectItem>
            </Select>
            <ChevronRightIcon width={10} className="mx-3" />
            <Select
              className="w-[150px]"
              placeholder="동"
              value={selectedValue.locationDong}
              onChange={value => handleValueChange('locationDong', value)}
            >
              <SelectItem value="1">논현동</SelectItem>
              <SelectItem value="2">논현동</SelectItem>
            </Select>
          </Flex>
          <Flex className="mb-3 border-b pb-3" justifyContent="start">
            <Text className="w-[150px]">성별</Text>
            <Flex justifyContent="start" className="gap-10 ml-5">
              <RadioboxGroup
                value={selectedValue.gender}
                onChange={value => handleValueChange('gender', value)}
              >
                <Radiobox value={'all'} label="전체" />
                <Radiobox value={'m'} label="남성" />
                <Radiobox value={'f'} label="여성" />
              </RadioboxGroup>
            </Flex>
          </Flex>
          <Flex className="mb-3 border-b pb-3" justifyContent="start">
            <Text className="w-[150px]">발송 대상자 수</Text>
            <Flex flexDirection="col" alignItems="start">
              <Slider
                min={1000}
                max={100000}
                onAfterChange={value => handleValueChange('sendTargetCount', value)}
                defaultValue={selectedValue.sendTargetCount}
                style={{
                  width: 500,
                }}
                trackStyle={{
                  backgroundColor: '#fe4a51',
                }}
                handleStyle={{
                  backgroundColor: '#46477a',
                  borderColor: '#46477a',
                  opacity: 1,
                }}
                range
              />
              <Flex className="w-[500px]">
                {' '}
                <Text>
                  {Array.isArray(selectedValue.sendTargetCount)
                    ? selectedValue.sendTargetCount[0].toLocaleString()
                    : selectedValue.sendTargetCount.toLocaleString()}{' '}
                  원 부터
                </Text>
                <Text>
                  {Array.isArray(selectedValue.sendTargetCount)
                    ? selectedValue.sendTargetCount[1].toLocaleString()
                    : selectedValue.sendTargetCount.toLocaleString()}{' '}
                  원 까지
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex className="mb-3 border-b pb-3" justifyContent="start">
            <Text className="w-[150px]">총 발송비용</Text>
            <Flex flexDirection="col" alignItems="start">
              <Slider
                min={1000}
                max={100000}
                onAfterChange={value => handleValueChange('totalCost', value)}
                defaultValue={selectedValue.totalCost}
                style={{
                  width: 500,
                }}
                trackStyle={{
                  backgroundColor: '#fe4a51',
                }}
                handleStyle={{
                  backgroundColor: '#46477a',
                  borderColor: '#46477a',
                  opacity: 1,
                }}
                range
              />
              <Flex className="w-[500px]">
                {' '}
                <Text>
                  {Array.isArray(selectedValue.totalCost)
                    ? selectedValue.totalCost[0].toLocaleString()
                    : selectedValue.totalCost.toLocaleString()}{' '}
                  원 부터
                </Text>
                <Text>
                  {Array.isArray(selectedValue.totalCost)
                    ? selectedValue.totalCost[1].toLocaleString()
                    : selectedValue.totalCost.toLocaleString()}{' '}
                  원 까지
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <CustomButton type="secondary" className="w-[200px] self-start">
            위 조건으로 검색
          </CustomButton>
        </Flex>
        <div className="px-10">
          <Flex justifyContent="between" className="mb-3 mt-10">
            <Flex justifyContent="start">
              <Text>검색조건: </Text>
              <Text className="px-3 border-r border-emerald-500 ">남자</Text>
              <Text className="px-3 border-r border-emerald-500 ">마케팅 수신 미동의</Text>
            </Flex>
            <Flex justifyContent="end" className="gap-2">
              <CheckboxGroup
                value={selectedValue.tableCheckAll}
                onChange={value => {
                  handleValueChange('tableCheckAll', value);
                  handleValueChange('tableCheck', value);
                }}
              >
                <Checkbox value={'all'} label="검색 결과 전체 선택" />
              </CheckboxGroup>
              <Select className="w-[300px]" placeholder="선택 푸쉬 일시정지">
                <SelectItem value="1">선택 푸쉬 일시정지</SelectItem>
              </Select>
              <CustomButton type="tertiary">확인</CustomButton>
              <Text className="w-[100px] ml-3">Total 56,842</Text>
              <Select className="w-[80px]" placeholder="보기">
                <SelectItem value={'20'}>20개씩 보기</SelectItem>
                <SelectItem value={'40'}>20개씩 보기</SelectItem>
              </Select>
            </Flex>
          </Flex>
          <Table className="border-b">
            <TableHead className="bg-gray-100 border">
              <TableRow className="border">
                <TableHeaderCell>
                  <CheckboxGroup
                    table={true}
                    value={selectedValue.tableCheck}
                    onChange={value => handleValueChange('tableCheck', value)}
                  >
                    <Checkbox value={'all'} />
                  </CheckboxGroup>
                </TableHeaderCell>
                <TableHeaderCell>번호</TableHeaderCell>
                <TableHeaderCell>푸시발행자</TableHeaderCell>
                <TableHeaderCell>발송등록일자</TableHeaderCell>
                <TableHeaderCell>기간</TableHeaderCell>
                <TableHeaderCell>주문건</TableHeaderCell>
                <TableHeaderCell>주문금액</TableHeaderCell>
                <TableHeaderCell>성별</TableHeaderCell>
                <TableHeaderCell>발송 대상자 수</TableHeaderCell>
                <TableHeaderCell>총 발송비용</TableHeaderCell>
                <TableHeaderCell>발송형태</TableHeaderCell>
                <TableHeaderCell>진행여부</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array(10)
                .fill(0)
                .map((data, i) => {
                  return (
                    <TableRow className="border hover:bg-gray-100" key={i}>
                      <TableCell>
                        <CheckboxGroup
                          table={true}
                          value={selectedValue.tableCheck}
                          onChange={value => handleValueChange('tableCheck', value)}
                        >
                          <Checkbox value={data.toString()} />
                        </CheckboxGroup>
                      </TableCell>
                      <TableCell>4567</TableCell>
                      <TableCell>김대리</TableCell>
                      <TableCell>2023.09.01</TableCell>
                      <TableCell>2023.09.01~2023.09.30</TableCell>
                      <TableCell>전체</TableCell>
                      <TableCell>100,000원 이상</TableCell>
                      <TableCell>남자</TableCell>
                      <TableCell>15,685명</TableCell>
                      <TableCell>5,684,523원</TableCell>
                      <TableCell>예약</TableCell>
                      <TableCell>
                        <Text className="text-red-500">진행중</Text>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {/* <Pagination /> */}
        </div>
      </Card>
    </main>
  );
}
