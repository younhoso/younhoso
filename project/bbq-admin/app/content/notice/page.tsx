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

import { useRouter } from 'next/navigation';

import { isAxiosError } from 'axios';
import 'rc-slider/assets/index.css';

import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import VerticalDivider from '@/app/components/VerticalDivider';
import { getAxios } from '@/app/lib/Axios';
import { createExcelDownloadUrl } from '@/app/utils/createExcelDownloadUrl';
import { ContentNoticeListResponse } from '@/pages/api/content/notice';

export interface ContentNoticeListCondition {
  searchName: string;
  isActive: string;
}

export default function ContentNoticeList() {
  const { openModal } = useModalContext();

  const [data, setData] = useState<ContentNoticeListResponse>();
  const [page, setPage] = useState(1);
  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState<ContentNoticeListCondition>({
    searchName: '',
    isActive: 'all',
  });

  const initSelectedParams = (selectedValue: ContentNoticeListCondition) => {
    return {
      params: {
        page: page,
        size: 20,
        searchName: selectedValue.searchName,
        isActive:
          selectedValue.isActive === 'all' ? '' : selectedValue.isActive === 'Y' ? true : false,
      },
    };
  };

  const handleValueChange = (key: keyof ContentNoticeListCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const deleteNotice = async (id: number) => {
    if (confirm('삭제 하시겠습니까?')) {
      try {
        await getAxios().delete(`/api/content/notice?id=${id}`);
        getData();
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };

  const getData = async () => {
    const res = await getAxios().get('/api/content/notice', {
      ...initSelectedParams(selectedValue),
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
                value={selectedValue.searchName}
                onChange={e => handleValueChange('searchName', e.target.value)}
                className="w-[900px] self-start"
                icon={MagnifyingGlassIcon}
                placeholder="제목, 내용, 작성자"
              />
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
              <Text className="min-w-[100px]">활성 상태</Text>
              <RadioboxGroup
                value={selectedValue.isActive}
                onChange={value => handleValueChange('isActive', value)}
              >
                <Radiobox value="all" label="전체" />
                <Radiobox value="Y" label="활성화" />
                <Radiobox value="N" label="비활성화" />
              </RadioboxGroup>
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
                `/api/content/notice/excel?${createExcelDownloadUrl(
                  selectedValue,
                  initSelectedParams,
                )}`,
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
              <TableHeaderCell>제목</TableHeaderCell>
              <TableHeaderCell>상단 고정</TableHeaderCell>
              <TableHeaderCell>활성 상태</TableHeaderCell>
              <TableHeaderCell>작성자</TableHeaderCell>
              <TableHeaderCell>작성일자</TableHeaderCell>
              <TableHeaderCell>관리</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.content.map((item, index) => {
              return (
                <TableRow
                  className="border hover:bg-gray-100 cursor-pointer"
                  key={index}
                  onClick={() => router.push(`/content/notice/detail?id=${item.id}`)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    {item.isTopFixed ? <Text className="text-emerald-500">설정</Text> : '해제'}
                  </TableCell>
                  <TableCell>
                    {item.isActive ? '활성화' : <Text className="text-red-500">비활성화</Text>}
                  </TableCell>
                  <TableCell>{item.createdAdminName}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>
                    <Flex>
                      <button
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = `/content/notice/write?id=${item.id}`;
                        }}
                      >
                        <Text>수정</Text>
                      </button>
                      <VerticalDivider height={20} />
                      <button
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteNotice(item.id);
                        }}
                      >
                        {' '}
                        <Text>삭제</Text>
                      </button>
                    </Flex>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Flex>
          <div></div>
          <CustomPagination
            activePage={page}
            perPage={20}
            totalItemsCount={data.totalElements}
            handlePageChange={value => setPage(value)}
          />
          <CustomButton onClick={() => router.push('/content/notice/write')} type="secondary">
            글쓰기
          </CustomButton>
        </Flex>
      </>
    );
  }
}
