'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

type TargetList = 'event' | 'product' | 'notice' | 'category' | 'promotion';

const connectToTarget = ({ target, id }: { target: TargetList; id: string | null }) => {
  const targetList: Record<TargetList, string> = {
    event: '/event/detail/' + id,
    product: '/categories/detail/' + id,
    notice: '/help/260443/' + id,
    category: '/categories/' + id,
    promotion: '/categories/' + id + '/promote',
  };

  return targetList[target];
};

const MobileLink = () => {
  const search = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const target = search.get('target') as TargetList;
    const id = search.get('id');

    if (!target) {
      return router.replace('/');
    }

    const url = connectToTarget({ target, id: id || '' });

    router.replace(url);
  }, []);

  return <></>;
};

export default MobileLink;
