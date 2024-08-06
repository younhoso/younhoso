'use client';

import { Card, Flex, List, ListItem, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';

import CustomButton from '@/app/components/CustomButton';
import { getAxios } from '@/app/lib/Axios';
import { Content } from '@/pages/api/customer/chicken/detail';

export default function CustomerDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [relayId, setrelayId] = useState<string | null>(null);
  const [data, setData] = useState<Content>();

  const getData = async () => {
    try {
      const res = await getAxios().get<Content>(`/api/customer/chicken/detail?id=${relayId}`);
      setData(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
        history.back();
      }
    }
  };

  const deleteData = async () => {
    try {
      await getAxios().delete<Content>(`/api/customer/chicken/detail?id=${relayId}`);
      alert('삭제되었습니다.');
      history.back();
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
      }
    }
  };

  useEffect(() => {
    if (!searchParams) return;
    const relayId = searchParams.get('id');
    setrelayId(relayId);
  }, []);

  useEffect(() => {
    if (relayId) getData();
  }, [relayId]);

  if (data && relayId) {
    return (
      <main className="my-5">
        <Card className="p-0">
          <Title className="border-b p-5">사연자 정보</Title>
          <Flex className="px-5">
            <List className="mt-1 p-0 mt-0">
              <ListItem className="justify-start p-3">
                <Text className="w-[100px]">이름</Text>
                <Text className="ml-1">{data.name}</Text>
              </ListItem>
              <ListItem className="justify-start p-3">
                <Text className="w-[100px]">휴대폰 번호</Text>
                <Text className="ml-1">
                  {data.phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                </Text>
              </ListItem>
              <ListItem className="justify-start p-3">
                <Text className="w-[100px]">이메일</Text>
                <Text className="ml-1">{data.email}</Text>
              </ListItem>
              <ListItem className="justify-start p-3">
                <Text className="w-[100px]">주소</Text>
                <Text className="ml-1">{data.address}</Text>
              </ListItem>
            </List>
          </Flex>
        </Card>
        <Card className="p-0 mt-5">
          <Flex className="border-b p-5" justifyContent="between">
            <Title className="">{data.title}</Title>
            <Text>
              {data.name} | {data.createdAt}
            </Text>
          </Flex>
          <div dangerouslySetInnerHTML={{ __html: data.content }} className="p-5 m-5"></div>
          <Flex className="p-5 gap-5" justifyContent="start">
            {data.contentFileUrl1 && (
              <Card
                className="!rounded-xl p-0 w-[300px] cursor-pointer"
                onClick={() => window.open(data.contentFileUrl1)}
              >
                <Flex justifyContent="start">
                  <Flex className="p-5" justifyContent="start">
                    <Image src={'/images/file.png'} width={30} height={30} alt="file" />
                    <Text className="ml-2">
                      {data.contentFileUrl1.split('/').slice(-1)[0].substring(0, 10)}
                      ...{data.contentFileUrl1.split('.').slice(-1)[0]}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="center"
                    className="w-[100px] h-[70px] rounded-tr-xl rounded-br-xl bg-[#f8f9fd]"
                  >
                    <Image src={'/images/download.png'} width={20} height={20} alt="download" />
                  </Flex>
                </Flex>
              </Card>
            )}
            {data.contentFileUrl2 && (
              <Card
                className="!rounded-xl p-0 w-[300px] cursor-pointer"
                onClick={() => window.open(data.contentFileUrl2)}
              >
                <Flex justifyContent="start">
                  <Flex className="p-5" justifyContent="start">
                    <Image src={'/images/file.png'} width={30} height={30} alt="file" />
                    <Text className="ml-2">
                      {data.contentFileUrl2.split('/').slice(-1)[0].substring(0, 10)}
                      ...{data.contentFileUrl2.split('.').slice(-1)[0]}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="center"
                    className="w-[100px] h-[70px] rounded-tr-xl rounded-br-xl bg-[#f8f9fd]"
                  >
                    <Image src={'/images/download.png'} width={20} height={20} alt="download" />
                  </Flex>
                </Flex>
              </Card>
            )}
            {data.contentFileUrl3 && (
              <Card
                className="!rounded-xl p-0 w-[300px] cursor-pointer"
                onClick={() => window.open(data.contentFileUrl3)}
              >
                <Flex justifyContent="start">
                  <Flex className="p-5" justifyContent="start">
                    <Image src={'/images/file.png'} width={30} height={30} alt="file" />
                    <Text className="ml-2">
                      {data.contentFileUrl3.split('/').slice(-1)[0].substring(0, 10)}
                      ...{data.contentFileUrl3.split('.').slice(-1)[0]}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="center"
                    className="w-[100px] h-[70px] rounded-tr-xl rounded-br-xl bg-[#f8f9fd]"
                  >
                    <Image src={'/images/download.png'} width={20} height={20} alt="download" />
                  </Flex>
                </Flex>
              </Card>
            )}
          </Flex>
        </Card>
        <Flex justifyContent="end" className="gap-5 mt-5">
          <CustomButton type="primary" className="w-[150px]" onClick={deleteData}>
            삭제
          </CustomButton>
          <CustomButton
            type="tertiary"
            className="w-[150px]"
            onClick={() => router.push(`/customer/chicken`)}
          >
            목록
          </CustomButton>
        </Flex>
      </main>
    );
  }
}
