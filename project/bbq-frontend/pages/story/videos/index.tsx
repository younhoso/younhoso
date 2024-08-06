import { useRouter } from 'next/router';

import { VideosPageTemplate } from '@/components/templates';

export default function Videos() {
  const router = useRouter();

  return (
    <>
      <VideosPageTemplate />
    </>
  );
}
