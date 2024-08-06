import { FC, useCallback } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import {
  Box,
  Divider,
  Flex,
  Icon,
  Image,
  Pagination as PaginationComponent,
  PostTable,
  Space,
  Text,
} from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_BLACK, FONTSIZE_10, FONTSIZE_14, FONTSIZE_16, FONTSIZE_28 } from '@/constants';
import { dayjs } from '@/libs';
import { Pagination, Relay } from '@/types';

export interface RelayPageTemplate {
  page: number;
  setPage: (page: number) => void;
  data: Pagination<Relay>;
}

export const RelayPageTemplate: FC<RelayPageTemplate> = ({ page, setPage, data }) => {
  const router = useRouter();
  const handleWriteButtonClick = useCallback(() => {
    router.push('/story/relay/new');
  }, []);

  return (
    <>
      <Box
        background="#FCFBF7"
        full={true}
        style={{
          boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.10)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Flex.RCC full={true}>
          <LinkBox href={'/story/videos'}>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={500}>
              영상 콘텐츠
            </Text>
            <Space.H3 />
          </LinkBox>
          <Space.V3 />
          <Divider.V1 color={COLOR_BLACK} style={{ height: 14 }} />
          <Space.V3 />
          <Box>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={600}>
              찾아가는 치킨릴레이 사연신청
            </Text>
            <Space.H3 />
            <Divider.H2 color={COLOR_BLACK} style={{ marginTop: -2 }} />
          </Box>
        </Flex.RCC>
      </Box>
      <Box background={'#F9F6EF'}>
        <Flex.CCC>
          <Space.H9 />
          <Text size={32} weight={600}>
            찾아가는 치킨릴레이 사연신청
          </Text>
          <Space.H4 />
          <Text
            color={'#565043'}
            size={FONTSIZE_16}
            weight={500}
            lineHeight={'1.5em'}
            align="center"
          >
            전세계 인구를 잘먹고 잘살게하는 목표를 가진 비비큐가 여러분을 찾아갑니다.
            <br />
            세상에서 가장 맛있는 치킨, 비비큐를 쉽게 접할 수 없는 지역 혹은 도움의 손길이 필요한
            단체 등<br />
            필요한 곳에 비비큐가 직접 찾아가도록 하겠습니다.
          </Text>
          <Space.H7 />
          <Image
            width={666}
            height={310}
            backgroundPosition="center"
            backgroundSize="cover"
            style={{ borderRadius: 24 }}
            src={'relay/background-2.png'}
          />
          <Space.H7 />
          <Flex.RSC>
            <div>
              <Text color={'#565043'} size={FONTSIZE_14} weight={600}>
                BBQ 치킨릴레이
              </Text>
              <Space.H1 />
              <Text color={'#98907E'} size={FONTSIZE_10} weight={500} lineHeight={'1.3em'}>
                세상에서 가장 맛있는 치킨
                <br />
                비비큐가 여러분을 찾아갑니다.
              </Text>
            </div>
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Icon src="/relay/olive-oil.svg" size={44} />
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Icon src="/relay/chicken-in-bowl.svg" size={44} />
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Image src="/icons/relay/chicken-relay-typography.svg" width={260} />
          </Flex.RSC>
        </Flex.CCC>
        <Space.H8 />
      </Box>
      <Flex.CCC
        style={{
          maxWidth: 950,
          width: 'calc(100% - 60px)',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Space.H12 />
        <Text weight={600} size={FONTSIZE_28} align="center">
          비비큐 사연 신청 게시판
        </Text>
        <Space.H8 />
        <Flex.RBC full={true}>
          <Text size={FONTSIZE_16}>Total {data.totalElements}</Text>
          <Button text="사연 신청" color="red" shape={'round'} onClick={handleWriteButtonClick} />
        </Flex.RBC>
        <Space.H4 />
        <PostTable
          labelNumber="번호"
          items={data.content
            .map(relay => ({
              id: relay.id,
              title: relay.title,
              publishedAt: relay.createdAt,
              href: `/story/relay/${relay.id}`,
              fixed: false,
              new: dayjs().subtract(2, 'day').isBefore(dayjs(relay.createdAt).toDate()),
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
        <Space.H20 />
      </Flex.CCC>
    </>
  );
};

const LinkBox = styled(Link)``;
