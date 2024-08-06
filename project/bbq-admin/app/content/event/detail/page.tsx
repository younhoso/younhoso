'use client';

import { Card, Flex, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';

import CustomButton from '@/app/components/CustomButton';
import { getAxios } from '@/app/lib/Axios';
import Loading from '@/app/loading';
import { ContentEventDetailResponse } from '@/pages/api/content/event/[...id]';

export default function ContentEventDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<ContentEventDetailResponse>();
  const getEvent = async () => {
    if (!searchParams) return;

    const eventId = searchParams.get('id');

    if (eventId) {
      getEventData(eventId);
    } else {
      alert('잘못된 접근입니다.');
      router.push('/content/event');
    }
  };
  const getEventData = async (id: string) => {
    const res = await getAxios().get(`/api/content/event/${id}`);
    setData(res.data);
  };

  useEffect(() => {
    getEvent();
  }, []);

  const deleteEvent = async () => {
    if (!searchParams) return;
    const eventId = searchParams.get('id');
    if (confirm('삭제 하시겠습니까?')) {
      try {
        await getAxios().delete(`/api/content/event?id=${eventId}`);
        router.push('/content/event');
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
        <Card className="mt-5 p-5">
          <Flex justifyContent="start" className="gap-5">
            <Image src={data.thumbnailImageUrl} alt="thumbnail" width={200} height={100} />
            <Flex flexDirection="col" justifyContent="start" alignItems="start">
              <Title className="mb-3">{data.title}</Title>
              <Flex justifyContent="start">
                <Text className="text-gray-500 w-[100px]">이벤트 기간</Text>
                <Text>
                  {data.startDate} ~ {data.endDate}
                </Text>
              </Flex>
              <Flex justifyContent="start">
                <Text className="text-gray-500 w-[100px]">작성자</Text>
                <Text>{data.createdAdminName}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Card className="mt-5 p-0">
          <Title className="p-5 border-b">웹용(Web) 이벤트</Title>
          <div className="p-5">
            <div dangerouslySetInnerHTML={{ __html: data.bodyHtml }}></div>
          </div>
        </Card>

        <Card className="mt-5 p-0">
          <Title className="p-5 border-b">앱용(App) 이벤트</Title>
          <div className="p-5">
            <div dangerouslySetInnerHTML={{ __html: data.appBodyHtml }}></div>
          </div>
        </Card>
        <Flex justifyContent="end" className="mt-5 gap-3">
          <CustomButton type="tertiary" onClick={deleteEvent}>
            삭제
          </CustomButton>
          <CustomButton
            type="tertiary"
            onClick={() =>
              (window.location.href = '/content/event/write?id=' + searchParams?.get('id'))
            }
          >
            수정
          </CustomButton>
          <CustomButton
            type="tertiary"
            onClick={() => searchParams && router.push('/content/event/')}
          >
            목록
          </CustomButton>
        </Flex>
      </>
    );
  }
}
