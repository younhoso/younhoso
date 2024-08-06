import { Card, Flex, Text, TextInput, Title } from '@tremor/react';
import { useState } from 'react';

import dynamic from 'next/dynamic';

import { styled } from 'styled-components';

import CustomButton from '@/app/components/CustomButton';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';

const Editor = dynamic(() => import('../../../../components/Editor'), {
  ssr: false,
});

interface ContentMallBoardEventWriteCondition {
  category: string;
  categoryAdd: string;
  title: string;
  content: string;
}

export default function ContentMallBoardFaqWrite() {
  const [selectedValue, setSelectedValue] = useState<ContentMallBoardEventWriteCondition>({
    category: '',
    categoryAdd: '',
    title: '',
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
          <Flex justifyContent="start" className="gap-5">
            <Text className="w-[100px]">FAQ 카테고리</Text>
            <RadioboxGroup
              value={selectedValue.category}
              onChange={value => handleValueChange('category', value)}
            >
              <Radiobox label="faq01" value={'faq01'} />
              <Radiobox label="faq01" value={'faq02'} />
              <Radiobox label="faq01" value={'faq03'} />
              <Radiobox label="faq01" value={'faq04'} />
            </RadioboxGroup>
            <TextInput
              placeholder="faq 카테고리 명"
              className="w-[200px] ml-5"
              value={selectedValue.categoryAdd}
              onChange={e => handleValueChange('categoryAdd', e.target.value)}
            />
            <CustomButton type="tertiary" className="w-[100px]">
              추가
            </CustomButton>
          </Flex>
          <Flex>
            <Text className="w-[100px]">제목</Text>
            <TextInput
              placeholder="제목을 입력해주세요."
              className="w-full"
              value={selectedValue.title}
              onChange={e => handleValueChange('title', e.target.value)}
            />
          </Flex>
          <EditorContainer>
            <Editor
              htmlStr={selectedValue.content}
              setHtmlStr={value => handleValueChange('content', value)}
            />
          </EditorContainer>

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

const EditorContainer = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #dddddd;
  padding: 10px;

  margin: 0 auto;
  margin-top: 20px;

  // Editor 스타일 설정
  .wrapper {
  }

  .editor {
    height: 300px;
  }

  .toolbar {
  }
`;
