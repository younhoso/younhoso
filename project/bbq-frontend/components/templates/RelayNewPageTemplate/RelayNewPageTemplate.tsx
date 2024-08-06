import { FC, Fragment, useRef } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Box, Divider, Flex, Grid, Image, Input, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { AddressSearchForm } from '@/components/organisms';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  FONTSIZE_14,
  FONTSIZE_16,
  FONTSIZE_32,
  PLANCK,
} from '@/constants';
import { InputValues } from '@/pages/story/relay/new';

const AddressPopup = ({ handleSubmit }: { handleSubmit: (address: string) => void }) => {
  return (
    <AddressSearchForm
      handleSubmit={({ address, roadAddress, detailAddress }) => {
        const _address = roadAddress && roadAddress.length ? roadAddress : address;
        handleSubmit(`${_address} ${detailAddress}`.trim());
      }}
    />
  );
};

export interface RelayNewPageTemplate {
  values: InputValues;
  setValues: (values: InputValues) => void;
  selectedFiles: (File | undefined)[];
  handleFileChange: ({ file, index }: { file?: any; index: number }) => void;
  handleSubmitButtonClick: () => void;
  submitButtonEnabled: boolean;
}

export const RelayNewPageTemplate: FC<RelayNewPageTemplate> = ({
  values,
  setValues,
  selectedFiles,
  handleFileChange,
  handleSubmitButtonClick,
  submitButtonEnabled,
}) => {
  const { openModal, closeModal } = useModal();

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);

  return (
    <>
      <Box
        background="#FCFBF7"
        full={true}
        style={{
          boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.10)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Flex.RCC full={true}>
          <LinkBox href={'/story/videos'}>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={500}>
              영상 콘텐츠
            </Text>
            <Space.H3 />
          </LinkBox>
          <Space.V3 />
          <Divider.V1 color={COLOR_BLACK} style={{ height: 14 }} />
          <Space.V3 />
          <LinkBox href={'/story/relay'}>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={600}>
              찾아가는 치킨릴레이 사연신청
            </Text>
            <Space.H3 />
            <Divider.H2 color={COLOR_BLACK} style={{ marginTop: -2 }} />
          </LinkBox>
        </Flex.RCC>
      </Box>
      <Space.H4 />
      <Flex.CCS
        style={{
          maxWidth: 950,
          width: 'calc(100% - 60px)',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Image
          width={'100%'}
          height={'21.05263157895%'}
          backgroundPosition="center"
          backgroundSize="cover"
          src="relay/background-1.jpg"
        >
          <div
            style={{
              position: 'absolute',
              left: PLANCK * 6,
              top: '50%',
              transform: 'translateY(-48%)',
            }}
          >
            <Text size={FONTSIZE_32} weight={600} color={COLOR_WHITE}>
              사연 신청
            </Text>
            <Space.H2 />
            <Text size={FONTSIZE_14} weight={500} color={COLOR_WHITE} lineHeight={'1.65em'}>
              비비카 사연 신청 기간은 매월 1일 부터 21일 총 3주간 신청을 받습니다.
              <br />
              1주간 사연 심사 기간을 거쳐 매월 말일에 선정된 고객님께 연락 드릴 예정이며,
              <br />
              방문 일정 및 필요 수량 협의 후 방문 예정입니다.
            </Text>
          </div>
        </Image>
        <Space.H6 />
        <Text>정보 입력</Text>
        <Space.H4 />
        <Table>
          <TBody>
            <Tr>
              <Td>이름</Td>
              <Td>
                <Input
                  disabled={true}
                  readonly={true}
                  placeholder="이름을 입력해주세요"
                  value={values.name}
                  onChange={e => {}}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>휴대폰 번호</Td>
              <Td>
                <Input
                  disabled={true}
                  readonly={true}
                  placeholder="휴대폰 번호를 입력해주세요"
                  value={values.phoneNumber}
                  onChange={e => {}}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>이메일</Td>
              <Td>
                <Input
                  placeholder="이메일을 입력해주세요"
                  value={values.email}
                  onChange={e => setValues({ ...values, email: e.target.value.trim() })}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>주소</Td>
              <Td>
                <Flex.RSC layout="7 auto 2">
                  <Input
                    readonly={true}
                    placeholder="주소를 입력해주세요"
                    value={values.address}
                    onChange={e => setValues({ ...values, address: e.target.value })}
                  />
                  <Space.V2 />
                  <Button
                    full
                    color="black"
                    shape={'round'}
                    style={{ height: 44 }}
                    text={'주소 검색'}
                    onClick={() => {
                      openModal({
                        title: '주소 검색',
                        body: (
                          <AddressPopup
                            handleSubmit={(address: string) => {
                              setValues({
                                ...values,
                                address: address,
                              });
                              closeModal();
                            }}
                          />
                        ),
                      });
                    }}
                  />
                </Flex.RSC>
              </Td>
            </Tr>
          </TBody>
        </Table>
        <Space.H6 />
        <Text>내용 입력</Text>
        <Space.H4 />
        <Table>
          <TBody>
            <Tr>
              <Td>제목</Td>
              <Td>
                <Input
                  placeholder="제목을 입력해주세요"
                  value={values.title}
                  onChange={e => {
                    setValues({ ...values, title: e.target.value });
                  }}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>내용</Td>
              <Td>
                <Space.H2 />
                <Input
                  multiline={true}
                  placeholder="내용을 입력해주세요"
                  value={values.content}
                  onChange={e => {
                    setValues({ ...values, content: e.target.value });
                  }}
                />
                <Space.H2 />
              </Td>
            </Tr>
            <Tr>
              <Td>파일 첨부</Td>
              <Td>
                <Space.H2 />
                <Grid columnCount={1} gap={PLANCK * 2.5}>
                  {[0, 1, 2].map(index => (
                    <Fragment key={index}>
                      <Flex layout="7 auto 2">
                        <Input
                          placeholder={`첨부 파일 ${index + 1}`}
                          readonly={true}
                          shadow={true}
                          value={selectedFiles[index]?.name ?? ''}
                          onChange={e => {}}
                        />
                        <Space.V2 />
                        <Button
                          full
                          fill={selectedFiles[index] ? false : true}
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
                          ref={
                            index === 0
                              ? fileInputRef1
                              : index === 1
                                ? fileInputRef2
                                : fileInputRef3
                          }
                          type="file"
                          accept=".jpg, .png, .hwp, .pdf"
                          onChange={(e: any) => {
                            const file = e.target?.files ? e.target?.files[0] : undefined;
                            handleFileChange({ file: file, index: index });
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </Grid>
                <Space.H2 />
                <Text size={FONTSIZE_14} lineHeight={'1.6em'} weight={500} color="#565043">
                  ·&nbsp;&nbsp;파일은 최대 3개까지, 500MB 이하의 파일만 업로드 가능합니다.
                  <br />
                  ·&nbsp;&nbsp;jpg, png, hwp, pdf 파일만 업로드 가능합니다.
                </Text>
                <Space.H2 />
              </Td>
            </Tr>
          </TBody>
        </Table>
        <Space.H4 />
        <Box padding={PLANCK * 4} background="#FCFBF7" full={true}>
          <Text size={FONTSIZE_14} lineHeight={'1.6em'} weight={500} color="#565043">
            ·&nbsp;&nbsp;광고성 글은 관리자가 임의로 삭제처리가 가능함을 안내드립니다.
            <br />
            ·&nbsp;&nbsp;정확한 정보 확인을 위해 고객님의 정보를 정확히 적어주시기 바랍니다.
            <br />
            ·&nbsp;&nbsp;고객님의 정보가 부정확할 경우, 신청이 무효처리 될 수 있음을
            양해부탁드립니다.
            <br />
            ·&nbsp;&nbsp;정확한 정보 확인을 위해 사연 신청자의 개인정보가 수집되고 관리됨을
            안내드립니다.
            <br />
            ·&nbsp;&nbsp;수집된 정보는 매월 자동 삭제됩니다.
          </Text>
        </Box>

        <Space.H4 />
        <Divider.H1 color="#D9D9D9" />
        <Space.H4 />
        <Flex.RCC full={true}>
          <Button
            disabled={!submitButtonEnabled}
            color="red"
            shape="round"
            text="사연 신청"
            onClick={() => {
              handleSubmitButtonClick();
            }}
            style={{ width: 200, height: 50 }}
          />
        </Flex.RCC>
      </Flex.CCS>
      <Space.H16 />
    </>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid #d9d9d9;
`;

const TBody = styled.tbody``;

const Tr = styled.tr``;

const Td = styled.td`
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;

  &:first-child {
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 140px;
    background-color: #f9f6ef;
    line-height: 1em;
    font-weight: 600;
    font-size: 16px;
  }

  &:last-child {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const LinkBox = styled(Link)``;
