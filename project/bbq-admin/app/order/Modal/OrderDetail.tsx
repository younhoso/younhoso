'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Button, Card, Divider, Flex, List, ListItem, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import axios from 'axios';

import CustomButton from '@/app/components/CustomButton';
import { useModalContext } from '@/app/components/Modal';
import { getAxios } from '@/app/lib/Axios';
import {
  returnCancelType,
  returnMealType,
  returnOrderChannel,
  returnOrderStatus,
  returnPaymentMethod,
  returnPaymentType,
  returnPointType,
} from '@/app/utils/changeValueType';
import { OrderDetailResponse } from '@/pages/api/order/[...id]';

import CancelOrder from './CancelOrder';

export default function OrderDetail({ id }: { id: number }) {
  const { closeModal, openModal } = useModalContext();
  const [data, setData] = useState<OrderDetailResponse>();

  const getData = async () => {
    const response = await getAxios().get<OrderDetailResponse>(`/api/order/${id}`);
    setData(response.data);
  };

  const deleteOrder = async () => {
    if (data) {
      openModal('주문취소', `주문번호 ${data.id}`, <CancelOrder data={data} />);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) return null;

  return (
    <>
      <Flex alignItems="start" justifyContent="start" className="border-t border-b border-gray-900">
        <Flex flexDirection="col" className="w-[400px] border-r h-[530px] overflow-y-scroll">
          {data?.orderDetails?.map(item => {
            return (
              <Flex
                key={item.id}
                className="p-3 gap-2 border-b mb-3"
                justifyContent="start"
                alignItems="start"
              >
                {item.menuImageUrl === '' ? (
                  <img
                    src="/images/no-image.png"
                    width={150}
                    height={150}
                    className="mx-auto mb-3 border"
                  />
                ) : (
                  <Image
                    src={item.menuImageUrl}
                    width={150}
                    height={150}
                    objectFit="cover"
                    className="w-[150px] h-[150px]"
                    alt="menu image"
                  />
                )}
                <Flex
                  flexDirection="col"
                  justifyContent="start"
                  alignItems="start"
                  className="w-[400px] h-[200px] overflow-scroll"
                >
                  <Text>{item.menuName}</Text>
                  <Text>
                    수량 {item.quantity}개 • 옵션 {item.subOptionItems.length}개
                  </Text>
                  <Divider className="p-0 my-1 bg-gray-300 h-[1px]" />
                  <div>
                    {item.subOptionItems.map(subOptionItem => {
                      return (
                        <Flex justifyContent="start" key={subOptionItem.id}>
                          <Text className="text-emerald-500 mr-1">•</Text>
                          <Text>
                            {subOptionItem.subOptionItemName} (+
                            {subOptionItem.subOptionItemPrice.toLocaleString()}
                            원)
                          </Text>
                        </Flex>
                      );
                    })}
                  </div>
                  <Divider className="p-0 my-1 bg-gray-300 h-[1px]" />
                  <Text className="!text-md ml-auto font-bold mt-auto">
                    구매 금액 : {item.menuAndSubOptionAndQuantityPrice.toLocaleString()}원
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Flex
          className="w-[400px] border-r h-[530px] overflow-scroll p-5"
          flexDirection="col"
          justifyContent="start"
          alignItems="start"
        >
          <Flex justifyContent={'between'} className="mb-3">
            <Text className="bold !text-base">총 주문 금액</Text>
            <Text className="bold !text-base">{data.orderAmount.toLocaleString()}원</Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>결제수단</Text>
          </Flex>

          {data.orderPaymentInfos.map(paymentInfo => {
            return (
              <Flex justifyContent={'between'} className="mb-3" key={paymentInfo.id}>
                <Text className="text-gray-400">
                  - {returnPaymentType(paymentInfo.paymentType)}{' '}
                  {paymentInfo.couponNo && `/ ${paymentInfo?.couponNo}`}
                </Text>
                <Text>- {paymentInfo.payAmount.toLocaleString()}원</Text>
              </Flex>
            );
          })}

          {data.mealType === 'DELIVERY' && (
            <>
              <Flex justifyContent={'between'} className="mb-3">
                <Text>배달비</Text>
                <Text>{data.deliveryFee.toLocaleString()}원</Text>
              </Flex>
            </>
          )}
          <Divider className="p-0 my-3 bg-gray-300 h-[1px]" />

          <Flex justifyContent={'between'} className="mb-3">
            <Text className="bold !text-base">총 결제금액</Text>
            <Text className="bold !text-base">{data.payAmount.toLocaleString()}원</Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>총 할인금액</Text>
            <Text className="text-red-500">-{data.discountAmount.toLocaleString()}원</Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>포인트 적립액</Text>
            <Text>+{data.earnPoint.toLocaleString()}p</Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>포인트 적립 타입</Text>
            <Text>{returnPointType(data.earnPointType.toLocaleString())}</Text>
          </Flex>
        </Flex>
        <Flex
          className="w-[400px] h-[530px] overflow-scroll p-5"
          flexDirection="col"
          justifyContent="start"
          alignItems="start"
        >
          <Flex justifyContent={'between'} className="mb-3">
            <Text className="bold !text-base">패밀리점 명</Text>
            <Text className="bold !text-base">
              {data.familyName} ({data.familyTel})
            </Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>수령 방법</Text>
            <Text>{returnMealType(data.mealType)}</Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>주문 상태</Text>
            <Text
              className={`${
                data.orderStatus == 'COMPLETED'
                  ? 'text-emerald-500 bold'
                  : data.orderStatus == 'CANCEL_CONFIRMED' || data.orderStatus == 'ADMIN_CANCELLED'
                    ? 'text-red-500 bold'
                    : null
              }`}
            >
              {returnOrderStatus(data.orderStatus, data.mealType)}
            </Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>주문 채널</Text>
            <Text>{returnOrderChannel(data.orderChannel)}</Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>주문일자</Text>
            <Text>{data.createdAt}</Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>결제일자</Text>
            <Text>{data.payedAt}</Text>
          </Flex>
          {data.mealType === 'DELIVERY' && !data.cancelledAt && (
            <>
              <Flex justifyContent={'between'} className="mb-3">
                <Text>배달 소요 시간</Text>
                <Text>{data.estimateMin}분</Text>
              </Flex>
              <Flex justifyContent={'between'} className="mb-3">
                <Text>배달 시작 시간</Text>
                <Text>{data.deliverStartAt}</Text>
              </Flex>
            </>
          )}
          {data.mealType === 'TAKEOUT' && !data.cancelledAt && (
            <>
              <Flex justifyContent={'between'} className="mb-3">
                <Text>고객 도착 예정 시간</Text>
                <Text>{data.takeoutVisitMin}분</Text>
              </Flex>
            </>
          )}
          {data.cancelledAt && (
            <>
              <Flex justifyContent={'between'} className="mb-3">
                <Text>취소 시간</Text>
                <Text>{data.cancelledAt}</Text>
              </Flex>

              <Flex justifyContent={'between'} className="mb-3">
                <Text>취소 타입</Text>
                <Text>{returnCancelType(data.cancelType)}</Text>
              </Flex>
              <Flex justifyContent={'between'} className="mb-3">
                <Text>취소 사유</Text>
                <Text>{data.cancelReason}</Text>
              </Flex>
            </>
          )}
          <div className="h-[1px] mt-3 mb-6 w-full bg-gray-300 border-b border-gray-300" />
          <Flex justifyContent={'between'} className="mb-3">
            <Text className="bold !text-base">주문자명</Text>
            <Text className="bold !text-base">
              {data.memberName} ({data.mobile.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')})
            </Text>
          </Flex>
          {data.mealType === 'DELIVERY' && (
            <Flex justifyContent={'between'} className="mb-3">
              <Text>배송지 주소</Text>
              <Text>
                {data.deliveryAddress} {data.deliveryAddressDetail}
              </Text>
            </Flex>
          )}
          <Flex justifyContent={'between'} className="mb-3">
            <Text>결제 방법</Text>
            <Text>{returnPaymentMethod(data.paymentMethod)}</Text>
          </Flex>
          <Flex justifyContent={'between'} className="mb-3">
            <Text>주문 요청 사항</Text>
            <Text>{data.orderMessage}</Text>
          </Flex>
          {data.mealType === 'DELIVERY' && (
            <Flex justifyContent={'between'} className="mb-3">
              <Text>배달 요청 사항</Text>
              <Text>{data.deliveryMessage}</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex justifyContent="end" className="mt-3">
        {/*
        disable={data.orderStatus == 'ADMIN_CANCELLED' || data.orderStatus== 'CANCEL_CONFIRMED' || data.orderStatus == 'PAY_FAILED' || data.orderStatus == 'PAY_WAITING'}
        */}
        <CustomButton type="secondary" onClick={() => deleteOrder()}>
          주문 취소
        </CustomButton>
      </Flex>
    </>
  );
}
