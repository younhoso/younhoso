'use client';

import { Card, Flex, Text, TextInput, Title } from '@tremor/react';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';

import CustomButton from '@/app/components/CustomButton';
import FileInput, { IFileTypes } from '@/app/components/FileInput';
import Loading from '@/app/components/Loading';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';

const Editor = dynamic(() => import('../../../components/Editor'), {
  ssr: false,
});

interface ContentNoticeWriteCondition {
  createdAdminName: string;
  title: string;
  isActive: string;
  isTopFixed: string;
  bodyHtml: string;
}

export default function ContentAppBoardNoticeWrite() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [type, setType] = useState<string>('write');

  const [selectedValue, setSelectedValue] = useState<ContentNoticeWriteCondition>({
    createdAdminName: '',
    title: '',
    bodyHtml: '',
    isActive: 'Y',
    isTopFixed: 'Y',
  });
  const handleValueChange = (key: keyof ContentNoticeWriteCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };
  const getNotice = async () => {
    if (!searchParams) return;
    const noticeId = searchParams.get('id');
    if (noticeId) {
      await getNoticeData(noticeId);
      setType('edit');
    }
  };
  const getNoticeData = async (id: string) => {
    const res = await getAxios().get(`/api/content/notice/${id}`);
    setSelectedValue({
      createdAdminName: res.data.createdAdminName,
      title: res.data.title,
      bodyHtml: res.data.bodyHtml,
      isActive: res.data.isActive ? 'Y' : 'N',
      isTopFixed: res.data.isTopFixed ? 'Y' : 'N',
    });
  };

  const uploadNotice = async () => {
    try {
      const res = await getAxios().post('/api/content/notice', {
        title: selectedValue.title,
        bodyHtml: selectedValue.bodyHtml,
        isActive: selectedValue.isActive === 'Y' ? true : false,
        isTopFixed: selectedValue.isTopFixed === 'Y' ? true : false,
        createdAdminName: selectedValue.createdAdminName,
      });
      if (res.status === 200) {
        alert('등록되었습니다.');
        router.push('/content/notice');
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const editNotice = async () => {
    try {
      if (!searchParams) return;
      const noticeId = searchParams.get('id');
      if (noticeId) {
        const res = await getAxios().patch('/api/content/notice?id=' + noticeId, {
          title: selectedValue.title,
          bodyHtml: selectedValue.bodyHtml,
          isActive: selectedValue.isActive === 'Y' ? true : false,
          isTopFixed: selectedValue.isTopFixed === 'Y' ? true : false,
          createdAdminName: selectedValue.createdAdminName,
        });
        if (res.status === 200) {
          alert('수정되었습니다.');
          router.push('/content/notice');
        }
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const getAdminName = async () => {
    const session = await getSession();
    handleValueChange('createdAdminName', session?.adminUserInfo?.name || '');
  };

  useEffect(() => {
    getAdminName();
    getNotice();
  }, []);

  return (
    <>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>공지사항 설정</Title>
        </div>
        <Flex flexDirection="col">
          <Flex justifyContent="start" className="gap-10 ml-10 mt-5 border-b pb-3">
            <Text className="min-w-[100px]">활성 상태</Text>
            <RadioboxGroup
              value={selectedValue.isActive}
              onChange={value => handleValueChange('isActive', value)}
            >
              <Radiobox value="Y" label="활성화" />
              <Radiobox value="N" label="비활성화" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent="start" className="gap-10 ml-10 mt-5 mb-3 pb-3">
            <Text className="min-w-[100px]">상단 고정</Text>
            <RadioboxGroup
              value={selectedValue.isTopFixed}
              onChange={value => handleValueChange('isTopFixed', value)}
            >
              <Radiobox value="Y" label="설정" />
              <Radiobox value="N" label="해제" />
            </RadioboxGroup>
          </Flex>
        </Flex>
      </Card>

      <Card className="p-0 mt-5">
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
          <Flex justifyContent="start" className="mt-5">
            <Text className="w-[90px]">작성자</Text>
            <TextInput
              placeholder=""
              className="w-[100px]"
              disabled={true}
              value={selectedValue.createdAdminName}
            />
          </Flex>
          <div className="w-full border mt-5 h-[400px] p-5">
            <Editor
              uploadUrl={`/api/upload?type=notice`}
              htmlStr={selectedValue.bodyHtml}
              setHtmlStr={htmlStr => handleValueChange('bodyHtml', htmlStr)}
            />
          </div>

          {/* <Flex justifyContent="start" className="py-5">
            <Text className="w-[100px] self-start">파일 등록</Text>
            <FileInput
              type="file"
              multiple={true}
              value={selectedValue.file}
              onChange={(value) => {
                handleValueChange('file', value);
              }}
            />
          </Flex> */}

          <Flex justifyContent="end" className="gap-3 py-5 border-t">
            <CustomButton
              type="tertiary"
              onClick={() => {
                history.back();
              }}
            >
              취소
            </CustomButton>
            {type == 'write' ? (
              <CustomButton onClick={uploadNotice} type="secondary">
                등록
              </CustomButton>
            ) : (
              <CustomButton onClick={editNotice} type="secondary">
                수정
              </CustomButton>
            )}
          </Flex>
        </Flex>
      </Card>
    </>
  );
}
