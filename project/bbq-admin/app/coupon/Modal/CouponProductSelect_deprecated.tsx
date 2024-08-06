import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Flex, Grid, Text, TextInput } from '@tremor/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import axios from 'axios';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { useModalContext } from '@/app/components/Modal';
import { getAxios } from '@/app/lib/Axios';
import { MenuListResponse } from '@/pages/api/menu/list';

interface CouponProductSelectCondition {
  page: number;
  searchName: string;
  type: string;
  checkList: string[];
  checkListItem:
    | {
        id: string;
        menuName: string;
      }[]
    | [];
}

export default function CouponProductSelectDeprecated() {
  const { closeModal } = useModalContext();
  const [dataStore, setDataStore] = useState<MenuListResponse>();
  const [data, setData] = useState<MenuListResponse>();
  const [selectedValue, setSelectedValue] = useState<CouponProductSelectCondition>({
    page: 1,
    searchName: '',
    type: '',
    checkList: [],
    checkListItem: [],
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

  useEffect(() => {
    if (data && data.content && data.content.length > 0) {
      let tempSelectedData = [
        ...selectedValue.checkListItem,
        ...data.content
          .filter(item => selectedValue.checkList.includes(item.id.toString()))
          .map(item => {
            return {
              id: item.id.toString(),
              menuName: item.menuName,
            };
          }),
      ];
      tempSelectedData = tempSelectedData.filter(
        (item, index) => tempSelectedData.findIndex(item2 => item.id === item2.id) === index,
      );

      setSelectedValue(prevSelectedValue => {
        return {
          ...prevSelectedValue,
          checkListItem: tempSelectedData,
        };
      });
    }
  }, [selectedValue.checkList]);

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
            onChange={e => handleValueChange('searchName', e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                getData();
              }
            }}
          />
        </Flex>
      </Flex>
      <Grid numItemsSm={4} numItemsMd={4} numItemsLg={4}>
        {data &&
          data.content &&
          data.content.map(item => {
            return (
              <Flex className="py-5 px-3 border" key={item.id}>
                <CheckboxGroup
                  table={true}
                  value={selectedValue.checkList}
                  onChange={value => handleValueChange('checkList', value)}
                >
                  <Checkbox value={item.id.toString()} />
                </CheckboxGroup>
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
        <Text>총 {selectedValue.checkList.length}개 상품이 담겼습니다.</Text>
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
          <CustomButton type={'secondary'} onClick={() => closeModal(selectedValue.checkListItem)}>
            담은 상품 적용
          </CustomButton>
        </div>
      </Flex>
    </div>
  );
}
