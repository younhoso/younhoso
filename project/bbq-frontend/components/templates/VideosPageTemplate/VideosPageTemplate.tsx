import { FC, Fragment, useState } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Box, Divider, Flex, Icon, Image, Space, Text } from '@/components/atoms';
import { COLOR_BLACK, FONTSIZE_10, FONTSIZE_14, FONTSIZE_16 } from '@/constants';

type Video = {
  title: string;
  imageUrl?: string;
  youtubeId?: string;
};

const videos: Video[] = [
  /*{
    title: "BBQ Garlicioso 착착갈릭 - 15s New Ver.",
    imageUrl: undefined,
    youtubeId: "632BKk3AWTo",
  },*/
  /*{
    title: "BBQ Garlicioso 단짠갈릭 - 15s New Ver.",
    imageUrl: undefined,
    youtubeId: "Vi2s5P-wZ6E",
  },*/
  /*{
    title: "BBQ Garlicioso 바삭갈릭 - 15s New Ver.",
    imageUrl: undefined,
    youtubeId: "S5BTWPHfdAY",
  },*/
  /*{
    title:
      "BBQ Garlicioso 3종 : 갈리시오소 바삭갈릭, 단짠갈릭, 착착갈릭 - 30s New Ver.",
    imageUrl: undefined,
    youtubeId: "AlrJAiKgP_s",
  },*/
  {
    title: 'BBQ 창업, 곧 달에도 착륙 합니다🌙',
    imageUrl: undefined,
    youtubeId: 'Oe2YZTIYpJk',
  },
  /*{
    title: "BBQ X 김유정, BBQ 탐험편💚 - long ver",
    imageUrl: undefined,
    youtubeId: "ei-OPIFj8og",
  },*/
  {
    title: 'BBQ 신메뉴 황올콤보 출시🍗',
    imageUrl: undefined,
    youtubeId: '1adwbt1sNg8',
  },
  {
    title: 'BBQ OLIVE US 봉사단 면접 공개✨',
    imageUrl: undefined,
    youtubeId: 'LSRrZx9FEhM',
  },
  {
    title: '우리모두 황올한 BBQ치킨 파티! - (30s)',
    imageUrl: undefined,
    youtubeId: 'Cpi_fKvHp6s',
  },
  {
    title: '황광희 BBQ 치킨 광고 찍었다 [치킨왕]',
    imageUrl: undefined,
    youtubeId: 'vnZA-0h6vwk',
  },
  {
    title: "🍗BBQ 핫황금올리브 TVCF 30's",
    imageUrl: undefined,
    youtubeId: '7uwWPJB3crs',
  },
  {
    title: 'BBQ 뱀파이어 치킨 “신사답게 주문해” 편',
    imageUrl: undefined,
    youtubeId: 'dJ38gZi9PP4',
  },
  {
    title: 'BBQ x 시티포레스티벌 2019 생생 후기!',
    imageUrl: undefined,
    youtubeId: 'vF19XeD_gMU',
  },
  {
    title: 'BBQ x 시티포레스티벌 2019 생생 후기 제 2탄!',
    imageUrl: undefined,
    youtubeId: 'eraoTpIxdhg',
  },
  {
    title: 'BBQ 신메뉴 삼총사가 명동점에 떴다?!',
    imageUrl: undefined,
    youtubeId: 'vMMxedUulvI',
  },
  {
    title: "드라마 '봄밤'과 함께하는 BBQ!",
    imageUrl: undefined,
    youtubeId: 'u6Q3MEdOR-I',
  },
  {
    title: 'BBQ(비비큐) 딹 멤버십 출시!',
    imageUrl: undefined,
    youtubeId: 'cZKTAqZsZks',
  },
  {
    title: "Let's Chicketing⭐",
    imageUrl: undefined,
    youtubeId: 'l8n8qdlrx1s',
  },
  {
    title: '[BBQ x 데드풀] 그분과 함께 돌아왔다 #BBQ #데드풀2',
    imageUrl: undefined,
    youtubeId: 'Hu18I2sZiqw',
  },
  {
    title: '[BBQ] New 비비큐 로고송!! #비비송 #비비큐송!! 비하인드 스토리!?',
    imageUrl: undefined,
    youtubeId: 'fds93wmGnPA',
  },
  {
    title: '[BBQ] New 로고송 개웃ㅋㅋㅋ #TDC #셀럽파이브 #진짜 #비비송 #비비큐송',
    imageUrl: undefined,
    youtubeId: 'Rav1b8PncxQ',
  },
  {
    title: 'BBQ TVCF(40s) 방탄소년단 - 꼬꼬넛치킨 (Song. BTS)',
    imageUrl: undefined,
    youtubeId: 'nRRrWgbgOZc',
  },
  {
    title: 'BBQ TV CF 방탄소년단-큼지막한 맛이 필요할땐 BBQ 자메이카 통다리구이가 딹.',
    imageUrl: undefined,
    youtubeId: 'dKDMrV3JV20',
  },
  {
    title: 'BBQ TV CF 방탄소년단-출출함에 쫓길땐 BBQ 황금올리브 속안심이 딹.',
    imageUrl: undefined,
    youtubeId: 'grrDKhz4fak',
  },
  {
    title: '딹 비비큐 광고 BBQ 프리런칭 15초',
    imageUrl: undefined,
    youtubeId: 'f3dYtcrM-gw',
  },
  {
    title: '[ BBQ치킨 ] 배고플때는 주문을 외워보자!! 1588-9282',
    imageUrl: undefined,
    youtubeId: 'OR8KiMSm_VY',
  },
  {
    title: '[ BBQ 치킨 ] 황금올리브치킨 조리과정 최초공개!',
    imageUrl: undefined,
    youtubeId: 'lzAIsKgNC_Q',
  },
  {
    title: '[ BBQ치킨 ] 비비큐 장학금 스토리',
    imageUrl: undefined,
    youtubeId: 'mQ8xbmMConE',
  },
  {
    title: '[ BBQ치킨 ]카드뉴스_치킨대학편',
    imageUrl: undefined,
    youtubeId: '6y33xtdgoe0',
  },
  {
    title: '[ BBQ치킨 ]카드뉴스_자메이카 통다리구이편',
    imageUrl: undefined,
    youtubeId: '6oi2o5ItH4Y',
  },
  {
    title: '[ BBQ치킨 ]카드뉴스_올리브유편',
    imageUrl: undefined,
    youtubeId: '7jYCXC4GHQM',
  },
  {
    title: '[ BBQ치킨 ]카드뉴스_성공스토리편',
    imageUrl: undefined,
    youtubeId: 'PKPWV-MXvUc',
  },
  {
    title: 'BBQ(비비큐) 이종석(Lee Jong Seok), 수지(Suzy) BBQ 달링허니송!',
    imageUrl: undefined,
    youtubeId: 'YGDiWaBrV7M',
  },
  {
    title: 'BBQ(비비큐)드림키즈세트 (슈렉, 쿵푸팬더, 알렉스, 드래곤) 바이럴 영상',
    imageUrl: undefined,
    youtubeId: 'OJa8Tk0n7Ao',
  },
  {
    title: 'BBQ(비비큐)드림키즈세트(슈렉, 쿵푸팬더, 알렉스, 드래곤) CF영상',
    imageUrl: undefined,
    youtubeId: '0SYAooYnfGM',
  },
  {
    title: 'BBQ(비비큐)드림키즈세트 (슈렉, 쿵푸팬더, 알렉스, 드래곤) CF영상 15초',
    imageUrl: undefined,
    youtubeId: 'iwWB_AiFoRA',
  },
  {
    title: 'BBQ(비비큐) 이종석, 수지의 허니갈릭스&치즐링 광고 촬영 스케치 1탄',
    imageUrl: undefined,
    youtubeId: 'LHY-UxaY5UU',
  },
  {
    title: 'BBQ (비비큐) 이종석 메이킹영상~',
    imageUrl: undefined,
    youtubeId: 'V1znewWZaBs',
  },
  {
    title: 'BBQ (비비큐) 이종석, 수지의 치즐링, 허니갈릭스 CF영상~',
    imageUrl: undefined,
    youtubeId: 'ok-1OFzIkAU',
  },
  {
    title: '[MV] 류승룡의 BBQ(비비큐) 뉴욕속안심텐더',
    imageUrl: undefined,
    youtubeId: 'bZUz8mGWAsg',
  },
  {
    title: '[MV] 류승룡의 BBQ(비비큐) 이스탄불치킨',
    imageUrl: undefined,
    youtubeId: '3rG1tJIxxEk',
  },
  {
    title: '류승룡의 BBQ (비비큐) 빠리치킨',
    imageUrl: undefined,
    youtubeId: 'Y8Jnbf9JrSE',
  },
  {
    title: '류승룡의 BBQ (비비큐) 자메이카 통다리구이',
    imageUrl: undefined,
    youtubeId: 'e3cyRhk4rI8',
  },
  {
    title: 'BBQ (비비큐) 페이스북 인증샷 이벤트 good',
    imageUrl: undefined,
    youtubeId: 'GiAPNBeRuFk',
  },
  {
    title: "[BBQ치킨/류현진] BBQ CF : 정류장편(30')_고화질",
    imageUrl: undefined,
    youtubeId: 'WUGLocLZkn8',
  },
  {
    title: "[BBQ치킨/류현진] BBQ CF : 외로움편(30')_고화질",
    imageUrl: undefined,
    youtubeId: 'EWb4wiuqmNA',
  },
  {
    title: '[BBQ치킨/현아] 청춘의 답은 BBQ에 있다_반반치킨',
    imageUrl: undefined,
    youtubeId: 'gS1vhj_cTRs',
  },
  {
    title: '[BBQ치킨/현아] 청춘의 답은 BBQ에 있다_클럽 Part 2.',
    imageUrl: undefined,
    youtubeId: 'fA62asGgFcQ',
  },
  {
    title: '[BBQ치킨/현아] 청춘의 답은 BBQ에 있다_클럽 Part 1.',
    imageUrl: undefined,
    youtubeId: '6rEeLxkZ7sI',
  },
  {
    title: 'BBQ광고_30초',
    imageUrl: undefined,
    youtubeId: 'VQpRs9DvNiY',
  },
  {
    title: '한국경제TV - BBQ 열풍이 중국으로 번지고 있다',
    imageUrl: undefined,
    youtubeId: 'rx52gzpWgLQ',
  },
  {
    title: '0208 BBQ 양파의청춘 비스트 현승ver',
    imageUrl: undefined,
    youtubeId: 'rC_way3ieQM',
  },
  {
    title: '0208 BBQ 얘천재아냐 비스트 요섭 ver',
    imageUrl: undefined,
    youtubeId: 'pxV2uqyiJhU',
  },
  {
    title: 'BBQ치킨 누나는 24인치 신세경 ver',
    imageUrl: undefined,
    youtubeId: 'GfDVyqJmyPM',
  },
  {
    title: 'BBQ광고_30초',
    imageUrl: undefined,
    youtubeId: 'VQpRs9DvNiY',
  },
  {
    title: '페짱과 함께하는 스트레칭.avi',
    imageUrl: undefined,
    youtubeId: '8Q2WoTQksI4',
  },
  {
    title: 'PSY싸이 - GANGNAM STYLE (강남스타일) 패러디 - BBQ 스타일',
    imageUrl: undefined,
    youtubeId: '9RRuRFzMRaE',
  },
  {
    title: 'BBQ광고_30초',
    imageUrl: undefined,
    youtubeId: 'VQpRs9DvNiY',
  },
];

