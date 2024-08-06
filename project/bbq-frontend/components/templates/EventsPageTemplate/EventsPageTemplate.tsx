import { FC } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Arrow, Container, Flex, Icon, Image, Space, Tab, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { Sidebar } from '@/components/organisms';
import { FONTSIZE_15, FONTSIZE_16, PLANCK } from '@/constants';
import { Event } from '@/types';

import { EventsPageTemplateMobile } from './mobile';

export interface EventsPageTemplateProps {
  totalCount: number;
  events: Event[];
  handleShowMoreButtonClick: () => void;
}

export interface EventsPageTemplateComponentProps extends EventsPageTemplateProps {}

export const EventsPageTemplate: FC<EventsPageTemplateComponentProps> & {
  Mobile: FC<EventsPageTemplateComponentProps>;
} = ({ totalCount, events, handleShowMoreButtonClick }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Wrapper>
      <Container>
        <Container.Body>
          <Space.H3 />
          <Template>
            <Tab
              items={[
                {
                  title: '진행중인 이벤트',
                  selected: currentPath === '/events',
                  href: '/events',
                },
                {
                  title: '지난 이벤트',
                  selected: currentPath === '/events/finished',
                  href: '/events/finished',
                },
              ]}
            >
              {!events.length ? (
                <>
                  <Space.H20 />
                  <Flex.CCC full={true}>
                    <Icon src={'loudspeaker-lightgray.svg'} size={70} />
                    <Space.H2 />
                    <Text color={'#777777'}>현재 진행중인 이벤트가 없습니다.</Text>
                  </Flex.CCC>
                  <Space.H20 />
                </>
              ) : null}
              {events.length ? (
                <>
                  <Space.H2 />
                  <Flex>
                    <Space.V5 />
                    <Text size={FONTSIZE_16}>Total {totalCount}</Text>
                  </Flex>
                  <Space.H2 />
                  <Flex.CSS full={true} padding={PLANCK * 5} gap={PLANCK * 8}>
                    {(events ?? []).map((event, index) => (
                      <Flex.CSS key={index} full={true} as={Link} href={`/events/${event.id}`}>
                        <Image
                          src={event.thumbnailImageUrl}
                          width={'100%'}
                          height={'54.3%'}
                          backgroundSize={'cover'}
                          backgroundPosition={'center'}
                        />
                      </Flex.CSS>
                    ))}
                  </Flex.CSS>
                  <Space.H2 />
                  {totalCount > events.length ? (
                    <>
                      <Flex.RCC full={true}>
                        <Button
                          onClick={() => handleShowMoreButtonClick()}
                          color="#f5f6f7"
                          borderColor="#e8eaf0"
                          shape="round"
                          text={
                            <Flex.RSC>
                              <Text color="#302d46" size={FONTSIZE_15}>
                                이벤트 더보기
                              </Text>
                              <Space.V2 />
                              <Arrow.Down size={2} thickness={1.5} color="#302d46" />
                            </Flex.RSC>
                          }
                        />
                      </Flex.RCC>
                      <Space.H12 />
                    </>
                  ) : null}
                </>
              ) : null}
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
EventsPageTemplate.Mobile = EventsPageTemplateMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
`;
