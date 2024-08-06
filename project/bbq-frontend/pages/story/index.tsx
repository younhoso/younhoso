import { useRouter } from 'next/router';

import { BBQStoryPageTemplate } from '@/components/templates';

export default function BBQStory() {
  const router = useRouter();

  return (
    <>
      <BBQStoryPageTemplate />
    </>
  );
}
