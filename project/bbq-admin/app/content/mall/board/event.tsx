import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Card, Flex, Select, SelectItem, Text, TextInput, Title } from '@tremor/react';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import VerticalDivider from '@/app/components/VerticalDivider';

interface ContentMallBoardEventListCondition {
  filter: string;
  perPage: string;
  checkList: string[];
}

export default function ContentMallBoardEventList() {
  const [selectedValue, setSelectedValue] = useState<ContentMallBoardEventListCondition>({
    filter: 'all',
    perPage: '20',
    checkList: [],
  });
  const handleValueChange = (key: keyof ContentMallBoardEventListCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  return (
    <Card className="mt-5 p-0">
      <Title className="border-b p-5">주문앱 이벤트 게시판</Title>
      <Flex justifyContent="between" className="p-5 pb-0">
        <Text className="w-[100px]">Total 150</Text>
        <Flex justifyContent="end" className="gap-3">
          <Select
            className="w-[100px]"
            placeholder="보기"
            value={selectedValue.filter}
            onChange={value => handleValueChange('filter', value)}
          >
            <SelectItem value={'10'}>최근 등록순</SelectItem>
          </Select>
          <Select
            className="w-[100px]"
            placeholder="보기"
            value={selectedValue.perPage}
            onChange={value => handleValueChange('perPage', value)}
          >
            <SelectItem value={'10'}>10개씩 보기</SelectItem>
            <SelectItem value={'20'}>20개씩 보기</SelectItem>
          </Select>
        </Flex>
      </Flex>
      <div className="border-t border-b m-5">
        {Array(3)
          .fill(null)
          .map((_, index) => {
            return (
              <Flex justifyContent="start" className="my-5" key={index}>
                <CheckboxGroup
                  className="mr-3"
                  value={selectedValue.checkList}
                  onChange={value => handleValueChange('checkList', value)}
                >
                  <Checkbox value={index.toString()} />
                </CheckboxGroup>
                <Image
                  className="mr-5 border"
                  src="/images/ic_menu_dummy_chicken.png"
                  width={150}
                  height={100}
                  alt="dummy"
                />
                <Flex flexDirection="col" justifyContent="start" alignItems="start">
                  <Text>BBQ가 준비한 바삭한 선물! 따뜻한 픽업 프로모션!</Text>
                  <Text className="text-emerald-500">이벤트 기간 : 2023.09.01 ~ 2023.09.30</Text>
                  <Flex justifyContent="start" className="gap-3 mt-5">
                    <Text>
                      <Link href="/content/app/board/write">수정</Link>
                    </Text>
                    <VerticalDivider height={15} />
                    <Text>삭제</Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        {Array(2)
          .fill(null)
          .map((_, index) => {
            return (
              <Flex justifyContent="start" className="my-5" key={index}>
                <CheckboxGroup
                  className="mr-3"
                  value={selectedValue.checkList}
                  onChange={value => handleValueChange('checkList', value)}
                >
                  <Checkbox value={index.toString()} />
                </CheckboxGroup>
                <Image
                  className="mr-5 border"
                  src="/images/ic_menu_dummy_chicken.png"
                  width={150}
                  height={100}
                  alt="dummy"
                />
                <Flex flexDirection="col" justifyContent="start" alignItems="start">
                  <Text>BBQ가 준비한 바삭한 선물! 따뜻한 픽업 프로모션!</Text>
                  <Text className="text-gray-600 line-through">
                    이벤트 기간 : 2023.09.01 ~ 2023.09.30
                  </Text>
                  <Flex justifyContent="start" className="gap-3 mt-5">
                    <Text>
                      <Link href="/content/app/board/write">수정</Link>
                    </Text>
                    <VerticalDivider height={15} />
                    <Text>삭제</Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
      </div>
      <Flex justifyContent="center" className="px-5 pb-5">
        <CustomButton className="w-[150px] mr-auto" type={'tertiary'}>
          선택항목 삭제
        </CustomButton>
        {/* <Pagination /> */}
        <Flex className="ml-auto w-[330px]">
          <TextInput
            className="w-[150px] mr-2"
            placeholder="제목, 글내용 검색"
            icon={MagnifyingGlassIcon}
          />
          <CustomButton className="w-[150px]" type={'secondary'}>
            글쓰기
          </CustomButton>
        </Flex>
      </Flex>
    </Card>
  );
}
