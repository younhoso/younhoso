import { FC } from 'react';

import styled from 'styled-components';

import { Container, Divider, Flex, Space, Text } from '@/components/atoms';
import { COLOR_BLACK, COLOR_GRAY, FONTSIZE_12, FONTSIZE_20 } from '@/constants';

import { EventPageTemplateComponentProps } from './EventPageTemplate';

export const EventPageTemplateMobile: FC<EventPageTemplateComponentProps> = ({ event }) => {
  return (
    <Container.Mobile>
      <Container.Mobile.Body>
        <Flex.CSS full>
          <Text size={FONTSIZE_12} color={COLOR_GRAY}>
            이벤트
          </Text>
          <Space.H2 />
          <Text size={FONTSIZE_20} color={COLOR_BLACK}>
            {event.title}
          </Text>
          <Space.H3 />
          <Divider color={COLOR_BLACK} />
          <Space.H3 />
          <Text size={FONTSIZE_12} color={COLOR_GRAY}>
            {`이벤트 기간 : ${event.startDate} ~ ${event.endDate}`}
          </Text>
        </Flex.CSS>
        <Space.H8 />
        <Article dangerouslySetInnerHTML={{ __html: event.bodyHtml ?? '' }} />
      </Container.Mobile.Body>
    </Container.Mobile>
  );
};

const Article = styled.div`
  & img {
    width: 100% !important;
  }
`;
