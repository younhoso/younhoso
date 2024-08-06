import { FC } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Box, Container, Divider, Flex, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_BLACK, FONTSIZE_12, FONTSIZE_20, PLANCK } from '@/constants';

import { BoardNoticePageTemplateComponentProps } from './BoardNoticePageTemplate';

export const BoardNoticePageTemplateMobile: FC<BoardNoticePageTemplateComponentProps> = ({
  notice,
}) => {
  const router = useRouter();

  return (
    <Container.Mobile>
      <Template>
        <Box full padding={PLANCK * 5}>
          <Flex.CSS full>
            <Flex.RBC full>
              <Text size={FONTSIZE_20} color={COLOR_BLACK} lineHeight={'1.25em'}>
                {notice.title}
              </Text>
              <Text size={FONTSIZE_12} color={'#777777'}>
                {notice.createdDate}
              </Text>
            </Flex.RBC>
            <Space.H3 />
            <Divider color={'#8288A2'} length={2} />
          </Flex.CSS>
          <Space.H4 />
          <Article dangerouslySetInnerHTML={{ __html: notice.bodyHtml ?? '' }} />
          <Space.H6 />
          <Divider color={'#8288A2'} />
          <Space.H6 />
          <Flex.CCC>
            <Button.Mobile
              onClick={() => router.push('/notices')}
              fill={false}
              text={'목록'}
              color={'#b1b6cb'}
              textColor={'#302d46'}
              shape={'round'}
            />
          </Flex.CCC>
          <Space.H6 />
        </Box>
      </Template>
    </Container.Mobile>
  );
};

const Template = styled.div`
  display: block;
  background-color: #fff;
`;

const Article = styled.div`
  & img {
    width: 100% !important;
  }
`;
