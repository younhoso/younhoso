'use client';

import { Divider, Flex, Text, Title } from '@tremor/react';
import { useState } from 'react';

import axios, { isAxiosError } from 'axios';

import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { returnPaymentMethod } from '@/app/utils/changeValueType';
import { OrderDetailResponse } from '@/pages/api/order/[...id]';

export default function CancelOrder({ data }: { data: OrderDetailResponse }) {
  const { closeModal, openModal } = useModalContext();

  const [reason, setReason] = useState<string>('');
  const [textarea, setTextarea] = useState<string>('');
  const [textarea2, setTextarea2] = useState<string>('');

  const deleteOrder = async () => {
    const cancelReason = reason == '기타' ? textarea : reason == '기타2' ? textarea2 : reason;

    try {
      await getAxios().delete(`/api/order/${data.id}`, {
        params: { cancelReason },
      });
      closeModal();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  if (!data) return null;

  return (
    <Flex flexDirection="col">
      <Flex flexDirection="col" className="gap-2">
        <Flex justifyContent="start">
          <Text className="w-[100px]">주문자명</Text>
          <Text>{data.memberName}</Text>
        </Flex>
        <Flex justifyContent="start">
          <Text className="w-[100px]">주문일자</Text>
          <Text>{data.createdAt}</Text>
        </Flex>
        <Flex justifyContent="start">
          <Text className="w-[100px]">주문금액</Text>
          <Text>{data.orderAmount.toLocaleString()}원</Text>
        </Flex>
        <Flex justifyContent="start">
          <Text className="w-[100px]">결제금액</Text>
          <Text>{data.payAmount.toLocaleString()}원</Text>
        </Flex>
        <Flex justifyContent="start">
          <Text className="w-[100px]">결제유형(방법)</Text>
          <Text>{returnPaymentMethod(data.paymentMethod)}</Text>
        </Flex>
        <Flex justifyContent="start">
          <Text className="w-[100px]">연락처</Text>
          <Text>{data.mobile}</Text>
        </Flex>
        <Flex justifyContent="start">
          <Text className="w-[100px]">주문메뉴</Text>
          <Text>{data.orderMenuTitle}</Text>
        </Flex>
      </Flex>
      <Flex alignItems="start" flexDirection="col" className="mt-5">
        <Title className="text-left">주문 취소 사유</Title>
        <Flex flexDirection="row" className="gap-2">
          <Divider />
          <Text className="w-[300px]">귀책: 패밀리</Text>
          <Divider />
        </Flex>
        <Flex flexDirection="col" className="gap-3">
          <Flex justifyContent={'start'}>
            <RadioboxGroup value={reason} onChange={value => setReason(value)}>
              <Radiobox className="w-[200px]" value={'배달지연'} label="배달지연" />
              <Radiobox value={'접수지연'} label="접수지연" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent={'start'}>
            <RadioboxGroup value={reason} onChange={value => setReason(value)}>
              <Radiobox className="w-[200px]" value={'무대응/불친절'} label="무대응/불친절" />
              <Radiobox value={'오배달'} label="오배달" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent={'start'}>
            <RadioboxGroup value={reason} onChange={value => setReason(value)}>
              <Radiobox className="w-[200px]" value={'맛이없어서'} label="맛이없어서" />
              <Radiobox value={'기타'} label="기타" />
            </RadioboxGroup>
          </Flex>
          <textarea
            disabled={reason != '기타'}
            className="border-2 p-3 rounded-md w-full"
            rows={3}
            value={textarea}
            onChange={e => setTextarea(e.target.value)}
          ></textarea>
        </Flex>
        <Flex flexDirection="row" className="gap-2">
          <Divider />
          <Text className="w-[300px]">귀책: 주문자</Text>
          <Divider />
        </Flex>
        <Flex flexDirection="col" className="gap-3">
          <Flex justifyContent={'start'}>
            <RadioboxGroup value={reason} onChange={value => setReason(value)}>
              <Radiobox className="w-[200px]" value={'단순변심'} label="단순변심" />
              <Radiobox value={'배달 불가지역'} label="배달 불가지역" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent={'start'}>
            <RadioboxGroup value={reason} onChange={value => setReason(value)}>
              <Radiobox
                className="w-[200px]"
                value={'주문 후 연락 두절'}
                label="주문 후 연락 두절"
              />
              <Radiobox value={'배송지 오기재'} label="배송지 오기재" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent={'start'}>
            <RadioboxGroup value={reason} onChange={value => setReason(value)}>
              <Radiobox className="w-[200px]" value={'기타2'} label="기타" />
            </RadioboxGroup>
          </Flex>
          <textarea
            disabled={reason != '기타2'}
            className="border-2 p-3 rounded-md w-full"
            rows={3}
            value={textarea2}
            onChange={e => setTextarea2(e.target.value)}
          ></textarea>
        </Flex>
        <CustomButton onClick={deleteOrder} type={'secondary'} className="w-full mt-3">
          확인
        </CustomButton>
      </Flex>
    </Flex>
  );
}
