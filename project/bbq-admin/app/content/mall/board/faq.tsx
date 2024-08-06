import { Disclosure, Transition } from '@headlessui/react';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Card, Flex, Select, SelectItem, Text, TextInput, Title } from '@tremor/react';
import { useState } from 'react';

import Link from 'next/link';

import CustomButton from '@/app/components/CustomButton';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';

interface ContentMallBoardFaqListCondition {
  faqType: string;
  perPage: string;
}

export default function ContentMallBoardFaqList() {
  const [selectedValue, setSelectedValue] = useState<ContentMallBoardFaqListCondition>({
    faqType: 'all',
    perPage: '20',
  });
  const handleValueChange = (key: keyof ContentMallBoardFaqListCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };
  return (
    <Card className="mt-5 p-0">
      <Title className="border-b p-5">주문앱 FAQ</Title>
      <Flex justifyContent="start" className="gap-10 p-5 pb-0">
        <RadioboxGroup
          value={selectedValue.faqType}
          onChange={value => handleValueChange('faqType', value)}
        >
          <Radiobox value={'all'} label="전체" />
          <Radiobox value={'01'} label="faq01" />
          <Radiobox value={'02'} label="faq02" />
          <Radiobox value={'03'} label="faq03" />
        </RadioboxGroup>
      </Flex>
      <Flex justifyContent="between" className="p-5 pb-0">
        <Text>Total 150</Text>
        <Select
          className="w-[100px]"
          placeholder="보기"
          value={selectedValue.perPage}
          onChange={value => handleValueChange('perPage', value)}
        >
          <SelectItem value={'10'}>10개씩 보기</SelectItem>
          <SelectItem value={'20'}>20개씩 보기</SelectItem>
        </Select>
      </Flex>
      {Array(10)
        .fill(null)
        .map((_, index) => {
          return (
            <div className="p-5 pb-1" key={index}>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="border border-gray-300 w-full">
                      <Flex className="gap-3 bg-gray-50 h-[60px]" justifyContent="center">
                        <Flex className="h-full">
                          <Text className="text-emerald-500 px-5 py-0 font-bold !text-xl">Q</Text>
                          <Title className="px-5 pl-0 w-full text-left">
                            [faq01] 윤홍근 회장 “ESG 경영 성과 바탕, 상생문화 정착 노력”
                          </Title>
                          <Flex className="pr-5 w-[auto]" justifyContent="end">
                            <Text className="border-r w-[60px]">삭제</Text>
                            <Text className="border-r w-[60px]">
                              <Link href="/content/app/board/write">수정</Link>
                            </Text>
                            <div className="pl-5">
                              {open ? (
                                <ChevronUpIcon width={20} className="text-gray-800" />
                              ) : (
                                <ChevronDownIcon width={20} className="text-gray-800" />
                              )}
                            </div>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      className="overflow-hidden"
                      enter="transition transition-[max-height] duration-400 ease-in"
                      enterFrom="transform max-h-0"
                      enterTo="transform max-h-screen"
                      leave="transition transition-[max-height] duration-400 ease-out"
                      leaveFrom="transform max-h-screen"
                      leaveTo="transform max-h-0"
                    >
                      <Disclosure.Panel static>
                        <Flex className="bg-gray-100 p-5 border !border-t-0 border-gray-300">
                          <div className="w-[50px] pt-0 px-3 self-start">
                            <ArrowRightIcon width={15} />
                          </div>
                          <Text className="">
                            국내 최대 치킨 프랜차이즈인 제너시스BBQ 그룹이 11일 국군의 날 74주년을
                            맞아 윤홍근 회장, 윤경주 (주)제너시스 대표이사 부회장, 정승욱
                            제너시스BBQ 대표이사 사장 등 20여명의 임직원들이 이천에 소재한 치킨대학
                            인근 육군 특수전사령부를 위문 방문했다. 이날 제너시스BBQ 그룹 임직원들은
                            소영민 육군특수전사령관 외 부대장병들을 직접 만나 국가 경제산업의 발전에
                            힘쓰는 대한민국 육군과 특수전사령부의 철통같은 국토수호 노력에 감사를
                            전했다. 지난해부터 설날, 국군의 날 등에 제품을 기증해온
                            제너시스BBQ그룹은 이날 특수전사령부에게 위문성금 2천만원과 약 천만원
                            상당의 BBQ 상품권을 전달했다. 또한 임직원들은 특수전사령부에 대한
                            홍보영상, 무기 등을 소개받고 특수전사령부 부대원들이 펼치는 대테러
                            진압훈련, 고공강화 훈련 모습도 참관했다.
                          </Text>
                        </Flex>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          );
        })}
      <Flex justifyContent="center" className="px-5 pb-5">
        {/* <Pagination /> */}
        <Flex className="ml-auto w-[330px]">
          <TextInput
            className="w-[150px] mr-2"
            placeholder="제목, 글내용 검색"
            icon={MagnifyingGlassIcon}
          />
          <CustomButton className="w-[150px]" type={'secondary'}>
            글쓰기
          </CustomButton>
        </Flex>
      </Flex>
    </Card>
  );
}
