import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import FormData from 'form-data';

import { ContentAPI } from '@/apis';
import { Flex, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { RelayNewPageTemplate } from '@/components/templates';
import { FONTSIZE_18, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';
import { parseApiError } from '@/utils';

const Popup = ({ message }: { message: string }) => {
  const { closeModal } = useModal();

  return (
    <Flex.CCC full padding={PLANCK * 2}>
      <Text size={FONTSIZE_18} lineHeight={'1.3em'} align="center">
        {message}
      </Text>
      <Space.H6 />
      <Button
        full
        color="red"
        shape="round"
        text="확인"
        onClick={() => closeModal()}
        style={{ height: 50 }}
      />
    </Flex.CCC>
  );
};

export type InputValues = {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  title: string;
  content: string;
  file1?: File | string;
  file2?: File | string;
  file3?: File | string;
};

export default function RelayNewPage() {
  const { openModal } = useModal();
  const router = useRouter();
  const { member } = useAuth();
  const [values, setValues] = useState<InputValues>({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    title: '',
    content: '',
  });

  useEffect(() => {
    if (!member) return;
    setValues({
      ...values,
      name: member.name,
      phoneNumber: member.phoneNumber,
    });
  }, [member]);

  const [selectedFiles, setSelectedFiles] = useState<(File | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);

  const handleFileChange = useCallback(
    ({ file, index }: { file?: any; index: number }) => {
      if (index === 0) {
        setSelectedFiles([file, selectedFiles[1], selectedFiles[2]]);
      } else if (index === 1) {
        setSelectedFiles([selectedFiles[0], file, selectedFiles[2]]);
      } else if (index === 2) {
        setSelectedFiles([selectedFiles[0], selectedFiles[1], file]);
      }
    },
    [selectedFiles],
  );

  const handleSubmitButtonClick = useCallback(async () => {
    const formData = new FormData();

    formData.append('name', `${values.name}`);
    formData.append('phoneNumber', `${values.phoneNumber.replace(/[^0-9]/g, '')}`);
    formData.append('email', `${values.email}`);
    formData.append('address', `${values.address}`);
    formData.append('title', `${values.title}`);
    formData.append('content', `${values.content}`);

    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i]) {
        formData.append(`contentFile${i + 1}`, selectedFiles[i]);
      }
    }

    try {
      const { id } = await ContentAPI.Relay.create(formData);
      openModal({
        title: '사연 신청',
        body: <Popup message={`사연 신청을 해주셔서 감사합니다.`} />,
        onClose: () => {
          router.push(`/story/relay/${id}`);
        },
      });
    } catch (err) {
      console.error(err);
      openModal({
        title: '에러',
        body: <Popup message={parseApiError(err).message} />,
      });
    }
  }, [values, selectedFiles]);

  const submitButtonEnabled: boolean = useMemo(() => {
    if (!values.name) return false;
    if (!values.phoneNumber) return false;
    if (!values.email) return false;
    if (!values.address) return false;
    if (!values.title) return false;
    if (!values.content) return false;

    return true;
  }, [values]);

  if (!values.name || !values.name.length) return;
  if (!values.phoneNumber || !values.phoneNumber.length) return;

  return (
    <>
      <RelayNewPageTemplate
        values={values}
        setValues={setValues}
        selectedFiles={selectedFiles}
        handleFileChange={handleFileChange}
        handleSubmitButtonClick={handleSubmitButtonClick}
        submitButtonEnabled={submitButtonEnabled}
      />
    </>
  );
}
