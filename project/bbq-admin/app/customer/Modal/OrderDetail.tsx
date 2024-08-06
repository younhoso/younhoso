import { Divider, Flex, Text, Title } from '@tremor/react';

import Image from 'next/image';

export default function OrderDetailModal() {
  return (
    <div className="w-[70vw] border-t-2 border-b-2 border-black">
      <Flex>
        <Flex className="w-1/3 h-[50vh] overflow-scroll border-r" flexDirection="col">
          {Array(10)
            .fill(null)
            .map((_, i) => {
              return (
                <Flex className="my-2 gap-2" justifyContent="start" key={i}>
                  <Image
                    src="/images/ic_menu_dummy_chicken.png"
                    width={200}
                    height={200}
                    alt="dummy"
                    className="border"
                  />
                  <div className="h-[200px] overflow-scroll">
                    <Text>바삭갈릭(레몬보이500ml 증정)</Text>
                    <Divider className="m-0 my-1 bg-gray-300 h-[1px]" />
                    {Array(5)
                      .fill(null)
                      .map((_, index) => {
                        return (
                          <Flex justifyContent="start" className="gap-1" key={index}>
                            <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                            <Text>선택옵션명 01 (+2,000원)</Text>
                          </Flex>
                        );
                      })}
                    <Divider className="m-0 my-1 bg-gray-300 h-[1px]" />
                    <Title className="text-right">구매 금액: 36,200</Title>
                  </div>
                </Flex>
              );
            })}
        </Flex>
        <Flex
          className="w-1/3 h-[50vh] border-r"
          justifyContent="start"
          alignItems="start"
          flexDirection="col"
        >
          <Flex flexDirection="col" className="border-b p-5">
            <Flex className="my-2" justifyContent="start">
              <Text className="font-bold w-[100px]">총 주문 수량</Text>
              <Text>12개</Text>
            </Flex>
            <Flex className="my-2" justifyContent="start">
              <Text className="font-bold w-[100px]">총 주문 금액</Text>
              <Text>68,500원</Text>
            </Flex>
            <Flex className="my-2" justifyContent="start">
              <Text className="font-bold w-[100px]">배달(배송)비</Text>
              <Text>+3500</Text>
            </Flex>
            <Flex className="my-2" justifyContent="start">
              <Text className="font-bold w-[100px]">적립금 사용</Text>
              <Text>-12,800p</Text>
            </Flex>
            <Flex className="my-2" justifyContent="start">
              <Text className="font-bold w-[100px] self-start">쿠폰 사용</Text>
              <Flex flexDirection="col" alignItems="start">
                <Text>-6850원</Text>
                <Text>BBQ해피해피이벤트쿠폰 (10%할인)</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDirection="col" className="p-5">
            <Flex className="my-2" justifyContent="start">
              <Text className="font-bold w-[100px]">최종 결제 금액</Text>
              <Text className="!text-2xl">48,590p</Text>
            </Flex>
            <Flex className="my-2" justifyContent="start">
              <Text className="font-bold w-[100px]">주문 후 적립액</Text>
              <Text>1,258p</Text>
            </Flex>
            <Flex className="my-2" justifyContent="start">
              <Text className="font-bold w-[100px]">총 할인혜택</Text>
              <Text>-20,856p</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          className="w-1/3 h-[50vh] p-5"
          justifyContent="start"
          alignItems="start"
          flexDirection="col"
        >
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">판매자</Text>
            <Text>인천소래포구점 or 자사몰</Text>
          </Flex>
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">주문자</Text>
            <Text>김유정</Text>
          </Flex>
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">받는사람</Text>
            <Text>김유정</Text>
          </Flex>
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">주문일자</Text>
            <Text>2023.09.23 PM06:18</Text>
          </Flex>
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">배달(바송)완료 일자</Text>
            <Text>2023.09.23 PM06:18</Text>
          </Flex>
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">주문시 회원등급</Text>
            <Text>치키</Text>
          </Flex>
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">송장번호</Text>
            <Text>BBQ54291391239</Text>
          </Flex>
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">배송지 주소</Text>
            <Text>인천 남동구 00번길 000 비비아파트 101동 1001호</Text>
          </Flex>
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">요청 사항</Text>
            <Text>애가 자고 있어요. 오시면 노크해주세요.</Text>
          </Flex>
          <Flex className="my-2" justifyContent="start">
            <Text className="font-bold w-[120px]">요청 사항</Text>
            <Text className="text-red-500 whitespace-pre-wrap">
              +늦으면 사나워짐{'\n'}
              +벨소리에 민감함. 노트 후 전달 요망
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
