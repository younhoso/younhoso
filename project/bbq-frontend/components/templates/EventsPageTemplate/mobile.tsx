import { FC } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Arrow, Container, Flex, Image, Space, Tab, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_12, FONTSIZE_13, FONTSIZE_14, FONTSIZE_15, PLANCK } from '@/constants';

import { EventsPageTemplateComponentProps } from './EventsPageTemplate';

export const EventsPageTemplateMobile: FC<EventsPageTemplateComponentProps> = ({
  totalCount,
  events,
  handleShowMoreButtonClick,
}) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Container.Mobile>
      <Tab.Mobile
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
        <Space.H4 />
        <Flex>
          <Space.V4 />
          <Text size={FONTSIZE_14}>Total {totalCount}</Text>
        </Flex>
        <Flex.CSS full padding={PLANCK * 4} gap={PLANCK * 5}>
          {(events ?? []).map((event, index) => (
            <Flex.CSS key={index} full as={Link} href={`/events/${event.id}`}>
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
              <Button.Mobile
                onClick={() => handleShowMoreButtonClick()}
                color="#f5f6f7"
                borderColor="#e8eaf0"
                shape="round"
                text={
                  <Flex.RSC>
                    <Text color="#302d46" size={FONTSIZE_12}>
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
      </Tab.Mobile>
    </Container.Mobile>
  );
};
