import Script from 'next/script';

import BreadCrumb from './components/BreadCrumb';
import Loading from './components/Loading';
import { ModalProvider } from './components/Modal';
import './globals.css';
import Navbar from './navbar';
import { NextAuthProvider } from './provider';
import Sidebar from './sidebar';
import UnderConstruction from './underconstruction';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-[#eef0f5]">
      <ModalProvider>
        <head>
          <meta name="description" content={'BBQ Admin'} />
          <meta property="og:title" content={'BBQ Admin'} />
          <meta property="og:description" content={'BBQ Admin'} />
          <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/images/og-image.jpg`}
          />
        </head>
        <NextAuthProvider>
          <body className="h-full">
            <Navbar />

            <div className="flex items-stretch">
              <Sidebar />

              <UnderConstruction>
                <main className="my-10 ml-20 mr-20 mx-auto flex-1 min-w-[1300px]">
                  <BreadCrumb />

                  {children}
                </main>
              </UnderConstruction>
            </div>

            <Script
              strategy="afterInteractive"
              src="//dapi.kakao.com/v2/maps/sdk.js?appkey=894a140fea0ef65b9a31dd20d847cc14&libraries=services,clusterer&autoload=false"
            />
          </body>
        </NextAuthProvider>
      </ModalProvider>
    </html>
  );
}
