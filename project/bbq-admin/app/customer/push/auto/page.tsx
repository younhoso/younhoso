'use client';

import { Button, Card, Flex, TextInput } from '@tremor/react';
import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';

import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import Title from '@/app/components/Title';
import { getAxios } from '@/app/lib/Axios';

export interface PushAutoType {
  batchType: string;
  afterDays: string;
  appPushTitle: string;
  appPushBody: string;
  appPushDynamicUrl: string;
  isActive: string;
}

export default function PushSendPage() {
  const router = useRouter();
  const search = useSearchParams();

  const [selectedValue, setSelectedValue] = useState<PushAutoType>({
    batchType: '',
    afterDays: '',
    appPushTitle: '',
    appPushBody: '',
    appPushDynamicUrl: '',
    isActive: '',
  });

  const handleValueChange = (key: string, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const getData = async () => {
    const result = await getAxios().get(`/api/customer/push/auto?${search}`);
    setSelectedValue(prev => ({
      ...prev,
      ...result.data,
      isActive: String(result.data.isActive),
    }));
  };

  const registerSend = async () => {
    if (!selectedValue.appPushTitle) {
      alert('푸시 제목을 입력해 주세요.');
      return;
    }

    if (!selectedValue.appPushBody) {
      alert('푸시 내용을 입력해 주세요.');
      return;
    }

    if (!selectedValue.appPushDynamicUrl) {
      alert('딥링크을 입력해 주세요.');
      return;
    }

    if (!selectedValue.afterDays) {
      alert('기준 일자을 입력해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'pushSend',
      JSON.stringify({
        batchType: selectedValue.batchType,
        isActive: selectedValue.isActive,
        appPushTitle: selectedValue.appPushTitle,
        appPushBody: selectedValue.appPushBody,
        appPushDynamicUrl: selectedValue.appPushDynamicUrl,
        afterDays: Number(selectedValue.afterDays),
      }),
    );

    try {
      const result = await getAxios().patch<PushAutoType[]>(`/api/customer/push/auto`, formData);

      if (result.status === 200) {
        alert('수정되었습니다.');
        setSelectedValue(selectedValue);
        router.push('/customer/push');
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">활성 상태 *</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start">
          <Flex justifyContent="start" className="gap-10">
            <RadioboxGroup
              disabled={false}
              value={selectedValue.isActive}
              onChange={value => handleValueChange('isActive', value)}
            >
              <Radiobox className="!text-sm/[14px] text-[#46477A]" value={'true'} label="활성화" />
              <Radiobox
                className="!text-sm/[14px] text-[#46477A]"
                value={'false'}
                label="비활성화"
              />
            </RadioboxGroup>
          </Flex>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">푸시 제목</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start" alignItems="start" flexDirection="col">
          <TextInput
            className="!w-[720px] !rounded-none shadow-transparent placeholder:text-slate-400"
            placeholder="푸시 제목을 입력해주세요."
            value={selectedValue.appPushTitle}
            onChange={e => handleValueChange('appPushTitle', e.target.value)}
          />
          <p className="text-[12px] text-[#DE1F38] mt-[12px]">
            * ‘(광고)’ 는 반드시 문장의 맨 앞에 위치해야 합니다.
          </p>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">푸시 내용</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start" alignItems="start" flexDirection="col">
          <textarea
            cols={5}
            className="w-[720px] h-[200px] border p-[10px] text-[#46477A]"
            value={selectedValue.appPushBody}
            onChange={e => handleValueChange('appPushBody', e.target.value)}
          ></textarea>
          <p className="text-[12px] text-[#DE1F38] mt-[12px]">
            * 수신 거부를 위한 문구는 반드시 문장의 맨 아래 포함되어야 합니다.
          </p>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">딥링크</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start" alignItems="start" flexDirection="col">
          <TextInput
            className="!w-[720px] !rounded-none shadow-transparent placeholder:text-slate-400"
            placeholder="딥링크를 입력하세요."
            value={selectedValue.appPushDynamicUrl}
            onChange={e => handleValueChange('appPushDynamicUrl', e.target.value)}
          />
          <p className="text-[12px] text-[#DE1F38] mt-[12px]">
            * bbqapp:// 으로 시작하는 딥링크만 입력할 수 있습니다. 개발사에 문의하여 딥링크 주소를
            확인해 주세요.
          </p>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">기준 일자</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start" alignItems="start" flexDirection="col">
          <Flex className="justify-normal">
            <TextInput
              className="!w-[200px] h-[40px] !rounded-none shadow-transparent placeholder:text-slate-400"
              placeholder="기준 일자를 입력하세요."
              value={selectedValue.afterDays}
              onChange={e => {
                if (isNaN(Number(e.target.value))) {
                  alert('숫자만 입력 가능합니다.');
                  e.target.value = '';
                  return;
                }
                handleValueChange('afterDays', e.target.value);
              }}
            />
            <p className="h-[40px] border border-l-[0] pt-[7px] pb-[7px] pl-[12px] pr-[12px] text-[14px]">
              일
            </p>
          </Flex>
          <p className="text-[12px] text-[#DE1F38] mt-[12px]">
            * 입력하신 날짜 이전의 가입, 주문 등의 정보를 가져와 처리합니다. (ex : &apos;7일&apos;
            입력 시, 7일 전 회원가입한 사용자)
          </p>
        </Flex>
      </Card>

      <Flex justifyContent="end" className="py-5">
        <Button
          onClick={() => router.back()}
          className="bg-white !border-tremor-border-grayED2 hover:bg-white text-gray-500 w-[160px] h-[50px] !rounded-none"
        >
          취소
        </Button>
        <Button
          className="bg-tremor-content-emphasis border-none ml-3 hover:bg-gray-700 text-white w-[160px] h-[50px] !rounded-none"
          onClick={registerSend}
        >
          수정완료
        </Button>
      </Flex>
    </>
  );
}
