'use client';

import { ReactNode } from 'react';

import { useRedirectCartPage } from '@/hooks/useRedirectCartPage';

const MobileCartLayout = ({ children }: { children: ReactNode }) => {
  useRedirectCartPage();

  return <>{children}</>;
};

export default MobileCartLayout;
