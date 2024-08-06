'use client';

import { Card, Flex, Text, Title } from '@tremor/react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { isAxiosError } from 'axios';

import CustomButton from '@/app/components/CustomButton';
import ImageFileInput from '@/app/components/ImageFileInput';
import { getAxios } from '@/app/lib/Axios';

export interface IFileTypes {
  object: File;
}

interface FormState {
  id: number;
  clientType: string;
  clientConfig: {
    splashImage: string;
  };
  thumbnailImageFile: IFileTypes[];
}

export default function ApploadingPage() {
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>({
    id: 1,
    clientType: 'APP',
    clientConfig: {
      splashImage: '',
    },
    thumbnailImageFile: [],
  });
  const [imageSrc, setImageSrc] = useState('');

  const onChange = useCallback((name: string, value: File | []) => {
    setForm(form => ({
      ...form,
      [name]: value ? [{ object: value }] : [],
    }));
  }, []);

  // 이미지 미리보기 삭제하는 함수
  const onDeleteImage = useCallback(() => {
    // form에서 해당 이미지 정보 삭제
    onChange('thumbnailImageFile', []);
    // 이미지 미리보기 삭제
    setImageSrc('');
    // input file value 초기화
    if (inputEl.current) {
      inputEl.current.value = '';
    }
  }, [onChange]);

  // 이미지 미리보기 보여주는 함수
  const encodeFileToBase64 = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
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

      reader.readAsDataURL(file);
      onChange('thumbnailImageFile', file);
    }

    return new Promise<void>(async resolve => {
      reader.onload = () => {
        setImageSrc(reader.result as string);
        resolve();
      };
    });
  };

  const getData = async () => {
    try {
      const res = await getAxios().get('/api/content/apploading');
      setImageSrc(res.data.clientConfig.splashImage);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const editeData = async () => {
    try {
      if (form) {
        const formData = new FormData();
        if (form.thumbnailImageFile.length > 0)
          formData.append('splashImageFile', form.thumbnailImageFile[0].object);
        formData.append(
          'clientConfigUpdateRequest',
          JSON.stringify({
            clientConfig: {},
          }),
        );

        const res = await getAxios().patch('/api/content/apploading', formData);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Title className={`text-[#46477A] bg-[#fff] border py-[20px] px-[24px] mb-[16px]`}>
        * 표시는 필수입력 항목입니다.
      </Title>
      <Flex>
        <Card className="w-[160px] h-[328px] bg-[#EFF0F5] flex justify-center items-center text-center">
          <div>
            앱 로딩 화면
            <br />
            이미지 *
          </div>
        </Card>
        <Card className="h-[328px] p-0 flex">
          <Flex className="justify-normal gap-[20px]">
            <div>
              <div className="p-[20px]">
                <ImageFileInput
                  className={'w-[125px] h-[270px]'}
                  ref={inputEl}
                  division={'appload'}
                  imageSrc={imageSrc}
                  onDeleteImage={onDeleteImage}
                  encodeFileToBase64={encodeFileToBase64}
                />
                <Text className="text-[#DE1F38] text-[12px] mt-[12px]">
                  * 750x1624 크기의 2MB 이하, 파일 형식은 jpg, jpeg, png 만 등록 가능합니다.
                </Text>
              </div>
            </div>
          </Flex>
        </Card>
      </Flex>
      <div className="text-right mt-[20px]">
        <CustomButton
          className="w-[138px] h-[40px] !bg-[#fff] !text-[#46477A] mr-[20px] !border-transparent !rounded-none"
          onClick={() => router.back()}
          type="secondary"
        >
          취소
        </CustomButton>
        <CustomButton
          className="w-[138px] h-[40px] !bg-[#46477A] !text-[#fff] !border-transparent !rounded-none"
          onClick={editeData}
          type="secondary"
        >
          수정 완료
        </CustomButton>
      </div>
    </div>
  );
}
