'use client';

import { Button, Card, Flex, TextInput, Textarea } from '@tremor/react';
import { ChangeEvent, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { isAxiosError } from 'axios';

import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';
import Title from '@/app/components/Title';
import { getAxios } from '@/app/lib/Axios';

import styles from './style.module.css';

export interface PushAutoType {
  batchType: string;
  afterDays: string;
  appPushTitle: string;
  appPushBody: string;
  appPushDynamicUrl: string;
  isType: string;
}

export default function PushSendPage() {
  const router = useRouter();
  const search = useSearchParams();
  const inputEl = useRef<HTMLInputElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<PushAutoType>({
    batchType: '',
    afterDays: '',
    appPushTitle: '',
    appPushBody: '',
    appPushDynamicUrl: '',
    isType: 'all',
  });
  const [memberCount, setMemberCount] = useState({
    targetMemberCount: '',
  });
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const handleValueChange = (key: string, value: any) => {
    setSelectedValue(prevSelectedValue => {
      return {
        ...prevSelectedValue,
        [key]: value,
      };
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setExcelFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      return;
    }
    setExcelFile(null);
    setFileName('');
  };

  const registerSend = async () => {
    if (!selectedValue.appPushTitle) {
      alert('푸시 제목을 입력해 주세요.');
      return;
    }

    if (!selectedValue.appPushBody) {
      alert('푸시 내용을 입력해 주세요.');
      return;
    }

    if (!selectedValue.appPushDynamicUrl) {
      alert('딥링크을 입력해 주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('excelFile', selectedValue.isType === 'all' ? '' : excelFile || '');
      formData.append(
        'appPushBodyDto',
        JSON.stringify({
          title: selectedValue.appPushTitle,
          body: selectedValue.appPushBody,
          dynamicLinkUrl: selectedValue.appPushDynamicUrl,
        }),
      );

      const result = await getAxios().post<PushAutoType[]>(`/api/customer/push/manual`, formData);

      if (result.status === 200) {
        alert('푸시발송 되었습니다.');
        setSelectedValue(selectedValue);
        router.push('/customer/push');
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert(error);
      }
    }
  };

  const getData = async () => {
    const res = await getAxios().get('/api/customer/push/manual');
    setMemberCount(res.data);
  };

  useEffect(() => {
    const inputElement = inputEl.current;
    const fileInputHandler = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files[0]) {
        setFileName(files[0].name);
      }
    };

    if (inputElement !== null) {
      inputElement.addEventListener('change', e => fileInputHandler(e));
      return () => {
        inputElement.removeEventListener('change', e => fileInputHandler(e));
      };
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">푸시 제목</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start" alignItems="start" flexDirection="col">
          <TextInput
            className="!w-[720px] !rounded-none shadow-transparent placeholder:text-slate-400"
            placeholder="푸시 제목을 입력해주세요."
            value={selectedValue.appPushTitle}
            onChange={e => handleValueChange('appPushTitle', e.target.value)}
          />
          <p className="text-[12px] text-[#DE1F38] mt-[12px]">
            * ‘(광고)’ 는 반드시 문장의 맨 앞에 위치해야 합니다.
          </p>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">푸시 내용</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start" alignItems="start" flexDirection="col">
          <Textarea
            cols={5}
            className="w-[720px] h-[200px] border p-[10px] text-[#46477A] !rounded-none"
            value={selectedValue.appPushBody}
            placeholder="푸시 내용을 입력해주세요."
            onChange={e => handleValueChange('appPushBody', e.target.value)}
          />
          <p className="text-[12px] text-[#DE1F38] mt-[12px]">
            * 수신 거부를 위한 문구는 반드시 문장의 맨 아래 포함되어야 합니다.
          </p>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">딥링크</Title>
        </Flex>

        <Flex className="ml-3 p-5" justifyContent="start" alignItems="start" flexDirection="col">
          <TextInput
            className="!w-[720px] !rounded-none shadow-transparent placeholder:text-slate-400"
            placeholder="딥링크를 입력하세요."
            value={selectedValue.appPushDynamicUrl}
            onChange={e => handleValueChange('appPushDynamicUrl', e.target.value)}
          />
          <p className="text-[12px] text-[#DE1F38] mt-[12px]">
            * bbqapp:// 으로 시작하는 딥링크만 입력할 수 있습니다. 개발사에 문의하여 딥링크 주소를
            확인해 주세요.
          </p>
        </Flex>
      </Card>

      <Card className="p-0 mt-5 flex flex-row !border-tremor-border-grayED2">
        <Flex
          className="w-[180px] border-r py-5 bg-tremor-background-gray0F5"
          justifyContent="center"
        >
          <Title className="!text-sm/[17px] text-center">발송 대상</Title>
        </Flex>

        <Flex justifyContent="start" alignItems="start" flexDirection="col">
          <Flex className="p-5 pl-7 border-b" justifyContent="start">
            <Flex justifyContent="start" className="gap-10">
              <RadioboxGroup
                disabled={false}
                value={selectedValue.isType}
                onChange={value => handleValueChange('isType', value)}
              >
                <Radiobox className="!text-sm/[14px] text-[#46477A]" value={'all'} label="전체" />
                <Radiobox
                  className="!text-sm/[14px] text-[#46477A]"
                  value={'excelUpload'}
                  label="엑셀 업로드"
                />
              </RadioboxGroup>
            </Flex>
          </Flex>
          {selectedValue.isType === 'all' ? (
            <>
              <Flex className="ml-3 pt-4 pl-4 pb-[12px] justify-normal">
                <TextInput
                  style={{ color: '#8E93AD' }}
                  className="!w-[200px] h-[40px] !rounded-none shadow-transparent"
                  placeholder="기준 일자를 입력하세요."
                  value={memberCount.targetMemberCount}
                  disabled={true}
                  onChange={e => {
                    if (isNaN(Number(e.target.value))) {
                      alert('숫자만 입력 가능합니다.');
                      e.target.value = '';
                      return;
                    }
                    handleValueChange('afterDays', e.target.value);
                  }}
                />
                <p className="h-[40px] border border-l-[0] pt-[7px] pb-[7px] pl-[12px] pr-[12px] text-[14px] text-[#8E93AD] bg-[#F1F2F5]">
                  명
                </p>
              </Flex>
              <p className="text-[12px] text-[#DE1F38] pb-4 pl-7 ">
                * 마케팅정보앱푸시 알림 수신 동의한 회원 모두에게 발송됩니다.
              </p>
            </>
          ) : (
            <>
              <Flex className="ml-3 pt-4 pl-4 pb-[12px] justify-normal">
                <div className={`text-[14px] ${styles.filebox}`}>
                  <input
                    className={`${styles['upload-name']}`}
                    value={fileName}
                    placeholder="첨부파일"
                    readOnly
                  />

                  <label htmlFor="file" className={`text-[14px] ${styles.label}`}>
                    업로드
                  </label>
                  <input
                    type="file"
                    id="file"
                    ref={inputEl}
                    className={`w-[280px] h-[40px] ${styles.file}`}
                    onChange={e => handleFileChange(e)}
                  />
                </div>

                <Link
                  href={'/excel/push_alarm_sample.xlsx'}
                  className="w-[160px] h-[40px] !bg-[#00C9B5] !text-[#fff] ml-[12px] !rounded-none text-[14px] text-center leading-[40px]"
                  download
                >
                  엑셀 양식 다운로드
                </Link>
              </Flex>
              <p className="text-[12px] text-[#DE1F38] pb-4 pl-7 ">
                * 한 번에 최대 50만 명의 회원 까지 업로드 가능합니다.
              </p>
            </>
          )}
        </Flex>
      </Card>

      <Flex justifyContent="end" className="py-5">
        <Button
          onClick={() => router.back()}
          className="bg-white !border-tremor-border-grayED2 hover:bg-white text-gray-500 w-[160px] h-[50px] !rounded-none"
        >
          취소
        </Button>
        <Button
          className="bg-tremor-content-emphasis border-none ml-3 hover:bg-gray-700 text-white w-[160px] h-[50px] !rounded-none"
          onClick={registerSend}
        >
          푸시 발송
        </Button>
      </Flex>
    </>
  );
}
