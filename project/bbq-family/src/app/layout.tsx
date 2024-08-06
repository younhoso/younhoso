import { Flex } from '@tremor/react';

import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';

import Header from './components/Header';
import { LeftContent } from './components/LeftContent';
import { ModalProvider } from './components/Modal';
import './globals.css';
import { NextAuthProvider } from './provider';

export const metadata: Metadata = {
  title: 'BBQ 패밀리 어드민',
  description: 'BBQ 패밀리 어드민',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const random = Math.floor(Math.random() * 30) + 1;

  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin={'anonymous'}
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
      </Head>
      <body>
        <Header />
        <Flex className="max-w-[1200px] mx-auto justify-center overflow-hidden h-[calc(100vh-70px)]">
          <NextAuthProvider>
            <LeftContent random={random} />
            <ModalProvider>
              <div className="test lg:min-w-[425px] lg:w-[425px] w-[100vw] bg-white min-h-[calc(100vh-70px)] h-[calc(100vh-70px)] overflow-scroll">
                {children}
              </div>
            </ModalProvider>
          </NextAuthProvider>
        </Flex>
      </body>
    </html>
  );
}
export const dynamic = 'force-dynamic';
