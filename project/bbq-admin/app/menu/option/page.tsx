'use client';

import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Card, Divider, Flex, Text, TextInput, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import axios from 'axios';

import CustomButton from '@/app/components/CustomButton';
import Loading from '@/app/components/Loading';
import { useModalContext } from '@/app/components/Modal';
import { getAxios } from '@/app/lib/Axios';
import { OptionResponse } from '@/pages/api/menu/option';

import RegisterOption from '../Modal/RegisterOption';

const Editor = dynamic(() => import('../../components/Editor'), { ssr: false });

export default function MenuOptionPage() {
  const { openModal } = useModalContext();
  const [searchName, setSearchName] = useState<string>('');
  const [data, setData] = useState<OptionResponse[]>();

  const getData = async () => {
    const result = await getAxios().get('/api/menu/option', {
      params: {
        searchName: searchName,
      },
    });
    setData(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    return (
      <>
        <Card className="p-5">
          <TextInput
            icon={MagnifyingGlassIcon}
            placeholder="옵션 명, 하위 옵션명"
            value={searchName}
            onValueChange={value => setSearchName(value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                getData();
              }
            }}
          />
          <CustomButton type="secondary" className="mt-5 self-start" onClick={() => getData()}>
            위 조건으로 검색
          </CustomButton>
        </Card>
        <div className="text-right">
          <CustomButton
            className="mt-5 text-right"
            type="secondary"
            onClick={() =>
              openModal('옵션 등록', '', <RegisterOption type="register" />, () => getData())
            }
          >
            옵션 등록
          </CustomButton>
        </div>
        <Card className="p-5 mt-5">
          <Title className="mb-5">Total {data.length}</Title>
          {data.map(item => {
            return (
              <>
                <Flex>
                  <Flex flexDirection="col" className="w-[70px] self-start">
                    <Text className="!text-4xl">{item.id}</Text>
                    <Text
                      className={`!text-xs p-1 rounded-lg text-white ${
                        parseInt(item.requiredSelectCount) > 0 ? 'bg-red-600' : 'bg-blue-950'
                      }`}
                    >
                      {parseInt(item.requiredSelectCount) > 0 ? '필수' : '선택'}
                    </Text>
                  </Flex>
                  <Flex justifyContent="start" flexDirection="col" alignItems="start">
                    <TextInput
                      className="w-[300px] mb-3"
                      disabled={true}
                      value={item.subOptionTitle}
                    />
                    <Flex flexDirection="col" justifyContent="start">
                      {item.subOptionItems &&
                        item.subOptionItems.map(subOption => {
                          return (
                            <Flex justifyContent="start" className="gap-3" key={subOption.id}>
                              <ArrowRightIcon className="w-5 h-5 mr-3 my-5 ml-3" />
                              <TextInput
                                className="w-[300px]"
                                disabled={true}
                                value={subOption.itemTitle}
                              />
                              <TextInput
                                className="w-[150px]"
                                disabled={true}
                                placeholder="푸드테크POS 메뉴코드"
                                value={subOption.posCodeFoodTech}
                              />
                              <TextInput
                                className="w-[150px]"
                                disabled={true}
                                placeholder="솔비POS 메뉴코드"
                                value={subOption.posCodeSolbi}
                              />
                              <Text className="ml-3">
                                {subOption.addPrice.toLocaleString()}원 추가
                              </Text>
                            </Flex>
                          );
                        })}
                    </Flex>
                  </Flex>
                </Flex>
                <CustomButton
                  className="ml-[60px] w-[100px]"
                  type="secondary"
                  onClick={() =>
                    openModal('옵션 수정', '', <RegisterOption data={item} type="modify" />, () =>
                      getData(),
                    )
                  }
                >
                  수정
                </CustomButton>
                <Divider />
              </>
            );
          })}
        </Card>
      </>
    );
  }
}
