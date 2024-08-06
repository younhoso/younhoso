'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  Flex,
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
} from '@tremor/react';
import { useEffect, useMemo, useState } from 'react';

import { isAxiosError } from 'axios';
import 'rc-slider/assets/index.css';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import TableRollCell from '@/app/components/TableRollCell';
import { getAxios } from '@/app/lib/Axios';
import { createExcelDownloadUrl } from '@/app/utils/createExcelDownloadUrl';
import { MenuCategoryResponse } from '@/pages/api/menu/category';
import { MenuListResponse } from '@/pages/api/menu/list';

export interface MenuListCondition {
  searchName: string;
  menuType: string;
  isEcouponOnlyMenu: string;
  menuGroup: string[];
  tableSort: string;
  isActive: string;
  isDisplay: string;
}

const initSelectedParams = (selectedValue: MenuListCondition, type = '', page = 1) => {
  const menuType = selectedValue.menuType;
  const isEcouponOnlyMenu = menuType === 'E-COUPON' ? true : menuType === 'all' ? '' : false;
  const menuGroup = menuType === 'E-COUPON' ? '' : selectedValue.menuGroup.join(',');

  const getParam = (
    key: string,
    value: string,
    trueValue = true,
    falseValue = false,
    emptyValue = '',
  ) => {
    if (value === 'all') return emptyValue;
    if (key === 'isActive' || key === 'isDisplay') {
      return value === 'true' ? trueValue : falseValue;
    }
    return value;
  };

  return {
    params: {
      searchName: selectedValue.searchName,
      page: type === 'menuListGetType' ? page : type,
      size: type === 'menuListGetType' ? 10 : type,
      menuType: ['all', 'E-COUPON'].includes(menuType) ? '' : menuType,
      isActive: getParam('isActive', selectedValue.isActive),
      isDisplay: getParam('isDisplay', selectedValue.isDisplay),
      categoryIds: selectedValue.menuGroup[0] === 'all' ? [] : selectedValue.menuGroup.join(','),
      isEcouponOnlyMenu,
      menuGroup,
    },
  };
};

const optionList = {
  menuTypes: [
    { value: 'all', label: '전체' },
    { value: 'MAIN', label: '일반' },
    { value: 'SIDE', label: '사이드' },
    { value: 'ALCOHOL', label: '음료/주류' },
    { value: 'E-COUPON', label: 'E-쿠폰' },
  ],
  isActive: [
    { value: 'all', label: '전체' },
    { value: 'true', label: '활성화' },
    { value: 'false', label: '비활성화' },
  ],
  isDisplay: [
    { value: 'all', label: '전체' },
    { value: 'true', label: '활성화' },
    { value: 'false', label: '비활성화' },
  ],
  menuGroup: [],
};

const initialHeaderCells = [
  '고유 번호',
  '메뉴 형태',
  '카테고리',
  '메뉴명',
  '메뉴 가격',
  '활성 상태',
  '화면 표시 여부',
  '관리',
];

export interface priorityType {
  id: number;
  priority: number;
}

