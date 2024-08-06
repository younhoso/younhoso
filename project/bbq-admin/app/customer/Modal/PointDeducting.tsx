import {
  DatePicker,
  DateRangePickerValue,
  Divider,
  Flex,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { useState } from 'react';

import Image from 'next/image';

import { isAxiosError } from 'axios';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';

interface PointDeductingModalCondition {
  status: 'EARN' | 'USE';
  description: string;
  deltaPoint: string;
  expiresAt: DateRangePickerValue;
}

export default function PointDeductingModal({ id }: { id: string }) {
  const { closeModal } = useModalContext();
  const [selectedValue, setSelectedValue] = useState({
    status: 'EARN',
    description: '',
    deltaPoint: '',
    expiresAt: new Date(),
  });
  const handleValueChange = (key: keyof PointDeductingModalCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const submitPointDeducting = async () => {
    try {
      await getAxios().post(`/api/customer/point/deduct?id=${id}`, {
        status: selectedValue.status,
        description: selectedValue.description,
        deltaPoint: selectedValue.deltaPoint,
        expiresAt: dayjs(selectedValue.expiresAt).format('YYYY-MM-DD'),
      });
      alert('포인트가 적립 및 차감 되었습니다.');
      closeModal(true);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
      }
    }
  };

  return (
    <div className="w-[45vw] p-5">
      <Flex className="border-b border-t pt-5 pb-5">
        <Text className="w-[100px]">포인트</Text>
        <Flex className="gap-5" justifyContent="start">
          <RadioboxGroup
            value={selectedValue.status}
            onChange={value => handleValueChange('status', value)}
          >
            <Radiobox value={'EARN'} label={'적립'} />
            <Radiobox value={'USE'} label={'차감'} />
          </RadioboxGroup>
        </Flex>
      </Flex>
      <Flex flexDirection="col">
        <Flex justifyContent="start" className="mt-5">
          <Text className="w-[100px]">
            {selectedValue.status == 'EARN' ? '적립 사유' : '차감 사유'}
          </Text>
          <TextInput
            value={selectedValue.description}
            onChange={e => handleValueChange('description', e.target.value)}
            placeholder={
              selectedValue.status == 'EARN'
                ? '적립 사유를 입력해주세요'
                : '차감 사유를 입력해주세요'
            }
          />
        </Flex>
        <Flex justifyContent="start" className="mt-5">
          <Text className="w-[100px]">
            {selectedValue.status == 'EARN' ? '적립 포인트' : '차감 포인트'}
          </Text>
          <TextInput
            value={selectedValue.deltaPoint}
            onChange={e => handleValueChange('deltaPoint', e.target.value)}
            placeholder={
              selectedValue.status == 'EARN'
                ? '적립 포인트를 입력해주세요 (1 포인트 이상)'
                : '차감 포인트를 입력해주세요 (1 포인트 이상)'
            }
          />
        </Flex>
        {selectedValue.status == 'EARN' && (
          <Flex justifyContent="start" className="mt-5">
            <Text className="w-[87px]">포인트 만료</Text>
            <DatePicker
              placeholder="기간 설정"
              className="w-[300px]"
              value={selectedValue.expiresAt}
              onValueChange={value => {
                handleValueChange('expiresAt', value);
              }}
              locale={ko}
            />
            <Text className="ml-5 text-red-500">해당일 23시 59분 59초까지 사용 가능합니다 *</Text>
          </Flex>
        )}
      </Flex>
      <Flex justifyContent="end" className="gap-2 border-t mt-5 pt-5">
        <CustomButton type="tertiary" className="w-[150px]" onClick={closeModal}>
          취소
        </CustomButton>

        <CustomButton type="secondary" className="w-[150px]" onClick={submitPointDeducting}>
          확인
        </CustomButton>
      </Flex>
    </div>
  );
}
