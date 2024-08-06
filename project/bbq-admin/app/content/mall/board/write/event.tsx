import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { useState } from 'react';

import dynamic from 'next/dynamic';

import { ko } from 'date-fns/locale';

import CustomButton from '@/app/components/CustomButton';
import FileInput, { IFileTypes } from '@/app/components/FileInput';

const Editor = dynamic(() => import('../../../../components/Editor'), {
  ssr: false,
});

interface ContentMallBoardEventWriteCondition {
  title: string;
  dateRange: DateRangePickerValue;
  thumbnail: IFileTypes[];
  content: string;
}

export default function ContentMallBoardEventWrite() {
  const [selectedValue, setSelectedValue] = useState<ContentMallBoardEventWriteCondition>({
    title: '',
    dateRange: {},
    thumbnail: [],
    content: '',
  });

  const handleValueChange = (key: keyof ContentMallBoardEventWriteCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  return (
    <>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>주문앱 FAQ 등록</Title>
        </div>

        <Flex flexDirection="col" className="p-5 gap-5">
          <Flex>
            <Text className="w-[100px]">제목</Text>
            <TextInput
              placeholder="제목을 입력해주세요."
              className="w-full"
              value={selectedValue.title}
              onChange={e => handleValueChange('title', e.target.value)}
            />
          </Flex>
          <Flex justifyContent="start" className="border-b pb-3">
            <Text className="w-[100px]">이벤트 기간</Text>
            <DateRangePicker
              className="w-[300px] ml-5"
              value={selectedValue.dateRange}
              onValueChange={value => handleValueChange('dateRange', value)}
              enableSelect={false}
              locale={ko}
              placeholder="기간 선택"
            />
          </Flex>
          <Flex justifyContent="start" className="border-b pb-3">
            <Text className="w-[100px] self-start">썸네일 이미지</Text>
            <Flex flexDirection="col" alignItems="start" justifyContent="start">
              <FileInput
                type="image"
                value={selectedValue.thumbnail}
                onChange={value => handleValueChange('thumbnail', value)}
              />
              <Text className="text-emerald-500">
                권장 크기 : 600 ✗ 400 픽셀 (6:4 비율)
                <br />
                jpg, jpeg,gif,png 형식의 이미지만 등록됩니다.
              </Text>
            </Flex>
          </Flex>
          <div className="w-full border mt-5 h-[400px] p-5">
            <Editor
              htmlStr={selectedValue.content}
              setHtmlStr={value => handleValueChange('content', value)}
            />
          </div>

          <Flex justifyContent="end" className="gap-3 py-5 border-t">
            <CustomButton type="tertiary">취소</CustomButton>
            <CustomButton type="secondary" className="w-[150px]">
              등록 완료
            </CustomButton>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}
