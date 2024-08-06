import { FC } from 'react';

import styled from 'styled-components';

import {
  Container,
  Flex,
  Pagination as PaginationComponent,
  PostTable,
  Space,
  Tab,
  Text,
} from '@/components/atoms';
import { Sidebar } from '@/components/organisms';
import { FONTSIZE_16, PLANCK } from '@/constants';
import { dayjs } from '@/libs';
import { Notice, Pagination } from '@/types';

import { BoardNoticesTemplateMobile } from './mobile';

export interface BoardNoticesPageTemplateProps {
  page: number;
  setPage: (page: number) => void;
  data: Pagination<Notice>;
}

export interface BoardNoticesTemplateComponentProps extends BoardNoticesPageTemplateProps {}

export const BoardNoticesTemplate: FC<BoardNoticesTemplateComponentProps> & {
  Mobile: FC<BoardNoticesTemplateComponentProps>;
} = ({ page, setPage, data }) => {
  return (
    <Wrapper>
      <Container>
        <Container.Body>
          <Space.H3 />
          <Template>
            <Tab
              items={[
                {
                  title: '자주하는 질문',
                  selected: false,
                  href: '/faq',
                },
                {
                  title: '문의사항',
                  selected: false,
                  href: '/mypage/inquiry',
                },
                {
                  title: '공지사항',
                  selected: true,
                  href: '/notices',
                },
              ]}
            >
              <Space.H2 />
              <Flex.RSC full>
                <Space.V5 />
                <Text size={FONTSIZE_16}>Total {data.totalElements}</Text>
              </Flex.RSC>
              <Space.H3 />
              <Flex.CCC full padding={PLANCK * 5}>
                <PostTable
                  items={data.content
                    .map(notice => ({
                      id: notice.id,
                      title: notice.title,
                      publishedAt: notice.createdDate,
                      href: `/notices/${notice.id}`,
                      fixed: !!notice.isTopFixed,
                      new: dayjs().subtract(2, 'day').isBefore(dayjs(notice.createdDate).toDate()),
                    }))
                    .sort((a, b) => {
                      if (a.fixed && b.fixed) return 0;
                      if (a.fixed) return -1;
                      if (b.fixed) return 1;
                      return 0;
                    })}
                />
                <Space.H10 />
                <PaginationComponent
                  currentPage={page}
                  totalPageCount={data.totalPages}
                  onPageButtonClick={page => {
                    setPage(page);
                  }}
                />
              </Flex.CCC>
              <Space.H6 />
            </Tab>
          </Template>
        </Container.Body>
        <Container.Sidebar>
          <Sidebar />
        </Container.Sidebar>
      </Container>
    </Wrapper>
  );
};
BoardNoticesTemplate.Mobile = BoardNoticesTemplateMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
`;
