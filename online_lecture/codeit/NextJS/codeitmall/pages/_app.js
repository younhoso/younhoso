import Header from '@/components/Header';
import Container from '@/components/Container';
import {ThemeProvider} from '@/lib/ThemeContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  console.log('Component', Component)
  return (
    <>
      <ThemeProvider>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  )
}