export default function MenuListPage() {
  const [showPriority, setShowPriority] = useState(false);
  const [data, setData] = useState<MenuListResponse>();
  const [page, setPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState<MenuListCondition>({
    searchName: '',
    menuType: 'all',
    isEcouponOnlyMenu: '',
    menuGroup: ['all'],
    tableSort: 'revenue_desc',
    isActive: 'all',
    isDisplay: 'all',
  });
  const [coupon, setCoupon] = useState(false);
  const [category, setCategory] = useState<MenuCategoryResponse[]>(optionList.menuGroup);

  const handleValueChange = (key: keyof MenuListCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const handleEcouponChange = (value: string) => {
    if (value === 'E-COUPON') {
      setCoupon(true);
    } else {
      setCoupon(false);
    }
  };

  const getCategory = async () => {
    const result = await getAxios().get<MenuCategoryResponse[]>('/api/menu/category');
    setCategory(result.data);
  };

  const getData = async () => {
    const result = await getAxios().get<MenuListResponse>(
      '/api/menu/list',
      initSelectedParams(selectedValue, 'menuListGetType', page),
    );

    setData(result.data);
  };

  const updatePriority = async (categoryId: number, priority: number, menuId: number) => {
    try {
      const result = await getAxios().patch('/api/menu/priority', {
        categoryId: categoryId,
        priority: priority,
        menuId: menuId,
      });
      if (result.status === 200) {
        alert('저장되었습니다.');
        getData();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const handleSearch = async () => {
    await getData();
    setPage(1);
    setShowPriority(selectedValue.menuGroup.length === 1 && selectedValue.menuGroup[0] !== 'all');
  };

  const extractKey = useMemo(() => JSON.stringify(selectedValue.menuGroup), [data]);

  if (!data || !category) {
    return null;
  }

  return (
    <>
      <Card className="border-b">
        <Flex flexDirection="col">
          <Flex>
            <TextInput
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              onChange={e => handleValueChange('searchName', e.target.value)}
              className="w-[900px] self-start !rounded-none"
              icon={MagnifyingGlassIcon}
              placeholder="고유번호, 메뉴명, 메뉴 설명, 푸드테크 POS 코드"
            />
          </Flex>
          <Flex
            justifyContent="start"
            className="gap-10 mt-5 border-b border-t pb-[24px] pt-[24px]"
          >
            <Text className="min-w-[160px] font-semibold text-center">메뉴 형태</Text>
            <RadioboxGroup
              value={selectedValue.menuType}
              onChange={value => (handleValueChange('menuType', value), handleEcouponChange(value))}
            >
              {optionList.menuTypes.map(({ value, label }) => (
                <Radiobox
                  key={label}
                  value={value}
                  label={label}
                  className="text-[14px] w-[calc(100px)] text-[#46477A]"
                />
              ))}
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent="start" className="gap-10 border-b mt-5 pb-[24px]">
            <Text className="min-w-[160px] font-semibold text-center">활성 상태</Text>
            <RadioboxGroup
              value={selectedValue.isActive}
              onChange={value => handleValueChange('isActive', value)}
            >
              {optionList.isActive.map(({ value, label }) => (
                <Radiobox
                  key={label}
                  value={value}
                  label={label}
                  className="text-[14px] w-[calc(100px)] text-[#46477A]"
                />
              ))}
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent="start" className="gap-10 border-b mt-5 pb-[24px]">
            <Text className="min-w-[160px] font-semibold text-center">화면 표시 여부</Text>
            <RadioboxGroup
              value={selectedValue.isDisplay}
              onChange={value => handleValueChange('isDisplay', value)}
            >
              {optionList.isDisplay.map(({ value, label }) => (
                <Radiobox
                  key={label}
                  value={value}
                  label={label}
                  className="text-[14px] w-[calc(100px)] text-[#46477A]"
                />
              ))}
            </RadioboxGroup>
          </Flex>
          <Flex
            justifyContent="start"
            className={`gap-10 border-b ${coupon ? 'hidden' : ''} pb-[24px] pt-[24px]`}
          >
            <Text className="min-w-[160px] font-semibold text-center">카테고리</Text>
            <Flex flexDirection="col" justifyContent="start" alignItems="start" className="gap-5">
              <CheckboxGroup
                value={selectedValue.menuGroup}
                onChange={value => {
                  setSelectedValue({
                    ...selectedValue,
                    ...{ menuGroup: value },
                  });
                }}
                className="flex-wrap gap-2"
              >
                <Checkbox
                  className="w-[calc(100%/9)] text-[14px] text-[#46477A]"
                  value="all"
                  label="전체"
                />
                {category.map(item => {
                  return (
                    <Checkbox
                      key={item.id}
                      className={'w-[calc(100%/9)] text-[14px] text-[#46477A]'}
                      value={item.id.toString()}
                      label={item.categoryName}
                    />
                  );
                })}
              </CheckboxGroup>
            </Flex>
          </Flex>
          <CustomButton
            type="secondary"
            className="w-52 h-[48px] mt-5 self-start !rounded-none !bg-[#46477A]"
            onClick={handleSearch}
          >
            위 조건으로 검색
          </CustomButton>
        </Flex>
      </Card>
      <div className="border-b border-[#CDCED2] mt-[24px] mb-[32px] "></div>
      <div className="flex justify-between items-center mb-[24px]">
        <Text className="!text-[18px] !text-[#8E93AD]">
          Total{' '}
          <span className="!text-[20px] !text-[#46477A]">
            {data.totalElements.toLocaleString()}
          </span>
        </Text>
        <CustomButton
          className="w-[160px] h-[48px] !bg-[#46477A] !text-[#fff] !rounded-none"
          onClick={() =>
            window.open(
              `/api/menu/excel?${createExcelDownloadUrl(selectedValue, initSelectedParams)}`,
              '_blank',
            )
          }
          type="secondary"
        >
          엑셀 다운로드
        </CustomButton>
      </div>
      <Table className="border-b">
        <TableHead className="bg-gray-100 border">
          <TableRow className="border">
            {(() => {
              const arr = [...initialHeaderCells];
              if (showPriority) {
                arr.splice(1, 0, '우선 순위 변경');
              }
              return arr;
            })().map((label, index, arr) => {
              return (
                <TableHeaderCell
                  key={label}
                  className={`${index !== arr.length - 1 ? 'border-r' : ''} `}
                >
                  {label}
                </TableHeaderCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.content &&
            data.content.map((item, i) => {
              return (
                <TableRollCell
                  key={`${item.id}${i}${extractKey}`}
                  {...item}
                  showPriority={showPriority}
                  updatePriority={updatePriority}
                  menuGroup={selectedValue.menuGroup}
                  thisCategory={item.categories?.find(
                    v => v.id === Number(selectedValue.menuGroup[0]),
                  )}
                />
              );
            })}
        </TableBody>
      </Table>

      <CustomPagination
        activePage={page}
        perPage={10}
        totalItemsCount={data.totalElements}
        handlePageChange={value => setPage(value)}
      />
    </>
  );
}
