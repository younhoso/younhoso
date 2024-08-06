import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import '@/pages/globals.css';
import ReactQueryProvider from '@/provider/ReactQueryProvider';

export default function App({ Component, pageProps: { session, pageProps } }: AppProps) {
  return (
    <ReactQueryProvider>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ReactQueryProvider>
  );
}
