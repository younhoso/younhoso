import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import '@/pages/globals.css';
import ReactQueryProvider from '@/provider/ReactQueryProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReactQueryProvider>
  );
}
