import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Desktop, Mobile } from '@/components/functions';
import { AddressPermissionPageTemplate } from '@/components/templates';
import { useAuth } from '@/hooks';

export default function AddressPermission() {
  const router = useRouter();
  const { session, member, defaultAddress } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  // 1. 멤버를 못 불러오면 -> 비회원으로 인지 -> 바로 검색으로 이동
  // 2. 기본 주소가 존재하면 -> 바로 검색으로 이동
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof member === 'undefined') return;
    if (typeof defaultAddress === 'undefined') return;
    if (!member || defaultAddress) {
      router.replace({ pathname: '/address/search', query: router.query });
    } else {
      setLoading(false);
    }
  }, [member, defaultAddress, router.query, router.isReady]);

  if (!session || loading) return null;

  return (
    <>
      <Desktop>
        <AddressPermissionPageTemplate />
      </Desktop>
      <Mobile>
        <AddressPermissionPageTemplate.Mobile />
      </Mobile>
    </>
  );
}
