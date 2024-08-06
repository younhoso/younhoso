'use client';

import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import CustomButton from '@/app/components/CustomButton';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';

interface Configuration {
  id: string;
  allowIp: string;
  isAllowAll: string;
  allowIpDesc: string;
  memberDate: DateRangePickerValue;
  isUsed: string;
}

export default function IpAddPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState<Configuration>({
    id: '',
    allowIp: '',
    isAllowAll: 'true',
    allowIpDesc: '',
    memberDate: {
      from: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
      to: new Date(dayjs(new Date()).format('YYYY-MM-DD')),
    },
    isUsed: 'true',
  });

  const handleValueChange = (
    key: keyof Configuration,
    value: string | object | number[] | Date,
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const handUpdate = async () => {
    const editId = searchParams && searchParams.get('editId');
    try {
      const { id, memberDate, ...rest } = selectedValue;
      const result = await getAxios().patch(`/api/admin/edit/${editId}`, {
        ...rest,
        isAllowAll: String(selectedValue.isAllowAll) === 'true' ? true : false,
        startDate: dayjs(memberDate.from).format('YYYY-MM-DD'),
        endDate: dayjs(memberDate.to).format('YYYY-MM-DD'),
        isUsed: String(selectedValue.isUsed) === 'true' ? true : false,
      });

      if (result.status === 200) {
        alert('수정 되었습니다.');
        router.push('/admin');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert(error);
      }
    }
  };

  const getData = async () => {
    try {
      const editId = searchParams && searchParams.get('editId');
      const result = await getAxios().get(`/api/admin/edit/${editId}`);
      setSelectedValue(prev => ({
        ...prev,
        ...result.data,
        memberDate: {
          from: new Date(dayjs(result.data.startDate).format('YYYY-MM-DD')),
          to: new Date(dayjs(result.data.endDate).format('YYYY-MM-DD')),
        },
      }));
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
    <Card className="p-0 my-5">
      <div className="border-b p-5">
        <Title>공용 허용 IP 정보</Title>
      </div>
      <Flex flexDirection="col" className="p-5 gap-5">
        <Flex justifyContent="start" className="border-b pb-5">
          <Text className="w-[150px]">IP 주소*</Text>
          <TextInput
            className="w-full"
            value={selectedValue.allowIp}
            onChange={e => handleValueChange('allowIp', e.target.value)}
            placeholder="IP 주소를 입력해주세요"
          />
        </Flex>
        <Flex justifyContent="start" className="border-b pb-5">
          <Text className="w-[150px]">IP 주소 설명*</Text>
          <TextInput
            className="w-full"
            value={selectedValue.allowIpDesc}
            onChange={e => handleValueChange('allowIpDesc', e.target.value)}
            placeholder="IP 주소 설명을 입력해주세요"
          />
        </Flex>
        <Flex justifyContent="start" className="border-b pb-5">
          <Text className="w-[135px]">사용 가능 일자*</Text>
          <DateRangePicker
            className="w-[260px]"
            value={selectedValue.memberDate}
            onValueChange={value => handleValueChange('memberDate', value)}
            enableClear={true}
            enableSelect={false}
            locale={ko}
            placeholder="기간 선택"
          />
        </Flex>
        <Flex justifyContent="start" className="border-b pb-5">
          <Text className="w-[150px]">사용 여부*</Text>
          <Flex justifyContent="start" className="gap-5">
            <RadioboxGroup
              value={String(selectedValue.isUsed)}
              onChange={e => handleValueChange('isUsed', e)}
            >
              <Radiobox value="true" label={'사용'} />
              <Radiobox value="false" label={'미사용'} />
            </RadioboxGroup>
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent="end" className="gap-5 mt-5">
        <CustomButton type="tertiary" className="w-[150px]" onClick={() => router.back()}>
          취소
        </CustomButton>
        <CustomButton type="secondary" className="w-[150px]" onClick={() => handUpdate()}>
          수정
        </CustomButton>
      </Flex>
    </Card>
  );
}
