import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Flex, Text } from '@tremor/react';
import { useState } from 'react';

import Image from 'next/image';

import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';

interface CouponListModalCondition {
  appType: string;
  mallType: string;
  familyType: string;
}

export default function CouponListModal() {
  const [selectedValue, setSelectedValue] = useState<CouponListModalCondition>({
    appType: 'all',
    mallType: 'all',
    familyType: 'all',
  });

  const handleValueChange = (key: keyof CouponListModalCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  return (
    <div className="w-[70vw] border-t-2 border-b-2 border-black">
      <Flex>
        <Flex className="w-1/3 h-[50vh] overflow-scroll border-r" flexDirection="col">
          <Flex className="p-3">
            <Text className="font-bold">주문앱</Text>
            <RadioboxGroup
              value={selectedValue.appType}
              onChange={value => handleValueChange('appType', value)}
            >
              <Radiobox value={'all'} label="전체" />
              <Radiobox value={'available'} label="사용가능" />
              <Radiobox value={'complete'} label="사용완료" />
              <Radiobox value={'expired'} label="만료" />
            </RadioboxGroup>
          </Flex>
          <Flex
            justifyContent="start"
            alignItems="start"
            flexDirection="col"
            className="h-[50vh] overflow-scroll"
          >
            {Array(20)
              .fill(null)
              .map((_, index) => {
                return (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <div className="mb-1 w-full py-1 px-3">
                        <Disclosure.Button className="w-full">
                          <Flex justifyContent="start" className="bg-white border p-2">
                            <Text className="font-bold mr-2">01</Text>
                            <Text className="w-full">BBQ해피해피쿠폰</Text>
                            <Flex justifyContent="end">
                              <Text className="text-emerald-500 mr-2">사용가능</Text>
                              {open ? (
                                <ChevronUpIcon width={20} className="text-gray-800" />
                              ) : (
                                <ChevronDownIcon width={20} className="text-gray-800" />
                              )}
                            </Flex>
                          </Flex>
                        </Disclosure.Button>

                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                          className="w-full"
                        >
                          <Disclosure.Panel className="bg-white">
                            <div className="p-5 border border-t-0">
                              <Image
                                alt="dummy"
                                width={188}
                                height={67}
                                src="/images/ic_coupon_coupon_dummy.png"
                                className="mx-auto"
                              />
                            </div>
                            <Flex flexDirection="col" className="border border-t-0 p-5">
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>쿠폰코드 : BC57945632157</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>소유자 : 홍길동</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>쿠폰종류 : 가입축하</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>할인방법 : 10%할인 (최대 5,000원 할인)</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>발행인 : 김철수</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>발행일자 : 2023.09.01 AM 11:00</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>사용처 : 주문앱</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>발행처 : 마케팅팀</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>사용여부 :</Text>
                                <Text className="text-emerald-500">사용가능</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>만료일자 : 2023.09.30 AM00:00</Text>
                              </Flex>
                            </Flex>
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                );
              })}
          </Flex>
        </Flex>
        <Flex
          className="w-1/3 h-[50vh] border-r"
          justifyContent="start"
          alignItems="start"
          flexDirection="col"
        >
          <Flex className="p-3">
            <Text className="font-bold">자사몰</Text>
            <RadioboxGroup
              value={selectedValue.mallType}
              onChange={value => handleValueChange('mallType', value)}
            >
              <Radiobox value={'all'} label="전체" />
              <Radiobox value={'available'} label="사용가능" />
              <Radiobox value={'complete'} label="사용완료" />
              <Radiobox value={'expired'} label="만료" />
            </RadioboxGroup>
          </Flex>
          <Flex
            justifyContent="start"
            alignItems="start"
            flexDirection="col"
            className="h-[50vh] overflow-scroll"
          >
            {Array(20)
              .fill(null)
              .map((_, index) => {
                return (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <div className="mb-1 w-full py-1 px-3">
                        <Disclosure.Button className="w-full">
                          <Flex justifyContent="start" className="bg-white border p-2">
                            <Text className="font-bold mr-2">01</Text>
                            <Text className="w-full">BBQ해피해피쿠폰</Text>
                            <Flex justifyContent="end">
                              <Text className="text-emerald-500 mr-2">사용가능</Text>
                              {open ? (
                                <ChevronUpIcon width={20} className="text-gray-800" />
                              ) : (
                                <ChevronDownIcon width={20} className="text-gray-800" />
                              )}
                            </Flex>
                          </Flex>
                        </Disclosure.Button>

                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                          className="w-full"
                        >
                          <Disclosure.Panel className="bg-white">
                            <div className="p-5 border border-t-0">
                              <Image
                                alt="dummy"
                                width={188}
                                height={67}
                                src="/images/ic_coupon_coupon_dummy.png"
                                className="mx-auto"
                              />
                            </div>
                            <Flex flexDirection="col" className="border border-t-0 p-5">
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>쿠폰코드 : BC57945632157</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>소유자 : 홍길동</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>쿠폰종류 : 가입축하</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>할인방법 : 10%할인 (최대 5,000원 할인)</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>발행인 : 김철수</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>발행일자 : 2023.09.01 AM 11:00</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>사용처 : 주문앱</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>발행처 : 마케팅팀</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>사용여부 :</Text>
                                <Text className="text-emerald-500">사용가능</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>만료일자 : 2023.09.30 AM00:00</Text>
                              </Flex>
                            </Flex>
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                );
              })}
          </Flex>
        </Flex>
        <Flex
          className="w-1/3 h-[50vh]"
          justifyContent="start"
          alignItems="start"
          flexDirection="col"
        >
          <Flex className="p-3">
            <Text className="font-bold">패밀리</Text>
            <RadioboxGroup
              value={selectedValue.familyType}
              onChange={value => handleValueChange('familyType', value)}
            >
              <Radiobox value={'all'} label="전체" />
              <Radiobox value={'available'} label="사용가능" />
              <Radiobox value={'complete'} label="사용완료" />
              <Radiobox value={'expired'} label="만료" />
            </RadioboxGroup>
          </Flex>
          <Flex
            justifyContent="start"
            alignItems="start"
            flexDirection="col"
            className="h-[50vh] overflow-scroll"
          >
            {Array(20)
              .fill(null)
              .map((_, index) => {
                return (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <div className="mb-1 w-full py-1 px-3">
                        <Disclosure.Button className="w-full">
                          <Flex justifyContent="start" className="bg-white border p-2">
                            <Text className="font-bold mr-2">01</Text>
                            <Text className="w-full">BBQ해피해피쿠폰</Text>
                            <Flex justifyContent="end">
                              <Text className="text-emerald-500 mr-2">사용가능</Text>
                              {open ? (
                                <ChevronUpIcon width={20} className="text-gray-800" />
                              ) : (
                                <ChevronDownIcon width={20} className="text-gray-800" />
                              )}
                            </Flex>
                          </Flex>
                        </Disclosure.Button>

                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                          className="w-full"
                        >
                          <Disclosure.Panel className="bg-white">
                            <div className="p-5 border border-t-0">
                              <Image
                                alt="dummy"
                                width={188}
                                height={67}
                                src="/images/ic_coupon_coupon_dummy.png"
                                className="mx-auto"
                              />
                            </div>
                            <Flex flexDirection="col" className="border border-t-0 p-5">
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>쿠폰코드 : BC57945632157</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>소유자 : 홍길동</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>쿠폰종류 : 가입축하</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>할인방법 : 10%할인 (최대 5,000원 할인)</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>발행인 : 김철수</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>발행일자 : 2023.09.01 AM 11:00</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>사용처 : 주문앱</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>발행처 : 마케팅팀</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>사용여부 :</Text>
                                <Text className="text-emerald-500">사용가능</Text>
                              </Flex>
                              <Flex justifyContent="start">
                                <Text className="text-emerald-500 mr-1 font-bold">·</Text>
                                <Text>만료일자 : 2023.09.30 AM00:00</Text>
                              </Flex>
                            </Flex>
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                );
              })}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
