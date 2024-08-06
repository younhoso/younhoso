import { useRouter } from 'next/router';

import { OliveStoryPageTemplate } from '@/components/templates';

export default function OliveStory() {
  const router = useRouter();

  return (
    <>
      <OliveStoryPageTemplate />
    </>
  );
}
