'use client';

import { ReactNode } from 'react';

import { useRedirectCartPage } from '@/hooks/useRedirectCartPage';

const PcCartLayout = ({ children }: { children: ReactNode }) => {
  useRedirectCartPage();

  return <>{children}</>;
};

export default PcCartLayout;
