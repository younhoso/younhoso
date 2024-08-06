import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/images/header/logo.svg';

export default function NotFound() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Image style={{ marginBottom: '40px' }} src={logo} width={176} height={80} alt="logo" />
      <p style={{ fontSize: '25px', color: '#333', marginBottom: '20px', fontWeight: 600 }}>
        Error 404 - Page Not Found
      </p>
      <p style={{ fontSize: '20px', color: '#999' }}>요청하신 페이지를 찾을 수 없습니다.</p>
      <p style={{ fontSize: '20px', color: '#999' }}>URL을 다시 확인하시기 바랍니다.</p>

      <Link
        replace={true}
        href="/"
        style={{
          margin: '20px',
          color: 'white',
          border: '1px solid #E31937',
          backgroundColor: '#E31937',
          padding: '10px 20px',
        }}
      >
        쇼핑몰로 돌아가기
      </Link>

      <p style={{ fontSize: '14px', fontWeight: 500, color: '#666' }}>
        (주) 제너시스비비큐 유통 | 1588-9282
      </p>
    </div>
  );
}
