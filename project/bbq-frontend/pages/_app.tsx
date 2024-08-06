import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { NextComponentType, NextPageContext } from 'next';
import { Session } from 'next-auth';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

import 'aos/dist/aos.css';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';

import { Desktop, Mobile } from '@/components/functions';
import { Modal, ModalProvider, QuickOrderStickyButton } from '@/components/molecules';
import { CIModal, CIModalProvider, Footer, Header } from '@/components/organisms';
import { AuthProvider } from '@/hooks';
import { CookieProvider, useCookie } from '@/hooks/useCookie';
import { QueryParamsProvider } from '@/hooks/useQueryParams';
import '@/public/fonts/GmarketSans/stylesheet.css';
import '@/public/fonts/Pretendard/stylesheet.css';
import '@/public/fonts/Pretendard/subset-stylesheet.css';
import { isArsSessionState, useSidebarCart } from '@/stores';
import '@/styles/globals.css';

const gaId = 'G-04M29X6FK4';
const gtagId = 'GTM-53DQ7QCH';

const RootItem = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
}) => {
  const router = useRouter();
  const removeItmes = router.pathname === '/ars' || router.pathname === '/sign/out';
  const setIsArsSession = useSetRecoilState(isArsSessionState);
  const isArs = typeof window !== 'undefined' ? sessionStorage.getItem('ars') === 'true' : false;
  const { data, status } = useSession();

  useEffect(() => {
    setIsArsSession(isArs);
  }, []);

  useEffect(() => {
    if (removeItmes) {
      return;
    }
    if (data?.type === 'ars' && !isArs) {
      router.replace('/sign/out');
    }

    if (status !== 'loading' && data?.type !== 'ars' && isArs) {
      sessionStorage.setItem('ars', 'false');
    }
  }, [data]);

  return (
    <>
      {!removeItmes ? (
        <>
          <Desktop>
            <Header />
          </Desktop>
          <Mobile>
            <Header.Mobile />
          </Mobile>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
          <Desktop>
            <Footer />
          </Desktop>
          <Mobile>
            <Footer.Mobile />
          </Mobile>
        </>
      ) : (
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      )}
    </>
  );
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  SwiperCore.use([Autoplay]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <title>BBQ 치킨</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={'맛있는 치킨 BBQ 치킨'} />
        <meta property="og:title" content={'BBQ 치킨'} />
        <meta property="og:description" content={'맛있는 치킨 BBQ 치킨'} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/og-image.jpg`}
        />
        <meta name="naver-site-verification" content="c00aafb2a4a6e31eb3cc278b235cfdb8dbc29e9f" />
      </Head>
      <Script
        defer={true}
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${
          process.env.NEXT_PUBLIC_KAKAOAPPKEY ?? `ee5a2d53e755d498eb617be420bdae25`
        }&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      <SessionProvider session={session}>
        <RecoilRoot>
          <AuthProvider>
            <CookieProvider>
              <QueryParamsProvider>
                <ModalProvider>
                  <CIModalProvider>
                    <RootItem Component={Component} pageProps={pageProps} />
                    <QuickOrderStickyButton />
                    <CIModal />
                    <Modal />
                  </CIModalProvider>
                </ModalProvider>
              </QueryParamsProvider>
            </CookieProvider>
          </AuthProvider>
        </RecoilRoot>
      </SessionProvider>
      <GoogleTagManager gtmId={gtagId} />
      <GoogleAnalytics gaId={gaId} />
    </>
  );
}

const Wrapper = styled.div`
  display: block;
  clear: both;
  width: 100%;
`;
