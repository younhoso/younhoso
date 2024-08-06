import { Flex, Text, TextInput } from '@tremor/react';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import axios, { isAxiosError } from 'axios';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import FileInput, { IFileTypes } from '@/app/components/FileInput';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { MenuCategoryResponse } from '@/pages/api/menu/category';

interface MenuCategoryCondition {
  id: number;
  categoryName: string;
  categoryImage?: IFileTypes[];
  categoryImageUrl: string;
  priority: number;
  isActive: boolean;
}

export default function ModifyCategory({ data }: { data: MenuCategoryCondition }) {
  const { closeModal } = useModalContext();
  const [selectedValue, setSelectedValue] = useState<MenuCategoryCondition>({
    id: data.id,
    categoryName: data.categoryName,
    categoryImageUrl: data.categoryImageUrl,
    priority: data.priority,
    isActive: data.isActive,
  });
  let fileInputRef = useRef<HTMLInputElement>(null);

  const updateCategory = async () => {
    if (!selectedValue.categoryName) {
      alert('카테고리명을 입력해 주세요.');
      return;
    }
    if (!selectedValue.priority) {
      alert('우선순위를 입력해 주세요.');
      return;
    }
    if (isNaN(selectedValue.priority)) {
      alert('숫자만 입력 가능합니다.');
      return;
    }
    // if (!selectedValue.categoryImage) {
    //     alert('아이콘을 등록해 주세요.');
    //     return;
    // }

    const formData = new FormData();
    if (selectedValue.categoryImage) {
      formData.append('imageFile', selectedValue.categoryImage[0].object);
    }
    formData.append(
      'categoryInfo',
      JSON.stringify({
        id: selectedValue.id,
        categoryName: selectedValue.categoryName,
        priority: selectedValue.priority,
        isActive: selectedValue.isActive,
      }),
    );

    try {
      await getAxios().patch<MenuCategoryResponse[]>('/api/menu/category', formData);

      alert('카테고리 수정이 완료되었습니다.');
      closeModal();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  return (
    <Flex flexDirection="col" justifyContent="start" alignItems="start">
      <TextInput
        value={selectedValue.categoryName}
        onChange={e => {
          setSelectedValue(prevSelectedValue => {
            return {
              ...prevSelectedValue,
              categoryName: e.target.value,
            };
          });
        }}
      />
      <FileInput
        className={`${selectedValue.categoryImage ? 'visible' : 'invisible'}`}
        fileInputRef={fileInputRef}
        type={'image'}
        multiple={false}
        value={selectedValue.categoryImage}
        onChange={e => {
          setSelectedValue(prevSelectedValue => {
            return {
              ...prevSelectedValue,
              categoryImage: e,
            };
          });
        }}
      />
      <Flex flexDirection="col" justifyContent="center">
        <Image
          alt="category image"
          className={`border bg-white mt-5 cursor-pointer ${selectedValue.categoryImage ? 'invisible' : 'visible'}`}
          onClick={() => fileInputRef.current?.click()}
          src={data.categoryImageUrl}
          width={200}
          height={500}
        />

        <div className="my-5">
          <Text className="text-emerald-500">
            권장 사이즈 : 500x500픽셀 (1:1비율)
            <br />
            배경이 투명한 png 형식의 이미지를 등록해주세요.
          </Text>
        </div>
      </Flex>

      <Flex className="border-t border-b py-3 mb-3" alignItems="start">
        <div>
          <Text>우선순위 값을 설정해 주세요.</Text>
          <Text>(작을수록 위레 노출됩니다.)[N]</Text>
        </div>
        <Flex justifyContent="start" className="w-auto">
          <TextInput
            className="min-w-[50px] w-[50px] !rounded-r-none !border-r-0"
            value={selectedValue.priority.toString()}
            onChange={e => {
              setSelectedValue(prevSelectedValue => {
                if (e.target.value === '')
                  return {
                    ...prevSelectedValue,
                    priority: 0,
                  };
                if (isNaN(parseInt(e.target.value))) {
                  return prevSelectedValue;
                }
                return {
                  ...prevSelectedValue,
                  priority: parseInt(e.target.value),
                };
              });
            }}
          />
          <Text className="rounded-l-none rounded-r border p-2 px-3">번째로 이동</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="start" alignItems="start">
        <Text className="w-[150px]">활성화</Text>
        <Flex flexDirection="col" justifyContent="start" alignItems="start">
          <RadioboxGroup
            value={selectedValue.isActive.toString()}
            onChange={value => {
              setSelectedValue(prevSelectedValue => {
                return {
                  ...prevSelectedValue,
                  isActive: value === 'true' ? true : false,
                };
              });
            }}
          >
            <Radiobox value={'true'} label={'활성화'} />
            <Radiobox value={'false'} label={'비활성화'} />
          </RadioboxGroup>
          <Text>다른 카테고리에도 노출 되는 제품은 정상 표시 됩니다.</Text>
        </Flex>
      </Flex>
      <CustomButton onClick={updateCategory} type="secondary" className="w-full mt-5">
        수정 완료
      </CustomButton>
    </Flex>
  );
}
