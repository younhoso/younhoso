import type { ReactNode } from 'react';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';

import logo from '@/assets/images/header/seo.jpg';
import { pretendard } from '@/libs/fonts';
import ClientSessionProvider from '@/provider/ClientSessionProvider';
import CustomThemeProvider from '@/provider/CustomThemeProvider';
import ReactQueryProvider from '@/provider/ReactQueryProvider';
import RecoilProvider from '@/provider/RecoilProvider';

const naverSearchAdvisorKey = '3d3e995da88e72e64edf5b85e55798eb057560de';

const bbqmall = 'BBQ몰';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_KCP_CONFIRM_URL ?? 'https://mall.bbq.co.kr/'),
  title: {
    template: bbqmall + ' | %s',
    default: bbqmall,
  },
  description: '뭘 먹어도 맛있는 BBQ가 만든 BBQ몰!',
  icons: {
    icon: [{ url: '/favicon.ico', rel: 'shortcut icon' }],
  },
  openGraph: {
    title: bbqmall,
    description: 'BBQ몰, Best of Best Quality',
    url: 'https://mall.bbq.co.kr/',
    siteName: bbqmall,
    locale: 'ko_KR',
    type: 'website',
    images: [
      { url: logo.src, width: 800, height: 400 },
      { url: logo.src, width: 1800, height: 1600 },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'naver-site-verification': naverSearchAdvisorKey,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const gaId = 'G-CTEZEEL4RY';
const gtagId = 'GTM-W87G73R8';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={pretendard.className} style={{ height: 'auto' }}>
        <RecoilProvider>
          <ClientSessionProvider>
            <CustomThemeProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </CustomThemeProvider>
          </ClientSessionProvider>
        </RecoilProvider>
      </body>
      <GoogleAnalytics gaId={gaId} />
      <GoogleTagManager gtmId={gtagId} />
    </html>
  );
}
