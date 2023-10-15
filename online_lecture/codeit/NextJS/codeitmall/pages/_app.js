import Header from '@/components/Header';
import Container from '@/components/Container';
import {ThemeProvider} from '@/lib/ThemeContext';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </RecoilRoot>
  )
}
