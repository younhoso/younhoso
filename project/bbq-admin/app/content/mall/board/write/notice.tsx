import { Card, Flex, Text, TextInput, Title } from '@tremor/react';
import { useState } from 'react';

import dynamic from 'next/dynamic';

import CustomButton from '@/app/components/CustomButton';
import FileInput, { IFileTypes } from '@/app/components/FileInput';

const Editor = dynamic(() => import('../../../../components/Editor'), {
  ssr: false,
});

interface ContentMallBoardNoticeWriteCondition {
  title: string;
  content: string;
  file: IFileTypes[];
}

export default function ContentMallBoardNoticeWrite() {
  const [selectedValue, setSelectedValue] = useState<ContentMallBoardNoticeWriteCondition>({
    title: '',
    content: '',
    file: [],
  });
  const handleValueChange = (key: keyof ContentMallBoardNoticeWriteCondition, value: any) => {
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
          <Title>주문앱 공지사항</Title>
        </div>

        <Flex flexDirection="col" className="p-5">
          <Flex>
            <Text className="w-[100px]">제목</Text>
            <TextInput
              placeholder="제목을 입력해주세요."
              className="w-full"
              value={selectedValue.title}
              onChange={e => handleValueChange('title', e.target.value)}
            />
          </Flex>
          <div className="w-full border mt-5 h-[400px] p-5">
            <Editor
              htmlStr={selectedValue.content}
              setHtmlStr={htmlStr => handleValueChange('content', htmlStr)}
            />
          </div>

          <Flex justifyContent="start" className="py-5">
            <Text className="w-[100px] self-start">파일 등록</Text>
            <FileInput
              type="file"
              multiple={true}
              value={selectedValue.file}
              onChange={value => {
                handleValueChange('file', value);
              }}
            />
          </Flex>

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
