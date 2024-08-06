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
} from '@tremor/react';
import { useEffect, useState } from 'react';

import 'rc-slider/assets/index.css';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { changeCityNameToKorean } from '@/app/utils/changeValueType';
import { createExcelDownloadUrl } from '@/app/utils/createExcelDownloadUrl';
import { ADDRESS } from '@/constants/ADDRESS';
import { FamilyListResponse } from '@/pages/api/family/list';

import FamilyDetail from '../Modal/FamilyDetail';

export interface MallListPageCondition {
  search?: string;
  openCondition: string;
  openConditionDate: string;
  openConditionSort: string;
  location: string[];
}

export default function MallListPage() {
  const { openModal } = useModalContext();

  const [data, setData] = useState<FamilyListResponse>();
  const [page, setPage] = useState(1);

  const [selectedValue, setSelectedValue] = useState<MallListPageCondition>({
    search: '',
    openCondition: 'all',
    openConditionDate: 'm_1',
    openConditionSort: 'open_desc',
    location: ['all'],
  });

  const initSelectedParams = (selectedValue: MallListPageCondition) => {
    const baseParams = {
      params: {
        searchName: selectedValue.search,
        isAvailable:
          selectedValue.openCondition === 'all'
            ? undefined
            : selectedValue.openCondition === 'open'
              ? true
              : false,
        addressState:
          selectedValue.location[0] === 'all' ? undefined : selectedValue.location.join(','),
      },
    };

    return baseParams;
  };

  const handleValueChange = (key: keyof MallListPageCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const getData = async () => {
    const res = await getAxios().get('/api/family/list', {
      params: {
        page: page,
        size: 20,
        searchName: selectedValue.search,
        isAvailable:
          selectedValue.openCondition == 'all'
            ? undefined
            : selectedValue.openCondition == 'open'
              ? true
              : false,
        addressState:
          selectedValue.location[0] == 'all' ? undefined : selectedValue.location.join(','),
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const handleSearch = async () => {
    await getData();
    setPage(1);
  };

  if (data) {
    return (
      <>
        <Card>
          <Flex flexDirection="col">
            <Flex>
              <TextInput
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                value={selectedValue.search}
                onChange={e => handleValueChange('search', e.target.value)}
                className="w-[900px] self-start"
                icon={MagnifyingGlassIcon}
                placeholder="번호, 패밀리점명, 점주명, 점주 연락처, 매장 주소, 매장 유선번호(02-xxx-xxxx), 패밀리점 사업자 등록번호"
              />
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
              <Text className="min-w-[100px]">영업 여부</Text>
              <RadioboxGroup
                value={selectedValue.openCondition}
                onChange={value => handleValueChange('openCondition', value)}
              >
                <Radiobox value="all" label="전체" />
                <Radiobox value="open" label="오픈" />
                <Radiobox value="close" label="미오픈" />
              </RadioboxGroup>
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-3 pb-3">
              <Text className="min-w-[100px]">지역</Text>
              <Flex flexDirection="col" justifyContent="start" alignItems="start" className="gap-5">
                <CheckboxGroup
                  value={selectedValue.location}
                  onChange={value => {
                    handleValueChange('location', value);
                  }}
                  className="flex-wrap gap-2"
                >
                  <Checkbox className="flex-[1_1_100%]" value="all" label="전체" />
                  {ADDRESS.map(data => {
                    return (
                      <Checkbox
                        key={data.value}
                        className={'w-[calc(100%/10)]'}
                        value={data.value}
                        label={data.label}
                      />
                    );
                  })}
                </CheckboxGroup>
              </Flex>
            </Flex>
          </Flex>
          <CustomButton type="secondary" className="mt-5 self-start" onClick={handleSearch}>
            위 조건으로 검색
          </CustomButton>
        </Card>
        <div className="flex justify-between items-center">
          <Text className="mt-10 mb-5">Total {data.totalElements.toLocaleString()}</Text>
          <CustomButton
            className="w-[138px] h-[40px] !bg-[#46477A] !text-[#fff]"
            onClick={() => {
              window.open(
                `/api/family/excel?${createExcelDownloadUrl(selectedValue, initSelectedParams)}`,
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
              <TableHeaderCell>지역</TableHeaderCell>
              <TableHeaderCell>매장코드</TableHeaderCell>
              <TableHeaderCell>패밀리점명</TableHeaderCell>
              <TableHeaderCell>점주명</TableHeaderCell>
              <TableHeaderCell>매장 유선번호</TableHeaderCell>
              <TableHeaderCell>매장 주소</TableHeaderCell>
              <TableHeaderCell>상태</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.content.map((item, index) => {
              return (
                <TableRow
                  className="border hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    openModal('', '', <FamilyDetail getData={getData} data={item} />, () =>
                      getData(),
                    )
                  }
                  key={index}
                >
                  <TableCell>{item.branchId}</TableCell>
                  <TableCell>{changeCityNameToKorean(item.addressState)}</TableCell>
                  <TableCell>{item.brandCode}</TableCell>
                  <TableCell>{item.familyName}</TableCell>
                  <TableCell>{item.ownerName}</TableCell>
                  <TableCell>{item.tel}</TableCell>
                  <TableCell className="!text-left">{item.address}</TableCell>
                  <TableCell>
                    {item.isNowActive == true ? (
                      <Text className="text-emerald-500">오픈</Text>
                    ) : (
                      <Text className="text-red-500">미오픈</Text>
                    )}
                  </TableCell>
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
      </>
    );
  }
}
