import { FC, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Head from 'next/head';

import styled from 'styled-components';
import SwiperCore from 'swiper';

import { Container, Divider, Image, Space, Text } from '@/components/atoms';
import { PLANCK, YOUTUBE_CONTENTS_LIST } from '@/constants';

import { StoryPageTemplateMobile } from './mobile';

export interface StoryPageTemplateProps {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  currentHistory: string[];
  setCurrentHistory: (arr: string[]) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentYoutube: { code: string; title: string };
  setCurrentYoutube: (youtube: { code: string; title: string }) => void;
}

export interface StoryPageTemplateComponentProps extends StoryPageTemplateProps {}

export const StoryPageTemplate: FC<StoryPageTemplateComponentProps> & {
  Mobile: FC<StoryPageTemplateComponentProps>;
} = ({
  currentIndex,
  setCurrentIndex,
  currentHistory,
  setCurrentHistory,
  currentTab,
  setCurrentTab,
  currentYoutube,
  setCurrentYoutube,
}) => {
  const [swiper, setSwiper] = useState<SwiperCore>();

  const onPrevButtonClick = useCallback(() => {
    if (!swiper) return;
    swiper.slidePrev();
  }, [swiper]);

  const onNextButtonClick = useCallback(() => {
    if (!swiper) return;
    swiper.slideNext();
  }, [swiper]);

  return (
    <div>
      <TabContainer>
        <Text
          onClick={() => setCurrentTab('STORY')}
          className={`${currentTab == 'STORY' && 'tabActive'}`}
        >
          비비큐 이야기
        </Text>
        <Divider direction="vertical" color="#000000" length="1px" />
        <Text
          className={`${currentTab == 'CONTENT' && 'tabActive'}`}
          onClick={() => setCurrentTab('CONTENT')}
        >
          영상 콘텐츠
        </Text>
      </TabContainer>
      {currentTab == 'STORY' && (
        <>
          <div>
            <Image src="story/main.png" width={'100%'} />
            <TextWrapper flexDirection={'v'} center>
              <Text size={40}>당신의 행복을 키우는 BBQ</Text>
              <br />
              <br />
              <br />
              <Text size={20} weight={300} lineHeight={1.3}>
                BBQ는 더 풍부한 행복을 만들기 위해 고객의 입맛과 마음을 연구합니다.
                <br />
                BBQ가 있는 곳 어디서나 행복한 만남이이루어집니다.
                <br />
                <br />
                사회 윤리적 기업으로 책임과 역할을 다하여 모두가 행복해지는 세상을
                <br />
                만들어가겠습니다.
              </Text>
            </TextWrapper>
          </div>
          <Container flexDirection="v">
            <Container>
              <Image src="/story/1.png" />
              <Container flexDirection="v">
                <div style={{ marginLeft: 30, marginTop: 30 }}>
                  <Text size={30}>Best of the Best Quality</Text>
                  <Space.H5 />
                  <Text size={20} lineHeight={1.3}>
                    BBQ는 그 이름처럼 최고의 원재료만을 사용하여 맛은 물론
                    <br />
                    고객의 건강까지 생각합니다.
                  </Text>
                </div>
              </Container>
            </Container>
            <Space.H10 />
            <Container>
              <Container flexDirection="v">
                <div style={{ marginRight: 30, marginTop: 30 }}>
                  <Text align="right" size={30}>
                    세상에서 가장 맛있는 치킨
                  </Text>
                  <Space.H5 />
                  <Text align="right" size={20} lineHeight={1.3}>
                    BBQ는 최고의 치킨 맛,
                    <br />
                    건강에 좋은 치킨을 만들겠다는 일념으로 올리브유 중에서도
                    <br />
                    최고급유이자 ‘신이 내린 선물’이라 불리는 100%엑스트라 버진 올리브유를
                    <br />
                    후라잉오일의 원료로 사용하고 있으며 국민건강 증진에 기여하고자 합니다.
                  </Text>
                </div>
              </Container>
              <Image src="/story/2.png" />
            </Container>
          </Container>
          <Space.H10 />
          <Container flexDirection="v" center>
            <Text size={40} weight={600}>
              bbq History
            </Text>
            <Space.H10 />
            <HistoryContainer center>
              <PrevButton onClick={onPrevButtonClick} />
              <Text size={100} weight={600}>
                {currentHistory[currentIndex]}&apos;s
              </Text>
              <NextButton onClick={onNextButtonClick} />
            </HistoryContainer>
            <Space.H10 />
            <Swiper
              autoHeight={true}
              onSwiper={swiper => setSwiper(swiper)}
              loop={true}
              spaceBetween={0}
              slidesPerView={'auto'}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              speed={350}
              onSlideChange={swiper => {
                const { realIndex } = swiper;
                setCurrentIndex(realIndex);
              }}
            >
              <CenteredSwiperSlide>
                <Image src="/story/history/2020.jpg" />
              </CenteredSwiperSlide>

              <CenteredSwiperSlide>
                <Image src="/story/history/2010.jpg" />
              </CenteredSwiperSlide>

              <CenteredSwiperSlide>
                <Image src="/story/history/2000.jpg" />
              </CenteredSwiperSlide>

              <CenteredSwiperSlide>
                <Image src="/story/history/1990.jpg" />
              </CenteredSwiperSlide>
            </Swiper>
          </Container>
          <Space.H10 />
        </>
      )}
      {currentTab == 'CONTENT' && (
        <>
          <ContentContainer center flexDirection="v">
            <Text size={40}>영상 콘텐츠</Text>
            <Space.H3 />
            <Text size={20} weight={400}>
              BBQ media contents
            </Text>
            <Space.H5 />

            <div style={{ maxWidth: 718 }}>
              <iframe
                width="718"
                height="404"
                src={`https://www.youtube.com/embed/${currentYoutube.code}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <Space.H3 />
              <Container flexDirection="v">
                <BadgeText size={11}>BBQ MEDIA CONTENTS</BadgeText>
                <Container>
                  <TitleText align="left">{currentYoutube.title}</TitleText>
                  <Space.V5 />
                  <Image src="/story/contents_text.png" />
                </Container>
              </Container>
            </div>
          </ContentContainer>
          <ContentListContainer>
            <Swiper slidesPerView={6} spaceBetween={30}>
              {YOUTUBE_CONTENTS_LIST.map(data => {
                return (
                  <SwiperSlide key={data.code}>
                    <ContentCard flexDirection="v" onClick={() => setCurrentYoutube(data)}>
                      <Image src={`https://img.youtube.com/vi/${data.code}/0.jpg`} />
                      <Space.H1 />
                      <Text>{data.title}</Text>
                    </ContentCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </ContentListContainer>
        </>
      )}
    </div>
  );
};
StoryPageTemplate.Mobile = StoryPageTemplateMobile;

const TabContainer = styled(Container)`
  justify-content: center;
  gap: 1rem;
  background-color: #dde1e2;
  max-width: none;
  padding-top: 1rem;
  -webkit-box-shadow: 0 4px 6px -6px #222;
  -moz-box-shadow: 0 4px 6px -6px #222;
  box-shadow: 0 4px 6px -6px #222;
  span {
    cursor: pointer;
    padding-bottom: 1rem;

    &.tabActive,
    :hover {
      font-weight: bold;
      border-bottom: 2px solid #000000;
    }
  }
`;
const TextWrapper = styled(Container)`
  position: relative;
  bottom: 5rem;
`;

const NextButton = styled.div`
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 14px;
    height: 3px;
    background-color: black;
  }

  &::before {
    transform: translate(-40%, -5px) rotate(45deg);
  }

  &::after {
    transform: translate(-40%, 3px) rotate(135deg);
  }
`;

const PrevButton = styled(NextButton)`
  left: ${PLANCK * 4}px;
  right: auto;
  transform: translateY(-50%) scaleX(-1);
`;

const HistoryContainer = styled(Container)`
  gap: 3rem;
`;

const CenteredSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
`;
const ContentContainer = styled(Container)`
  background-color: #e9e8e9;
  max-width: none;
  padding: 2em 0;
`;

const ContentListContainer = styled(Container)`
  padding: 2em 0;
  max-width: none;
`;

const ContentCard = styled(Container)`
  gap: 3px;
  cursor: pointer;
`;
const BadgeText = styled(Text)`
  padding: 0.3rem 0.5rem;
  background-color: #292a59;
  color: #ffffff;
  border-radius: 1rem;
  width: 155px;
  margin-bottom: 0.5rem;
`;
const TitleText = styled(Text)`
  width: 100%;
`;
