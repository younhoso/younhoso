import { useEffect } from 'react';

import { useRouter } from 'next/router';

type TargetList = 'event' | 'menu' | 'notice' | 'menulist';

const connectToTarget = ({ type, id }: { type: TargetList; id: string | null }) => {
  const targetList: Record<TargetList, string> = {
    event: '/events/' + id,
    menu: '/products/' + id,
    notice: '/notices/' + id,
    menulist: '/categories/' + id,
  };

  return targetList[type];
};

export default function Link() {
  const router = useRouter();

  useEffect(() => {
    const { type, id } = router.query as { type: TargetList; id: string };

    if (!type) {
      return;
    }

    const url = connectToTarget({ type, id: id || '' });

    router.replace(url);
  }, [router]);

  return <></>;
}
