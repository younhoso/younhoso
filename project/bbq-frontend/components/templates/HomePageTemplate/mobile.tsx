import { FC, useEffect, useState } from 'react';

import Link from 'next/link';

import { useRecoilValue } from 'recoil';

import { MenuAPI } from '@/apis';
import { Box, Container, Divider, Grid, Image, Space, Text } from '@/components/atoms';
import { Carousel, CategoryCard, ServiceCard } from '@/components/molecules';
import { LoginCard, OrderMethodCard, RecommendMenusCard } from '@/components/organisms';
import { FONTSIZE_15, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';
import { isArsSessionState } from '@/stores';
import { GetMenuRecommendListAPIResponse } from '@/types';

import { HomePageTemplateComponentProps } from './HomePageTemplate';

export const HomePageTemplateMobile: FC<HomePageTemplateComponentProps> = ({
  categories,
  eventBanners,
}) => {
  const { member } = useAuth();
  const isArs = useRecoilValue(isArsSessionState);

  const [newMenusData, setNewMenusData] = useState<GetMenuRecommendListAPIResponse | undefined>(
    undefined,
  );
  const [recommendedMenusData, setRecommendedMenusData] = useState<
    GetMenuRecommendListAPIResponse | undefined
  >(undefined);

  // 추천 메뉴 불러오기
  useEffect(() => {
    MenuAPI.Recommend.getList({
      type: 'recommended',
    })
      .then(res => {
        setRecommendedMenusData(res);
      })
      .catch(err => {
        console.error(err);
      });

    MenuAPI.Recommend.getList({
      type: 'new',
    })
      .then(res => {
        setNewMenusData(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <Container.Mobile>
      {!isArs && (
        <>
          <Carousel.Mobile>
            {eventBanners.map((eventBanner, index) => {
              return (
                <Link key={index} href={eventBanner.webUrl ?? ''}>
                  <Image src={eventBanner.mobileImageUrl} width={'100%'} />
                </Link>
              );
            })}
          </Carousel.Mobile>
          <Divider.H1 />
          {!member && (
            <>
              <LoginCard />
              <Divider.H1 />
            </>
          )}
        </>
      )}
      <OrderMethodCard.Mobile />
      <Divider.H1 />
      <Box padding={PLANCK * 4}>
        <Grid columnCount={4} gap={PLANCK * 2}>
          {categories.map((category, index) => {
            return <CategoryCard.Mobile key={index} category={category} />;
          })}
        </Grid>
      </Box>
      <Divider />

      {!isArs && (
        <>
          <Box padding={PLANCK * 2}>
            {recommendedMenusData ? (
              <>
                <RecommendMenusCard data={recommendedMenusData} />
              </>
            ) : null}
            <Box padding={PLANCK * 3}>
              <Divider />
            </Box>
            {newMenusData ? <RecommendMenusCard data={newMenusData} /> : null}
            <Box padding={PLANCK * 3}>
              <Divider />
            </Box>
          </Box>

          <Box padding={PLANCK * 5}>
            <Text size={FONTSIZE_15} style={{ marginTop: PLANCK * -3 }} align="center">
              BBQ 서비스
            </Text>
            <Space.H7 />
            <Grid columnCount={1} gap={PLANCK * 6}>
              <ServiceCard.Mobile
                url={'/mypage/coupons'}
                imageUrl={'/images/home/service-1.png'}
                title={'BBQ 쿠폰북'}
                description="비비큐 쿠폰을 한 곳에 모았어요!"
              />
              <ServiceCard.Mobile
                url={
                  'https://www.bbqopen.co.kr/?utm_campaign=homepage&utm_source=homepage%5Fmobile&utm_medium=mainbutton&utm_term=homepage%5Fmainbutton'
                }
                imageUrl={'/images/home/service-2.png'}
                title={'창업문의'}
                description="BBQ로 성공 창업을 도전하세요!"
              />
              {/*
        <ServiceCard.Mobile
            url={"/story"}
            imageUrl={"/images/home/service-3.png"}
            title={"비비큐 스토리"}
            description="사회 윤리적 기업으로 책임과 역할을 다하는 BBQ"
          />
         */}
            </Grid>
          </Box>
          <Space.H6 />
        </>
      )}
    </Container.Mobile>
  );
};
