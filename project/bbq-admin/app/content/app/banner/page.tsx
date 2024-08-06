'use client';

import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
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

import { Checkbox, CheckboxGroup } from '@/app/components/Checkbox';

import CustomButton from '../../../components/CustomButton';
import FileInput, { IFileTypes } from '../../../components/FileInput';
import { useModalContext } from '../../../components/Modal';
import MobilePreview from '../.././Modal/MobilePreview';
import PCPreview from '../.././Modal/PCPreview';

interface Banner {
  id: number;
  file: IFileTypes[];
  order: number;
  title: string;
  url: string;
  dateRange: DateRangePickerValue;
}

interface ContentAppBannerPageCondition {
  introFile: IFileTypes[];
  appBannerFile: IFileTypes[];
  pcBannerFile: IFileTypes[];
  bannerTitle: string;
  bannerUrl: string;
  bannerDateRangeCheck: string[];
  bannerDateRange: DateRangePickerValue;
  appBanner: Banner[];
  pcBanner: Banner[];
}

const initialBannerState: Banner[] = [
  {
    id: 1,
    file: [],
    order: 1,
    title: '',
    url: '',
    dateRange: {},
  },
  {
    id: 2,
    file: [],
    order: 2,
    title: '',
    url: '',
    dateRange: {},
  },
  {
    id: 3,
    file: [],
    order: 3,
    title: '',
    url: '',
    dateRange: {},
  },
];

