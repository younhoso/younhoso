import { FC } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Box, Container, Divider, Flex, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { Sidebar } from '@/components/organisms';
import { COLOR_BLACK, FONTSIZE_24, PLANCK } from '@/constants';
import { Notice } from '@/types';

import { BoardNoticePageTemplateMobile } from './mobile';

export interface BoardNoticePageTemplateProps {
  notice: Notice;
}

export interface BoardNoticePageTemplateComponentProps extends BoardNoticePageTemplateProps {}

export const BoardNoticePageTemplate: FC<BoardNoticePageTemplateComponentProps> & {
  Mobile: FC<BoardNoticePageTemplateComponentProps>;
} = ({ notice }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Container>
        <Container.Body>
          <Space.H3 />
          <Template>
            <Box full padding={PLANCK * 5}>
              <Flex.CSS full>
                <Flex.RBE full layout="1 auto">
                  <Text size={FONTSIZE_24} color={COLOR_BLACK}>
                    {notice.title}
                  </Text>
                  <Text size={12} color={'#777777'}>
                    {notice.createdDate}
                  </Text>
                </Flex.RBE>
                <Space.H2_5 />
                <Divider length={2} color={'#8288A2'} />
              </Flex.CSS>
              <Space.H5 />
              <Article dangerouslySetInnerHTML={{ __html: notice.bodyHtml ?? '' }} />
              <Space.H6 />
              <Divider color={'#8288A2'} />
              <Space.H6 />
              <Flex.CCC>
                <Button
                  onClick={() => router.push('/notices')}
                  fill={false}
                  text={'목록'}
                  color={'#b1b6cb'}
                  textColor={'#302d46'}
                  shape={'round'}
                  style={{ height: 34 }}
                />
              </Flex.CCC>
              <Space.H6 />
            </Box>
          </Template>
        </Container.Body>
        <Container.Sidebar>
          <Sidebar />
        </Container.Sidebar>
      </Container>
    </Wrapper>
  );
};
BoardNoticePageTemplate.Mobile = BoardNoticePageTemplateMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
  border: solid 1px #ddd;
  background-color: #fff;
`;

const Article = styled.div`
  & img {
    width: 100% !important;
  }
`;
