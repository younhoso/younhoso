import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import FormData from 'form-data';

import { ContentAPI } from '@/apis';
import { Flex, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { RelayEditPageTemplate } from '@/components/templates';
import { FONTSIZE_18, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';
import { Relay } from '@/types';
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
  file1: File | string | null | undefined;
  file2: File | string | null | undefined;
  file3: File | string | null | undefined;
};

export default function RelayNewPage() {
  const { openModal } = useModal();
  const router = useRouter();
  const { member } = useAuth();

  const { id: relayId } = router.query;

  const [relay, setRelay] = useState<Relay | undefined>(undefined);

  useEffect(() => {
    if (!relayId) return;
    ContentAPI.Relay.get({ id: Number(relayId) })
      .then(res => {
        setRelay(res);
      })
      .catch(err => {
        console.error(err);
        router.push('/story/relay');
      });
  }, [relayId]);

  const [values, setValues] = useState<InputValues>({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    title: '',
    content: '',
    file1: undefined,
    file2: undefined,
    file3: undefined,
  });

  const [selectedFiles, setSelectedFiles] = useState<(File | string | null | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);

  useEffect(() => {
    if (!member) return;
    if (!relay) return;

    const _values = {
      ...values,
      name: member.name,
      phoneNumber: member.phoneNumber,
      email: relay.email ?? '',
      address: relay.address ?? '',
      title: relay.title ?? '',
      content: relay.content ?? '',
      file1:
        relay.contentFileUrl1 && relay.contentFileUrl1.length ? relay.contentFileUrl1 : undefined,
      file2:
        relay.contentFileUrl2 && relay.contentFileUrl2.length ? relay.contentFileUrl2 : undefined,
      file3:
        relay.contentFileUrl3 && relay.contentFileUrl3.length ? relay.contentFileUrl3 : undefined,
    };
    setValues(_values);

    setSelectedFiles([
      _values.file1 ? _values.file1 : undefined,
      _values.file2 ? _values.file2 : undefined,
      _values.file3 ? _values.file3 : undefined,
    ]);
  }, [member, relay]);

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
    if (!relay) return;

    const formData = new FormData();

    formData.append('id', relay.id);
    formData.append('name', `${values.name}`);
    formData.append('phoneNumber', `${values.phoneNumber.replace(/[^0-9]/g, '')}`);
    formData.append('email', `${values.email}`);
    formData.append('address', `${values.address}`);
    formData.append('title', `${values.title}`);
    formData.append('content', `${values.content}`);

    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i] && selectedFiles[i] instanceof File) {
        formData.append(`contentFile${i + 1}`, selectedFiles[i]);
      } else if (selectedFiles[i] === null) {
        formData.append(`contentFile${i + 1}`, 'DELETE');
      }
    }

    try {
      await ContentAPI.Relay.modify(formData);
      openModal({
        title: '사연 신청',
        body: <Popup message={`성공적으로 수정 했습니다.`} />,
        onClose: () => {
          router.push(`/story/relay/${relay.id}`);
        },
      });
    } catch (err) {
      console.error(err);
      openModal({
        title: '에러',
        body: <Popup message={parseApiError(err).message} />,
      });
    }
  }, [relay, values, selectedFiles]);

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
      <RelayEditPageTemplate
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
