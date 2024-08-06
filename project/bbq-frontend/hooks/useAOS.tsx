import { useEffect } from 'react';

import AOS from 'aos';

import { useMounted } from './useMounted';

const useAOS = () => {
  const mounted = useMounted();
  useEffect(() => {
    if (mounted) {
      AOS.init({ once: true, delay: 100 });
      AOS.refresh();
    }
  }, [mounted]);

  return true;
};

export { useAOS };
