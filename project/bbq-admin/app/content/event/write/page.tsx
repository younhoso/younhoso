'use client';

import { Card, Divider, Flex, Text, TextInput, Title } from '@tremor/react';
import { getSession } from 'next-auth/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';
import dayjs from 'dayjs';

import CustomButton from '@/app/components/CustomButton';
import CustomDatePicker from '@/app/components/CustomDatePicker';
import { IFileTypes } from '@/app/components/FileInput';
import ImageFileInput from '@/app/components/ImageFileInput';
import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import { getAxios } from '@/app/lib/Axios';
import { createFileType } from '@/utils/createFileType';

const Editor = dynamic(() => import('../../../components/Editor'), {
  ssr: false,
});

interface ContentEventWriteCondition {
  createdAdminName: string;
  title: string;
  isActive: string;
  isTopFixed: string;
  bodyHtml: string;
  appBodyHtml: string;
  thumbnailImageUrl: IFileTypes[];
  uploadedImageUrl?: string;
  startsAt: Date;
  endsAt: Date;
}

export default function ContentAppBoardEventWrite() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [type, setType] = useState<string>('write');
  let fileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailImageFile, setthumbnailImageFile] = useState<IFileTypes[]>([]);
  const [selectedValue, setSelectedValue] = useState<ContentEventWriteCondition>({
    createdAdminName: '',
    title: '',
    bodyHtml: '',
    appBodyHtml: '',
    isActive: 'true',
    isTopFixed: 'Y',
    thumbnailImageUrl: [],
    startsAt: new Date(dayjs().toDate()),
    endsAt: new Date(dayjs().add(7, 'day').format('YYYY-MM-DD 23:59:59')),
  });

  const handleValueChange = <T extends ContentEventWriteCondition, K extends keyof T>(
    key: K,
    value: T[K],
  ) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };
  const getEvent = async () => {
    if (!searchParams) return;
    const eventId = searchParams.get('id');
    if (eventId) {
      await getEventData(eventId);
      setType('edit');
    }
  };

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
      handleValueChange('uploadedImageUrl', nextPreview);
      setthumbnailImageFile([createFileType(file)]);
    }
  };

  // 이미지 미리보기 삭제하는 함수
  const deleteImage = () => {
    // form에서 해당 이미지 정보 삭제
    setthumbnailImageFile([]);
    // 이미지 미리보기 삭제
    handleValueChange('uploadedImageUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getEventData = async (id: string) => {
    const res = await getAxios().get(`/api/content/event/${id}`);
    setSelectedValue({
      createdAdminName: res.data.createdAdminName,
      title: res.data.title,
      bodyHtml: res.data.bodyHtml,
      appBodyHtml: res.data.appBodyHtml,
      isActive: String(res.data.isActive),
      isTopFixed: res.data.isTopFixed,
      thumbnailImageUrl: [],
      uploadedImageUrl: res.data.thumbnailImageUrl,
      startsAt: new Date(res.data.startsAt),
      endsAt: new Date(res.data.endsAt),
    });
  };

  const registerEvent = async () => {
    try {
      const formData = new FormData();
      if (!selectedValue.title) {
        alert('이벤트 제목를 추가해주세요.');
        return;
      }

      if (!thumbnailImageFile.find(v => v.object)) {
        alert('썸네일 이미지를 추가해주세요.');
        return;
      }

      formData.append('imageFile', thumbnailImageFile[0].object);
      formData.append(
        'eventInfo',
        JSON.stringify({
          title: selectedValue.title,
          bodyHtml: selectedValue.bodyHtml,
          appBodyHtml: selectedValue.appBodyHtml,
          isActive: selectedValue.isActive === 'true' ? true : false,
          startsAt: dayjs(selectedValue.startsAt).format('YYYY-MM-DD HH:mm:ss'),
          endsAt: dayjs(selectedValue.endsAt).format('YYYY-MM-DD HH:mm:ss'),
          createdAdminName: selectedValue.createdAdminName,
        }),
      );
      const res = await getAxios().post('/api/content/event/register', formData);
      if (res.status === 200) {
        alert('등록되었습니다.');
        router.push('/content/event');
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const editEvent = async () => {
    try {
      if (!selectedValue.title) {
        alert('이벤트 제목를 추가해주세요.');
        return;
      }

      if (!selectedValue?.uploadedImageUrl) {
        alert('썸네일 이미지를 추가해주세요.');
        return;
      }

      if (searchParams) {
        const formData = new FormData();
        if (thumbnailImageFile.length > 0)
          formData.append('imageFile', thumbnailImageFile[0].object);
        formData.append(
          'eventInfo',
          JSON.stringify({
            title: selectedValue.title,
            bodyHtml: selectedValue.bodyHtml,
            appBodyHtml: selectedValue.appBodyHtml,
            isActive: selectedValue.isActive === 'true' ? true : false,
            startsAt: dayjs(selectedValue.startsAt).format('YYYY-MM-DD HH:mm:ss'),
            endsAt: dayjs(selectedValue.endsAt).format('YYYY-MM-DD HH:mm:ss'),
            createdAdminName: selectedValue.createdAdminName,
          }),
        );
        const res = await getAxios().patch('/api/content/event/register/', formData, {
          params: {
            id: searchParams.get('id'),
          },
        });
        if (res.status === 200) {
          alert('수정되었습니다.');
          router.push('/content/event');
        }
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const getAdminName = async () => {
    const session = await getSession();
    handleValueChange('createdAdminName', session?.adminUserInfo?.name || '');
  };

  useEffect(() => {
    getAdminName();
    getEvent();
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

        <Flex className="p-5" justifyContent="start">
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
          <Title className="!text-sm/[17px] text-center">작성자</Title>
        </Flex>

        <Flex className="p-5" justifyContent="center" flexDirection="col" alignItems="start">
          <Flex className="w-[350px]">
            <TextInput
              className="!rounded-none shadow-transparent"
              placeholder="노출 순서를 입력해 주세요"
              disabled={true}
              value={String(selectedValue.createdAdminName)}
              onChange={e => {
                handleValueChange('createdAdminName', e.target.value);
              }}
            />
          </Flex>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">이벤트 제목 *</Title>
        </Flex>

        <Flex className="p-5" justifyContent="center" flexDirection="col" alignItems="start">
          <Flex className="w-[350px]">
            <TextInput
              className="!rounded-none shadow-transparent"
              placeholder="이벤트 제목을 입력해 주세요"
              value={String(selectedValue.title)}
              onChange={e => {
                handleValueChange('title', e.target.value);
              }}
            />
          </Flex>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">썸네일 이미지 *</Title>
        </Flex>
        <Flex>
          <div className="w-full">
            <div className="p-[20px]">
              <ImageFileInput
                ref={fileInputRef}
                division={'mobile'}
                className={'w-[230px] h-[130px]'}
                imageSrc={selectedValue.uploadedImageUrl!}
                onDeleteImage={deleteImage}
                encodeFileToBase64={encodeFileToBase64}
              />
              <Text className="text-[#DE1F38] text-[12px] mt-[12px]">
                * 1380x750 크기의 2MB 이하, 파일 형식은 jpg, jpeg, png 만 등록 가능합니다.
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
          <Title className="!text-sm/[17px] text-center">이벤트 기간 *</Title>
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

      <Card className="p-0 mt-5">
        <Flex flexDirection="col" className="p-5">
          <Title className="mr-auto">웹용(Web) 이벤트 등록</Title>
          <div className="w-full border mt-5 h-[400px] p-5">
            <Editor
              uploadUrl={`/api/upload?type=event`}
              htmlStr={selectedValue.bodyHtml}
              setHtmlStr={htmlStr => handleValueChange('bodyHtml', htmlStr)}
            />
          </div>
          <Divider className="my-5" />
          <Title className="mr-auto">앱용(App) 이벤트 등록</Title>
          <div className="w-full border mt-5 h-[400px] p-5">
            <Editor
              uploadUrl={`/api/upload?type=event`}
              htmlStr={selectedValue.appBodyHtml}
              setHtmlStr={htmlStr => handleValueChange('appBodyHtml', htmlStr)}
            />
          </div>

          <Flex justifyContent="end" className="gap-3 py-5 border-t">
            <CustomButton
              type="tertiary"
              onClick={() => {
                history.back();
              }}
            >
              취소
            </CustomButton>
            {type == 'write' ? (
              <CustomButton onClick={registerEvent} type="secondary">
                등록
              </CustomButton>
            ) : (
              <CustomButton onClick={editEvent} type="secondary">
                수정
              </CustomButton>
            )}
          </Flex>
        </Flex>
      </Card>
    </>
  );
}