export default function ContentAppBannerPage() {
  const [selectedValue, setSelectedValue] = useState<ContentAppBannerPageCondition>({
    introFile: [],
    appBannerFile: [],
    pcBannerFile: [],
    bannerTitle: '',
    bannerUrl: '',
    bannerDateRangeCheck: [],
    bannerDateRange: {},
    appBanner: initialBannerState,
    pcBanner: initialBannerState,
  });
  const handleValueChange = (
    key: keyof ContentAppBannerPageCondition,
    value: string | object | number[],
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const handleBannerOrderChange = (
    id: number,
    direction: 'up' | 'down',
    bannerType: 'appBanner' | 'pcBanner',
  ) => {
    setSelectedValue(prevSelectedValue => {
      const updatedAppBanner = [...prevSelectedValue[bannerType]];
      const index = updatedAppBanner.findIndex(banner => banner.id === id);

      if (index > -1) {
        const targetBanner = updatedAppBanner[index];
        updatedAppBanner.splice(index, 1);

        if (direction === 'up') {
          updatedAppBanner.splice(index - 1, 0, targetBanner);
        } else {
          updatedAppBanner.splice(index + 1, 0, targetBanner);
        }
      }

      return {
        ...prevSelectedValue,
        [bannerType]: updatedAppBanner,
      };
    });
  };

  const handleBannerDelete = (id: number, bannerType: 'appBanner' | 'pcBanner') => {
    setSelectedValue(prevSelectedValue => {
      const updatedAppBanner = prevSelectedValue[bannerType].filter(banner => banner.id !== id);
      return {
        ...prevSelectedValue,
        [bannerType]: updatedAppBanner,
      };
    });
  };

  const handleBannerDataChange = (
    order: number,
    bannerType: 'appBanner' | 'pcBanner',
    dataType: any,
    value: any,
  ) => {
    setSelectedValue(prevState => ({
      ...prevState,
      [bannerType]:
        prevState[bannerType] &&
        prevState[bannerType].map(group =>
          group.order === order ? { ...group, [dataType]: value } : group,
        ),
    }));
  };

  const { openModal } = useModalContext();

  return (
    <>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>주문화면 인트로 화면</Title>
        </div>
        <div className="p-5">
          <Flex justifyContent="start">
            <Title className="w-[200px] self-start">인트로 등록</Title>
            <div>
              <FileInput
                type="image"
                multiple={false}
                value={selectedValue.introFile}
                onChange={value => handleValueChange('introFile', value)}
              />
              <Text className="text-emerald-500 mt-3">
                권장 크기 : 1,242 X 2,688 픽셀
                <br />
                동영상 mp4파일 / 이미지 jpg, jpeg,gif,png 형식의 이미지만 등록됩니다.
                <br />
                새로운 파일 등록시 기존 인트로 파일은 자동 삭제 됩니다.
              </Text>
            </div>
          </Flex>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="border-b p-5">
          <Title>주문앱 메인 배너 등록하기</Title>
        </div>
        <div className="p-5">
          <Flex justifyContent="start" className="border-b py-5">
            <Title className="w-[200px] self-start">App 배너</Title>
            <div>
              <FileInput
                type="image"
                multiple={false}
                value={selectedValue.appBannerFile}
                onChange={value => handleValueChange('appBannerFile', value)}
              />
              <Text className="text-emerald-500 mt-3">
                권장 크기 : 1,200 ✗ 800 픽셀 (6:4 비율) 동영상 mp4 파일 / 이미지 jpg, jpeg,gif,png
                형식의 파일만 등록 가능합니다.
              </Text>
            </div>
          </Flex>
          <Flex justifyContent="start" className="border-b py-5">
            <div className="w-[200px] self-start">
              <Title className="inline">PC 배너</Title>
            </div>
            <div>
              <FileInput
                type="image"
                multiple={false}
                value={selectedValue.pcBannerFile}
                onChange={value => handleValueChange('pcBannerFile', value)}
              />
              <Text className="text-emerald-500 mt-3">
                권장 크기 : 956 ✗ 450 픽셀
                <br />
                동영상 mp4 파일 / 이미지 jpg, jpeg,gif,png 형식의 파일만 등록 가능합니다.
              </Text>
            </div>
          </Flex>
          <Flex justifyContent="start" className="py-5">
            <div className="w-[230px] self-start"></div>
            <Flex alignItems="start" justifyContent="start" className="gap-3" flexDirection="col">
              <TextInput
                placeholder="배너 제목"
                className="w-[500px]"
                value={selectedValue.bannerTitle}
                onChange={e => handleValueChange('bannerTitle', e.target.value)}
              />
              <TextInput
                placeholder="링크 URL 입력"
                className="w-[500px]"
                value={selectedValue.bannerUrl}
                onChange={e => handleValueChange('bannerUrl', e.target.value)}
              />
              <Flex justifyContent="start">
                <CheckboxGroup
                  value={selectedValue.bannerDateRangeCheck}
                  onChange={value => handleValueChange('bannerDateRangeCheck', value)}
                >
                  <Checkbox value={'Y'} label={'기간 설정'} />
                </CheckboxGroup>
                <DateRangePicker
                  disabled={selectedValue.bannerDateRangeCheck[0] !== 'Y'}
                  className="w-[300px] ml-5"
                  value={selectedValue.bannerDateRange}
                  onValueChange={value => handleValueChange('bannerDateRange', value)}
                  enableSelect={false}
                  locale={ko}
                  placeholder="기간 선택"
                />
              </Flex>
              <CustomButton className="w-[150px]" type="primary">
                배너 등록
              </CustomButton>
            </Flex>
          </Flex>
        </div>
      </Card>
      <Card className="p-0 mt-5">
        <div className="p-5">
          <Flex justifyContent="start" className="py-5">
            <Flex
              alignItems="start"
              justifyContent="start"
              flexDirection="col"
              className="w-[200px] self-start gap-3"
            >
              <Flex justifyContent="start">
                <Title>등록된 배너</Title>
                <Text>(</Text>
                <Text className="text-emerald-500">5</Text>
                <Text>)</Text>
              </Flex>
              <CustomButton
                className="w-[100px]"
                type="tertiary"
                onClick={() => openModal('', '', <MobilePreview type={'app'} />)}
              >
                APP 미리보기
              </CustomButton>
              <CustomButton
                className="w-[100px]"
                type="tertiary"
                onClick={() => openModal('', '', <PCPreview type={'app'} />)}
              >
                PC 미리보기
              </CustomButton>
            </Flex>
            <div>
              <Text>
                ➀ 배너 순서 변경 : <ArrowUpCircleIcon className="inline" width={15} /> 또는{' '}
                <ArrowDownCircleIcon className="inline" width={15} /> 를 클릭하여 노출 순서 바꿀 수
                있습니다.
                <br />
                ➁ 내용 수정 후 ‘수정된 내용 저장’ 버튼을 클릭하시고 수정을 완료 하세요.
                <br />➂ 이미지 클릭시 새로운 이미지로 변경 가능합니다.
              </Text>
              <Flex
                alignItems="start"
                flexDirection="col"
                justifyContent="start"
                className="border-b pb-10"
              >
                {selectedValue.appBanner.map((banner, index) => {
                  return (
                    <div key={banner.id}>
                      <Flex justifyContent="start" className="gap-1 my-3">
                        <Title className="mr-3 !text-2xl">APP {index + 1}</Title>

                        <ChevronDownIcon
                          width={20}
                          className="p-1 bg-white border border-gray-400 rounded-lg cursor-pointer"
                          onClick={() => handleBannerOrderChange(banner.id, 'down', 'appBanner')}
                        />
                        <ChevronUpIcon
                          width={20}
                          className="p-1 bg-white border border-gray-400 rounded-lg cursor-pointer"
                          onClick={() => handleBannerOrderChange(banner.id, 'up', 'appBanner')}
                        />
                      </Flex>
                      <Flex alignItems="start">
                        <FileInput
                          type="image"
                          multiple={false}
                          value={banner.file}
                          onChange={value =>
                            handleBannerDataChange(banner.order, 'appBanner', 'file', value)
                          }
                        />
                        <Flex flexDirection="col" className="gap-2 w-[350px] ml-3">
                          <TextInput
                            placeholder="배너 제목"
                            className="w-full"
                            value={banner.title}
                            onChange={e => {
                              handleBannerDataChange(
                                banner.order,
                                'appBanner',
                                'title',
                                e.target.value,
                              );
                            }}
                          />
                          <TextInput
                            placeholder="배너 링크"
                            className="w-full"
                            value={banner.url}
                            onChange={e => {
                              handleBannerDataChange(
                                banner.order,
                                'appBanner',
                                'url',
                                e.target.value,
                              );
                            }}
                          />
                          <DateRangePicker
                            className="w-full"
                            enableSelect={false}
                            locale={ko}
                            placeholder="기간 선택"
                            value={banner.dateRange}
                            onValueChange={value => {
                              handleBannerDataChange(banner.order, 'appBanner', 'dateRange', value);
                            }}
                          />
                          <Flex justifyContent="start" className=" cursor-pointer">
                            <CustomButton
                              type="tertiary"
                              onClick={() => handleBannerDelete(banner.id, 'appBanner')}
                            >
                              삭제
                            </CustomButton>
                          </Flex>
                        </Flex>
                      </Flex>
                    </div>
                  );
                })}
              </Flex>
              <Flex alignItems="start" flexDirection="col" justifyContent="start" className="">
                {selectedValue.pcBanner.map((banner, index) => {
                  return (
                    <div key={index}>
                      <Flex justifyContent="start" className="gap-1 my-3">
                        <Title className="mr-3 !text-2xl">WEB {index + 1}</Title>

                        <ChevronDownIcon
                          width={20}
                          className="p-1 bg-white border border-gray-400 rounded-lg cursor-pointer"
                          onClick={() => handleBannerOrderChange(banner.id, 'down', 'pcBanner')}
                        />
                        <ChevronUpIcon
                          width={20}
                          className="p-1 bg-white border border-gray-400 rounded-lg cursor-pointer"
                          onClick={() => handleBannerOrderChange(banner.id, 'up', 'pcBanner')}
                        />
                      </Flex>
                      <Flex alignItems="start">
                        <FileInput
                          type="image"
                          multiple={false}
                          value={banner.file}
                          onChange={value =>
                            handleBannerDataChange(banner.order, 'pcBanner', 'file', value)
                          }
                        />
                        <Flex flexDirection="col" className="gap-2 w-[350px] ml-3">
                          <TextInput
                            placeholder="배너 제목"
                            className="w-full"
                            value={banner.title}
                            onChange={e =>
                              handleBannerDataChange(
                                banner.order,
                                'pcBanner',
                                'title',
                                e.target.value,
                              )
                            }
                          />
                          <TextInput
                            placeholder="배너 링크"
                            className="w-full"
                            value={banner.url}
                            onChange={e =>
                              handleBannerDataChange(
                                banner.order,
                                'pcBanner',
                                'url',
                                e.target.value,
                              )
                            }
                          />
                          <DateRangePicker
                            className="w-full"
                            enableSelect={false}
                            locale={ko}
                            placeholder="기간 선택"
                            value={banner.dateRange}
                            onValueChange={value =>
                              handleBannerDataChange(banner.order, 'pcBanner', 'dateRange', value)
                            }
                          />
                          <Flex justifyContent="start" className="cursor-pointer">
                            <CustomButton
                              type="tertiary"
                              onClick={() => handleBannerDelete(banner.id, 'pcBanner')}
                            >
                              삭제
                            </CustomButton>
                          </Flex>
                        </Flex>
                      </Flex>
                    </div>
                  );
                })}
              </Flex>
            </div>
          </Flex>
        </div>
      </Card>
    </>
  );
}
