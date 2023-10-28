import Image from 'next/image';
import { Noto_Sans_KR } from '@next/font/google';
import logoImage from '@/public/logo.svg';
import styles from '@/styles/App.module.css';
import '@/styles/global.css';
import Link from '@/components/Link';
import Head from 'next/head';

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shortit</title>
      </Head>
      <div className={`${styles.app} ${notoSansKR.className}`}>
        <header className={styles.header}>
          <nav className={`${styles.nav} ${styles.container}`}>
            <Link href="/">
              <Image width={93} height={26} src={logoImage} alt="Shortit" />
            </Link>
            <div className={styles.links}>
              <Link href="/short-links">주소 줄이기</Link>
              <Link href="/qrcodes">QR코드</Link>
            </div>
          </nav>
        </header>
        <main className={`${styles.main} ${styles.container}`}>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
