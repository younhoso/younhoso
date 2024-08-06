import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';

import Footer from '~/components/atoms/Footer';
import Header from '~/components/atoms/Header';
import LoadingPage from '~/components/atoms/LoadingPage';
import SubscribeModal from '~/components/molecules/SubscribeModal';
import MotionComponent from '~/components/templates/MotionComponent';
import { GlobalStyled } from '~/styles/styled';
import { defaultTheme } from '~/styles/theme';
import { addClass, removeClass } from '~/utils';
import { numberToRem } from '~/utils/rem';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import clsx from 'clsx';
import { createStore } from 'redux';
import { ThemeProvider } from 'styled-components';
import 'swiper/css';

type Theme = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

let handle: any = '';
let handle1: any = '';

const HideFooter = ['/about', '/business', '/contact', '/category'];

function MyApp({ Component, pageProps }: AppProps) {
  const [end, setEnd] = useState(false);
  const [active, setActive] = useState(false);
  const [footer, setFooter] = useState(false);

  Router.events.on('routeChangeStart', (url, e) => {
    if (e.shallow) return;

    setActive(true);

    clearTimeout(handle);
    clearTimeout(handle1);
  });

  Router.events.on('routeChangeComplete', (url, e) => {
    if (e.shallow) return;

    const FindHideFooter = HideFooter.includes(url);

    if (FindHideFooter) setFooter(true);
    else setFooter(false);

    handle = setTimeout(() => {
      setEnd(true);

      handle1 = setTimeout(() => {
        setActive(false);
        setEnd(false);
      }, 700);
    }, 700);

    return () => {
      clearTimeout(handle);
      clearTimeout(handle1);
    };
  });

  let store = createStore(() => {
    return {
      header: false,
    };
  });

  const router = useRouter();

  useEffect(() => {
    // setTimeout(() => {
    window.scrollTo(0, 0);
    // }, 500);
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>PAP Korea | Magazine</title>
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=0"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://main.d1eq1d2yxd68cc.amplifyapp.com/"
        />
        <meta property="og:title" content="PAP Korea" />
        <meta property="og:description" content="PAP Korea | Magazine" />
        <meta property="og:site_name" content="PAP Korea" />
        <meta property="og:locale" content="PAP Korea" />
        <meta
          property="og:image"
          content="https://main.d1eq1d2yxd68cc.amplifyapp.com/ogimg.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="사진" />
        <meta name="twitter:title" content="PAP Korea" />
        <meta name="twitter:description" content="PAP Korea | Magazine" />
        <meta
          name="twitter:image"
          content="https://main.d1eq1d2yxd68cc.amplifyapp.com/ogimg.png "
        />
        <link href="/fonts/style.css" rel="stylesheet" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-14WV4P0W36"
        ></script>
        <script src="/js/gtag.js"></script>
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyled />

          {/* <MotionComponent onWheel={(e: any) => onWheel(e)}> */}
          <MotionComponent>
            <Header />
            <Component {...pageProps} />
            <Footer className={clsx(footer && 'hidden')} />
          </MotionComponent>

          <LoadingPage className={clsx(active && 'active', end && 'end')} />
          {/* <SubscribeModal /> */}
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
