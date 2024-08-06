'use client';

import { Button, Card, Flex, Text, TextInput, Title } from '@tremor/react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';
import dayjs from 'dayjs';

import CustomButton from '@/app/components/CustomButton';
import CustomDatePicker from '@/app/components/CustomDatePicker';
import { IFileTypes } from '@/app/components/FileInput';
import ImageFileInput from '@/app/components/ImageFileInput';
import { useModalContext } from '@/app/components/Modal';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { Content } from '@/pages/api/content/event';
import { createFileType } from '@/utils/createFileType';

import PopupList from '../Modal/PopupList';

export interface Popup {
  page: string;
  size: string;
  isActive: string;
  exposureOrder: string;
  androidUrl: string;
  iosUrl: string;
  pcUrl: string;
  startsAt: Date;
  endsAt: Date;
}

export default function PopupRegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openModal } = useModalContext();
  const inputEl = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState('');
  const [urlIsActive, setUrlIsActive] = useState('false');
  const [selectedValue, setSelectedValue] = useState<Popup>({
    page: '1',
    size: '10',
    isActive: 'true',
    androidUrl: '',
    iosUrl: '',
    pcUrl: '',
    exposureOrder: '',
    startsAt: new Date(dayjs().toDate()),
    endsAt: new Date(dayjs().add(7, 'day').format('YYYY-MM-DD 23:59:59')),
  });

  const [popupThumbnailImageFile, setPopupThumbnailImageFile] = useState<IFileTypes[]>([]);
  const [type, setType] = useState<string>('write');

  const handleValueChange = <T extends Popup, K extends keyof T>(key: K, value: T[K]) => {
    setSelectedValue(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getPopupData = async (id: string) => {
    const res = await getAxios().get(`/api/content/popup/${id}`);

    setImageSrc(res.data.imageUrl);

    setSelectedValue(prevState => {
      return {
        ...prevState,
        isActive: String(res.data.isActive),
        androidUrl: res.data.aosUrl,
        iosUrl: res.data.iosUrl,
        pcUrl: res.data.webUrl,
        exposureOrder: String(res.data.priority),
        startsAt: new Date(res.data.startDate),
        endsAt: new Date(res.data.endDate),
      };
    });
  };

  // 이미지 미리보기 삭제하는 함수
  const popupOnDeleteImage = useCallback(() => {
    // form에서 해당 이미지 정보 삭제
    setPopupThumbnailImageFile([]);
    // 이미지 미리보기 삭제
    setImageSrc('');
    if (inputEl.current) {
      inputEl.current.value = '';
    }
  }, []);

  // 이미지 미리보기 보여주는 함수
  const encodeFileToBase64 = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      // 파일 타입 검사
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('jpg, jpeg, png 형식의 이미지만 등록됩니다.');
        return;
      }

      // 파일 크기 검사 (2MB 이하)
      if (file.size > 2 * 1024 * 1024) {
        alert('파일 크기는 2MB 이하이어야 합니다.');
        return;
      }

      const nextPreview = URL.createObjectURL(file);
      setImageSrc(nextPreview);
      setPopupThumbnailImageFile([createFileType(file)]);
    }
  };

  const register = async () => {
    try {
      if (!popupThumbnailImageFile.find(v => v.object)) {
        alert('핍압 이미지를 추가해주세요.');
        return;
      }

      const formData = new FormData();
      formData.append('imageFile', popupThumbnailImageFile[0].object);
      formData.append(
        'popupInfo',
        JSON.stringify({
          isActive: selectedValue.isActive === 'true' ? true : false,
          startDate: dayjs(selectedValue.startsAt).format('YYYY-MM-DD'),
          endDate: dayjs(selectedValue.endsAt).format('YYYY-MM-DD'),
          isUrl:  urlIsActive === 'true' ? true : false,
          aosUrl: selectedValue.androidUrl,
          iosUrl: selectedValue.iosUrl,
          webUrl: selectedValue.pcUrl,
        }),
      );

      const result = await getAxios().post('/api/content/popup/register', formData);
      if (result.status === 200) {
        alert('등록되었습니다.');
        router.push('/content/popup');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert(error);
      }
    }
  };

  const edit = async () => {
    try {
      if (searchParams) {
        if (!imageSrc) {
          alert('썸네일 이미지를 추가해주세요.');
          return;
        }

        const formData = new FormData();

        if (popupThumbnailImageFile.length > 0) {
          formData.append('imageFile', popupThumbnailImageFile[0].object);
        }
        formData.append(
          'popupInfo',
          JSON.stringify({
            isActive: selectedValue.isActive === 'true' ? true : false,
            startDate: dayjs(selectedValue.startsAt).format('YYYY-MM-DD'),
            endDate: dayjs(selectedValue.endsAt).format('YYYY-MM-DD'),
            isUrl:  urlIsActive === 'true' ? true : false,
            aosUrl: selectedValue.androidUrl,
            iosUrl: selectedValue.iosUrl,
            webUrl: selectedValue.pcUrl,
          }),
        );

        const result = await getAxios().patch('/api/content/popup/register', formData, {
          params: {
            id: searchParams.get('id'),
          },
        });

        if (result.status === 200) {
          alert('수정되었습니다.');
          router.push('/content/popup');
        }
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const deleteItem = async () => {
    try {
      if (searchParams) {
        const isConfirmed = confirm("정말 삭제 하시겠습니까?");
        if (!isConfirmed) {
          return;
        }

        const result = await getAxios().delete('/api/content/popup', {
          params: {
            id: searchParams.get('id'),
          },
        });

        if (result.status === 200) {
          alert('삭제되었습니다.');
          router.push('/content/popup');
        }
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      }
    }
  }

  const getEdit = async () => {
    if (!searchParams) return;
    const popupId = searchParams.get('id');
    if (popupId) {
      await getPopupData(popupId);
      setType('edit');
    }
  };

  useEffect(() => {
    getEdit();
  }, []);

  return (
    <>
      <Card className="p-5 !border-tremor-border-grayED2">
        <p className="!text-sm/[17px] text-tremor-content-emphasis">
          * 표시는 필수입력 항목입니다.
        </p>
      </Card>
      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">활성 상태 *</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start">
          <Flex justifyContent="start" className="gap-10">
            <RadioboxGroup
              disabled={false}
              value={selectedValue.isActive}
              onChange={value => handleValueChange('isActive', value)}
            >
              <Radiobox className="!text-sm/[14px] text-[#46477A]" value={'true'} label="활성화" />
              <Radiobox
                className="!text-sm/[14px] text-[#46477A]"
                value={'false'}
                label="비활성화"
              />
            </RadioboxGroup>
          </Flex>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">게시 기간 *</Title>
        </Flex>
        <Flex>
          <div className="w-full">
            <Card className="flex flex-row p-0 !border-0">
              <Flex
                className="border-r py-5  flex-1 bg-tremor-background-muted"
                justifyContent="center"
              >
                <Title className="w-[180px] !text-sm/[17px] text-center">시작일시 *</Title>
              </Flex>

              <Flex
                className="ml-3 p-5"
                justifyContent="start"
                flexDirection="col"
                alignItems="start"
              >
                <Flex className="!w-[640px]">
                  <CustomDatePicker
                    title="시작시간"
                    dateFormatCalendar={'yyyy년 MM월'}
                    dateFormat={'yyyy년 MM월 dd일 HH시 mm분'}
                    className={'w-[280px] border focus:outline-none !pl-[38px]'}
                    showIcon={true}
                    showTimeSelect={true}
                    selected={selectedValue.startsAt}
                    onChange={date => handleValueChange('startsAt', date)}
                  />
                </Flex>
              </Flex>
            </Card>
            <Card className="flex flex-row p-0 border-t-2 !border-b-0 !border-l-0 !border-r-0 !border-tremor-border-grayED2">
              <Flex
                className="border-r py-5  flex-1 bg-tremor-background-muted"
                justifyContent="center"
              >
                <Title className="w-[180px] !text-sm/[17px] text-center">종료일시 *</Title>
              </Flex>

              <Flex
                className="ml-3 p-5"
                justifyContent="start"
                flexDirection="col"
                alignItems="start"
              >
                <Flex className="!w-[640px]">
                  <CustomDatePicker
                    title="종료시간"
                    dateFormatCalendar={'yyyy년 MM월'}
                    dateFormat={'yyyy년 MM월 dd일 HH시 mm분'}
                    className={'w-[280px] border focus:outline-none !pl-[38px]'}
                    showIcon={true}
                    showTimeSelect={true}
                    selected={selectedValue.endsAt}
                    onChange={date => handleValueChange('endsAt', date)}
                  />
                </Flex>
              </Flex>
            </Card>
          </div>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">
            핍압 이미지 *
          </Title>
        </Flex>
        <Flex>
          <div className="w-full">
            <div className="p-[20px]">
              <ImageFileInput
                ref={inputEl}
                division={'mobile'}
                className={'w-[200px] h-[140px]'}
                imageSrc={imageSrc}
                onDeleteImage={popupOnDeleteImage}
                encodeFileToBase64={encodeFileToBase64}
              />
              <Text className="text-[#DE1F38] text-[12px] mt-[12px]">
                * 800x560 크기의 2MB 이하,  파일 형식은 jpg, jpeg, png 만 등록 가능합니다.
              </Text>
            </div>
          </div>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">URL 입력</Title>
        </Flex>
        <Flex>
          <div className="w-full">
            <Card className="flex flex-row p-0 !border-0">
              <Flex
                className="border-r py-5 flex-1 bg-tremor-background-muted"
                justifyContent="center"
              >
                <Title className="w-[180px] !text-sm/[17px] text-center">사용 여부 *</Title>
              </Flex>

              <Flex className="ml-3 p-5" justifyContent="start">
                <Flex justifyContent="start" className="gap-10">
                  <RadioboxGroup
                    disabled={false}
                    value={urlIsActive}
                    onChange={value => setUrlIsActive(value)}
                  >
                    <Radiobox
                      className="!text-sm/[14px] text-[#46477A]"
                      value={'true'}
                      label="사용"
                    />
                    <Radiobox
                      className="!text-sm/[14px] text-[#46477A]"
                      value={'false'}
                      label="미사용"
                    />
                  </RadioboxGroup>
                </Flex>
              </Flex>
            </Card>
            {urlIsActive === 'true' && (
              <div>
                <div className="py-[16px] px-[20px] border-[1px] !border-x-0">
                  <CustomButton
                    className="w-[200px] h-[48px] !bg-[#00C9B5] !rounded-none !border-0"
                    type="secondary"
                    onClick={() =>
                      openModal(
                        '이벤트 선택하기',
                        '',
                        <PopupList
                          setDataContent={value => (
                            handleValueChange('androidUrl', 'bbqapp://open?type=event&id=' + value),
                            handleValueChange('iosUrl', 'bbqapp://open?type=event&id=' + value),
                            handleValueChange('pcUrl', 'https://bbq.co.kr/events/' + value)
                          )}
                          paramsData={{ ...selectedValue }}
                        />,
                      )
                    }
                  >
                    이벤트 선택하기
                  </CustomButton>
                  <p className="text-xs text-red-500 mt-2 font-[600]">
                    * 이벤트를 선택하여 URL을 불러오거나, 직접 URL을 입력해 주세요.
                  </p>
                </div>

                <Card className="flex flex-row p-0 !border-0 !border-b">
                  <Flex
                    className="border-r py-5  flex-1 bg-tremor-background-muted"
                    justifyContent="center"
                  >
                    <Title className="w-[180px] !text-sm/[17px] text-center">안드로이드</Title>
                  </Flex>

                  <Flex
                    className="ml-3 p-5"
                    justifyContent="center"
                    flexDirection="col"
                    alignItems="start"
                  >
                    <Flex className="w-[350px]">
                      <TextInput
                        className="!rounded-none shadow-transparent"
                        placeholder="안드로이드용 URL을 직접 입력해 주세요"
                        disabled={true}
                        value={selectedValue.androidUrl && selectedValue.androidUrl}
                        onChange={e => {
                          handleValueChange('androidUrl', e.target.value);
                        }}
                      />
                    </Flex>
                    <p className="text-xs text-red-500 mt-2 font-[600]">
                      * https:// 또는 bbqapp:// 으로 시작하는 주소만 사용할 수 있습니다. 앱 내부 링크(bbqapp://)를 사용하려면 개발사에 문의하여 정확한 링크를 사용해 주세요.
                    </p>
                  </Flex>
                </Card>

                <Card className="flex flex-row p-0 !border-0 !border-b">
                  <Flex
                    className="border-r py-5  flex-1 bg-tremor-background-muted"
                    justifyContent="center"
                  >
                    <Title className="w-[180px] !text-sm/[17px] text-center">iOS</Title>
                  </Flex>

                  <Flex
                    className="ml-3 p-5"
                    justifyContent="center"
                    flexDirection="col"
                    alignItems="start"
                  >
                    <Flex className="w-[350px]">
                      <TextInput
                        className="!rounded-none shadow-transparent"
                        placeholder="iOS용 URL을 직접 입력해 주세요"
                        disabled={true}
                        value={selectedValue.iosUrl && selectedValue.iosUrl}
                        onChange={e => {
                          handleValueChange('iosUrl', e.target.value);
                        }}
                      />
                    </Flex>
                    <p className="text-xs text-red-500 mt-2 font-[600]">
                      * bbqapp:// 으로 시작하는 주소만 사용할 수 있습니다. 개발사에 문의하여 정확한
                      링크를 사용해 주세요.
                    </p>
                  </Flex>
                </Card>

                <Card className="flex flex-row p-0 !border-0">
                  <Flex
                    className="border-r py-5 flex-1 bg-tremor-background-muted"
                    justifyContent="center"
                  >
                    <Title className="w-[180px] !text-sm/[17px] text-center">PC</Title>
                  </Flex>

                  <Flex
                    className="ml-3 p-5"
                    justifyContent="center"
                    flexDirection="col"
                    alignItems="start"
                  >
                    <Flex className="w-[350px]">
                      <TextInput
                        className="!rounded-none shadow-transparent"
                        placeholder="PC용 URL을 직접 입력해 주세요"
                        disabled={true}
                        value={selectedValue.pcUrl && selectedValue.pcUrl}
                        onChange={e => {
                          handleValueChange('pcUrl', e.target.value);
                        }}
                      />
                    </Flex>
                  </Flex>
                </Card>
              </div>
            )}
          </div>
        </Flex>
      </Card>

      <Flex justifyContent="end" className="py-5">
        <Button
          onClick={() => router.back()}
          className="bg-white !border-tremor-border-grayED2 hover:bg-white text-gray-500 w-[160px] h-[50px] !rounded-none"
        >
          취소
        </Button>
        {type === 'write' ? (
          <Button
            className="bg-tremor-content-emphasis border-none ml-3 hover:bg-gray-700 text-white w-[160px] h-[50px] !rounded-none"
            onClick={register}
          >
            등록 완료
          </Button>
        ) : (
          <>
            <Button
              className="bg-red-500 border-none ml-3 hover:bg-gray-700 text-white w-[160px] h-[50px] !rounded-none"
              onClick={deleteItem}
            >
              삭제
            </Button>
            <Button
              className="bg-tremor-content-emphasis border-none ml-3 hover:bg-gray-700 text-white w-[160px] h-[50px] !rounded-none"
              onClick={edit}
            >
              수정 완료
            </Button>
          </>
        )}
      </Flex>
    </>
  );
}
