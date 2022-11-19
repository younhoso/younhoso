import { ThemeProvider } from "styled-components";
import type { AppProps } from 'next/app';
import theme from "../styles/theme";
import { GlobalStyle } from "../styles/globalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}