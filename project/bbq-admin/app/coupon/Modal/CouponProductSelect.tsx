import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Flex, Grid, Text, TextInput } from '@tremor/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import axios from 'axios';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { MenuListResponse } from '@/pages/api/menu/list';

import CouponProductDetail from './CouponProductDetail';

interface CouponProductSelectCondition {
  page: number;
  searchName: string;
  type: string;
  selectedItem: string;
}

export default function CouponProductSelect() {
  const { openModal, closeModal } = useModalContext();
  const [data, setData] = useState<MenuListResponse>();
  const [selectedValue, setSelectedValue] = useState<CouponProductSelectCondition>({
    page: 1,
    searchName: '',
    type: '',
    selectedItem: '',
  });
  const handleValueChange = (
    key: keyof CouponProductSelectCondition,
    value: string | object | number[] | number,
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const getData = async () => {
    const result = await getAxios().get<MenuListResponse>('/api/menu/list', {
      params: {
        searchName: selectedValue.searchName,
        page: selectedValue.page,
        size: 20,
        isDisplay: true,
        isActive: true,
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

  if (!data) return <></>;

  return (
    <div>
      <Flex className="border-b-2 border-black pb-3">
        <Flex justifyContent="end" className="gap-3">
          <TextInput
            className="w-[300px] self-start"
            icon={MagnifyingGlassIcon}
            placeholder="제품명"
            value={selectedValue.searchName}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                getData();
                handleValueChange('page', 1);
              }
            }}
            onValueChange={value => handleValueChange('searchName', value)}
          />
        </Flex>
      </Flex>
      <Grid numItemsSm={2} numItemsMd={2} numItemsLg={2}>
        {data &&
          data.content &&
          data.content.map(item => {
            return (
              <Flex className="py-5 px-3 border" key={item.id}>
                <RadioboxGroup
                  value={selectedValue.selectedItem}
                  onChange={value => handleValueChange('selectedItem', value)}
                >
                  <Radiobox value={`${item.id.toString()}|${item.menuName}`} />
                </RadioboxGroup>
                <Image
                  alt="menu image"
                  src={item.menuImageUrl}
                  width={50}
                  height={50}
                  className="mx-3"
                />
                <Flex flexDirection="col" alignItems="start">
                  <Text className="font-bold">{item.menuName}</Text>
                  <Text className="text-emerald-500">{item.menuPrice.toLocaleString()}원</Text>
                </Flex>
              </Flex>
            );
          })}
      </Grid>
      <CustomPagination
        activePage={selectedValue.page}
        perPage={20}
        totalItemsCount={data.totalElements}
        handlePageChange={value => handleValueChange('page', value)}
      />
      <Flex justifyContent="end" className="border-t-2 border-black gap-3 pt-3 mt-5">
        {/* <CheckboxGroup
          table={true}
          value={selectedValue.checkList}
          onChange={(value) => handleValueChange('checkList', value)}
        >
          <Checkbox value={'all'} label={'전체 선택'} />
        </CheckboxGroup> */}
        <div className="ml-5">
          {/* <CustomButton className="mr-2" type={'tertiary'}>
            담기
          </CustomButton> */}
          <CustomButton
            disable={selectedValue.selectedItem === ''}
            type={'secondary'}
            onClick={async () =>
              openModal(
                '증정 메뉴 선택',
                '',
                <CouponProductDetail id={selectedValue.selectedItem.split('|')[0]} />,
                value =>
                  closeModal({
                    menuName: selectedValue.selectedItem.split('|')[1],
                    menuId: selectedValue.selectedItem.split('|')[0],
                    subOptionItemIdSet: value,
                  }),
              )
            }
          >
            다음
          </CustomButton>
        </div>
      </Flex>
    </div>
  );
}
