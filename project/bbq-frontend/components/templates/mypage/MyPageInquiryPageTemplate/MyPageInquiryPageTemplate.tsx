import { FC, ReactNode } from 'react';

import styled from 'styled-components';

import { Flex, Icon, Pagination as PaginationComponent, Space, Text } from '@/components/atoms';
import { Button, InquiryCard, useModal } from '@/components/molecules';
import { NewInquiryPopup } from '@/components/organisms';
import { Pagination, QNA } from '@/types';

import { Template } from '../components';
import { MyPageInquiryPageTemplateMobile } from './mobile';

export interface MyPageInquiryPageTemplateProps {
  page: number;
  setPage: (page: number) => void;
  data: Pagination<QNA>;
  refetch: () => void;
}

export interface MyPageInquiryPageTemplateComponentProps extends MyPageInquiryPageTemplateProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const MyPageInquiryPageTemplate: FC<MyPageInquiryPageTemplateComponentProps> & {
  Mobile: FC<MyPageInquiryPageTemplateComponentProps>;
} = ({ page, setPage, data, refetch }) => {
  const { openModal } = useModal();

  return (
    <Template
      title="나의 문의"
      button={
        <SideButton
          onClick={() =>
            openModal({
              title: '문의하기',
              body: <NewInquiryPopup refetch={refetch} />,
            })
          }
          shape={'round'}
          color={'primary'}
          text={'문의하기'}
        />
      }
    >
      {data.content.length ? (
        <MypageInquiryHeader>
          <Text>Total {data.totalElements}</Text>
        </MypageInquiryHeader>
      ) : null}
      {data.content.map((qna, index) => (
        <InquiryCard key={index} qna={qna} />
      ))}
      {!data.content.length ? (
        <>
          <Space.H20 />
          <Flex.CCC full={true}>
            <Icon src={'qna-talk.svg'} size={70} />
            <Space.H2 />
            <Text color={'#777777'}>문의하신 내역이 없습니다.</Text>
          </Flex.CCC>
          <Space.H20 />
        </>
      ) : null}
      {data.content.length ? (
        <>
          <Space.H10 />
          <Flex.RCC full={true}>
            <PaginationComponent
              currentPage={page}
              totalPageCount={data.totalPages}
              onPageButtonClick={page => {
                setPage(page);
              }}
            />
          </Flex.RCC>
          <Space.H4 />
        </>
      ) : null}
    </Template>
  );
};
MyPageInquiryPageTemplate.Mobile = MyPageInquiryPageTemplateMobile;

const SideButton = styled(Button)`
  font-size: 12px;
  padding: 5px 13px;
`;
const MypageInquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
