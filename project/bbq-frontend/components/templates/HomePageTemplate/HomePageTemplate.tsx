import { FC } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Container, Divider, Grid, Image, Space, Text } from '@/components/atoms';
import { Carousel, CategoryCard, ServiceCard } from '@/components/molecules';
import { Sidebar } from '@/components/organisms';
import { FONTSIZE_15, PLANCK } from '@/constants';
import { EventBanner, MenuCategory } from '@/types';

import { HomePageTemplateMobile } from './mobile';

export interface HomePageTemplateProps {
  eventBanners: EventBanner[];
  categories: MenuCategory[];
}

export interface HomePageTemplateComponentProps extends HomePageTemplateProps {}

export const HomePageTemplate: FC<HomePageTemplateComponentProps> & {
  Mobile: FC<HomePageTemplateComponentProps>;
} = ({ eventBanners, categories }) => {
  return (
    <Wrapper>
      <Container>
        <Container.Body>
          <Template>
            <Space.H3 />
            <Carousel>
              {eventBanners.map((eventBanner, index) => {
                return (
                  <Link key={index} href={eventBanner.webUrl ?? ''}>
                    <Image src={eventBanner.pcImageUrl} width={'100%'} />
                  </Link>
                );
              })}
            </Carousel>
            <Space.H4 />
            <Divider />
            <Space.H5 />
            <Grid columnCount={7} gap={PLANCK * 3}>
              {categories.map((category, index) => {
                return <CategoryCard key={index} category={category} />;
              })}
            </Grid>
            <Space.H5 />
            <Divider />
            <Space.H5 />
            <Text size={FONTSIZE_15} weight={600}>
              BBQ 서비스
            </Text>
            <Space.H3 />
            <Grid columnCount={2} gap={PLANCK * 2}>
              <ServiceCard
                url="/mypage/coupons"
                imageUrl={'/images/home/service-1.png'}
                title={'BBQ 쿠폰북'}
                description="비비큐 쿠폰을 한 곳에 모았어요!"
              />
              <ServiceCard
                url="https://www.bbqopen.co.kr/?utm_campaign=homepage&utm_source=homepage%5Fpc&utm_medium=mainbutton&utm_term=homepage%5Fmainbutton"
                imageUrl={'/images/home/service-2.png'}
                title={'창업문의'}
                description="BBQ로 성공 창업을 도전하세요!"
              />
              {/*
              <ServiceCard
                url="/story"
                imageUrl={"/images/home/service-3.png"}
                title={"비비큐 스토리"}
                description="사회 윤리적 기업으로 책임과 역할을 다하는 BBQ"
              />
              */}
            </Grid>
            <Space.H10 />
          </Template>
        </Container.Body>
        <Container.Sidebar>
          <Sidebar />
        </Container.Sidebar>
      </Container>
    </Wrapper>
  );
};

HomePageTemplate.Mobile = HomePageTemplateMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
`;
