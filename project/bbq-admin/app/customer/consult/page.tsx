'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  Card,
  DateRangePicker,
  DateRangePickerValue,
  Divider,
  Flex,
  Text,
  TextInput,
  Title,
} from '@tremor/react';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import axios, { isAxiosError } from 'axios';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'rc-slider/assets/index.css';

import CustomButton from '@/app/components/CustomButton';
import CustomPagination from '@/app/components/CustomPagination';
import FileInput, { IFileTypes } from '@/app/components/FileInput';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import VerticalDivider from '@/app/components/VerticalDivider';
import { getAxios } from '@/app/lib/Axios';
import Loading from '@/app/loading';
import { CustomerQnaResponse } from '@/pages/api/customer/qna';

interface CustomerConsultCondition {
  search: string;
  consultType: string;
  allDateRange: DateRangePickerValue;
  allStatus: string;
  appDateRange: DateRangePickerValue;
  appStatus: string;
  mallDateRange: DateRangePickerValue;
  mallStatus: string;
  answerSelectedIndex?: number;
  isDeleted: string;
  isAnswered: string;
}

export default function CustomerConsultPage() {
  const [selectedValue, setSelectedValue] = useState<CustomerConsultCondition>({
    search: '',
    consultType: 'all',
    allDateRange: {
      from: new Date(-1),
      to: new Date(),
    },
    allStatus: 'all',
    appDateRange: {},
    appStatus: '',
    mallDateRange: {},
    mallStatus: '',
    isDeleted: 'all',
    isAnswered: 'all',
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [answerText, setAnswerText] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<string>('');
  const [answerFile, setAnswerFile] = useState<IFileTypes[]>([]);

  const handleValueChange = (key: keyof CustomerConsultCondition, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };
  const [data, setData] = useState<CustomerQnaResponse>();

  const getData = async () => {
    const result = await getAxios().get<CustomerQnaResponse>('/api/customer/qna', {
      params: {
        page: page,
        searchName: selectedValue.search,
        isAnswered:
          selectedValue.isAnswered == 'all'
            ? ''
            : selectedValue.isAnswered == 'true'
              ? true
              : false,
        isDeleted:
          selectedValue.isDeleted == 'all' ? '' : selectedValue.isDeleted == 'true' ? true : false,
        startDate: dayjs(selectedValue.allDateRange?.from).format('YYYY-MM-DD'),
        endDate: dayjs(selectedValue.allDateRange?.to).format('YYYY-MM-DD'),
      },
    });
    setData(result.data);
    handleValueChange('answerSelectedIndex', -1);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [page]);

  const handleSearch = async () => {
    await getData();
    setPage(1);
  };

  const getAdminName = async () => {
    const session = await getSession();
    return session?.adminUserInfo?.name || '';
  };

  const handleAnswerSubmit = async (id: number) => {
    try {
      const result = await getAxios().patch<CustomerQnaResponse>('/api/customer/qna', {
        adminAnswer: answerText,
        id: id,
        isDeleted: editMode ? (isDeleted == 'true' ? true : false) : false,
        answeredBy: await getAdminName(),
      });
      if (result.status == 200) {
        alert('답변이 등록되었습니다.');
        setAnswerText('');
        setAnswerFile([]);
        setEditMode(false);
        getData();
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };
  if (data) {
    return (
      <>
        <Card className="p-0">
          <Flex className="border-b p-5" justifyContent="start">
            <Title>문의하기</Title>
            {/* <VerticalDivider height={20} className="mx-3" />
          <Title className="text-red-500">미답변 561건</Title> */}
          </Flex>
          <Flex flexDirection="col" className="p-5">
            <Flex className="pb-5">
              <TextInput
                className="w-[900px] self-start"
                icon={MagnifyingGlassIcon}
                placeholder="제목, 내용, 고객명, 고객 전화번호, 패밀리점명, 매장 유선번호, 답변자"
                value={selectedValue.search}
                onChange={e => handleValueChange('search', e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </Flex>
            <Flex justifyContent="start" className="gap-5" flexDirection="col" alignItems="start">
              {/* <div className="w-[100px]">
              <RadioboxGroup
                value={selectedValue.consultType}
                onChange={(value) => handleValueChange('consultType', value)}
              >
                <Radiobox value={'all'} label="전체" />
              </RadioboxGroup>
            </div> */}
              <Flex justifyContent="start" className="border-b pb-5">
                <Text className="w-[100px]">기간 설정</Text>
                <DateRangePicker
                  disabled={selectedValue.consultType !== 'all'}
                  className="w-[300px]"
                  value={selectedValue.allDateRange}
                  onValueChange={value => handleValueChange('allDateRange', value)}
                  enableSelect={false}
                  locale={ko}
                  placeholder="기간 선택"
                />
              </Flex>
              <Flex justifyContent="start" className="border-b pb-5">
                <Text className="w-[100px]">답변 상태</Text>
                <Flex className="gap-5" justifyContent="start">
                  <RadioboxGroup
                    value={selectedValue.isAnswered}
                    onChange={value => handleValueChange('isAnswered', value)}
                  >
                    <Radiobox value={'all'} label="전체" />
                    <Radiobox value={'false'} label="미답변" />
                    <Radiobox value={'true'} label="답변완료" />
                  </RadioboxGroup>
                </Flex>
              </Flex>
              <Flex justifyContent="start" className="border-b pb-5">
                <Text className="w-[100px]">공개 상태</Text>
                <Flex className="gap-5" justifyContent="start">
                  <RadioboxGroup
                    value={selectedValue.isDeleted}
                    onChange={value => handleValueChange('isDeleted', value)}
                  >
                    <Radiobox value={'all'} label="전체" />
                    <Radiobox value={'false'} label="공개" />
                    <Radiobox value={'true'} label="비공개" />
                  </RadioboxGroup>
                </Flex>
              </Flex>
            </Flex>
            {/* <Flex justifyContent="start" className="gap-10 mt-3 border-b pb-3">
            <div className="w-[100px]">
              <RadioboxGroup
                value={selectedValue.consultType}
                onChange={(value) => handleValueChange('consultType', value)}
              >
                <Radiobox value={'app'} label="주문앱" />
              </RadioboxGroup>
            </div>
            <DateRangePicker
              disabled={selectedValue.consultType !== 'app'}
              className="w-[300px]"
              value={selectedValue.appDateRange}
              onValueChange={(value) =>
                handleValueChange('appDateRange', value)
              }
              enableSelect={false}
              locale={ko}
              placeholder="기간 선택"
            />
            <RadioboxGroup
              disabled={selectedValue.consultType !== 'app'}
              value={selectedValue.appStatus}
              onChange={(value) => handleValueChange('appStatus', value)}
            >
              <Radiobox value={'all'} label="전체" />
              <Radiobox value={'N'} label="미답변" />
              <Radiobox value={'Y'} label="답변완료" />
            </RadioboxGroup>
          </Flex>
          <Flex justifyContent="start" className="gap-10 mt-3 border-b pb-3">
            <div className="w-[100px]">
              <RadioboxGroup
                value={selectedValue.consultType}
                onChange={(value) => handleValueChange('consultType', value)}
              >
                <Radiobox value={'mall'} label="자사몰" />
              </RadioboxGroup>
            </div>
            <DateRangePicker
              disabled={selectedValue.consultType !== 'mall'}
              className="w-[300px]"
              value={selectedValue.mallDateRange}
              onValueChange={(value) =>
                handleValueChange('mallDateRange', value)
              }
              enableSelect={false}
              locale={ko}
              placeholder="기간 선택"
            />
            <RadioboxGroup
              disabled={selectedValue.consultType !== 'mall'}
              value={selectedValue.mallStatus}
              onChange={(value) => handleValueChange('mallStatus', value)}
            >
              <Radiobox value={'all'} label="전체" />
              <Radiobox value={'N'} label="미답변" />
              <Radiobox value={'Y'} label="답변완료" />
            </RadioboxGroup>
          </Flex> */}
            <CustomButton type="secondary" className="mt-5 self-start" onClick={handleSearch}>
              위 조건으로 검색
            </CustomButton>
          </Flex>
        </Card>
        <div className="p-5 bg-white border border-t-0">
          <Flex alignItems="center" className="mb-3">
            <Text>Total {data.totalElements.toLocaleString()}</Text>
            <CustomButton
              onClick={() =>
                window.open(
                  `/api/customer/excel?searchName=${selectedValue.search}&${
                    selectedValue.isAnswered == 'all'
                      ? ''
                      : `isAnswered=${selectedValue.isAnswered == 'true' ? true : false}&`
                  }${
                    selectedValue.isDeleted == 'all'
                      ? ''
                      : `isDeleted=${selectedValue.isDeleted == 'true' ? true : false}&`
                  }startDate=${dayjs(selectedValue.allDateRange?.from).format(
                    'YYYY-MM-DD',
                  )}&endDate=${dayjs(selectedValue.allDateRange?.to).format('YYYY-MM-DD')}`,
                  '_blank',
                )
              }
              type="secondary"
            >
              엑셀 다운로드
            </CustomButton>
          </Flex>
          <Card className="p-0 consult-card">
            <Flex className="p-5 bg-gray-100">
              <Text className="w-1/12 text-center">번호</Text>
              {/* <Text className="w-1/12 text-center">카테고리</Text> */}
              <Text className="w-3/12 text-center">제목</Text>
              <Text className="w-2/12 text-center">작성자</Text>
              <Text className="w-2/12 text-center">고객 전화번호</Text>
              <Text className="w-1/12 text-center">패밀리점명</Text>
              <Text className="w-1/12 text-center">매장 유선번호</Text>
              <Text className="w-1/12 text-center">작성일</Text>
              <Text className="w-1/12 text-center">답변 상태</Text>
              <Text className="w-1/12 text-center">공개 여부</Text>
            </Flex>
            {data.content &&
              data.content.map((item, index) => {
                return (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={'w-full border-b'}
                          onClick={() => {
                            if (selectedValue.answerSelectedIndex === index) {
                              handleValueChange('answerSelectedIndex', -1);
                              return;
                            }
                            handleValueChange('answerSelectedIndex', index);
                            setAnswerText('');
                            setAnswerFile([]);
                            setEditMode(false);
                          }}
                        >
                          <Flex justifyContent="start" className="p-5">
                            <Text className="w-1/12">{item.id}</Text>
                            {/* <Text className="w-1/12">{item.category}</Text> */}
                            <Text className="w-3/12 text-left">{item.title}</Text>
                            <Text className="w-2/12">{item.name}</Text>
                            <Text className="w-2/12">{item.phoneNumber}</Text>
                            <Text className="w-1/12">{item.familyName}</Text>
                            <Text className="w-1/12">{item.familyTel}</Text>
                            <Text className="w-1/12">
                              <Flex justifyContent="center">
                                <Text>{item.createdAt}</Text>
                              </Flex>
                            </Text>
                            <Text
                              className={`w-1/12 ${
                                item.isAnswered ? 'text-emerald-500' : 'text-red-500'
                              }`}
                            >
                              {item.isAnswered ? '답변 완료' : '미답변'}
                            </Text>
                            {item.isDeleted ? (
                              <Text className="w-1/12 text-red-500">비공개</Text>
                            ) : (
                              <Text className="w-1/12">공개</Text>
                            )}
                          </Flex>
                        </Disclosure.Button>
                        <Transition
                          show={selectedValue.answerSelectedIndex === index}
                          className="overflow-hidden border-b"
                          enter="transition transition-[max-height] duration-400 ease-in"
                          enterFrom="transform max-h-0"
                          enterTo="transform max-h-screen"
                          leave="transition transition-[max-height] duration-400 ease-out"
                          leaveFrom="transform max-h-screen"
                          leaveTo="transform max-h-0"
                        >
                          <Disclosure.Panel static>
                            {!item.isAnswered ? (
                              <div className="p-5">
                                {item.contentImageUrl1 && (
                                  <img
                                    className="mb-5 max-w-[300px]"
                                    alt="contentImageUrl1"
                                    src={item.contentImageUrl1}
                                  />
                                )}

                                {item.contentImageUrl2 && (
                                  <img
                                    className="mb-5 max-w-[300px]"
                                    alt="contentImageUrl2"
                                    src={item.contentImageUrl2}
                                  />
                                )}

                                {item.contentImageUrl3 && (
                                  <img
                                    className="mb-5 max-w-[300px]"
                                    alt="contentImageUrl3"
                                    src={item.contentImageUrl3}
                                  />
                                )}

                                <Text className="mb-5">{item.content}</Text>
                                <textarea
                                  className="border-2 bg-white p-3 rounded-md w-full"
                                  rows={5}
                                  value={answerText}
                                  placeholder="답변 내용을 입력해주세요."
                                  onChange={e => setAnswerText(e.target.value)}
                                ></textarea>

                                <Flex className="mt-3" justifyContent="end">
                                  {/* <FileInput
                                  type="file"
                                  multiple
                                  value={selectedValue.answerFile}
                                  onChange={(value) =>
                                    handleValueChange('answerFile', value)
                                  }
                                /> */}
                                  <CustomButton
                                    className="self-end"
                                    type="secondary"
                                    onClick={() => handleAnswerSubmit(item.id)}
                                  >
                                    답변 등록
                                  </CustomButton>
                                </Flex>
                              </div>
                            ) : (
                              <Flex flexDirection="col" className="p-5">
                                <Flex alignItems="start" flexDirection="col" justifyContent="start">
                                  {item.contentImageUrl1 && (
                                    <img
                                      className="mb-5 max-w-[300px]"
                                      alt="contentImageUrl1"
                                      src={item.contentImageUrl1}
                                    />
                                  )}

                                  {item.contentImageUrl2 && (
                                    <img
                                      className="mb-5 max-w-[300px]"
                                      alt="contentImageUrl2"
                                      src={item.contentImageUrl2}
                                    />
                                  )}

                                  {item.contentImageUrl3 && (
                                    <img
                                      className="mb-5 max-w-[300px]"
                                      alt="contentImageUrl3"
                                      src={item.contentImageUrl3}
                                    />
                                  )}
                                  <Text className="mb-5">{item.content}</Text>
                                </Flex>
                                {!editMode ? (
                                  <Flex
                                    alignItems="start"
                                    flexDirection="col"
                                    justifyContent="start"
                                    className="bg-gray-100 p-5 border"
                                  >
                                    <Flex justifyContent="start" className="mb-3">
                                      <ArrowRightIcon className="mr-2" width={15} />
                                      <Text className="font-bold">답변 | {item.answeredAt}</Text>
                                    </Flex>
                                    <Text>{item.adminAnswer}</Text>
                                  </Flex>
                                ) : (
                                  <Flex>
                                    <textarea
                                      className="border-2 bg-white p-3 rounded-md w-full"
                                      rows={5}
                                      value={answerText}
                                      placeholder="답변 내용을 입력해주세요."
                                      onChange={e => setAnswerText(e.target.value)}
                                    ></textarea>
                                  </Flex>
                                )}
                                <Flex justifyContent="start" className="mt-5">
                                  <Text className="w-[100px]">답변자</Text>
                                  <Text>{item.answeredBy}</Text>
                                  {editMode && (
                                    <>
                                      <Text className="w-[100px] ml-5">공개 상태</Text>
                                      <Flex justifyContent="start" className="gap-3">
                                        <RadioboxGroup
                                          value={isDeleted}
                                          onChange={value => setIsDeleted(value)}
                                        >
                                          <Radiobox value={'false'} label="공개" />
                                          <Radiobox value={'true'} label="비공개" />
                                        </RadioboxGroup>
                                      </Flex>
                                    </>
                                  )}
                                  {!editMode ? (
                                    <CustomButton
                                      onClick={() => {
                                        if (item.adminAnswer) {
                                          setAnswerText(item.adminAnswer);
                                        }
                                        setEditMode(true);
                                        setIsDeleted('false');
                                      }}
                                      type="tertiary"
                                      className="ml-auto"
                                    >
                                      답변 수정
                                    </CustomButton>
                                  ) : (
                                    <CustomButton
                                      onClick={() => handleAnswerSubmit(item.id)}
                                      type="secondary"
                                      className="ml-auto"
                                    >
                                      수정 완료
                                    </CustomButton>
                                  )}
                                </Flex>
                              </Flex>
                            )}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                );
              })}
          </Card>
          <CustomPagination
            activePage={page}
            perPage={20}
            totalItemsCount={data.totalElements}
            handlePageChange={value => setPage(value)}
          />
        </div>
      </>
    );
  }
}
