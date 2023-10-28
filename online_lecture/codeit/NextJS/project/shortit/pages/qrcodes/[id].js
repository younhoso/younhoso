import Head from 'next/head';
import QRCodeForm, { QRCodeFormType } from '@/components/QRCodeForm';
import styles from '@/styles/QRCodeEditPage.module.css';

export default function QRCodeEditPage() {
  return (
    <>
      <Head>
        <title>QRCode 수정하기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>QRCode 수정하기</h1>
        <QRCodeForm type={QRCodeFormType.Edit} />
      </div>
    </>
  );
}
