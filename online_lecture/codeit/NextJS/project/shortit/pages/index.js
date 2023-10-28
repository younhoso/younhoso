import { useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from '@/styles/Home.module.css';
import cutUrlImage from '@/public/cut-url.svg';
import copyToClipboard from '@/lib/copyToClipboard';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const inputRef = useRef();

  function handleChange(e) {
    setUrl(e.target.value);
  }

  async function handleCreate(e) {
    e.preventDefault();
    // API 요청
    const res = await axios.post('/api/short-links/', {title: url, url });
    const newShortLink = res.data; 
    const newShortUrl = newShortLink.shortUrl;
    setShortUrl(newShortUrl);
  }

  async function handleCopy(e) {
    e.preventDefault();
    inputRef.current.select();
    const text = inputRef.current.value;
    await copyToClipboard(text);
    alert('복사했습니다. ctrl + v로 붙여넣으세요');
  }

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #2d2c34;
          color: #fafafc;
        }
      `}</style>
      <div className={styles.home}>
        <Image
          src={cutUrlImage}
          alt="가위로 주소 자르기"
          width={200}
          height={140}
        />
        <div className={styles.intro}>
          <h1 className={styles.title}>긴 주소를 짧은 주소로 줄이세요</h1>
          <p className={styles.description}>
            길고 복잡한 링크 주소를 짧게 줄이는 단축URL 서비스
          </p>
        </div>
        <form className={styles.form} onSubmit={handleCreate}>
          <Input className={styles.input} value={url} onChange={handleChange} />
          <Button className={styles.button} disabled={!url}>
            줄이기
          </Button>
        </form>
        {shortUrl && (
          <form className={styles.form} onSubmit={handleCopy}>
            <Input
              className={`${styles.input} ${styles.shortUrl}`}
              readOnly
              value={`${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrl}`}
              ref={inputRef}
            />
            <Button className={styles.button} variant="secondary">
              복사하기
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
