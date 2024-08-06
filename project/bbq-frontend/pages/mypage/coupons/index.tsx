import { useEffect } from 'react';

export default function MyPageCouponsPage() {
  useEffect(() => {
    window.location.href = '/mypage/coupons/1';
  }, []);

  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/mypage/coupons/1',
      permanent: false,
    },
  };
}
