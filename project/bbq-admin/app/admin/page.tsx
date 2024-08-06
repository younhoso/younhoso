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

import { useRouter } from 'next/navigation';

import { isAxiosError } from 'axios';
import 'rc-slider/assets/index.css';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { AdminListResponse, Content } from '@/pages/api/admin';
import { AllAllowIpResponse } from '@/pages/api/admin/all-allow-ip';

import VerticalDivider from '../components/VerticalDivider';
import { createExcelDownloadUrl } from '../utils/createExcelDownloadUrl';

export interface AdminListCondition {
  searchName: string;
  isUsed: string;
  isDeleted: string;
  allowIps: string;
  authorities: string[];
}

export default function AdminListPage() {
  const router = useRouter();
  const { openModal } = useModalContext();

  const [data, setData] = useState<AdminListResponse>();
  const [allAllowIp, setAllAllowIp] = useState<AllAllowIpResponse[]>();
  const [page, setPage] = useState(1);

  const [selectedValue, setSelectedValue] = useState<AdminListCondition>({
    searchName: '',
    isUsed: 'all',
    isDeleted: '',
    allowIps: '',
    authorities: ['all'],
  });

  const initSelectedParams = (selectedValue: AdminListCondition) => {
    return {
      params: {
        searchName: selectedValue.searchName,
        isUsed:
          selectedValue.isUsed === 'all'
            ? undefined
            : ['NOT_USED', 'DELETED'].includes(selectedValue.isUsed)
            ? false
            : true,
        isDeleted:
          selectedValue.isUsed === 'all'
            ? undefined
            : ['USED', 'NOT_USED'].includes(selectedValue.isUsed)
            ? false
            : true,
        allowIps: selectedValue.allowIps,
        authorities:
          selectedValue.authorities && selectedValue.authorities[0] === 'all'
            ? ''
            : selectedValue.authorities.join(','),
      },
    };
  };

  const handleValueChange = (key: keyof AdminListCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const getData = async () => {
    try {
      const res = await getAxios().get('/api/admin', {
        ...initSelectedParams(selectedValue),
      });

      setData(res.data);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  const getAllAllowIpData = async () => {
    try {
      const res = await getAxios().get('/api/admin/all-allow-ip');
      setAllAllowIp(res.data);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  const deleteAdmin = async (item: Content) => {
    try {
      if (confirm('정말 삭제하시겠습니까?') == false) return;
      const res = await getAxios().patch(`/api/admin/${item.id}`, {
        ...item,
        isDeleted: true,
      });
      alert('삭제되었습니다.');
      await getData();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  const deleteAllAllowIp = async (item: Content) => {
    try {
      if (confirm('정말 삭제하시겠습니까?') == false) return;
      const res = await getAxios().delete(`/api/admin/${item.id}`);
      if (res.status === 204) {
        alert('삭제되었습니다.');
        setAllAllowIp(prev => prev?.filter(v => v.id !== item.id));
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    getAllAllowIpData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const handleSearch = async () => {
    await getData();
    setPage(1);
  };

  if (data && allAllowIp) {
    return (
      <>
        <Card>
          <Flex flexDirection="col">
            <Flex>
              <TextInput
                value={selectedValue.searchName}
                onChange={e => handleValueChange('searchName', e.target.value)}
                className="w-full self-start"
                icon={MagnifyingGlassIcon}
                placeholder="아이디, 관리자, 사번 검색"
                onKeyDown={e => {
                  if (e.key == 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </Flex>
            <Flex>
              <TextInput
                value={selectedValue.allowIps}
                onChange={e => handleValueChange('allowIps', e.target.value)}
                className="w-full mt-5 self-start"
                icon={MagnifyingGlassIcon}
                placeholder="IP 주소 검색"
                onKeyDown={e => {
                  if (e.key == 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-5 border-b pb-3">
              <Text className="min-w-[100px]">사용 여부</Text>
              <RadioboxGroup
                value={selectedValue.isUsed}
                onChange={value => handleValueChange('isUsed', value)}
              >
                <Radiobox value="all" label="전체" />
                <Radiobox value="USED" label="사용" />
                <Radiobox value="NOT_USED" label="미사용" />
                <Radiobox value="DELETED" label="삭제" />
              </RadioboxGroup>
            </Flex>
            <Flex justifyContent="start" className="gap-10 mt-3 pb-3">
              <Text className="min-w-[100px]">관리자 기능</Text>
              <Flex flexDirection="col" justifyContent="start" alignItems="start" className="gap-5">
                <CheckboxGroup
                  value={selectedValue.authorities}
                  onChange={value => {
                    handleValueChange('authorities', value);
                  }}
                  className="gap-5"
                >
                  <Checkbox value="all" label="전체" />
                  <Checkbox value="SYSTEM" label="시스템 관리" />
                  <Checkbox value="CONTENT" label="콘텐츠 관리" />
                  <Checkbox value="ORDER" label="주문 관리" />
                  <Checkbox value="FAMILY" label="매장 관리" />
                  <Checkbox value="MENU" label="메뉴 관리" />
                  <Checkbox value="COUPON" label="쿠폰 관리" />
                  <Checkbox value="CUSTOMER" label="고객 관리" />
                </CheckboxGroup>
              </Flex>
            </Flex>
          </Flex>
          <CustomButton type="secondary" className="mt-5 self-start" onClick={handleSearch}>
            위 조건으로 검색
          </CustomButton>
        </Card>

        <Card className="p-0 my-5">
          <Title className="p-5 border-b">관리자 리스트</Title>
          <div className="p-5">
            <Flex alignItems="center" className="mb-5">
              Total {data.totalElements.toLocaleString()}
              <div>
                <CustomButton
                  className="mr-[10px] h-[40px]"
                  type={'secondary'}
                  onClick={() => router.push('/admin/register')}
                >
                  관리자 등록
                </CustomButton>
                <CustomButton
                  className="w-[138px] h-[40px] !bg-[#46477A] !text-[#fff]"
                  onClick={() => {
                    window.open(
                      `/api/admin/excel?${createExcelDownloadUrl(
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
            </Flex>
            <Table className="border-b">
              <TableHead className="bg-gray-100 border">
                <TableRow className="border">
                  <TableHeaderCell>번호</TableHeaderCell>
                  <TableHeaderCell>관리자</TableHeaderCell>
                  <TableHeaderCell>사번</TableHeaderCell>
                  <TableHeaderCell>아이디</TableHeaderCell>
                  <TableHeaderCell>사용 여부</TableHeaderCell>
                  <TableHeaderCell>시스템 관리</TableHeaderCell>
                  <TableHeaderCell>콘텐츠 관리</TableHeaderCell>
                  <TableHeaderCell>주문 관리</TableHeaderCell>
                  <TableHeaderCell>매장 관리</TableHeaderCell>
                  <TableHeaderCell>메뉴 관리</TableHeaderCell>
                  <TableHeaderCell>쿠폰 관리</TableHeaderCell>
                  <TableHeaderCell>고객 관리</TableHeaderCell>
                  <TableHeaderCell>관리</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.content.map((item, index) => {
                  return (
                    <TableRow
                      className="border hover:bg-gray-100 cursor-pointer"
                      onClick={() => router.push(`/admin/detail?id=${item.id}`)}
                      key={index}
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.empId}</TableCell>
                      <TableCell>{item.userId}</TableCell>
                      <TableCell>
                        {item.isDeleted ? (
                          <Text className="text-red-500">삭제</Text>
                        ) : item.isUsed ? (
                          '사용'
                        ) : (
                          '미사용'
                        )}
                      </TableCell>
                      <TableCell>
                        {item.authorities.some(x => x.authority == 'SYSTEM') ? '○' : '-'}
                      </TableCell>
                      <TableCell>
                        {item.authorities.some(x => x.authority == 'CONTENT') ? '○' : '-'}
                      </TableCell>
                      <TableCell>
                        {item.authorities.some(x => x.authority == 'ORDER') ? '○' : '-'}
                      </TableCell>
                      <TableCell>
                        {item.authorities.some(x => x.authority == 'FAMILY') ? '○' : '-'}
                      </TableCell>
                      <TableCell>
                        {item.authorities.some(x => x.authority == 'MENU') ? '○' : '-'}
                      </TableCell>
                      <TableCell>
                        {item.authorities.some(x => x.authority == 'COUPON') ? '○' : '-'}
                      </TableCell>
                      <TableCell>
                        {item.authorities.some(x => x.authority == 'CUSTOMER') ? '○' : '-'}
                      </TableCell>
                      <TableCell>
                        <Flex>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              router.push(`/admin/register?id=${item.id}`);
                            }}
                          >
                            <Text>수정</Text>
                          </button>
                          <VerticalDivider height={20} />
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              deleteAdmin(item);
                            }}
                          >
                            <Text>삭제</Text>
                          </button>
                        </Flex>
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
          </div>
        </Card>

        <Card className="p-0">
          <Title className="p-5 border-b">
            <p>공용 IP 주소</p>
          </Title>
          <Flex className="px-5 py-3">
            Total
            <CustomButton
              className="mr-[10px] h-[40px]"
              type={'secondary'}
              onClick={() => router.push('/admin/publicIpAdd')}
            >
              공용 IP 등록
            </CustomButton>
          </Flex>
          <div className="p-5">
            <Table className="border-b">
              <TableHead className="bg-gray-100 border">
                <TableRow className="border">
                  <TableHeaderCell>IP 주소</TableHeaderCell>
                  <TableHeaderCell>IP 주소 설명</TableHeaderCell>
                  <TableHeaderCell>사용 여부</TableHeaderCell>
                  <TableHeaderCell>사용 가능 시작</TableHeaderCell>
                  <TableHeaderCell>사용 가능 종료</TableHeaderCell>
                  <TableHeaderCell>관리</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAllowIp.map((item, index) => {
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
                      <TableCell>
                        <Flex className="justify-evenly">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              router.push(`/admin/publicIpAdd/edit?editId=${item.id}`);
                            }}
                          >
                            <Text>수정</Text>
                          </button>
                          <VerticalDivider height={20} />
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              deleteAllAllowIp(item as unknown as Content);
                            }}
                          >
                            <Text>삭제</Text>
                          </button>
                        </Flex>
                      </TableCell>
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
