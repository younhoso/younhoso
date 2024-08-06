import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Desktop, Mobile } from '@/components/functions';
import { MemberIntegratePageTemplate } from '@/components/templates';
import { popData, stashData } from '@/utils';

export default function MemberIntegratePage() {
  const router = useRouter();

  const [id, setId] = useState<string | undefined>(undefined);
  const [agreed, setAgreed] = useState<boolean>(false);

  const handleIntegrateButtonClick = useCallback(async () => {
    if (!id) return;
    stashData('member/integrate', { id: id });
    router.push('/member/integrate/verify');
  }, [id, agreed, router]);

  useEffect(() => {
    try {
      const data = popData<{
        id: string;
      }>('member/login', {
        deleteAfter: 5, // NOTE: 5초 후에 삭제 (useEffect가 여러 번 실행되는 현상 대응)
      });
      if (data && data.id) {
        setId(data.id);
      } else {
        router.push('/member/login');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!id) return null;

  const props = {
    agreed: agreed,
    setAgreed: setAgreed,
    handleIntegrateButtonClick: handleIntegrateButtonClick,
  };

  return (
    <>
      <Desktop>
        <MemberIntegratePageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberIntegratePageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
