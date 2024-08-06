import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';

import FormData from 'form-data';

import { ContentAPI } from '@/apis';
import { Flex, Grid, Input, Select, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { FONTSIZE_14, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';
import { Branch } from '@/types';
import { parseApiError } from '@/utils';

import { SearchBranchForm } from '../../SearchBranchForm';

export const NewInquiryPopup: FC<{ refetch?: () => void }> = ({ refetch }) => {
  const { closeModal } = useModal();
  const { member } = useAuth();
  const [searchFormKey, setSearchFormKey] = useState<number>(0);
  const [scene, setScene] = useState<'MAIN' | 'SERACH_BRANCH'>('MAIN');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [branch, setBranch] = useState<Branch | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<(File | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);

  const handleSearchBranchButtonClick = useCallback(() => {
    setSearchFormKey(prev => prev + 1);
    setScene('SERACH_BRANCH');
  }, []);

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

  const handleSubmitButtonClick = async () => {
    const formData = new FormData();

    if (branch) {
      formData.append('branchId', `${branch.branchId}`);
    }
    formData.append('name', `${name}`);
    formData.append('phoneNumber', `${phone.replace(/[^0-9]/g, '')}`);
    formData.append('title', `[${category}] ${title}`);
    formData.append('content', `${content}`);

    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i]) {
        formData.append(`contentImage${i + 1}`, selectedFiles[i]);
      }
    }

    try {
      await ContentAPI.QNA.add(formData);
      refetch && refetch();
      alert('문의가 접수됐습니다.');
      closeModal();
    } catch (err) {
      console.error(err);
      alert(parseApiError(err).message);
    }
  };

  useEffect(() => {
    if (!member) {
      return;
    }
    setName(member.name);
    setPhone(member.phoneNumber);
  }, [member]);

  return scene === 'SERACH_BRANCH' ? (
    <>
      <SearchBranchForm
        key={searchFormKey}
        handleSubmit={({ branch }) => {
          setBranch(branch);
          setScene('MAIN');
        }}
      />
    </>
  ) : (
    <div>
      <Input
        disabled={member ? true : false}
        readonly={member ? true : false}
        placeholder="이름"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Space.H3 />
      <Input
        disabled={member ? true : false}
        readonly={member ? true : false}
        placeholder="휴대폰 번호"
        value={phone}
        onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
      />
      <Space.H3 />
      <Flex layout="7 auto 3">
        <Input
          readonly={true}
          shadow={true}
          placeholder="패밀리점 (선택 사항)"
          value={branch ? branch.familyName : ''}
          onChange={() => {}}
        />
        <Space.V2 />
        <Button
          full
          fill={true}
          color="black"
          shape={'round'}
          style={{ height: 44 }}
          text={branch ? `패밀리점 수정` : `패밀리점 검색`}
          onClick={handleSearchBranchButtonClick}
        />
      </Flex>
      <Space.H3 />
      <Select
        shadow={true}
        placeholder="문의 유형"
        options={[
          { value: '', label: '(선택해 주세요)' },
          { value: '주문 거부', label: '주문 거부' },
          {
            value: '멤버십 쿠폰/E-쿠폰 주문 거부',
            label: '멤버십 쿠폰/E-쿠폰 주문 거부',
          },
          { value: '제품 품질 불만', label: '제품 품질 불만' },
          { value: '이물질', label: '이물질' },
          {
            value: '품목 미제공(치킨무 등)',
            label: '품목 미제공(치킨무 등)',
          },
          {
            value: '자사앱/온라인 주문 불편',
            label: '자사앱/온라인 주문 불편',
          },
          {
            value: '매장/고객센터 응대 불만',
            label: '매장/고객센터 응대 불만',
          },
          { value: '현금영수증 미발급', label: '현금영수증 미발급' },
          { value: '기타 불만', label: '기타 불만' },
          {
            value: '문의사항(메뉴, 매장, 가맹, 기타)',
            label: '문의사항(메뉴, 매장, 가맹, 기타)',
          },
        ]}
        value={category}
        onChange={(value: string) => {
          setCategory(value);
        }}
      />
      <Space.H3 />
      <Input placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} />
      <Space.H3 />
      <Input
        placeholder="문의 내용"
        multiline={true}
        value={content}
        onChange={e => setContent(e.target.value.slice(0, 1000))}
      />
      <Space.H2 />
      <Flex.RBC>
        <Text size={FONTSIZE_14} color={'#8e93ad'}>
          ⚠ 1,000자 미만
        </Text>
        <Text size={FONTSIZE_14}>{`${content.length}자`}</Text>
      </Flex.RBC>
      <Space.H4 />
      <Grid columnCount={1} gap={PLANCK * 2.5}>
        {[0, 1, 2].map(index => (
          <Fragment key={index}>
            <Flex layout="7 auto 3">
              <Input
                placeholder={`이미지 첨부 파일 ${index + 1}`}
                readonly={true}
                shadow={true}
                value={selectedFiles[index]?.name ?? ''}
                onChange={e => {}}
              />
              <Space.V2 />
              <Button
                full
                fill={true}
                color="black"
                shape={'round'}
                style={{ height: 44 }}
                text={selectedFiles[index] ? `파일 삭제` : `파일 첨부`}
                onClick={() => {
                  if (selectedFiles[index]) {
                    if (index === 0 && fileInputRef1.current) {
                      (fileInputRef1.current as any).value = '';
                      handleFileChange({ file: undefined, index: 0 });
                    } else if (index === 1 && fileInputRef2.current) {
                      (fileInputRef2.current as any).value = '';
                      handleFileChange({ file: undefined, index: 1 });
                    } else if (index === 2 && fileInputRef3.current) {
                      (fileInputRef1.current as any).value = '';
                      handleFileChange({ file: undefined, index: 2 });
                    }
                  } else {
                    if (index === 0) {
                      fileInputRef1.current && (fileInputRef1.current as any).click();
                    } else if (index === 1) {
                      fileInputRef2.current && (fileInputRef2.current as any).click();
                    } else if (index === 2) {
                      fileInputRef3.current && (fileInputRef3.current as any).click();
                    }
                  }
                }}
              />
            </Flex>
            <div style={{ position: 'fixed', left: '-9999px' }}>
              <input
                ref={index === 0 ? fileInputRef1 : index === 1 ? fileInputRef2 : fileInputRef3}
                type="file"
                accept=".jpg, .png"
                onChange={(e: any) => {
                  const file = e.target?.files ? e.target?.files[0] : undefined;
                  handleFileChange({ file: file, index: index });
                }}
              />
            </div>
          </Fragment>
        ))}
      </Grid>
      <Space.H6 />
      <Text size={FONTSIZE_14} color={'#8e93ad'}>
        ⚠ 첨부파일 최대 3개 / jpg, png 이미지 등록 | 2mb 이하
      </Text>
      <Space.H2_5 />
      <Button
        onClick={handleSubmitButtonClick}
        disabled={!name || phone.length !== 11 || !title || !category || !content}
        full
        fill
        text="문의하기"
        color={'red'}
        shape={'round'}
        style={{ height: 50 }}
      />
    </div>
  );
};
