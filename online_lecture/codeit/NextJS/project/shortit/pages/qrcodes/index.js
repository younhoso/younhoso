import Head from 'next/head';
import QRCodeList from '@/components/QRCodeList';
import Button from '@/components/Button';
import Link from '@/components/Link';
import styles from '@/styles/QRCodeListPage.module.css';
import dbConnect from '@/db/dbConnect';
import QRCode from '@/db/models/QRCode';
import { useState } from 'react';
import axios from 'axios';

export async function getServerSideProps() {
  await dbConnect();
  const shortQrcode = await QRCode.find();
  return {
    props: {
      qrCodes: JSON.parse(JSON.stringify(shortQrcode))
    }
  };
}

export default function QRCodeListPage({qrCodes: initialqr}) {
  const [qrCodes, setQrcodes] = useState(initialqr);

  async function handleDelete(id) {
    await axios.delete(`/api/qrcodes/${id}`);
    setQrcodes(( prevQrCodes ) =>
      prevQrCodes.filter((qrcode) => qrcode._id !== id)
    );
  }

  return (
    <>
      <Head>
        <title>QRCode 만들기 - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>QRCode 만들기</h1>
          <Button as={Link} href="/qrcodes/new">
            새로 만들기
          </Button>
        </header>
        <QRCodeList items={qrCodes} onDelete={handleDelete}/>
      </div>
    </>
  );
}
