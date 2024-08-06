'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Flex,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { useState } from 'react';

import { ko } from 'date-fns/locale';
import 'rc-slider/assets/index.css';

import CustomButton from '@/app/components/CustomButton';
import FileInput, { IFileTypes } from '@/app/components/FileInput';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import VerticalDivider from '@/app/components/VerticalDivider';

interface CustomerVoiceCondition {
  search: string;
  type: string;
  dateRange: DateRangePickerValue;
  status: string;
  answerText: string;
  answerFile: IFileTypes[];
  answerSelectedIndex?: number;
}

export default function CustomerVoicePage() {
  const [selectedValue, setSelectedValue] = useState<CustomerVoiceCondition>({
    search: '',
    type: '',
    dateRange: {},
    status: '',
    answerText: '',
    answerFile: [],
  });

  const handleValueChange = (key: keyof CustomerVoiceCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };
  return (
    <>
      <Card className="p-0">
        <Flex className="border-b p-5" justifyContent="start">
          <Title>1:1 상담</Title>
          <VerticalDivider height={20} className="mx-3" />
          <Title className="text-red-500">미답변 561건</Title>
        </Flex>
        <Flex flexDirection="col" className="p-5">
          <Flex className="border-b pb-5">
            <TextInput
              className="w-[900px] self-start"
              icon={MagnifyingGlassIcon}
              placeholder="고객명,아이디"
              value={selectedValue.search}
              onChange={e => handleValueChange('search', e.target.value)}
            />
          </Flex>
          <Flex justifyContent="start" className="gap-10 mt-3 border-b pb-3">
            <div className="w-[100px]">
              <RadioboxGroup
                value={selectedValue.type}
                onChange={value => handleValueChange('type', value)}
              >
                <Radiobox value={'all'} label="전체" />
              </RadioboxGroup>
            </div>
            <DateRangePicker
              className="w-[300px]"
              value={selectedValue.dateRange}
              onValueChange={value => handleValueChange('dateRange', value)}
              enableSelect={false}
              locale={ko}
              placeholder="기간 선택"
            />
            <RadioboxGroup
              value={selectedValue.status}
              onChange={value => handleValueChange('status', value)}
            >
              <Radiobox value={'all'} label="전체" />
              <Radiobox value={'N'} label="미답변" />
              <Radiobox value={'Y'} label="답변완료" />
            </RadioboxGroup>
          </Flex>

          <CustomButton type="secondary" className="mt-5 self-start">
            위 조건으로 검색
          </CustomButton>
        </Flex>
      </Card>
      <div className="p-5 bg-white border border-t-0">
        <Text className="mb-3">Total 56,845</Text>
        <Card className="p-0">
          <Flex className="p-2 bg-gray-200">
            <Text className="w-4/6 text-center">제목</Text>
            <Text className="w-1/6 text-center">작성일</Text>
            <Text className="w-1/6 text-center">답변 상태</Text>
          </Flex>
          {Array(10)
            .fill(null)
            .map((_, index) => {
              return (
                <Disclosure key={index}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={'w-full border-b'}
                        onClick={() => {
                          handleValueChange('answerSelectedIndex', index);
                          handleValueChange('answerText', '');
                          handleValueChange('answerFile', []);
                        }}
                      >
                        <Flex justifyContent="start" className="p-2 bg-gray-100">
                          <Text className="w-4/6 text-left">Q. 배송은 언제 되나요</Text>
                          <Text className="w-1/6">
                            <Flex justifyContent="center">
                              <Text>2023.09.05</Text>
                              <Text className="text-red-500 ml-1"> (5시간 전)</Text>
                            </Flex>
                          </Text>
                          <Text className="w-1/6 text-red-500">답변 상태</Text>
                        </Flex>
                      </Disclosure.Button>
                      <Transition
                        show={selectedValue.answerSelectedIndex === index}
                        className="overflow-hidden"
                        enter="transition transition-[max-height] duration-400 ease-in"
                        enterFrom="transform max-h-0"
                        enterTo="transform max-h-screen"
                        leave="transition transition-[max-height] duration-400 ease-out"
                        leaveFrom="transform max-h-screen"
                        leaveTo="transform max-h-0"
                      >
                        <Disclosure.Panel static>
                          <div className="p-5">
                            <textarea
                              className="border-2 bg-white p-3 rounded-md w-full"
                              rows={5}
                              placeholder="답변 내용을 입력해주세요."
                              value={selectedValue.answerText}
                              onChange={e => handleValueChange('answerText', e.target.value)}
                            ></textarea>
                            <Flex className="mt-3">
                              <FileInput
                                type="file"
                                value={selectedValue.answerFile}
                                multiple
                                onChange={value => handleValueChange('answerFile', value)}
                              />
                              <CustomButton className="self-start" type="secondary">
                                답변 등록
                              </CustomButton>
                            </Flex>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              );
            })}
        </Card>
        {/* <Pagination /> */}
      </div>
    </>
  );
}
