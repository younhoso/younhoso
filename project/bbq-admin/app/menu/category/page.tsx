'use client';

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

import dynamic from 'next/dynamic';
import Image from 'next/image';

import axios, { isAxiosError } from 'axios';

import CustomButton from '@/app/components/CustomButton';
import FileInput, { IFileTypes } from '@/app/components/FileInput';
import Loading from '@/app/components/Loading';
import { useModalContext } from '@/app/components/Modal';
import { getAxios } from '@/app/lib/Axios';
import { MenuCategoryResponse } from '@/pages/api/menu/category';

import ModifyCategory from '../Modal/ModifyCategory';

const Editor = dynamic(() => import('../../components/Editor'), { ssr: false });

interface MenuCategoryCondition {
  categoryName: string;
  categoryImageUrl: IFileTypes[];
  priority: string;
  isActive: boolean;
}

export default function MenuCategoryPage() {
  const { openModal } = useModalContext();
  const [data, setData] = useState<MenuCategoryResponse[]>([]);
  const initalSelectedValue = {
    categoryName: '',
    categoryImageUrl: [],
    priority: '1',
    isActive: true,
  };
  const [selectedValue, setSelectedValue] = useState<MenuCategoryCondition>(initalSelectedValue);

  const handleValueChange = (key: keyof MenuCategoryCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const getCategory = async () => {
    const result = await getAxios().get<MenuCategoryResponse[]>('/api/menu/category');
    setData(result.data);
  };

  const updatePriority = async (item: MenuCategoryResponse) => {
    const formData = new FormData();
    formData.append(
      'categoryInfo',
      JSON.stringify({
        id: item.id,
        categoryName: item.categoryName,
        priority: item.priority,
        isActive: item.isActive,
      }),
    );

    try {
      await getAxios().patch<MenuCategoryResponse[]>('/api/menu/category', formData);
      alert('카테고리 우선순위 수정이 완료되었습니다.');
      getCategory();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  const registerCategory = async () => {
    if (selectedValue.categoryName.length === 0) {
      alert('카테고리 명을 입력해 주세요.');
      return;
    }
    if (selectedValue.priority.length === 0) {
      alert('우선순위를 입력해 주세요.');
      return;
    }

    if (isNaN(Number(selectedValue.priority))) {
      alert('숫자만 입력 가능합니다.');
      return;
    }

    if (selectedValue.categoryImageUrl.length === 0) {
      alert('아이콘을 등록해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', selectedValue.categoryImageUrl[0].object);
    formData.append(
      'categoryInfo',
      JSON.stringify({
        categoryName: selectedValue.categoryName,
        priority: parseInt(selectedValue.priority),
        isActive: selectedValue.isActive,
      }),
    );

    try {
      await getAxios().post<MenuCategoryResponse[]>('/api/menu/category', formData);

      alert('카테고리 등록이 완료되었습니다.');
      getCategory();
      setSelectedValue(initalSelectedValue);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  if (data) {
    return (
      <>
        <Card className="p-0">
          <div className="border-b p-5">
            <Title>카테고리 등록</Title>
          </div>
          <Flex className="border-b p-3" justifyContent="start">
            <Text className="w-[100px]">카테고리 명</Text>
            <TextInput
              placeholder="카테고리 명"
              className="w-[300px] mr-5"
              value={selectedValue.categoryName}
              onChange={e => handleValueChange('categoryName', e.target.value)}
            />
          </Flex>
          <Flex className="border-b p-3" justifyContent="start">
            <Text className="w-[100px]">우선순위</Text>
            <TextInput
              placeholder="우선순위"
              className="w-[100px] mr-5"
              value={selectedValue.priority}
              onChange={e => handleValueChange('priority', e.target.value)}
            />
          </Flex>
          <Flex className="border-b p-3" justifyContent="start">
            <Text className="w-[100px]">아이콘 등록</Text>
            <FileInput
              type="image"
              multiple={false}
              value={selectedValue.categoryImageUrl}
              onChange={value => handleValueChange('categoryImageUrl', value)}
            />
            <Text className="ml-5">
              권장 사이즈 : 500x500픽셀 (1:1비율)
              <br />
              배경이 투명한 png 형식의 이미지를 등록해주세요.
            </Text>
          </Flex>
          <CustomButton className="m-5" type="secondary" onClick={registerCategory}>
            카테고리 등록 완료
          </CustomButton>
        </Card>

        <Table className="border-b mt-5">
          <TableHead className="bg-gray-100 border">
            <TableRow className="border">
              <TableHeaderCell>번호</TableHeaderCell>
              <TableHeaderCell>노출순위</TableHeaderCell>
              <TableHeaderCell>카테고리명</TableHeaderCell>
              <TableHeaderCell>활성화 여부</TableHeaderCell>
              <TableHeaderCell>수정</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(item => {
                return (
                  <TableRow className="border hover:bg-gray-100" key={item.id}>
                    <TableCell>{item.id}</TableCell>

                    <TableCell>
                      <Flex justifyContent="center" className="w-auto mx-auto">
                        <TextInput
                          onValueChange={value => {
                            if (isNaN(Number(value))) {
                              alert('숫자만 입력 가능합니다.');
                              return;
                            }
                          }}
                          className="min-w-[50px] w-[50px] !rounded-r-none !border-r-0"
                          onChange={e =>
                            setData(prevData => {
                              const newData = [...prevData];
                              const index = newData.findIndex(data => data.id === item.id);
                              if (!isNaN(Number(e.target.value))) {
                                newData[index].priority = Number(e.target.value);
                              }
                              return newData;
                            })
                          }
                          value={item.priority.toString()}
                        />
                        <CustomButton
                          type={'tertiary'}
                          className="rounded-l-none rounded-r border p-2 px-3"
                          onClick={() => updatePriority(item)}
                        >
                          저장
                        </CustomButton>
                      </Flex>
                    </TableCell>
                    <TableCell>
                      <Image
                        className="inline-block mr-3"
                        alt="category image"
                        src={item.categoryImageUrl}
                        width={50}
                        height={50}
                      />
                      {item.categoryName}
                    </TableCell>

                    <TableCell>{item.isActive ? '활성화' : '비활성화'}</TableCell>
                    <TableCell>
                      <CustomButton
                        onClick={() => {
                          openModal('카테고리 수정', '', <ModifyCategory data={item} />, () =>
                            getCategory(),
                          );
                        }}
                        type="tertiary"
                      >
                        수정
                      </CustomButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </>
    );
  }
}
