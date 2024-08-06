import { FC } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Arrow, Box, Container, Divider, Flex, Space, Text } from '@/components/atoms';
import { Sidebar } from '@/components/organisms';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_WHITE,
  FONTSIZE_16,
  FONTSIZE_24,
  PLANCK,
} from '@/constants';
import { Event } from '@/types';

import { EventPageTemplateMobile } from './mobile';

export interface EventPageTemplateProps {
  event: Event;
}

export interface EventPageTemplateComponentProps extends EventPageTemplateProps {}

export const EventPageTemplate: FC<EventPageTemplateComponentProps> & {
  Mobile: FC<EventPageTemplateComponentProps>;
} = ({ event }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Container>
        <Container.Body>
          <Space.H3 />
          <Template>
            <Box padding={PLANCK * 10} border={'#dddddd'} background={COLOR_WHITE}>
              <Flex.CSS full>
                <Text size={FONTSIZE_16} color={COLOR_GRAY}>
                  이벤트
                </Text>
                <Space.H3 />
                <Flex.RBC full={true} layout="1 auto">
                  <Text size={FONTSIZE_24} color={COLOR_BLACK}>
                    {event.title}
                  </Text>
                  <div
                    onClick={() => router.push('/events')}
                    style={{ transform: `translateX(-25%)`, cursor: 'pointer' }}
                  >
                    <Arrow.Left tail={true} />
                  </div>
                </Flex.RBC>
                <Space.H4 />
                <Divider.H2 color={COLOR_BLACK} />
                <Space.H4 />
                <Text size={FONTSIZE_16} color={COLOR_GRAY}>
                  {`이벤트 기간 : ${event.startDate} ~ ${event.endDate}`}
                </Text>
              </Flex.CSS>
              <Space.H8 />
              <Article dangerouslySetInnerHTML={{ __html: event.bodyHtml ?? '' }} />
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
EventPageTemplate.Mobile = EventPageTemplateMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
`;

const Article = styled.div`
  & img {
    width: 100% !important;
  }
`;
