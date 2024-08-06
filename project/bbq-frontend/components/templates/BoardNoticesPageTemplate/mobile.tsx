import { FC } from 'react';

import { Container, Pagination, PostTable, Space, Tab, Text } from '@/components/atoms';
import { FONTSIZE_14 } from '@/constants';
import { dayjs } from '@/libs';

import { BoardNoticesTemplateComponentProps } from './BoardNoticesPageTemplate';

export const BoardNoticesTemplateMobile: FC<BoardNoticesTemplateComponentProps> = ({
  page,
  setPage,
  data,
}) => {
  return (
    <Container.Mobile>
      <Tab.Mobile
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
        <Container.Mobile.Body>
          <Space.H2 />
          <Text size={FONTSIZE_14}>Total {data.totalElements}</Text>
          <Space.H4 />
          <PostTable.Mobile
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
          <Space.H6 />
          <Pagination.Mobile
            currentPage={page}
            totalPageCount={data.totalPages}
            onPageButtonClick={page => {
              setPage(page);
            }}
          />
        </Container.Mobile.Body>
      </Tab.Mobile>
    </Container.Mobile>
  );
};
