'use client';

import { Card, Flex, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';

import CustomButton from '@/app/components/CustomButton';
import { getAxios } from '@/app/lib/Axios';
import Loading from '@/app/loading';
import { ContentNoticeDetailResponse } from '@/pages/api/content/notice/[...id]';

export default function ContentNoticeDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<ContentNoticeDetailResponse>();
  const getNotice = async () => {
    if (!searchParams) return;

    const noticeId = searchParams.get('id');

    if (noticeId) {
      getNoticeData(noticeId);
    } else {
      alert('잘못된 접근입니다.');
      router.push('/content/notice');
    }
  };
  const getNoticeData = async (id: string) => {
    const res = await getAxios().get(`/api/content/notice/${id}`);
    setData(res.data);
  };

  useEffect(() => {
    getNotice();
  }, []);

  const deleteNotice = async () => {
    if (!searchParams) return;
    const noticeId = searchParams.get('id');
    if (confirm('삭제 하시겠습니까?')) {
      try {
        await getAxios().delete(`/api/content/notice?id=${noticeId}`);
        router.push('/content/notice');
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };

  if (data) {
    return (
      <>
        <Card className="mt-5 p-0">
          <Title className="border-b p-5">주문앱 공지사항</Title>
          <div className="p-5">
            <Card className="p-0">
              <Flex className="border-b p-5" justifyContent="start">
                <Text className="w-full">{data.title}</Text>
                <Flex justifyContent="end" className="gap-5">
                  <Text className="border-r pr-5">{data.createdAt}</Text>
                  <Text className="">{data.createdAdminName}</Text>
                </Flex>
              </Flex>
              <div dangerouslySetInnerHTML={{ __html: data.bodyHtml }} className="p-5 m-5"></div>
            </Card>
          </div>
        </Card>
        <Flex justifyContent="end" className="mt-5 gap-3">
          <CustomButton type="tertiary" onClick={deleteNotice}>
            삭제
          </CustomButton>
          <CustomButton
            type="tertiary"
            onClick={() => {
              window.location.href = '/content/notice/write?id=' + searchParams?.get('id');
            }}
          >
            수정
          </CustomButton>
          <CustomButton
            type="tertiary"
            onClick={() => searchParams && router.push('/content/notice/')}
          >
            목록
          </CustomButton>
        </Flex>
      </>
    );
  }
}
