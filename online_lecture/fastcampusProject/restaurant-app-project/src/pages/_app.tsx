import type { AppProps } from 'next/app';

import Layout from '@/component/Layout';
import '@/pages/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