export interface VideosPageTemplate {}

export const VideosPageTemplate: FC<VideosPageTemplate> = ({}) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(videos[0]);

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
          <Box>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={600}>
              영상 콘텐츠
            </Text>
            <Space.H3 />
            <Divider.H2 color={COLOR_BLACK} style={{ marginTop: -2 }} />
          </Box>
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
            영상 콘텐츠
          </Text>
          <Space.H4 />
          <Text color={'#565043'} size={FONTSIZE_16} weight={500}>
            비비큐 미디어 콘텐츠
          </Text>
          <Space.H7 />
          <iframe
            key={selectedVideo?.youtubeId}
            width="666"
            height="374"
            src={`https://www.youtube.com/embed/${selectedVideo?.youtubeId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
            style={{ border: 0 }}
          ></iframe>
          <Flex.RSC style={{ marginTop: -15 }}>
            <div>
              <Text color={'#565043'} size={FONTSIZE_14} weight={600}>
                BBQ 미디어콘텐츠
              </Text>
              <Space.H1 />
              {/* <Text
                color={"#98907E"}
                size={FONTSIZE_10}
                weight={500}
                lineHeight={"1.3em"}
              >
                100% extra virgin olive oil is used as
                <br />a raw material for frying oil
              </Text> */}
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
        <VideoItemsContainer>
          <VideoItemsContainerScrollBox>
            {videos.map((video, index) => (
              <Fragment key={index}>
                <Box
                  onClick={() => {
                    setSelectedVideo(video);
                  }}
                >
                  <Image
                    width={320}
                    height={180}
                    backgroundPosition="center"
                    backgroundSize="cover"
                    src={video.imageUrl ?? `https://img.youtube.com/vi/${video.youtubeId}/0.jpg`}
                  />
                  <Space.H3_5 />
                  <Text
                    size={FONTSIZE_16}
                    weight={500}
                    color={'#565043'}
                    lineHeight={'1.4em'}
                    align="center"
                    style={{ maxWidth: 320 }}
                  >
                    {video.title}
                  </Text>
                </Box>
                {index !== videos.length - 1 && <Space.V4 />}
              </Fragment>
            ))}
          </VideoItemsContainerScrollBox>
        </VideoItemsContainer>
        <Space.H20 />
      </Flex.CCC>
    </>
  );
};

const LinkBox = styled(Link)``;

const VideoItemsContainer = styled.div`
  width: 100%;
  display: block;
  overflow-x: scroll;
`;

const VideoItemsContainerScrollBox = styled.div`
  max-width: 99999px;
  display: inline-flex;

  &::before {
    content: '';
    display: block;
    width: 40px;
    height: 10px;
    pointer-events: none;
  }

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 10px;
    pointer-events: none;
  }
`;
