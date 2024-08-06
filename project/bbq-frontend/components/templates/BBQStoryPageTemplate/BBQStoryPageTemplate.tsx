import { FC } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Box, Divider, Flex, Icon, Space, Text } from '@/components/atoms';
import { COLOR_BLACK, FONTSIZE_10, FONTSIZE_14, FONTSIZE_16 } from '@/constants';

export interface BBQStoryPageTemplate {}

export const BBQStoryPageTemplate: FC<BBQStoryPageTemplate> = ({}) => {
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
          <LinkBox href={'/story/relay'}>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={500}>
              찾아가는 치킨릴레이 사연신청
            </Text>
            <Space.H3 />
          </LinkBox>
        </Flex.RCC>
      </Box>
      <Box background={'#F9F6EF'}>
        <Flex.CCC>
          <Space.H9 />
          <Text size={32} weight={600}>
            비비큐 스토리
          </Text>
          <Space.H4 />
          <Text color={'#565043'} size={FONTSIZE_16} weight={500}>
            비비큐 스토리 콘텐츠
          </Text>
          <Space.H7 />
          <div style={{ width: 666, height: 374, background: '#eee' }}></div>
          <Flex.RSC style={{ marginTop: -15 }}>
            <div>
              <Text color={'#565043'} size={FONTSIZE_14} weight={600}>
                BBQ 비비큐 스토리
              </Text>
              <Space.H1 />
              <Text color={'#98907E'} size={FONTSIZE_10} weight={500} lineHeight={'1.3em'}>
                100% extra virgin olive oil is used as
                <br />a raw material for frying oil
              </Text>
            </div>
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Icon src="/videos/olive-oil.svg" size={44} />
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Icon src="/videos/chicken-in-bowl.svg" size={44} />
            <Space.V5 />
            <Divider.V1 color={'#C4BFB5'} style={{ height: 44 }} />
            <Space.V5 />
            <Icon src="/videos/contents-typography.svg" size={150} />
          </Flex.RSC>
        </Flex.CCC>
      </Box>
      <Flex.CCC>
        <Space.H12 />

        <Space.H20 />
      </Flex.CCC>
    </>
  );
};

const LinkBox = styled(Link)``;
