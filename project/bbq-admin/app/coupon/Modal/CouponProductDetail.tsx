import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Divider, Flex, Grid, Text, TextInput } from '@tremor/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import axios from 'axios';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import Loading from '@/app/loading';
import { MenuDetailResponse } from '@/pages/api/menu/detail/[...id]';
import { MenuListResponse } from '@/pages/api/menu/list';
import { MenuSuboptionResponse } from '@/pages/api/menu/sub-option/[...id]';

interface CouponProductSelectCondition {
  page: number;
  searchName: string;
  type: string;
  checkList: string;
}

export default function CouponProductDetail({ id }: { id: string }) {
  const [selectedRequiredOption, setSelectedRequiredOption] = useState<
    {
      optionId: string;
      selectedOptionId: string;
    }[]
  >();
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [menuData, setMenuData] = useState<MenuDetailResponse>();
  const [optionData, setOptionData] = useState<MenuSuboptionResponse[]>();
  const { openModal, closeModal } = useModalContext();

  const getMenuData = async () => {
    const result = await getAxios().get<MenuDetailResponse>(`/api/menu/detail/${id}`);
    setMenuData(result.data);
  };

  const getOptionData = async () => {
    const result = await getAxios().get<MenuSuboptionResponse[]>(`/api/menu/sub-option/${id}`);
    setSelectedRequiredOption(
      result.data
        .filter(data => data.maxSelectCount == 1)
        .map(data => ({
          optionId: data.id.toString(),
          selectedOptionId:
            data.requiredSelectCount == 0
              ? ''
              : data.subOptionItemDetailResponseList[0].id.toString(),
        })),
    );
    setOptionData(result.data);
  };

  const submitMenu = () => {
    closeModal(
      [selectedRequiredOption?.map(data => data.selectedOptionId), selectedOption.map(data => data)]
        .flat()
        .filter(data => data != '' && data != undefined)
        .map(data => data && parseInt(data)),
    );
  };

  useEffect(() => {
    getMenuData();
    getOptionData();
  }, []);
  return (
    <div>
      <Flex className="gap-5">
        <Flex flexDirection="col" alignItems="start" className="self-start">
          {menuData?.menuImageUrl && (
            <Image
              className="rounded-md"
              alt="menu image"
              src={menuData?.menuImageUrl}
              width={300}
              height={100}
            />
          )}
          <Text className="!text-xl font-bold mt-3">{menuData?.menuName}</Text>
          <Text className="!text-lg text-emerald-500">
            {menuData?.menuPrice.toLocaleString()}원
          </Text>
        </Flex>
        {optionData && optionData.length > 0 && (
          <Flex
            flexDirection="col"
            justifyContent="start"
            alignItems="start"
            className="max-h-[80vh] overflow-scroll"
          >
            {optionData.map(data => (
              <>
                <Flex flexDirection="col">
                  <Flex>
                    <Text className="!text-lg">{data.subOptionTitle}</Text>
                    {data.requiredSelectCount > 0 && (
                      <Text className="px-2 py-1 bg-blue-950 text-white rounded-full">필수</Text>
                    )}
                    {data.requiredSelectCount == 0 && (
                      <Text className="px-2 py-1 bg-gray-500 text-white rounded-full">선택</Text>
                    )}
                  </Flex>
                  {data.maxSelectCount > 1 && (
                    <>
                      <Text className="text-left self-start mb-3">
                        최대 {data.maxSelectCount}개 선택
                      </Text>
                      <Flex flexDirection="col" justifyContent="start" alignItems="start">
                        <CheckboxGroup
                          value={selectedOption}
                          onChange={value => setSelectedOption(value)}
                          className="flex flex-col justify-start align-start gap-3 w-[300px]"
                        >
                          {data.subOptionItemDetailResponseList.map(item => (
                            <Checkbox
                              key={item.id}
                              value={item.id.toString()}
                              label={
                                <Flex>
                                  <Text className="mr-auto ml-2">{item.itemTitle}</Text>
                                  <Text>+{item.addPrice.toLocaleString()}원</Text>
                                </Flex>
                              }
                            />
                          ))}
                        </CheckboxGroup>
                      </Flex>
                    </>
                  )}
                  {data.maxSelectCount == 1 && (
                    <>
                      <Flex
                        flexDirection="col"
                        justifyContent="start"
                        alignItems="start"
                        className="mt-3"
                      >
                        <RadioboxGroup
                          value={
                            selectedRequiredOption?.find(
                              item => item.optionId == data.id.toString(),
                            )?.selectedOptionId || ''
                          }
                          onChange={value => {
                            setSelectedRequiredOption(
                              selectedRequiredOption?.map(item => {
                                if (item.optionId == data.id.toString()) {
                                  return {
                                    ...item,
                                    selectedOptionId: value,
                                  };
                                } else {
                                  return item;
                                }
                              }),
                            );
                          }}
                        >
                          {data.subOptionItemDetailResponseList.map(item => (
                            <Radiobox
                              key={item.id}
                              className="flex flex-row justify-start align-start w-[300px] mb-2"
                              value={item.id.toString()}
                              label={
                                <Flex>
                                  <Text className="mr-auto ml-2">{item.itemTitle}</Text>
                                  <Text>+{item.addPrice.toLocaleString()}원</Text>
                                </Flex>
                              }
                            />
                          ))}
                        </RadioboxGroup>
                      </Flex>
                    </>
                  )}
                </Flex>
                <Divider className="m-0 !bg-[#dcdde2] h-[1px] my-3" />
              </>
            ))}
          </Flex>
        )}
      </Flex>
      <Divider className="m-0 !bg-[#000000] h-[1px] my-3" />
      <Flex justifyContent="end" className="gap-3">
        {/* <CustomButton type='tertiary' onClick={openModal()}>이전</CustomButton> */}
        <CustomButton type="secondary" onClick={submitMenu}>
          메뉴 적용
        </CustomButton>
      </Flex>
    </div>
  );
}
