'use client';

import { ReactNode } from 'react';

import MyCategory from '@/components/MyCategory';
import { PcMyLayoutStyled } from '@/styles/pageStyled/pc/PcMyLayoutStyled';

export default function MyLaout({ children }: { children: ReactNode }) {
  return (
    <PcMyLayoutStyled>
      <div className="my-layout-content">{children}</div>
      <MyCategory />
    </PcMyLayoutStyled>
  );
}
