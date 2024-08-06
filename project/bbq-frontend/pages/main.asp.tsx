import { useEffect } from 'react';

import { useRouter } from 'next/router';

export default function MyPageAddress() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
  }, []);

  return <></>;
}
