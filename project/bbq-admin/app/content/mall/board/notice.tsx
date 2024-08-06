import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  Flex,
  Select,
  SelectItem,
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
import { useState } from 'react';

import Link from 'next/link';

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';
import CustomButton from '@/app/components/CustomButton';
import VerticalDivider from '@/app/components/VerticalDivider';

interface ContentMallBoardNoticeListCondition {
  perPage: string;
  checkList: string[];
}

export default function ContentMallBoardNoticeList() {
  const [selectedValue, setSelectedValue] = useState<ContentMallBoardNoticeListCondition>({
    perPage: 'all',
    checkList: [],
  });

  const handleValueChange = (key: keyof ContentMallBoardNoticeListCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  return (
    <Card className="mt-5 p-0">
      <Title className="border-b p-5">주문앱 공지사항</Title>
      <Flex justifyContent="between" className="p-5 pb-0">
        <Text>Total 150</Text>
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
      <Table className="p-5">
        <TableHead className="bg-gray-100 border ">
          <TableRow className="border">
            <TableHeaderCell className="text-center">
              <CheckboxGroup
                table={true}
                value={selectedValue.checkList}
                onChange={value => handleValueChange('checkList', value)}
              >
                <Checkbox value={'all'} />
              </CheckboxGroup>
            </TableHeaderCell>
            <TableHeaderCell className="text-center">번호</TableHeaderCell>
            <TableHeaderCell className="text-center">제목</TableHeaderCell>
            <TableHeaderCell className="text-center">작성자</TableHeaderCell>
            <TableHeaderCell className="text-center">게시일자</TableHeaderCell>
            <TableHeaderCell className="text-center">조회</TableHeaderCell>
            <TableHeaderCell className="text-center">관리</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody className="border-b">
          {Array(10)
            .fill(0)
            .map((_, index) => {
              return (
                <TableRow className="border hover:bg-gray-100" key={index}>
                  <TableCell>
                    <CheckboxGroup
                      table={true}
                      value={selectedValue.checkList}
                      onChange={value => handleValueChange('checkList', value)}
                    >
                      <Checkbox value={index.toString()} />
                    </CheckboxGroup>
                  </TableCell>
                  <TableCell>150</TableCell>
                  <TableCell>
                    “스마트 K-치킨 브랜드로 발돋움”…美 외식 전문지에 실린 ‘이 치킨’
                  </TableCell>
                  <TableCell>bbq 고객만족센터</TableCell>
                  <TableCell>2023.09.04 AM10:34</TableCell>
                  <TableCell>51,489</TableCell>
                  <TableCell>
                    <Flex>
                      <Text>
                        <Link href="/content/app/board/write">수정</Link>
                      </Text>
                      <VerticalDivider height={10} />
                      <Text>삭제</Text>
                    </Flex>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
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
