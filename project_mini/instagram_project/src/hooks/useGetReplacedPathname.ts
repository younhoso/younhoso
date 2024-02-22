import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

export const mobilePcRegex = /\/mobile|\/pc/;

export const useGetReplacedPathname = () => {
  const pathname = usePathname();
  return useMemo(() => pathname.replace(mobilePcRegex, ''), [pathname]);
};
