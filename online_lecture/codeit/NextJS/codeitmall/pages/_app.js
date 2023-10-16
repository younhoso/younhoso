import Header from '@/components/Header';
import Container from '@/components/Container';
import {ThemeProvider} from '@/lib/ThemeContext';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  
  return (
    <>
      <Head>
        <title>CodeitMall</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RecoilRoot>
        <ThemeProvider>
          <Header />
          <Container>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </RecoilRoot>
    </>
  )
}
