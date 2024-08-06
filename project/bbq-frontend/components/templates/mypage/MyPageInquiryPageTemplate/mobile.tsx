import { FC } from 'react';

import styled from 'styled-components';

import { Flex, Icon, Pagination as PaginationComponent, Space, Text } from '@/components/atoms';
import { Button, InquiryCard, useModal } from '@/components/molecules';
import { NewInquiryPopup } from '@/components/organisms';
import { FONTSIZE_14 } from '@/constants';

import { Template } from '../components';
import { MyPageInquiryPageTemplateComponentProps } from './MyPageInquiryPageTemplate';

export const MyPageInquiryPageTemplateMobile: FC<MyPageInquiryPageTemplateComponentProps> = ({
  page,
  setPage,
  data,
  refetch,
}) => {
  const { openModal } = useModal();

  return (
    <Template.Mobile
      title="나의 문의"
      button={
        <SideButton.Mobile
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
          <Text size={FONTSIZE_14}>Total {data.totalElements}</Text>
        </MypageInquiryHeader>
      ) : null}
      {data.content.map((qna, index) => (
        <InquiryCard.Mobile key={index} qna={qna} />
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
          <Space.H4 />
          <Flex.RCC full={true}>
            <PaginationComponent.Mobile
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
    </Template.Mobile>
  );
};

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
