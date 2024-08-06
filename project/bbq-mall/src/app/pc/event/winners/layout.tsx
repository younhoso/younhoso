import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '당첨자 발표',
};

export default function WinnerLayout({ children }: { children: ReactNode }) {
  return children;
}
